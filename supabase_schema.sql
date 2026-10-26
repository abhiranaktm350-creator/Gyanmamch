-- Gyan Manch production backend schema (Supabase PostgreSQL)
-- Run in Supabase SQL Editor after creating a project.
-- Security model: profiles.role defaults to student. Never let clients set their own role.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '',
  phone text,
  preferred_language text not null default 'hi' check (preferred_language in ('hi','en','both')),
  role text not null default 'student' check (role in ('student','teacher','admin')),
  approval_status text not null default 'pending' check (approval_status in ('pending','approved','rejected','suspended')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.exam_categories (
  id uuid primary key default gen_random_uuid(),
  name_en text not null,
  name_hi text not null default '',
  slug text not null unique,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.exams (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.exam_categories(id) on delete set null,
  name_en text not null,
  name_hi text not null default '',
  code text unique,
  description_en text not null default '',
  description_hi text not null default '',
  duration_minutes int not null default 60 check (duration_minutes between 1 and 600),
  total_questions int not null default 0 check (total_questions >= 0),
  default_positive_marks numeric(6,2) not null default 1,
  default_negative_marks numeric(6,2) not null default 0,
  is_active boolean not null default true,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tests (
  id uuid primary key default gen_random_uuid(),
  exam_id uuid references public.exams(id) on delete set null,
  title_en text not null,
  title_hi text not null default '',
  description text not null default '',
  test_type text not null default 'mock' check (test_type in ('mock','pyq','practice','sectional')),
  year int,
  duration_minutes int not null default 60 check (duration_minutes between 1 and 600),
  positive_marks numeric(6,2) not null default 1,
  negative_marks numeric(6,2) not null default 0,
  status text not null default 'draft' check (status in ('draft','review','published','archived')),
  instructions jsonb not null default '{}'::jsonb,
  created_by uuid references public.profiles(id) on delete set null,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  exam_id uuid references public.exams(id) on delete set null,
  question_en text not null default '',
  question_hi text not null default '',
  options jsonb not null default '{"en":["","","",""],"hi":["","","",""]}'::jsonb,
  correct_option int not null check (correct_option between 0 and 5),
  explanation_en text not null default '',
  explanation_hi text not null default '',
  subject text not null default '',
  topic text not null default '',
  difficulty text not null default 'medium' check (difficulty in ('easy','medium','hard')),
  source_type text not null default 'mock' check (source_type in ('pyq','mock','practice')),
  source_year int,
  status text not null default 'draft' check (status in ('draft','review','published','archived')),
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.test_questions (
  test_id uuid not null references public.tests(id) on delete cascade,
  question_id uuid not null references public.questions(id) on delete restrict,
  section_name text not null default '',
  question_order int not null default 0,
  positive_marks numeric(6,2),
  negative_marks numeric(6,2),
  primary key (test_id, question_id),
  unique (test_id, question_order)
);

create table if not exists public.attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  test_id uuid not null references public.tests(id) on delete restrict,
  status text not null default 'in_progress' check (status in ('in_progress','submitted','auto_submitted','abandoned')),
  started_at timestamptz not null default now(),
  submitted_at timestamptz,
  time_taken_seconds int not null default 0 check (time_taken_seconds >= 0),
  total_questions int not null default 0,
  attempted_count int not null default 0,
  correct_count int not null default 0,
  incorrect_count int not null default 0,
  unattempted_count int not null default 0,
  score numeric(10,2) not null default 0,
  max_score numeric(10,2) not null default 0,
  accuracy numeric(6,2) not null default 0,
  unique (id, user_id)
);

create table if not exists public.attempt_answers (
  attempt_id uuid not null references public.attempts(id) on delete cascade,
  question_id uuid not null references public.questions(id) on delete restrict,
  selected_option int check (selected_option between 0 and 5),
  marked_for_review boolean not null default false,
  is_correct boolean,
  marks_awarded numeric(10,2),
  answered_at timestamptz not null default now(),
  primary key (attempt_id, question_id)
);

create table if not exists public.pdf_import_jobs (
  id uuid primary key default gen_random_uuid(),
  uploaded_by uuid not null references auth.users(id) on delete cascade,
  file_path text not null,
  original_filename text not null,
  status text not null default 'uploaded' check (status in ('uploaded','extracting','needs_review','approved','published','failed')),
  extracted_payload jsonb not null default '[]'::jsonb,
  error_message text not null default '',
  target_exam_id uuid references public.exams(id) on delete set null,
  target_test_id uuid references public.tests(id) on delete set null,
  reviewed_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title_en text not null,
  title_hi text not null default '',
  body_en text not null default '',
  body_hi text not null default '',
  is_active boolean not null default true,
  starts_at timestamptz,
  ends_at timestamptz,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists exams_category_active_idx on public.exams(category_id, is_active);
create index if not exists tests_exam_status_idx on public.tests(exam_id, status, test_type);
create index if not exists questions_exam_status_idx on public.questions(exam_id, status);
create index if not exists attempts_user_started_idx on public.attempts(user_id, started_at desc);
create index if not exists pdf_jobs_owner_idx on public.pdf_import_jobs(uploaded_by, created_at desc);

create or replace function public.is_staff()
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('teacher','admin') and p.approval_status = 'approved'); $$;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin' and p.approval_status = 'approved'); $$;

-- Create a profile for every newly registered auth user. Role/approval cannot be supplied by signup metadata.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles(id, display_name, phone, preferred_language, role, approval_status)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', ''),
    nullif(new.raw_user_meta_data->>'phone',''),
    case when new.raw_user_meta_data->>'preferred_language' in ('hi','en','both') then new.raw_user_meta_data->>'preferred_language' else 'hi' end,
    'student',
    'pending'
  ) on conflict (id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created_gm on auth.users;
create trigger on_auth_user_created_gm after insert on auth.users
for each row execute procedure public.handle_new_user();

-- Keep updated_at current on mutable content tables.
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$ begin new.updated_at = now(); return new; end; $$;
do $$
declare t text;
begin
  foreach t in array array['profiles','exams','tests','questions','pdf_import_jobs'] loop
    execute format('drop trigger if exists set_updated_at on public.%I', t);
    execute format('create trigger set_updated_at before update on public.%I for each row execute function public.set_updated_at()', t);
  end loop;
end $$;

alter table public.profiles enable row level security;
alter table public.exam_categories enable row level security;
alter table public.exams enable row level security;
alter table public.tests enable row level security;
alter table public.questions enable row level security;
alter table public.test_questions enable row level security;
alter table public.attempts enable row level security;
alter table public.attempt_answers enable row level security;
alter table public.pdf_import_jobs enable row level security;
alter table public.announcements enable row level security;

drop policy if exists "profiles read own or staff" on public.profiles;
create policy "profiles read own or staff" on public.profiles for select to authenticated using (id = auth.uid() or public.is_staff());
drop policy if exists "profiles update own safe fields" on public.profiles;
create policy "profiles update own safe fields" on public.profiles for update to authenticated using (id = auth.uid() or public.is_admin()) with check ((id = auth.uid() and role = 'student' and approval_status in ('pending','rejected')) or public.is_admin());
drop policy if exists "staff manage profiles" on public.profiles;
create policy "staff manage profiles" on public.profiles for all to authenticated using (public.is_staff()) with check (public.is_staff());

drop policy if exists "active categories visible" on public.exam_categories;
create policy "active categories visible" on public.exam_categories for select to anon, authenticated using (is_active or public.is_staff());
drop policy if exists "staff manage categories" on public.exam_categories;
create policy "staff manage categories" on public.exam_categories for all to authenticated using (public.is_staff()) with check (public.is_staff());

drop policy if exists "active exams visible" on public.exams;
create policy "active exams visible" on public.exams for select to anon, authenticated using (is_active or public.is_staff());
drop policy if exists "staff manage exams" on public.exams;
create policy "staff manage exams" on public.exams for all to authenticated using (public.is_staff()) with check (public.is_staff());

drop policy if exists "published tests visible" on public.tests;
create policy "published tests visible" on public.tests for select to anon, authenticated using (status = 'published' or public.is_staff());
drop policy if exists "staff manage tests" on public.tests;
create policy "staff manage tests" on public.tests for all to authenticated using (public.is_staff()) with check (public.is_staff());

drop policy if exists "published questions visible" on public.questions;
create policy "published questions visible" on public.questions for select to authenticated using (status = 'published' or public.is_staff());
drop policy if exists "staff manage questions" on public.questions;
create policy "staff manage questions" on public.questions for all to authenticated using (public.is_staff()) with check (public.is_staff());

drop policy if exists "published test question mapping visible" on public.test_questions;
create policy "published test question mapping visible" on public.test_questions for select to authenticated using (exists (select 1 from public.tests t where t.id = test_id and (t.status = 'published' or public.is_staff())));
drop policy if exists "staff manage test question mapping" on public.test_questions;
create policy "staff manage test question mapping" on public.test_questions for all to authenticated using (public.is_staff()) with check (public.is_staff());

drop policy if exists "students read own attempts" on public.attempts;
create policy "students read own attempts" on public.attempts for select to authenticated using (user_id = auth.uid() or public.is_staff());
drop policy if exists "students create own attempts" on public.attempts;
create policy "students create own attempts" on public.attempts for insert to authenticated with check (user_id = auth.uid() and status = 'in_progress');
drop policy if exists "students update own in progress attempts" on public.attempts;
create policy "students update own in progress attempts" on public.attempts for update to authenticated using (user_id = auth.uid() and status = 'in_progress') with check (user_id = auth.uid() and status = 'in_progress');
drop policy if exists "staff manage attempts" on public.attempts;
create policy "staff manage attempts" on public.attempts for all to authenticated using (public.is_staff()) with check (public.is_staff());

drop policy if exists "students read own answers" on public.attempt_answers;
create policy "students read own answers" on public.attempt_answers for select to authenticated using (exists (select 1 from public.attempts a where a.id = attempt_id and (a.user_id = auth.uid() or public.is_staff())));
drop policy if exists "students save own in progress answers" on public.attempt_answers;
create policy "students save own in progress answers" on public.attempt_answers for insert to authenticated with check (exists (select 1 from public.attempts a where a.id = attempt_id and a.user_id = auth.uid() and a.status = 'in_progress'));
drop policy if exists "students update own in progress answers" on public.attempt_answers;
create policy "students update own in progress answers" on public.attempt_answers for update to authenticated using (exists (select 1 from public.attempts a where a.id = attempt_id and a.user_id = auth.uid() and a.status = 'in_progress')) with check (exists (select 1 from public.attempts a where a.id = attempt_id and a.user_id = auth.uid() and a.status = 'in_progress'));
drop policy if exists "staff manage answers" on public.attempt_answers;
create policy "staff manage answers" on public.attempt_answers for all to authenticated using (public.is_staff()) with check (public.is_staff());

drop policy if exists "owners read import jobs" on public.pdf_import_jobs;
create policy "owners read import jobs" on public.pdf_import_jobs for select to authenticated using (uploaded_by = auth.uid() or public.is_staff());
drop policy if exists "approved students cannot upload pdf jobs" on public.pdf_import_jobs;
create policy "approved staff create import jobs" on public.pdf_import_jobs for insert to authenticated with check (uploaded_by = auth.uid() and public.is_staff());
drop policy if exists "staff update import jobs" on public.pdf_import_jobs;
create policy "staff update import jobs" on public.pdf_import_jobs for update to authenticated using (public.is_staff()) with check (public.is_staff());

drop policy if exists "active announcements visible" on public.announcements;
create policy "active announcements visible" on public.announcements for select to anon, authenticated using (is_active and (starts_at is null or starts_at <= now()) and (ends_at is null or ends_at >= now()) or public.is_staff());
drop policy if exists "staff manage announcements" on public.announcements;
create policy "staff manage announcements" on public.announcements for all to authenticated using (public.is_staff()) with check (public.is_staff());

-- A student can never grade their own attempt. This RPC validates answers and calculates score on the server.
create or replace function public.submit_and_score_attempt(
  p_attempt_id uuid,
  p_answers jsonb,
  p_time_taken_seconds integer default 0,
  p_auto_submit boolean default false
)
returns public.attempts
language plpgsql
security definer
set search_path = public
as $$
declare
  v_attempt public.attempts;
  v_total integer;
  v_attempted integer;
  v_correct integer;
  v_incorrect integer;
  v_unattempted integer;
  v_score numeric(10,2);
  v_max numeric(10,2);
  v_accuracy numeric(6,2);
begin
  select * into v_attempt from public.attempts where id = p_attempt_id and user_id = auth.uid() for update;
  if not found then raise exception 'Attempt not found or access denied'; end if;
  if v_attempt.status <> 'in_progress' then raise exception 'Attempt already submitted'; end if;
  if jsonb_typeof(coalesce(p_answers, '[]'::jsonb)) <> 'array' then raise exception 'Answers must be a JSON array'; end if;

  -- Only questions belonging to this test are accepted.
  delete from public.attempt_answers where attempt_id = p_attempt_id;
  insert into public.attempt_answers(attempt_id, question_id, selected_option, marked_for_review)
  select p_attempt_id, x.question_id, x.selected_option, coalesce(x.marked_for_review,false)
  from jsonb_to_recordset(coalesce(p_answers,'[]'::jsonb)) as x(question_id uuid, selected_option integer, marked_for_review boolean)
  join public.test_questions tq on tq.test_id = v_attempt.test_id and tq.question_id = x.question_id
  where x.selected_option between 0 and 5;

  update public.attempt_answers aa
  set is_correct = (aa.selected_option = q.correct_option),
      marks_awarded = case
        when aa.selected_option = q.correct_option then coalesce(tq.positive_marks,t.positive_marks)
        else -coalesce(tq.negative_marks,t.negative_marks)
      end
  from public.questions q, public.test_questions tq, public.tests t
  where aa.attempt_id = p_attempt_id and aa.question_id = q.id
    and tq.test_id = v_attempt.test_id and tq.question_id = q.id
    and t.id = v_attempt.test_id;

  select count(*) into v_total from public.test_questions where test_id = v_attempt.test_id;
  select count(*) into v_attempted from public.attempt_answers where attempt_id = p_attempt_id and selected_option is not null;
  select count(*) into v_correct from public.attempt_answers where attempt_id = p_attempt_id and selected_option is not null and is_correct;
  v_incorrect := greatest(v_attempted - v_correct,0);
  v_unattempted := greatest(v_total - v_attempted,0);
  select coalesce(sum(aa.marks_awarded),0) into v_score from public.attempt_answers aa where aa.attempt_id = p_attempt_id;
  select coalesce(sum(coalesce(tq.positive_marks,t.positive_marks)),0) into v_max
    from public.test_questions tq join public.tests t on t.id = tq.test_id where tq.test_id = v_attempt.test_id;

  update public.attempts set
    status = case when p_auto_submit then 'auto_submitted' else 'submitted' end,
    submitted_at = now(),
    time_taken_seconds = greatest(0, least(coalesce(p_time_taken_seconds,0), (select duration_minutes*60 from public.tests where id=v_attempt.test_id))),
    total_questions = v_total, attempted_count = v_attempted, correct_count = v_correct,
    incorrect_count = v_incorrect, unattempted_count = v_unattempted, score = v_score,
    max_score = v_max, accuracy = case when v_attempted=0 then 0 else round((v_correct::numeric/v_attempted)*100,2) end
  where id = p_attempt_id returning * into v_attempt;
  return v_attempt;
end; $$;

revoke all on function public.submit_and_score_attempt(uuid,jsonb,integer,boolean) from public;
grant execute on function public.submit_and_score_attempt(uuid,jsonb,integer,boolean) to authenticated;

-- Storage bucket for teacher PDF uploads. Create the bucket in Storage UI as private, named "question-pdfs".
-- Storage policies should restrict uploads/reads to approved staff; do not make the bucket public.
