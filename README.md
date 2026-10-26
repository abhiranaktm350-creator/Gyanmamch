# Gyan Manch (ज्ञान मंच)

Mobile-first bilingual (Hindi/English) competitive-exam practice website with a white-and-blue interface.

## Files

- `index.html` — responsive website, student and administrator login screens, exam catalogue, timed tests, results, question-bank tools, PDF/text extraction and review screens.
- `supabase_schema.sql` — reference schema and access policies for a fresh Supabase installation.
- `supabase_seed.sql` — bilingual exam catalogue and starter tests/questions.
- `BACKEND_SETUP.md` — authentication, administrator setup and Cloudflare Pages deployment steps.

## Connected backend

The configured Supabase project is `gyan-manch` (region ap-south-1). The site uses Supabase email/password authentication and a public publishable key. No service-role key belongs in this repository or browser code.

The database currently contains 9 exam categories, 62 exam definitions, 27 bilingual starter questions, 30 test records and 255 test-question links. Some tests are labelled starter sets and reuse the small starter question bank; they are not yet 30 complete official-length papers. Review and expand question content before selling or advertising them as full-length official-pattern mocks.

## Before opening the site to students

1. Deploy the repository using the Cloudflare Pages steps in `BACKEND_SETUP.md`.
2. Set the final Pages URL in Supabase Authentication → URL Configuration.
3. Register the owner account using the website's student registration form and verify the email if confirmation is enabled.
4. Promote that account to administrator using the one-time SQL in `BACKEND_SETUP.md`.
5. Test owner login, student registration, pending approval, admin approval, test attempt, submission, result review and private PDF upload with separate test accounts.
6. Confirm the Cloudflare Pages deployment is successful and the site is using the intended branch.

A connected database is not by itself proof that the live website is production-ready. Do not advertise it as fully complete until these end-to-end checks pass.
