'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addAdmin(formData: FormData) {
    const email = formData.get('email') as string;
    if (!email) return;

    const supabase = createClient();
    const { error } = await supabase.from('admin_users').insert({
        email,
        role: 'Admin'
    });

    if (error) {
        console.error('Error adding admin:', error);
        throw new Error('Falha ao adicionar administrador');
    }

    revalidatePath('/admin/configuracoes');
}

export async function removeAdmin(id: string) {
    const supabase = createClient();
    const { error } = await supabase.from('admin_users').delete().eq('id', id);

    if (error) {
        console.error('Error removing admin:', error);
        throw new Error('Falha ao remover administrador');
    }

    revalidatePath('/admin/configuracoes');
}
