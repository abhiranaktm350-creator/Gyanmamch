function json(res, status, body) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  return res.status(status).json(body);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return json(res, 405, { error: "Method not allowed." });
  }
  const apiKey = String(process.env.OPENAI_API_KEY || "").trim();
  if (!apiKey) return json(res, 503, { error: "ChatGPT Vision OCR is not configured. Add OPENAI_API_KEY to this Preview branch only." });
  const supabaseUrl = String(process.env.SUPABASE_URL || process.env.GYAN_MANCH_SUPABASE_URL || "").replace(/\/$/, "");
  const supabaseKey = String(process.env.SUPABASE_PUBLISHABLE_KEY || process.env.GYAN_MANCH_SUPABASE_KEY || req.headers.apikey || "").trim();
  const authorization = String(req.headers.authorization || "");
  if (!supabaseUrl || !supabaseKey || !authorization.startsWith("Bearer ")) {
    return json(res, 401, { error: "Please sign in with an approved teacher or administrator account." });
  }
  try {
    const authResponse = await fetch(supabaseUrl + "/auth/v1/user", { headers: { apikey: supabaseKey, authorization } });
    if (!authResponse.ok) return json(res, 401, { error: "Your sign-in session is invalid or expired." });
    const user = await authResponse.json();
    const profileResponse = await fetch(supabaseUrl + "/rest/v1/profiles?id=eq." + encodeURIComponent(user.id) + "&select=role,approval_status", {
      headers: { apikey: supabaseKey, authorization }
    });
    if (!profileResponse.ok) return json(res, 403, { error: "Could not verify staff permissions." });
    const profiles = await profileResponse.json();
    const profile = Array.isArray(profiles) ? profiles[0] : null;
    if (!profile || !["admin", "teacher"].includes(profile.role) || profile.approval_status !== "approved") {
      return json(res, 403, { error: "Only approved teaching staff can use ChatGPT Vision OCR." });
    }
    let body = req.body || {};
    if (typeof body === "string") {
      try { body = JSON.parse(body); } catch (_) { return json(res, 400, { error: "Invalid JSON request." }); }
    }
    const image = String(body.image || "");
    if (!/^data:image\/(?:jpeg|png|webp);base64,/i.test(image)) return json(res, 400, { error: "A valid scanned page image is required." });
    if (image.length > 4500000) return json(res, 413, { error: "This page image is too large. Reduce the scan resolution and retry." });
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { authorization: "Bearer " + apiKey, "content-type": "application/json" },
      body: JSON.stringify({
        model: String(process.env.OPENAI_VISION_MODEL || process.env.OPENAI_MODEL || "gpt-4o-mini"),
        temperature: 0,
        max_tokens: 5000,
        messages: [
          { role: "system", content: "You are a highly accurate OCR engine for Indian competitive examination papers. Transcribe visible text only." },
          { role: "user", content: [
            { type: "text", text: "Read this scanned question-paper page and transcribe every visible question, question number, option label and option text in reading order. Preserve the original language (English or Hindi), spelling, numbers, symbols, tables and line breaks. Do not translate, solve, infer missing text, invent questions or include page headers/footers unless they are part of a question. If a word is unreadable, mark it [unclear]. Return plain text only." },
            { type: "image_url", image_url: { url: image, detail: "high" } }
          ] }
        ]
      })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const message = data.error && data.error.message ? data.error.message : "OpenAI Vision OCR failed.";
      return json(res, response.status === 429 ? 429 : 502, { error: message });
    }
    const text = String(data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content || "").trim();
    if (text.length < 8) return json(res, 422, { error: "ChatGPT could not read enough text from this page." });
    return json(res, 200, { text });
  } catch (error) {
    return json(res, error && error.name === "AbortError" ? 504 : 502, { error: error && error.message ? error.message : "ChatGPT Vision OCR failed. Please retry." });
  }
}
