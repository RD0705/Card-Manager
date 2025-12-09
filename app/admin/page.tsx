import { createClient } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

// Admin Page - Server Component
export default async function AdminPage() {

    // Initialize Supabase Admin Client
    // Note: Using a manual fetch implementation because the supabase-js client
    // was failing to fetch data in this Next.js Server Component environment
    // despite using the Service Role Key.
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

    // Fetch all users manual fetch
    const usersEndpoint = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/users?select=*`;

    let users: any[] = [];
    let usersError: any = null;

    try {
        const response = await fetch(usersEndpoint, {
            headers: {
                'apikey': key,
                'Authorization': `Bearer ${key}`,
                'Content-Type': 'application/json'
            },
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error(`Fetch users failed: ${response.status} ${response.statusText}`);
        }

        users = await response.json();
    } catch (e) {
        usersError = e;
    }

    if (usersError) {
        console.error("AdminPage: Error fetching users:", usersError);
        return <div>Error loading users: {usersError.message || JSON.stringify(usersError)}</div>;
    }

    // Fetch subscriptions manual fetch
    const subsEndpoint = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/subscriptions?select=*`;

    let subscriptions: any[] = [];

    try {
        const response = await fetch(subsEndpoint, {
            headers: {
                'apikey': key,
                'Authorization': `Bearer ${key}`,
                'Content-Type': 'application/json'
            },
            cache: 'no-store'
        });

        if (response.ok) {
            subscriptions = await response.json();
        } else {
            console.error("AdminPage: Error fetching subscriptions:", response.statusText);
        }
    } catch (e) {
        console.error("AdminPage: Exception fetching subscriptions:", e);
    }

    const getUserStatus = (userId: string) => {
        const sub = subscriptions?.find(s => s.user_id === userId);
        if (!sub) return 'inactive';
        return ['active', 'trialing'].includes(sub.status || '') ? 'active' : 'expired';
    };

    const usersWithStatus = users.map(user => ({
        ...user,
        status: getUserStatus(user.id),
        // Mock dates for UI matching if not in DB
        startDate: '08/07/2025',
        endDate: '08/04/2027'
    }));



    const total = users.length;
    const active = usersWithStatus.filter(u => u.status === 'active').length;
    const expired = usersWithStatus.filter(u => u.status === 'expired' || u.status === 'inactive').length;

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-zinc-900 flex items-center gap-2">
                    <span className="text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></svg>
                    </span>
                    Dashboard
                </h1>
                <p className="text-zinc-500 mt-1">Gerencie os associados e suas carteirinhas digitais</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-zinc-50 rounded-xl p-6 border border-zinc-100 shadow-sm relative overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-sm font-medium text-zinc-500">Total de Associados</h3>
                        <span className="p-1 bg-zinc-200/50 rounded text-zinc-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                        </span>
                    </div>
                    <p className="text-4xl font-bold text-zinc-900">{total}</p>
                </div>

                <div className="bg-zinc-50 rounded-xl p-6 border border-zinc-100 shadow-sm relative overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-sm font-medium text-zinc-500">Ativos</h3>
                        <span className="text-green-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                        </span>
                    </div>
                    <p className="text-4xl font-bold text-green-600">{active}</p>
                </div>

                <div className="bg-zinc-50 rounded-xl p-6 border border-zinc-100 shadow-sm relative overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-sm font-medium text-zinc-500">Expirados</h3>
                        <span className="text-red-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="15" x2="9" y1="9" y2="15" /><line x1="9" x2="15" y1="9" y2="15" /></svg>
                        </span>
                    </div>
                    <p className="text-4xl font-bold text-red-600">{expired}</p>
                </div>
            </div>

            {/* List Header */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-lg font-bold text-zinc-800">Lista de Associados</h2>
                <div className="flex gap-2 text-sm">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                        Todos <span className="bg-white/20 px-1.5 rounded text-xs">{total}</span>
                    </button>
                    <button className="px-4 py-2 bg-white border border-zinc-200 text-zinc-600 rounded-lg hover:bg-zinc-50 font-medium flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                        Ativos <span className="bg-zinc-100 px-1.5 rounded text-xs">{active}</span>
                    </button>
                    <button className="px-4 py-2 bg-white border border-zinc-200 text-zinc-600 rounded-lg hover:bg-zinc-50 font-medium flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="15" x2="9" y1="9" y2="15" /><line x1="9" x2="15" y1="9" y2="15" /></svg>
                        Expirados <span className="bg-zinc-100 px-1.5 rounded text-xs">{expired}</span>
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-zinc-50 text-zinc-500 uppercase font-medium border-b border-zinc-100">
                            <tr>
                                <th className="px-6 py-4">Nome</th>
                                <th className="px-6 py-4">Data Início</th>
                                <th className="px-6 py-4">Vencimento</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100">
                            {usersWithStatus.map((user) => (
                                <tr key={user.id} className="hover:bg-zinc-50/50 transition">
                                    <td className="px-6 py-4 font-medium text-zinc-900">
                                        <div className="flex flex-col">
                                            <span>{user.full_name || 'Sem nome'}</span>
                                            <span className="text-xs text-zinc-400 font-normal">{user.id}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-zinc-600">{user.startDate}</td>
                                    <td className="px-6 py-4 text-zinc-600">{user.endDate}</td>
                                    <td className="px-6 py-4">
                                        {user.status === 'active' ? (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                                ATIVO
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="15" x2="9" y1="9" y2="15" /><line x1="9" x2="15" y1="9" y2="15" /></svg>
                                                EXPIRADO
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-zinc-600 hover:text-blue-600 font-medium inline-flex items-center gap-2 transition">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                                            Ver Carteirinha
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-zinc-400">
                                        Nenhum associado encontrado.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
