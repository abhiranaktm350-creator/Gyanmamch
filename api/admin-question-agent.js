function json(res, status, body) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  return res.status(status).json(body);
}

function cleanText(value, max = 3000) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function validOptions(value) {
  return Array.isArray(value) && value.length === 4 &&
    value.every(item => typeof item === "string" && item.trim().length > 0) &&
    new Set(value.map(item => item.trim().toLocaleLowerCase())).size === 4;
}

function normalizeQuestion(q, difficulty) {
  return {
    question_en: cleanText(q.question_en),
    question_hi: cleanText(q.question_hi),
    options_en: Array.isArray(q.options_en) ? q.options_en.slice(0, 4).map(v => cleanText(v, 800)) : [],
    options_hi: Array.isArray(q.options_hi) ? q.options_hi.slice(0, 4).map(v => cleanText(v, 800)) : [],
    correct_option: Number(q.correct_option),
    explanation_en: cleanText(q.explanation_en, 2000),
    explanation_hi: cleanText(q.explanation_hi, 2000),
    difficulty: cleanText(q.difficulty, 30) || difficulty
  };
}

function isComplete(q, language) {
  const answerValid = Number.isInteger(q.correct_option) && q.correct_option >= 0 && q.correct_option <= 3;
  const englishValid = language === "hi" || (q.question_en && validOptions(q.options_en));
  const hindiValid = language === "en" || (q.question_hi && validOptions(q.options_hi));
  return answerValid && englishValid && hindiValid && (q.question_en || q.question_hi);
}

