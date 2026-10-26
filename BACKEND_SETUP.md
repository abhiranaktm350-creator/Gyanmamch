# Gyan Manch — Supabase backend

The live Supabase project provisioned for this repository is **gyan-manch** (project reference: zpjpoolfkjdlqxioabnf) in ap-south-1, India. The website's public client configuration points to this project. The publishable key is intentionally public; never add a service-role/secret key to browser code or GitHub.

## Current backend contents

- 9 exam categories and 62 exam definitions.
- 27 bilingual starter questions, with answer keys and explanations kept in a separate staff-only table.
- 30 published test records and 255 question-to-test links. Eighteen are explicitly labelled starter mock sets; they reuse the current starter bank and must be expanded/reviewed before being presented as full-length official-pattern papers.
- Auth-created profiles default to role student and status pending.
- RLS policies protect profiles, question bank, answer keys, attempts, PDF job metadata, and private Storage.
- Attempts are graded by submit_and_score_attempt; the answer review RPC releases answer keys only after the attempt is submitted and authorized.
- The frontend now uses Supabase email/password authentication, approval checks, shared test catalogue hydration, attempt saving/history, and private PDF upload plus reviewed-batch publishing.

## Fresh-project setup

For a new empty Supabase project only:

1. Run supabase_schema.sql in Supabase SQL Editor.
2. Run supabase_seed.sql to add the catalogue and starter tests.
3. In Authentication → URL Configuration, set the real website URL and allowed redirects.
4. Keep email/password enabled. New registrations may need email confirmation depending on Auth settings.

Do not rerun the full schema file against the already-provisioned gyan-manch project; its migrations are already applied. The repository schema file is a reproducible reference for fresh installations.

## Create the first administrator

No public signup is allowed to grant itself administrator privileges. First, register your owner account from the website using your own email address and verify it if email confirmation is enabled. Then run this one-time SQL in the project's SQL Editor, replacing OWNER_EMAIL with that same email:

    update public.profiles
    set role = 'admin', approval_status = 'approved'
    where id = (
      select id from auth.users where lower(email) = lower('OWNER_EMAIL')
    );

Confirm exactly one row was updated. Then sign in through Administrator Email using the same email and password. Never share your password or any secret key in chat.

## PDF / question paper workflow

Approved staff can upload a PDF or scan to the private question-pdfs bucket. The browser's PDF/OCR tools stage questions for manual review. The Approve All & Create Official Mock Test action saves reviewed questions, protected answer keys, test mappings, and import-job status to Supabase. A test should not be published until its answer keys, bilingual options, duration, and negative marking have been checked.

## Important content limitation

The database currently has 27 bilingual starter questions, not hundreds of unique questions per exam. The 30 test records are a usable starting catalogue, not 30 fully populated official-length papers. Expand and review the question bank before selling or advertising the sets as complete exam-length mocks. PYQ status must only be assigned to verified previous-year questions.

## Security notes

- RLS is enabled on exposed application tables.
- Student roles and approval status are set server-side at signup.
- Answer keys are stored separately and are not selectable by students before submission.
- Scores are calculated server-side; client-side score values are not authoritative.
- The Storage bucket is private and restricted to approved staff.
- Do not expose service_role or other secret keys in HTML, JavaScript, public issues, or chat.
