# Gyan Manch — backend and deployment setup

## Connected Supabase project

- Project: `gyan-manch`
- Project reference: `zpjpoolfkjdlqxioabnf`
- Region: `ap-south-1` (India)
- Website uses the Supabase **publishable** key in the browser. Never commit a service-role/secret key.

The database has 9 categories, 62 exams, 27 bilingual starter questions, 30 tests and 255 test-question links. Several starter sets reuse the small question bank and need expansion before they can be called complete official-length mocks.

## Authentication: make the first administrator

The owner-only function `public.claim_initial_admin(uuid)` is included in `supabase_schema.sql` and the standalone `supabase_admin_bootstrap.sql` recovery script. It has been applied to the currently connected Supabase project. It is revoked from browser/API roles; run it only from Supabase SQL Editor.

1. Deploy the site and set its final HTTPS URL in Supabase Authentication → URL Configuration (Site URL and Redirect URLs).
2. In Authentication → Sign In / Providers, ensure Email is enabled.
3. Register using the owner's own email address and a strong password, then verify the email if confirmation is enabled.
4. In Supabase → SQL Editor, replace `OWNER_EMAIL` and run:

```sql
select public.claim_initial_admin(id)
from auth.users
where lower(email) = lower('OWNER_EMAIL');
```

5. Confirm one row is returned. If no row is returned, register and verify that email first. Then sign in using **Administrator Login**.

New public signups receive the student role and pending approval. The browser cannot call the initial-admin bootstrap function or grant itself an administrator role.

## Vercel deployment (Cloudflare not required)

The repository is configured for Vercel:
- Build command: `npm run build`
- Output directory: `dist`
- Serverless endpoint: `api/extract-questions.js` → `/api/extract-questions`
- The static output contains the website, headers file and web-app manifest only. The Supabase SQL files and `.env.example` are not copied into `dist`.

### Deploy from Android

1. Open [Vercel](https://vercel.com/) and sign in with GitHub.
2. Choose **Add New → Project**, import `abhiranaktm350-creator/Gyanmamch`, and select `main`.
3. Use framework preset **Other** if requested. Confirm `npm run build` and `dist`; `vercel.json` also defines these settings.
4. Under Project Settings → Environment Variables, add:
   - `SUPABASE_URL` — existing project URL.
   - `SUPABASE_PUBLISHABLE_KEY` — existing publishable key (not a service-role key).
   - `AI_API_KEY` — required only for AI question extraction; add the provider key privately in Vercel, never GitHub.
   - Optional `AI_API_URL` and `AI_MODEL` if using a different OpenAI-compatible provider.
5. Deploy a preview and test it before promoting to production. The API verifies the Supabase bearer token and requires an approved `admin` or `teacher` profile before it sends document text to the configured AI provider.
6. In Supabase Authentication → URL Configuration, set the final Vercel HTTPS URL as Site URL and add it to Redirect URLs.
7. Test student sign-up, pending approval, admin login, mock scoring/results, and staff-only PDF extraction end-to-end.

The AI extraction API returns a clear `503` if its private AI key is not configured. This prevents silently pretending the feature is working when the provider is unavailable. A successful GitHub build alone does not prove the Vercel deployment or authentication is live.

## PDF / question paper workflow

Approved staff can upload PDFs/scans to the private `question-pdfs` storage bucket. The current website includes browser-side PDF text extraction/OCR and a manual review/publish workflow. Background model-based extraction is implemented as a Vercel Node.js function in `api/extract-questions.js`. It requires a configured `AI_API_KEY` and a deployed Vercel project; do not describe it as live until tested with an approved staff session and a working provider key.

## Database status and limitations

- RLS is enabled on the application tables.
- Answer keys are separated from student-readable question rows.
- Submission scoring is performed by a database RPC.
- PDF storage is private and restricted to approved staff.
- Current question-bank size is only 27 bilingual starter questions; the current tests are a catalogue/starter set, not 30 full-length unique papers.
- The live URL, first administrator login, student approval and a complete test submission still need end-to-end verification.

For a fresh project only, run `supabase_schema.sql` and then `supabase_seed.sql`. Do not rerun the full schema on the existing connected project; its migrations are already applied.