async function generateBatch({ key, model, exam, subject, topic, difficulty, language, count, batchIndex, batchTotal }) {
  const prompt = [
    "You are an expert Indian competitive-exam question setter for Gyan Manch.",
    "Create exactly " + count + " original, high-quality MCQs for " + exam + ", subject " + subject + ", topic " + topic + ", difficulty " + difficulty + ".",
    "This is batch " + (batchIndex + 1) + " of " + batchTotal + ". Avoid repeating questions or testing the same fact within this batch.",
    "Match the real exam's reasoning style and difficulty. Do not copy copyrighted past-paper wording. Avoid fabricated current-affairs facts; prefer stable syllabus knowledge.",
    "Every question must have exactly four distinct, non-empty options and exactly one correct option indexed 0-3. Verify calculations and answer keys before returning.",
    language === "both" ? "Provide accurate, natural English AND Hindi (Devanagari) for every question, all four options, and explanations." :
      language === "hi" ? "Provide complete Hindi (Devanagari) questions, all four options, and explanations." :
      "Provide complete English questions, all four options, and explanations.",
    "Return ONLY valid JSON in this schema: " + JSON.stringify({questions:[{question_en:"",question_hi:"",options_en:["","","",""],options_hi:["","","",""],correct_option:0,explanation_en:"",explanation_hi:"",difficulty:difficulty}]}),
    "Return exactly " + count + " questions. No markdown fences or text outside JSON."
  ].join("\n\n");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 50000);
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", authorization: "Bearer " + key },
      body: JSON.stringify({
        model, temperature: 0.2, max_tokens: 7000, response_format: { type: "json_object" },
        messages: [
          { role: "system", content: "You create accurate, original Indian competitive-exam MCQs. Follow the requested JSON schema exactly." },
          { role: "user", content: prompt }
        ]
      }),
      signal: controller.signal
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const message = data.error && data.error.message ? data.error.message : "";
      throw new Error(response.status === 429 ? "OpenAI rate limit or quota reached. Check API billing/limits and retry." :
        response.status === 401 || response.status === 403 ? "OpenAI rejected the API key. Check OPENAI_API_KEY in the Preview environment." :
        message || "ChatGPT could not generate this question batch.");
    }
    const raw = data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
    let parsed;
    try {
      const clean = String(raw || "").trim().replace(/^\uFEFF/, "").replace(/^\x60{3}(?:json)?\s*/i, "").replace(/\s*\x60{3}\s*$/, "");
      parsed = JSON.parse(clean);
    } catch (_) { throw new Error("ChatGPT returned an invalid JSON batch. Please retry."); }
    if (!Array.isArray(parsed.questions)) throw new Error("ChatGPT response did not contain a question list.");
    const questions = parsed.questions.map(q => normalizeQuestion(q || {}, difficulty));
    if (questions.length !== count || questions.some(q => !isComplete(q, language))) {
      throw new Error("ChatGPT returned incomplete questions or options. No partial batch was accepted; please retry.");
    }
    return questions;
  } finally { clearTimeout(timeout); }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return json(res, 405, { error: "Method not allowed." });
  }

  const supabaseUrl = (process.env.GYAN_MANCH_SUPABASE_URL || "https://zpjpoolfkjdlqxioabnf.supabase.co").replace(/\/$/, "");
  const supabaseKey = process.env.GYAN_MANCH_SUPABASE_KEY || req.headers.apikey || "";
  const authorization = String(req.headers.authorization || "");
  if (!authorization.startsWith("Bearer ") || !supabaseKey) {
    return json(res, 401, { error: "Please sign in with an administrator account." });
  }

  try {
    const userResponse = await fetch(supabaseUrl + "/auth/v1/user", {
      headers: { apikey: supabaseKey, authorization }
    });
    if (!userResponse.ok) return json(res, 401, { error: "Your administrator session is invalid or expired." });
    const user = await userResponse.json();
    const profileResponse = await fetch(supabaseUrl + "/rest/v1/profiles?id=eq." + encodeURIComponent(user.id) + "&select=role,approval_status", {
      headers: { apikey: supabaseKey, authorization }
    });
    if (!profileResponse.ok) return json(res, 403, { error: "Could not verify administrator permissions." });
    const profiles = await profileResponse.json();
    const profile = Array.isArray(profiles) ? profiles[0] : null;
    if (!profile || profile.role !== "admin" || profile.approval_status !== "approved") {
      return json(res, 403, { error: "Only approved administrators can use the AI Question Agent." });
    }

    const key = String(process.env.OPENAI_API_KEY || "").trim();
    if (!key) return json(res, 503, { error: "ChatGPT is not configured for this Preview yet. Add OPENAI_API_KEY to the Vercel Preview environment only; never put it in browser code." });

    let body = req.body || {};
    if (typeof body === "string") {
      try { body = JSON.parse(body); } catch (_) { return json(res, 400, { error: "Request body must be valid JSON." }); }
    }
    if (!body || typeof body !== "object" || Array.isArray(body)) return json(res, 400, { error: "Invalid request." });

    const exam = cleanText(body.exam || "General Competitive Exams", 80);
    const subject = cleanText(body.subject || "General Awareness", 80);
    const topic = cleanText(body.topic, 120);
    const difficulty = cleanText(body.difficulty || "Mixed", 30);
    const language = ["both", "en", "hi"].includes(body.language) ? body.language : "both";
    const count = Math.min(150, Math.max(1, Math.floor(Number(body.count) || 10)));
    if (!topic) return json(res, 400, { error: "Enter a topic first." });
    if (!Number.isFinite(Number(body.count)) || count < 1) return json(res, 400, { error: "Choose a valid question count." });

    const model = String(process.env.OPENAI_MODEL || "gpt-4o-mini").trim();
    const batchSize = 10;
    const batchCounts = Array.from({length: Math.ceil(count / batchSize)}, (_, i) => Math.min(batchSize, count - i * batchSize));
    const batches = [];
    // Send batches sequentially to avoid bursts that trigger Gemini rate limits.
    for (let index = 0; index < batchCounts.length; index++) {
      let batch;
      for (let attempt = 0; attempt < 4; attempt++) {
        try {
          batch = await generateBatch({
            key, model, exam, subject, topic, difficulty, language,
            count: batchCounts[index], batchIndex: index, batchTotal: batchCounts.length
          });
          break;
        } catch (error) {
          const isRateLimit = /rate limit|429|resource_exhausted|too many requests/i.test(error?.message || "");
          if (!isRateLimit || attempt === 3) throw error;
          await new Promise(resolve => setTimeout(resolve, 1500 * (2 ** attempt)));
        }
      }
      batches.push(batch);
    }
    const questions = batches.flat();
    if (questions.length !== count) return json(res, 502, { error: "The AI could not complete the full question set. Please retry." });
    return json(res, 200, { questions, requested_count: count, generated_count: questions.length });
  } catch (error) {
    return json(res, error?.name === "AbortError" ? 504 : 502, {
      error: error?.message || "Unexpected AI agent error. Please retry."
    });
  }
}
