'use server';

import { createClient as createSupabaseAdminClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

// Using untyped client because admin_users and app_config tables are not in the generated types
const supabaseAdmin = createSupabaseAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function addAdmin(formData: FormData) {
    const email = formData.get('email') as string;
    if (!email) return;
    const role = (formData.get('role') as string) || 'Admin';

    const { error } = await (supabaseAdmin as any).from('admin_users').insert({
        email,
        role
    });

    if (error) {
        console.error('Error adding admin:', error);
        // Se for e-mail duplicado, apenas revalida sem quebrar
        if (!/duplicate key|unique constraint/i.test(error.message)) {
            throw new Error('Falha ao adicionar administrador');
        }
    }

    revalidatePath('/admin/configuracoes');
}

export async function removeAdmin(id: string) {
    const { error } = await (supabaseAdmin as any).from('admin_users').delete().eq('id', id);

    if (error) {
        console.error('Error removing admin:', error);
        throw new Error('Falha ao remover administrador');
    }

    revalidatePath('/admin/configuracoes');
}

export async function updateSystemConfig(key: string, value: boolean) {
    const { error } = await (supabaseAdmin as any)
        .from('app_config')
        .upsert([{ key, value }], { onConflict: 'key' });

    if (error) {
        console.error('Error updating config:', error);
        throw new Error('Falha ao atualizar configuração');
    }

    revalidatePath('/admin/configuracoes');
}
