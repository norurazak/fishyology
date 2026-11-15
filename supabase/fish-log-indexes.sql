-- Fish Log and catch-card lookups.
--
-- The catch card asks, per species, for the player's own count and best weight and for
-- the heaviest catch by anyone. The Fish Log reads one player's catches. These two
-- indexes keep both fast as the table grows. Safe to run more than once; changes no data.
--
-- How to run: Supabase dashboard > SQL Editor > paste > Run.

create index if not exists catches_species_weight_idx
  on public.catches (species, weight_kg desc);

create index if not exists catches_profile_species_idx
  on public.catches (profile_id, species, weight_kg desc);
