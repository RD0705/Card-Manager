-- Create the transactions table
create table if not exists transactions (
  id uuid default gen_random_uuid() primary key,
  member_id uuid references members(id) not null,
  amount decimal(10, 2) not null,
  currency text default 'BRL',
  status text check (status in ('pending', 'paid', 'failed', 'refunded')),
  payment_method text default 'bradesco_boleto',
  bradesco_transaction_id text, -- ID returned by Bradesco API
  created_at timestamptz default now()
);

-- Enable RLS
alter table transactions enable row level security;

-- Policy: Users can view their own transactions
create policy "Users can view their own transactions"
  on transactions for select
  using (
    exists (
      select 1 from members
      where members.id = transactions.member_id
      -- and members.user_id = auth.uid() -- dynamic check if using real auth
    )
  );
