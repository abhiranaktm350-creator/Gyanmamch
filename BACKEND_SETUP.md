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

## Cloudflare Pages deployment

Cloudflare hosts the website; Supabase handles sign-in and database/storage. You need Cloudflare only if you want Cloudflare to publish the site.

1. Open Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git.
2. Select GitHub repository `abhiranaktm350-creator/Gyanmamch`.
3. Choose branch `main` after the reviewed changes have been merged there.
4. This is a static HTML site: set the build command to `npm run build` and the build output directory to `dist`. The build only copies `index.html` and `_headers`, so SQL and setup files are not published. No framework is required.
5. In Cloudflare Pages → Settings → Variables and Secrets, add `SUPABASE_PUBLISHABLE_KEY` with the project's publishable key. This is a public client key, not a service-role secret. The `wrangler.jsonc` file declares the Workers AI binding used by the private extraction endpoint; confirm the deployment reports the binding as available.
6. Deploy and copy the generated `https://….pages.dev` URL.
7. Add that URL to Supabase Authentication → URL Configuration, then redeploy if needed.
8. Every new commit merged/pushed to the connected branch should trigger a new Pages deployment. Check the deployment status in Cloudflare before sharing the URL.

If the repository is already connected to Cloudflare Pages, do not create a second project; open the existing Pages project and confirm its connected repository and production branch.

## PDF / question paper workflow

Approved staff can upload PDFs/scans to the private `question-pdfs` storage bucket. The current website includes browser-side PDF text extraction/OCR and a manual review/publish workflow. Background model-based extraction is **not yet verified as deployed**; it needs a secured server endpoint and a successful Cloudflare deployment before being described as live.

## Database status and limitations

- RLS is enabled on the application tables.
- Answer keys are separated from student-readable question rows.
- Submission scoring is performed by a database RPC.
- PDF storage is private and restricted to approved staff.
- Current question-bank size is only 27 bilingual starter questions; the current tests are a catalogue/starter set, not 30 full-length unique papers.
- The live URL, first administrator login, student approval and a complete test submission still need end-to-end verification.

For a fresh project only, run `supabase_schema.sql` and then `supabase_seed.sql`. Do not rerun the full schema on the existing connected project; its migrations are already applied.
