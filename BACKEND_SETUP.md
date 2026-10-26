# Gyan Manch — backend and deployment setup

## Connected Supabase project

- Project: `gyan-manch`
- Project reference: `zpjpoolfkjdlqxioabnf`
- Region: `ap-south-1` (India)
- Website uses the Supabase **publishable** key in the browser. Never commit a service-role/secret key.

The database has 9 categories, 62 exams, 27 bilingual starter questions, 30 tests and 255 test-question links. Several starter sets reuse the small question bank and need expansion before they can be called complete official-length mocks.

## Authentication: make the first administrator

Email/password authentication is configured in the website. There is not yet an owner/admin account in the database. Do this once:

1. Deploy the site on Cloudflare Pages and copy the final HTTPS URL.
2. In Supabase Dashboard → Authentication → URL Configuration, set **Site URL** to that URL and add it under **Redirect URLs**.
3. In Authentication → Sign In / Providers, ensure Email is enabled. If email confirmation is enabled, verify the registration email.
4. Open the deployed website → Student Registration. Register with the owner's own email address and a strong password, then verify the email if requested.
5. In Supabase → SQL Editor, run the query below after replacing `OWNER_EMAIL` with the exact registered email:

```sql
update public.profiles
set role = 'admin', approval_status = 'approved'
where id = (
  select id from auth.users
  where lower(email) = lower('OWNER_EMAIL')
);
```

Confirm exactly one profile row was updated. Then use **Administrator Login** with that same email/password. Do not share the password or any secret key.

New public signups always receive the student role and pending approval. Never grant admin role from browser-side form data.

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
