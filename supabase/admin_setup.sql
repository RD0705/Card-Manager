-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    role TEXT DEFAULT 'Admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Allow read access to authenticated users (or just service role if stricter)
CREATE POLICY "Allow public read access to admin_users"
ON admin_users FOR SELECT
TO authenticated
USING (true);

-- Allow insert/delete only to service role or super admins (simulated here by open for now or service role)
-- For simplicity in this demo, we'll allow Authenticated users to INSERT/DELETE so the UI works without complex AuthZ setup yet.
-- IN PRODUCTION: Restrict this significantly!
CREATE POLICY "Allow authenticated insert to admin_users"
ON admin_users FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow authenticated delete to admin_users"
ON admin_users FOR DELETE
TO authenticated
USING (true);

-- Insert initial admin (optional)
INSERT INTO admin_users (email, role)
VALUES ('admin@checkup.com.br', 'Super Admin')
ON CONFLICT (email) DO NOTHING;
