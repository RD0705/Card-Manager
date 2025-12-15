import { SupabaseClient } from '@supabase/supabase-js';
import { cache } from 'react';

export const getUser = cache(async (supabase: SupabaseClient) => {
  const {
    data: { user }
  } = await supabase.auth.getUser();
  return user;
});

export const getSubscription = cache(async (supabase: SupabaseClient) => {
  const { data: subscription, error } = await supabase
    .from('subscriptions')
    .select('*, prices(*, products(*))')
    .in('status', ['trialing', 'active'])
    .maybeSingle();

  return subscription;
});

export const getProducts = cache(async (supabase: SupabaseClient) => {
  const { data: products, error } = await supabase
    .from('products')
    .select('*, prices(*)')
    .eq('active', true)
    .eq('prices.active', true)
    .order('metadata->index')
    .order('unit_amount', { referencedTable: 'prices' });

  return products;
});

export const getUserDetails = cache(async (supabase: SupabaseClient) => {
  const { data: userDetails } = await supabase
    .from('users')
    .select('*')
    .single();
  return userDetails;
});

/**
 * Get all members/users for admin dashboard
 * Explicitly selects billing_address and payment_method JSON fields
 */
/**
 * Get all members for admin dashboard
 */
export const getAllMembers = cache(async (supabase: SupabaseClient) => {
  const { data: members, error } = await supabase
    .from('members')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching members:', error);
    return [];
  }

  return members || [];
});

/**
 * Create a new member
 */
export const createMember = async (
  supabase: SupabaseClient,
  memberData: {
    full_name: string;
    email: string;
    cpf: string;
    phone?: string;
    status?: string;
    start_date?: string;
    expiration_date?: string;
  }
) => {
  const { data, error } = await supabase
    .from('members')
    .insert({
      full_name: memberData.full_name,
      email: memberData.email,
      cpf: memberData.cpf,
      phone: memberData.phone,
      status: memberData.status || 'active',
      start_date: memberData.start_date,
      expiration_date: memberData.expiration_date
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

/**
 * Get a member by their email address
 */
export const getMemberByEmail = cache(async (supabase: SupabaseClient, email: string) => {
  const { data: member, error } = await supabase
    .from('members')
    .select('*')
    .eq('email', email)
    .maybeSingle();

  if (error) {
    console.error('Error fetching member by email:', error);
    return null;
  }

  return member;
});
