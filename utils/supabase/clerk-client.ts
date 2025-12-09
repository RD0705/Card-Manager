import { createClient } from '@supabase/supabase-js';

export const createClerkSupabaseClient = (clerkToken: string | null) => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    return createClient(supabaseUrl, supabaseKey, {
        global: {
            headers: {
                ...(clerkToken && { Authorization: `Bearer ${clerkToken}` }),
            },
        },
    });
};
