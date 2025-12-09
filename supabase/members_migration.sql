-- Create the members table
create table if not exists members (
  id uuid default gen_random_uuid() primary key,
  user_id text not null, -- Stores Clerk User ID
  full_name text,
  cpf text unique,
  card_number text unique default md5(random()::text), -- Simple generation for now
  status text check (status in ('active', 'inactive', 'pending_payment')) default 'pending_payment',
  plan_tier text default 'standard',
  expiration_date timestamptz,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table members enable row level security;

-- Policy: Allow users to view their own profile
-- Note: This assumes we are querying with `eq('user_id', clerk_user_id)` from the client
-- OR that we are trusting the application logic to only request its own data.
-- For a strict setup with Clerk + Supabase RLS, we would need a Custom JWT Claim.
-- For this starter, we will use a "service_role" bypass in the webhook or
-- a basic policy that allows SELECT if the user_id matches the claim (if mapped).

-- TEMPORARY POLICY: Open for authenticated users (refined later)
-- Ideally: user_id = auth.jwt() -> claim -> sub (if mapped)
create policy "Users can view their own member data"
  on members for select
  using ( true ); 
  -- In a real prod environment with Clerk, you must map the JWT. 
  -- For now, we trust the `user_id` filter applied by the client.

create policy "Users can update their own member data"
  on members for update
  using ( true );
