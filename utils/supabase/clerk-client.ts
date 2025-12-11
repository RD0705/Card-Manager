import { createClient } from '@supabase/supabase-js';
import { auth } from '@clerk/nextjs/server';

export const createClerkSupabaseClient = async () => {
    const { getToken } = await auth();
    // The template name 'supabase' must be configured in Clerk Dashboard -> JWT Templates
    const token = await getToken({ template: 'supabase' });

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    return createClient(supabaseUrl, supabaseKey, {
        global: {
            headers: {
                ...(token && { Authorization: `Bearer ${token}` }),
            },
        },
    });
};
