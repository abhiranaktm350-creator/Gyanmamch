# Gyan Manch (ज्ञान मंच)

Mobile-first competitive-exam practice platform for Hindi and English learners.

## Current project structure

- `index.html` — existing website, question bank, mock/PYQ workflows, exam timer, marking rules, administrator screens, PDF text extraction and OCR.
- `supabase_schema.sql` — PostgreSQL tables, access policies and scoring procedure intended for the online backend.
- `BACKEND_SETUP.md` — setup and deployment notes.

## Important deployment status

The current browser application still has a local-browser storage path. Committing the database schema does not by itself connect login, approval, tests, attempts, or uploaded PDFs to the online database. Treat the site as **not production-ready for real student accounts** until the backend setup and end-to-end checks below are complete.

## Production checklist

1. Create/open the intended Supabase project.
2. Review and run `supabase_schema.sql` in the SQL Editor; resolve any SQL errors before using the site.
3. Configure authentication URLs and sign-in methods.
4. Register the owner account and promote its verified user ID to administrator using the instructions in `BACKEND_SETUP.md`.
5. Connect the website's sign-in, student approval, test catalog, attempts, PDF storage and publish/review flows to Supabase with Row-Level Security enabled.
6. Verify that a pending student cannot open tests, a student cannot access answer keys before submission, and a student cannot grant themselves administrator privileges.
7. Test a complete mock and PYQ attempt on mobile, including timer expiry, negative marking, reload/re-login, and result history.
8. Deploy the updated site and verify the deployed URL on Android and desktop.

## Security

- Never commit a Supabase service-role key, password, or other private secret.
- Only a public client key may be used in browser code, and only with correct database access policies.
- Do not use sample accounts or browser-local records for real student data.
- Keep a backup of the current working version before major changes.
