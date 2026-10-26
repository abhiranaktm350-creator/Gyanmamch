# Gyan Manch (ज्ञान मंच)

Mobile-first bilingual (Hindi/English) competitive-exam practice website with a white-and-blue interface.

## Files

- `index.html` — responsive website, student and administrator login screens, exam catalogue, timed tests, results, question-bank tools, PDF/text extraction and review screens.
- `supabase_schema.sql` — reference schema and access policies for a fresh Supabase installation, including the owner-only first-admin bootstrap.
- `supabase_admin_bootstrap.sql` — standalone, repeatable definition of the protected first-admin bootstrap for an existing project.
- `supabase_seed.sql` — bilingual exam catalogue and starter tests/questions.
- `BACKEND_SETUP.md` — authentication, administrator setup and Cloudflare Pages deployment steps.

## Connected backend

The configured Supabase project is `gyan-manch` (region ap-south-1). The site uses Supabase email/password authentication and a public publishable key. No service-role key belongs in this repository or browser code.

The database currently contains 9 exam categories, 62 exam definitions, 27 bilingual starter questions, 30 test records and 255 test-question links. Some tests are labelled starter sets and reuse the small starter question bank; they are not yet 30 complete official-length papers. Review and expand question content before selling or advertising them as full-length official-pattern mocks.

## Before opening the site to students

1. Cloudflare deployment is currently disabled. Select a replacement host before deploying; the static build output is `dist`.
2. Port `functions/api/extract-questions.js` to the selected host or Supabase Edge Functions. It currently depends on Cloudflare Workers AI and will not work unchanged elsewhere.
3. Set the final HTTPS site URL in Supabase Authentication → URL Configuration.
4. Register the owner's account, verify the email if required, and promote the first administrator using the protected SQL instructions in `BACKEND_SETUP.md`.
5. Test owner login, student registration/approval, mock attempt submission/scoring, result review, and private PDF upload with separate test accounts.
6. The current catalogue has 30 test records but only 27 starter questions; some tests reuse those questions. They are not 30 complete unique official-length papers. Expand and verify question content before advertising full-length mocks or verified PYQs.

A connected database and a passing build do not prove that the deployed website is production-ready.
