import { createClient } from '@/utils/supabase/server';
import SettingsClient from './client-view';

export default async function SettingsPage() {
    const supabase = createClient();
    const { data: admins, error } = await supabase
        .from('admin_users')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching admins:', error);
    }

    return <SettingsClient admins={admins || []} />;
}
