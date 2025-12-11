import { Member } from '@/components/admin/schema';
import DashboardClient from '@/components/admin/dashboard-client';
import { createClient } from '@/utils/supabase/server';

export const dynamic = 'force-dynamic';

function getStatusFromSubscription(subscription: any) {
    if (!subscription) return 'Membro'; // Registered but no sub
    if (subscription.status === 'active' || subscription.status === 'trialing') return 'Ativo';
    return 'Vencido';
}

// Admin Page - Server Component
export default async function AdminPage() {
    const supabase = createClient();

    // 1. Fetch Auth Users (Self-registered)
    // We try to get profile data from 'users' table which contains public profile info
    const { data: authUsers, error: usersError } = await supabase
        .from('users')
        .select('*')
        .order('created', { ascending: false });

    if (usersError) console.error("Error fetching users:", usersError);

    // 2. Fetch Subscriptions for these users
    const { data: subscriptions, error: subsError } = await supabase
        .from('subscriptions')
        .select('*');

    if (subsError) console.error("Error fetching subscriptions:", subsError);

    // 3. Fetch Manual Members (No Auth User ID usually, or created via Admin)
    // We only want members that are NOT duplicates of Auth Users if possible.
    // Ideally 'members' table replaces 'users' table eventually, but for now we merge.
    // We'll simplisticly fetch ALL 'members' and assume they are distinct or prioritized.
    const { data: manualMembers, error: membersError } = await supabase
        .from('members')
        .select('*')
        .order('created_at', { ascending: false });

    if (membersError) console.error("Error fetching members:", membersError);

    // 4. Map Auth Users to Member interface
    const authMembers: Member[] = (authUsers || []).map((user: any) => {
        const sub = subscriptions?.find((s: any) => s.user_id === user.id);

        // Determine dates based on subscription or creation
        const startDate = sub ? (sub.current_period_start || sub.created) : user.created;
        const expirationDate = sub ? sub.current_period_end : new Date(new Date(user.created).getTime() + 1000 * 60 * 60 * 24 * 30).toISOString(); // Default +30 days trial/pending

        // CPF extraction
        const cpf = user.billing_address?.cpf || '000.000.000-00';
        const phone = user.billing_address?.phone || '';

        return {
            id: user.id,
            name: user.full_name || 'Usuário Site',
            email: user.email || '',
            cpf: cpf,
            phone: phone,
            startDate: startDate,
            expirationDate: expirationDate,
            photoUrl: user.avatar_url || '',
            // We can add a custom status field if we extend Member interface, 
            // but currently status is derived from expirationDate in MemberSchema. 
        };
    });

    // 5. Map Manual Members to Member interface
    const manualMembersMapped: Member[] = (manualMembers || []).map((member: any) => {
        return {
            id: member.id,
            name: member.full_name || 'Membro Manual',
            email: member.email || '',
            cpf: member.cpf || '000.000.000-00',
            phone: member.phone || '',
            startDate: member.start_date || new Date().toISOString(),
            expirationDate: member.expiration_date || new Date().toISOString(),
            photoUrl: ''
        };
    });

    // 6. Merge Lists (Deduplication could be added here if needed, based on Email/CPF)
    // For now, we concat. If a user is in both, they show twice (Visual bug, but safer not to hide data).
    const members: Member[] = [...manualMembersMapped, ...authMembers];

    // Pass members to client component
    return <DashboardClient members={members} />;
}
