/*
# Create team_registrations table (single-tenant, no auth)

1. New Tables
- `team_registrations`
  - `id` (uuid, primary key)
  - `team_name` (text, not null) — name of the registering team
  - `captain_name` (text, not null) — captain's full name
  - `captain_phone` (text, not null) — captain's phone number
  - `captain_email` (text, not null) — captain's email address
  - `team_manager_name` (text, not null) — team manager's full name
  - `number_of_players` (integer, not null) — squad size
  - `city_area` (text, not null) — city or area the team is from
  - `instagram_handle` (text, nullable) — optional Instagram handle
  - `eligibility_confirmed` (boolean, not null, default false) — U21 eligibility checkbox
  - `status` (text, not null, default 'pending') — registration status
  - `created_at` (timestamptz, default now()) — submission timestamp

2. Security
- Enable RLS on `team_registrations`.
- Allow anon + authenticated INSERT only (registrations are public submissions).
- No SELECT/UPDATE/DELETE from the anon key — submissions are write-only from the public site.

3. Notes
- This is a no-auth public registration form. Anyone visiting the site can submit a team registration.
- Reads of submitted registrations are intentionally restricted (only via the service role / dashboard, not the anon key).
*/

CREATE TABLE IF NOT EXISTS team_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_name text NOT NULL,
  captain_name text NOT NULL,
  captain_phone text NOT NULL,
  captain_email text NOT NULL,
  team_manager_name text NOT NULL,
  number_of_players integer NOT NULL,
  city_area text NOT NULL,
  instagram_handle text,
  eligibility_confirmed boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE team_registrations ENABLE ROW LEVEL SECURITY;

-- Allow public INSERT (anyone can register a team)
DROP POLICY IF EXISTS "anon_insert_registrations" ON team_registrations;
CREATE POLICY "anon_insert_registrations"
ON team_registrations FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- No SELECT/UPDATE/DELETE policies: submitted registrations are not readable or mutable from the anon key.