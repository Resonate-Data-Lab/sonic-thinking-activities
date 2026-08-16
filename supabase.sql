-- ============================================================================
--  SONIC ACTIVITIES — SUPABASE SETUP
--
--  Everything the site needs, in one file. Running this once creates both
--  tables, locks down who can do what, and the site works.
--
--  HOW TO RUN IT
--    1. Go to supabase.com and make a new project (the free tier is plenty).
--    2. In the left sidebar open  SQL Editor  →  New query.
--    3. Paste this entire file in and press Run.
--    4. Go to  Project Settings → API  and copy two values:
--          Project URL        e.g. https://abcdefgh.supabase.co
--          anon public key    a long string starting with "eyJ..."
--    5. Paste both into the SUPABASE block at the top of app.js.
--
--  Safe to run more than once — it will not duplicate or wipe anything.
--
--  NO ACCOUNTS. This is deliberate.
--    Nobody signs up, nobody logs in. You open the site and use it. Posting a
--    response asks for your words and, if you feel like it, a name — that's the
--    whole interaction. Everything below is written for exactly one kind of
--    visitor, the anonymous one, which is why every grant and policy targets
--    the 'anon' role and nothing else.
--
--    ONE THING TO SWITCH OFF IN THE DASHBOARD:
--    Supabase turns email signups on by default for every new project, even
--    when the site never uses them. Since this site has no accounts, leaving it
--    on just gives strangers a free way to fill your user table. Go to
--        Authentication → Sign In / Providers → Email
--    and turn OFF "Allow new users to sign up".
--    It is a project setting, not a table, so it can't be done from here.
--
--  Is it safe to put the anon key in app.js?
--    Yes. The anon key is meant to be public — it's in the browser on every
--    Supabase site. What protects the data is the privileges in section 3 and
--    the policies in section 5. Together they mean a visitor can post a
--    response, read approved responses, and send a suggestion. Nothing else:
--    they cannot edit or delete anything, they cannot approve their own post,
--    and they cannot read the suggestions table, so the email addresses people
--    leave are never reachable from the browser.
--
--    Never put the SERVICE ROLE key in app.js. That one bypasses everything.
-- ============================================================================


-- ----------------------------------------------------------------------------
--  1. RESPONSES
--     What someone came up with after doing an activity. Shown on that
--     activity's page under "Responses".
-- ----------------------------------------------------------------------------

create table if not exists public.responses (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),

  -- matches the id field in activities.js, e.g. 'sonic-imaginaries'
  activity_id   text not null
                check (char_length(activity_id) between 1 and 80),

  -- optional. Blank is fine and shows as "Anonymous" on the site.
  display_name  text
                check (display_name is null or char_length(display_name) <= 60),

  body          text not null
                check (char_length(body) between 1 and 2000),

  -- Responses appear on the site straight away. Set this to false on a row to
  -- hide it (see section 6).
  --
  -- WANT TO CHECK EVERYTHING BEFORE IT APPEARS INSTEAD?
  -- Change the default below from true to false. That is the only edit needed.
  -- The read policy already returns approved rows only, and visitors cannot
  -- write this column at all — section 3 does not grant it to them — so they
  -- cannot approve their own post.
  is_approved   boolean not null default true
);

create index if not exists responses_activity_idx
  on public.responses (activity_id, created_at desc);


-- ----------------------------------------------------------------------------
--  2. ACTIVITY SUGGESTIONS
--     Someone proposing a new activity. These are private — never shown on the
--     site, only read by you in the Supabase dashboard.
-- ----------------------------------------------------------------------------

create table if not exists public.activity_suggestions (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),

  title         text not null
                check (char_length(title) between 1 and 120),

  summary       text not null
                check (char_length(summary) between 1 and 2000),

  -- free text on purpose: "10 min", "about half an hour"
  time_needed   text check (time_needed is null or char_length(time_needed) <= 60),

  -- 'solo' | 'pair' | 'group', matching the setting field in activities.js
  setting       text check (setting is null or setting in ('solo', 'pair', 'group')),

  display_name  text check (display_name is null or char_length(display_name) <= 60),

  -- optional, only so you can reply. Never readable from the browser.
  email         text check (email is null or char_length(email) <= 160),

  status        text not null default 'new'
                check (status in ('new', 'reviewing', 'added', 'declined'))
);

create index if not exists suggestions_status_idx
  on public.activity_suggestions (status, created_at desc);


-- ----------------------------------------------------------------------------
--  3. PRIVILEGES — who may touch which columns
--
--  Supabase hands the anon role full access to any new table by default, so
--  the first job is to take that back and grant only what the site needs.
--
--  The important part is that the insert grants NAME THEIR COLUMNS. Because
--  is_approved and status are not in those lists, a visitor cannot set them
--  even by editing the request by hand — those columns always fall back to the
--  table default. That is what makes the moderation switch above trustworthy.
-- ----------------------------------------------------------------------------

revoke all on public.responses            from anon;
revoke all on public.activity_suggestions from anon;

grant usage on schema public to anon;

-- Read grant names its columns too. A visitor needs the four the site puts on
-- screen and nothing else. Leaving client_hash out matters: it is only a hash,
-- but if it were readable someone could pull every response and group by it to
-- work out which posts came from the same person.
grant select (id, activity_id, display_name, body, created_at)
  on public.responses to anon;

grant insert (activity_id, display_name, body)
  on public.responses to anon;

grant insert (title, summary, time_needed, setting, display_name, email)
  on public.activity_suggestions to anon;

-- deliberately no select grant on activity_suggestions
-- deliberately no update or delete grant on either table


-- ----------------------------------------------------------------------------
--  4. ROW LEVEL SECURITY
--     Switch it on. Until a policy grants something, every row is denied.
-- ----------------------------------------------------------------------------

