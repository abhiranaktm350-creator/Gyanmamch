# Gyan Manch backend setup (Supabase)

This repository's current front end is a large single-page HTML application. It contains localStorage-based demo/persistence paths. Adding this SQL file **does not automatically connect every screen to the backend**; frontend integration and live testing are still required.

## 1. Create / open Supabase project
1. Open https://supabase.com/dashboard and select the project intended for Gyan Manch.
2. Open **SQL Editor → New query**.
3. Paste all of `supabase_schema.sql`, run it, and check for errors.
4. In **Authentication → URL Configuration**, set the production site URL and allowed redirect URLs for your actual deployed domain.
5. Enable only the sign-in methods you intend to support (email/password and/or Google OAuth). Google OAuth also requires credentials configured in Google Cloud.

## 2. Promote the first teacher/admin securely
New signups are always created with role `student` and approval `pending`. This is intentional: public users must not be able to grant themselves staff privileges.
After you have registered your own account and confirmed its UUID in **Authentication → Users**, run this query in the SQL Editor, replacing the UUID with your own verified auth user ID:
```sql
update public.profiles
set role = 'admin', approval_status = 'approved'
where id = 'REPLACE_WITH_YOUR_AUTH_USER_UUID';
```
Do not expose the Supabase service-role key in the browser or commit it to GitHub.

## 3. Core tables
- `profiles`: student/staff role and approval status
- `exam_categories`, `exams`: exam catalog and exam-specific timing/marking defaults
- `tests`, `questions`, `test_questions`: mock tests, PYQs, question bank and ordering
- `attempts`, `attempt_answers`: attempt history, server-graded score, accuracy and timing
- `pdf_import_jobs`: teacher PDF import/review workflow metadata
- `announcements`: teacher-managed notices

## 4. Server-side scoring
The `submit_and_score_attempt` RPC checks that an attempt belongs to the logged-in student, accepts only questions assigned to that test, and calculates marks server-side. Do not trust client-calculated scores.

## 5. PDF/OCR workflow
The schema stores import-job metadata only. A production PDF flow still needs a private Storage bucket named `question-pdfs`, upload policies, extraction/OCR, a teacher review UI, and a publish action. OCR results must remain drafts until a teacher approves them.

## 6. Before production
- Connect frontend auth, exam/test/question queries, attempt saving and results to Supabase; remove localStorage as the source of truth for shared accounts.
- Add and test private Storage policies and any Edge Functions needed for trusted operations.
- Test student approval, role boundaries, RLS, scoring, timeout/autosubmit, mobile layouts, and deployment.
- Set production URL/redirects and never commit service-role secrets.
