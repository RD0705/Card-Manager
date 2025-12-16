import { createClient } from '@/utils/supabase/server';
import { createClient as createSupabaseAdminClient } from '@supabase/supabase-js';
import type { Database } from '@/types_db';
import SettingsClient from './client-view';

export default async function SettingsPage() {
    const supabaseAdmin = createSupabaseAdminClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: admins, error } = await supabaseAdmin
        .from('admin_users')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching admins:', error);
    }

    const { data: appConfig } = await supabaseAdmin
        .from('app_config')
        .select('*')
        .in('key', ['maintenance_mode', 'email_notifications']);

    const configMap = Object.fromEntries((appConfig || []).map((row: any) => [row.key, row.value]));
    const initialConfig = {
        maintenance_mode: !!configMap['maintenance_mode'],
        email_notifications: !!configMap['email_notifications'],
    };

    return <SettingsClient admins={admins || []} initialConfig={initialConfig} />;
}
