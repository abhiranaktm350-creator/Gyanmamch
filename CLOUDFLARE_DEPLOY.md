# Cloudflare Pages deployment — Gyan Manch

This repository is a static HTML application. Cloudflare Pages serves the website; Supabase handles accounts, database access, private PDF storage and test scoring.

## Before production

- Use the `work/gyan-manch-light-theme` branch for review; merge the approved changes into `main` before using `main` as the production branch.
- The site contains only the Supabase project URL and a publishable browser key. Never add a Supabase service-role key, private model key, or other secret to `index.html`.
- In Supabase → Authentication → URL Configuration, set Site URL to the final `https://…pages.dev` domain and add it to Redirect URLs.
- In Supabase → Authentication → Sign In / Providers, enable Email. Confirm whether email verification is required for registration.
- Create the owner's account using the public registration form, then promote that account to the first administrator with the one-time SQL in `BACKEND_SETUP.md`. Do not add an administrator password to source code.
- The database currently contains 9 categories, 62 exams, 27 bilingual starter questions and 30 starter tests. The starter tests are not full-length unique papers yet.

## Create or connect the Pages project

1. In Cloudflare Dashboard, open **Workers & Pages → Create → Pages → Connect to Git**.
2. Select `abhiranaktm350-creator/Gyanmamch`.
3. Production branch: `main` (after changes are merged).
4. Framework preset: **None**. Build command: leave empty. Build output directory: `/` or `.` depending on the Pages form validation. There is no package build step.
5. Save and deploy. Wait for the deployment status to show **Success**, then open the generated `pages.dev` URL.
6. Test registration, email verification, login, admin approval, mock submission and result review before sharing the site.
7. If a Pages project is already connected to this repository, edit that project instead of creating a duplicate.

## Important limitations

- The application currently has browser-side PDF text extraction/OCR and a staff review/publish flow. A secured server-side model extraction endpoint is not deployed or verified yet.
- Cloudflare Pages does not automatically deploy a non-production branch to the production URL. Merge reviewed changes into `main` or configure a preview deployment for the working branch.
- Never treat starter data as verified official previous-year papers without checking the source and answer key.
