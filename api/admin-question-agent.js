const corsHeaders = { "Content-Type": "application/json", "Cache-Control": "no-store" };

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed." });

  const supabaseUrl = (process.env.GYAN_MANCH_SUPABASE_URL || "https://zpjpoolfkjdlqxioabnf.supabase.co").replace(/\/$/, "");
  const supabaseKey = process.env.GYAN_MANCH_SUPABASE_KEY || req.headers.apikey || "";
  const auth = String(req.headers.authorization || "");
  if (!auth.startsWith("Bearer ") || !supabaseKey) return res.status(401).json({ error: "Please sign in with an administrator account." });

  try {
    const userResponse = await fetch(supabaseUrl + "/auth/v1/user", { headers: { apikey: supabaseKey, authorization: auth } });
    if (!userResponse.ok) return res.status(401).json({ error: "Your administrator session is invalid or expired." });
    const user = await userResponse.json();
    const profileResponse = await fetch(supabaseUrl + "/rest/v1/profiles?id=eq." + encodeURIComponent(user.id) + "&select=role,approval_status", { headers: { apikey: supabaseKey, authorization: auth } });
    if (!profileResponse.ok) return res.status(403).json({ error: "Could not verify administrator permissions." });
    const profiles = await profileResponse.json();
    const profile = Array.isArray(profiles) ? profiles[0] : null;
    if (!profile || profile.role !== "admin" || profile.approval_status !== "approved") return res.status(403).json({ error: "Only approved administrators can use the AI Question Agent." });

    const key = process.env.GEMINI_API_KEY;
    if (!key) return res.status(503).json({ error: "AI is not configured for this Preview yet. Add GEMINI_API_KEY to the Vercel Preview environment only; never put it in browser code." });

    const body = req.body || {};
    const exam = String(body.exam || "General Competitive Exams").slice(0, 80);
    const subject = String(body.subject || "General Awareness").slice(0, 80);
    const topic = String(body.topic || "").trim().slice(0, 120);
    const difficulty = String(body.difficulty || "Mixed").slice(0, 30);
    const language = ["both", "en", "hi"].includes(body.language) ? body.language : "both";
    const count = Math.min(25, Math.max(1, Number(body.count) || 10));
    if (!topic) return res.status(400).json({ error: "Enter a topic first." });

    const prompt = `You are an expert Indian competitive-exam question setter for Gyan Manch. Create exactly ${count} original, unambiguous MCQs for ${exam}, subject ${subject}, topic ${topic}, difficulty ${difficulty}. Avoid fabricated current-affairs facts; prefer stable syllabus knowledge. Match the exam's style and difficulty, not copied copyrighted past-paper wording. Each question must have exactly four distinct options and exactly one correct option indexed 0-3. Verify the answer logically before returning. Language mode: ${language}. If both, provide accurate natural English and Hindi for the question, all four options, and explanations. If en, Hindi fields may be empty. If hi, provide Hindi fields and English fields may be empty. Return ONLY valid JSON in this schema: {"questions":[{"question_en":"","question_hi":"","options_en":["","","",""],"options_hi":["","","",""],"correct_option":0,"explanation_en":"","explanation_hi":"","difficulty":"${difficulty}"}]}. No markdown fences or text outside JSON.`;

    const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
    const aiResponse = await fetch("https://generativelanguage.googleapis.com/v1beta/models/" + encodeURIComponent(model) + ":generateContent?key=" + encodeURIComponent(key), {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: prompt }] }], generationConfig: { temperature: 0.35, responseMimeType: "application/json" } })
    });
    const aiData = await aiResponse.json().catch(() => ({}));
    if (!aiResponse.ok) return res.status(502).json({ error: aiData.error?.message || "The AI provider could not generate questions." });
    const raw = aiData.candidates?.[0]?.content?.parts?.map(p => p.text || "").join("") || "";
    let parsed;
    try { parsed = JSON.parse(raw.replace(/^\uFEFF/, "").trim()); } catch { return res.status(502).json({ error: "AI returned an invalid question format. Please try again." }); }
    if (!Array.isArray(parsed.questions)) return res.status(502).json({ error: "AI response did not contain a question list." });
    const questions = parsed.questions.slice(0, count).map(q => ({
      question_en: String(q.question_en || "").slice(0, 3000),
      question_hi: String(q.question_hi || "").slice(0, 3000),
      options_en: Array.isArray(q.options_en) ? q.options_en.slice(0,4).map(v=>String(v||"").slice(0,800)) : [],
      options_hi: Array.isArray(q.options_hi) ? q.options_hi.slice(0,4).map(v=>String(v||"").slice(0,800)) : [],
      correct_option: Number(q.correct_option),
      explanation_en: String(q.explanation_en || "").slice(0,2000),
      explanation_hi: String(q.explanation_hi || "").slice(0,2000),
      difficulty: String(q.difficulty || difficulty).slice(0,30)
    })).filter(q => (q.question_en || q.question_hi) && q.options_en.length === 4 && q.correct_option >= 0 && q.correct_option <= 3);
    if (questions.length !== count) return res.status(502).json({ error: "AI generated incomplete questions. Please retry or use a smaller batch." });
    return res.status(200).json({ questions });
  } catch (error) {
    return res.status(500).json({ error: error?.message || "Unexpected AI agent error." });
  }
}