alter table public.responses            enable row level security;
alter table public.activity_suggestions enable row level security;


-- ----------------------------------------------------------------------------
--  5. POLICIES
--     'anon' is a visitor to the site who has not logged in — everyone.
--
--     The insert policies are plain "true" because the column grants in
--     section 3 already decide what a visitor is allowed to write. Putting a
--     condition here as well would break the moderation switch: if the policy
--     said "is_approved = true" and you later changed the default to false,
--     every insert would start failing.
-- ----------------------------------------------------------------------------

-- Anyone may read a response, but only an approved one.
drop policy if exists "public can read approved responses" on public.responses;
create policy "public can read approved responses"
  on public.responses
  for select
  to anon
  using (is_approved = true);

-- Anyone may post a response.
drop policy if exists "public can add a response" on public.responses;
create policy "public can add a response"
  on public.responses
  for insert
  to anon
  with check (true);

-- Anyone may send a suggestion.
drop policy if exists "public can add a suggestion" on public.activity_suggestions;
create policy "public can add a suggestion"
  on public.activity_suggestions
  for insert
  to anon
  with check (true);

-- No select policy on activity_suggestions, and no update or delete policy on
-- either table. Nothing can read, change or remove those rows from a browser.


-- ----------------------------------------------------------------------------
--  6. RATE LIMITING
--
--  The privileges and policies above stop anyone doing damage, but on their own
--  they don't stop someone posting the same thing five thousand times. This is
--  the only real risk of a public web form, so it's worth closing.
--
--  A trigger counts recent posts from the same visitor and refuses if there are
--  too many. It identifies them by a HASH of their IP address, never the
--  address itself, so no personal data is stored. Change the salt below to any
--  random string of your own.
-- ----------------------------------------------------------------------------

alter table public.responses            add column if not exists client_hash text;
alter table public.activity_suggestions add column if not exists client_hash text;

create index if not exists responses_rate_idx
  on public.responses (client_hash, created_at desc);
create index if not exists suggestions_rate_idx
  on public.activity_suggestions (client_hash, created_at desc);

create or replace function public.throttle_public_insert()
returns trigger
language plpgsql
security definer                 -- runs as the owner so it can count existing rows
set search_path = public
as $$
declare
  ip       text;
  per_min  int;
  per_hour int;
begin
  -- PostgREST puts the request headers in a setting. It's absent when you run
  -- an insert by hand in the SQL Editor, hence the fallback.
  ip := split_part(
          coalesce(current_setting('request.headers', true)::json ->> 'x-forwarded-for', 'local'),
          ',', 1);

  new.client_hash := md5(ip || '::CHANGE-THIS-TO-ANY-RANDOM-STRING');

  execute format(
    'select count(*) from %I where client_hash = $1 and created_at > now() - interval ''1 minute''',
    tg_table_name) into per_min using new.client_hash;

  execute format(
    'select count(*) from %I where client_hash = $1 and created_at > now() - interval ''1 hour''',
    tg_table_name) into per_hour using new.client_hash;

  if per_min >= 3 then
    raise exception 'You''re posting a bit fast. Give it a minute and try again.';
  end if;

  if per_hour >= 20 then
    raise exception 'That''s a lot of posts in one hour. Try again later.';
  end if;

  return new;
end;
$$;

drop trigger if exists throttle_responses on public.responses;
create trigger throttle_responses
  before insert on public.responses
  for each row execute function public.throttle_public_insert();

drop trigger if exists throttle_suggestions on public.activity_suggestions;
create trigger throttle_suggestions
  before insert on public.activity_suggestions
  for each row execute function public.throttle_public_insert();


-- ============================================================================
--  7. MODERATION — run these in the SQL Editor whenever you need them
-- ============================================================================

-- Everything that has come in recently
--   select id, created_at, activity_id, display_name, body
--   from public.responses
--   order by created_at desc
--   limit 50;

-- Hide one response (copy the id from the query above)
--   update public.responses set is_approved = false where id = 'paste-id-here';

-- Show it again
--   update public.responses set is_approved = true where id = 'paste-id-here';

-- Which activities are people actually responding to?
--   select activity_id, count(*) as responses
--   from public.responses
--   where is_approved
--   group by activity_id
--   order by responses desc;

-- New activity suggestions
--   select id, created_at, title, time_needed, setting, display_name, summary
--   from public.activity_suggestions
--   where status = 'new'
--   order by created_at desc;

-- Mark a suggestion as dealt with
--   update public.activity_suggestions set status = 'added' where id = 'paste-id-here';


-- ============================================================================
--  8. THE REQUESTS THE SITE ACTUALLY MAKES
--
--  The site talks to Supabase's REST API with plain fetch(), so there is no
--  library to install. For reference:
--
--    Reading responses for one activity
--      GET  /rest/v1/responses
--             ?activity_id=eq.sonic-imaginaries
--             &is_approved=eq.true
--             &select=id,display_name,body,created_at
--             &order=created_at.desc
--             &limit=20
--
--    Posting a response
--      POST /rest/v1/responses
--      Prefer: return=minimal
--      body: { "activity_id": "...", "display_name": "...", "body": "..." }
--
--    Sending a suggestion
--      POST /rest/v1/activity_suggestions
--      Prefer: return=minimal
--      body: { "title": "...", "summary": "...", "time_needed": "...",
--              "setting": "solo", "display_name": "...", "email": "..." }
--
--  Both inserts send  Prefer: return=minimal  on purpose. The alternative,
--  return=representation, makes Postgres run INSERT ... RETURNING, and that
--  needs permission to read the row back. Suggestions are deliberately
--  unreadable, so that version fails with "new row violates row-level security
--  policy". The site does not need the row back, so it does not ask for it.
-- ============================================================================
