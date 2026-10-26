# Gyan Manch (ज्ञान मंच)

Mobile-first bilingual (Hindi/English) competitive-exam practice website with a white-and-blue interface.

## Files

- `index.html` — responsive website, student and administrator login screens, exam catalogue, timed tests, results, question-bank tools, PDF/text extraction and review screens.
- `supabase_schema.sql` — reference schema and access policies for a fresh Supabase installation, including the owner-only first-admin bootstrap.
- `supabase_admin_bootstrap.sql` — standalone, repeatable definition of the protected first-admin bootstrap for an existing project.
- `supabase_seed.sql` — bilingual exam catalogue and starter tests/questions.
- `BACKEND_SETUP.md` — authentication, administrator setup, Vercel deployment and environment-variable steps.
- `api/extract-questions.js` — Vercel Node.js function for staff-authorized question extraction.
- `vercel.json` — production build, output directory, response headers and function duration.
- `.env.example` — names of server-side environment variables; contains no real secrets.

## Connected backend

The configured Supabase project is `gyan-manch` (region ap-south-1). The site uses Supabase email/password authentication and a public publishable key. No service-role key belongs in this repository or browser code.

The database currently contains 9 exam categories, 62 exam definitions, 27 bilingual starter questions, 30 test records and 255 test-question links. Some tests are labelled starter sets and reuse the small starter question bank; they are not yet 30 complete official-length papers. Review and expand question content before selling or advertising them as full-length official-pattern mocks.

## Before opening the site to students

1. Import `abhiranaktm350-creator/Gyanmamch` into Vercel with the production branch `main`. The repository includes `vercel.json`; use framework preset **Other** if asked and keep the build command `npm run build` and output directory `dist`.
2. In Vercel Project Settings → Environment Variables, set `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` to the existing Supabase project values. These are server-side function settings; never add a service-role/secret key.
3. To enable AI-powered question extraction, set `AI_API_KEY`. The default provider is OpenAI-compatible Chat Completions. Optional `AI_API_URL` and `AI_MODEL` let you use a compatible provider/model. Do not add any of these secrets to GitHub.
4. Deploy a preview first. Verify `/api/extract-questions` returns 405 to GET and 401 to POST without a bearer token; then test with an approved staff account and a valid AI provider key.
5. Set the final HTTPS Vercel URL in Supabase Authentication → URL Configuration (Site URL and Redirect URLs). Register the owner's account, verify email if required, and promote the first administrator using `BACKEND_SETUP.md`.
6. Test owner login, student registration/approval, mock attempt submission/scoring, result review, and private PDF upload with separate test accounts before production.
7. The current catalogue has 30 test records but only 27 starter questions; some tests reuse those questions. They are not 30 complete unique official-length papers. Expand and verify question content before advertising full-length mocks or verified PYQs.

A connected database and a passing build do not prove that the deployed website is production-ready.
