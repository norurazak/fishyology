-- Jigging Master: server-side anti-cheat rules.
--
-- Why: the game runs in the player's browser, so a player can open the browser tools
-- and send the database any species, weight or depth they like. The game code can
-- be read and copied no matter what, so these rules live in the database instead,
-- where a player cannot change them. They reject a catch that honest play could never
-- produce, and a catch posted too fast or in someone else's name.
--
-- How to run: Supabase dashboard > SQL Editor > paste this whole file > Run.
-- It is wrapped in a transaction, so if anything fails nothing is changed.
-- It is safe to run again. To undo it, see the ROLLBACK section at the bottom.
--
-- What it does NOT do: it cannot tell an honest 60 kg Sailfish from a cheat who posts
-- exactly 60 kg. Honest play almost never reaches a species' top weight, so the audit
-- queries at the bottom flag exactly that pattern for you to review before any prize.

begin;

-- 1. What is physically possible, per species (generated from the game's fish table).
--    If you change a species in the game, update its row here too.
create table if not exists public.catch_rules (
  species    text primary key,
  min_weight numeric not null,
  max_weight numeric not null,
  min_depth  numeric not null,
  max_depth  numeric not null
);

-- No one reads this from the browser; only the trigger below (which runs with
-- elevated rights) needs it.
alter table public.catch_rules enable row level security;

insert into public.catch_rules (species, min_weight, max_weight, min_depth, max_depth) values
  ('Kembong', 0.1, 0.8, 0, 90),
  ('Queenfish', 1, 16, 0, 50),
  ('Mahi-Mahi', 2, 40, 0, 85),
  ('Barracuda', 2, 50, 0, 100),
  ('Tenggiri', 3, 70, 10, 70),
  ('Rainbow Runner', 1, 46, 0, 150),
  ('Golden Trevally', 4, 15, 0, 80),
  ('Cobia', 6, 68, 0, 70),
  ('Coral Trout', 2, 24, 3, 100),
  ('Giant Trevally', 8, 80, 10, 188),
  ('Sailfish', 15, 100, 0, 200),
  ('Green Jobfish', 3, 15.4, 3, 180),
  ('Dogtooth Tuna', 10, 131, 10, 200),
  ('Amberjack', 8, 80, 1, 300),
  ('Ruby Snapper', 4, 25, 90, 300),
  ('Rosy Jobfish', 3, 8.2, 40, 300),
  ('Eightbar Grouper', 8, 80, 150, 300),
  ('Almaco Jack', 12, 60, 5, 160),
  ('Oilfish', 10, 63.5, 100, 300),
  ('Giant Grouper', 20, 400, 180, 300)
on conflict (species) do update set
  min_weight = excluded.min_weight, max_weight = excluded.max_weight,
  min_depth  = excluded.min_depth,  max_depth  = excluded.max_depth;

-- Species that were removed or renamed in the game stop being accepted. (Catches already
-- saved under an old name stay as they are; only new ones are checked.)
delete from public.catch_rules where species not in (
  'Kembong',
  'Queenfish',
  'Mahi-Mahi',
  'Barracuda',
  'Tenggiri',
  'Rainbow Runner',
  'Golden Trevally',
  'Cobia',
  'Coral Trout',
  'Giant Trevally',
  'Sailfish',
  'Green Jobfish',
  'Dogtooth Tuna',
  'Amberjack',
  'Ruby Snapper',
  'Rosy Jobfish',
  'Eightbar Grouper',
  'Almaco Jack',
  'Oilfish',
  'Giant Grouper'
);

-- 2. Check every new catch before it is stored.
create or replace function public.validate_catch()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  r        public.catch_rules%rowtype;
  uid      uuid := auth.uid();
  last_at  timestamptz;
  recent   int;
begin
  -- A signed-in player can only post a catch as themselves.
  if uid is not null and new.profile_id is distinct from uid then
    raise exception 'A catch can only be posted by its own player.' using errcode = '42501';
  end if;

  -- The time of the catch is the server's time, never the browser's, so a catch
  -- cannot be back-dated into (or out of) a season.
  new.caught_at := now();

  -- Only real species, at weights and depths that species can have.
  select * into r from public.catch_rules where species = new.species;
  if not found then
    raise exception 'Unknown species.' using errcode = '23514';
  end if;
  if new.weight_kg is null or new.weight_kg < r.min_weight - 0.001 or new.weight_kg > r.max_weight + 0.001 then
    raise exception 'Weight is outside what a % can weigh.', new.species using errcode = '23514';
  end if;
  if new.depth_m is null or new.depth_m < r.min_depth - 0.5 or new.depth_m > r.max_depth + 0.5 then
    raise exception 'Depth is outside where a % lives.', new.species using errcode = '23514';
  end if;

  -- Pace: a drop, a hook-set and a fight take real time, so a player cannot post
  -- catches faster than that, or more than a human could land in an hour.
  if uid is not null then
    select max(caught_at) into last_at from public.catches where profile_id = new.profile_id;
    if last_at is not null and now() - last_at < interval '15 seconds' then
      raise exception 'Catches are coming in too fast.' using errcode = '23514';
    end if;

    select count(*) into recent from public.catches
      where profile_id = new.profile_id and caught_at > now() - interval '1 hour';
    if recent >= 150 then
      raise exception 'Hourly catch limit reached.' using errcode = '23514';
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists validate_catch on public.catches;
create trigger validate_catch
  before insert on public.catches
  for each row execute function public.validate_catch();

-- 3. Row-level rules: only signed-in players, only as themselves.
--    (The names below are the ones in your project; they include the full stop.)
drop policy if exists "Users can insert their own catches." on public.catches;
create policy "Users can insert their own catches." on public.catches
  for insert to authenticated with check (auth.uid() = profile_id);

drop policy if exists "Users can insert their own profile." on public.profiles;
create policy "Users can insert their own profile." on public.profiles
  for insert to authenticated with check (auth.uid() = id);

-- An update must also leave the row belonging to the same player.
alter policy "Users can update own profile." on public.profiles
  using (auth.uid() = id) with check (auth.uid() = id);

-- 4. Profile fields are shown publicly, so keep them to what the form allows.
--    "not valid" leaves existing rows alone; every new or edited profile is checked.
alter table public.profiles drop constraint if exists profiles_display_name_ok;
alter table public.profiles add constraint profiles_display_name_ok
  check (display_name is null or char_length(btrim(display_name)) between 1 and 15) not valid;

-- (gender is an enum column, gender_type, so the database already limits its values.)

alter table public.profiles drop constraint if exists profiles_state_ok;
alter table public.profiles add constraint profiles_state_ok
  check (state is null or state in (
    'Johor','Kedah','Kelantan','Melaka','Negeri Sembilan','Pahang','Perak','Perlis',
    'Pulau Pinang','Sabah','Sarawak','Selangor','Terengganu','Kuala Lumpur','Labuan','Putrajaya'
  )) not valid;

-- Avatars must be one of the game's own picks, not any web address a player types
-- (the leaderboard loads this image for every visitor).
alter table public.profiles drop constraint if exists profiles_avatar_ok;
alter table public.profiles add constraint profiles_avatar_ok
  check (avatar_url is null or avatar_url ~ '^https://api\.dicebear\.com/7\.x/bottts/svg\?seed=Angler(10|[1-9])&backgroundColor=0D141B$') not valid;

commit;

-- ---------------------------------------------------------------------------
-- TEST (run after the above; nothing is kept). Each should fail with an error:
--
--   begin;
--   insert into public.catches (profile_id, species, weight_kg, depth_m)
--     values ((select id from public.profiles limit 1), 'Kembong', 999, 10);    -- impossible weight
--   rollback;
--
--   begin;
--   insert into public.catches (profile_id, species, weight_kg, depth_m)
--     values ((select id from public.profiles limit 1), 'Giant Grouper', 50, 5); -- wrong depth
--   rollback;
-- ---------------------------------------------------------------------------

-- ---------------------------------------------------------------------------
-- AUDIT: run these before awarding any prize.
--
-- (a) The season's heaviest catches, with how close each is to the species' maximum.
--     Honest play rarely gets near it (weights skew heavily light), so several catches
--     at 95-100% from one player is a red flag.
--
--   select p.display_name, c.species, c.weight_kg, c.depth_m,
--          round(100 * (c.weight_kg - r.min_weight) / (r.max_weight - r.min_weight), 1) as pct_of_range,
--          c.caught_at at time zone 'Asia/Kuala_Lumpur' as caught_myt
--   from public.catches c
--   join public.catch_rules r on r.species = c.species
--   join public.profiles p on p.id = c.profile_id
--   where c.caught_at >= '2026-12-01 00:00:00+08' and c.caught_at <= '2026-12-31 23:59:59.999+08'
--   order by c.weight_kg desc limit 20;
--
-- (b) Players with an unusual number of catches, or an unusually high share near the max.
--
--   select p.display_name, count(*) as catches,
--          round(avg(100 * (c.weight_kg - r.min_weight) / (r.max_weight - r.min_weight)), 1) as avg_pct_of_range,
--          count(*) filter (where (c.weight_kg - r.min_weight) / (r.max_weight - r.min_weight) > 0.9) as near_max
--   from public.catches c
--   join public.catch_rules r on r.species = c.species
--   join public.profiles p on p.id = c.profile_id
--   where c.caught_at >= '2026-12-01 00:00:00+08'
--   group by p.id, p.display_name
--   order by near_max desc, catches desc limit 20;
-- ---------------------------------------------------------------------------

-- ---------------------------------------------------------------------------
-- ROLLBACK (only if you need to undo the above):
--
--   begin;
--   drop trigger if exists validate_catch on public.catches;
--   drop function if exists public.validate_catch();
--   drop table if exists public.catch_rules;
--   alter table public.profiles drop constraint if exists profiles_display_name_ok;
--   alter table public.profiles drop constraint if exists profiles_gender_ok;
--   alter table public.profiles drop constraint if exists profiles_state_ok;
--   alter table public.profiles drop constraint if exists profiles_avatar_ok;
--   commit;
-- ---------------------------------------------------------------------------
