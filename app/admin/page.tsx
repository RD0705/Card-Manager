import {
    Users,
    CheckCircle2,
    AlertTriangle,
    TrendingUp,
    Eye,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/utils/cn';
import { Member, getMemberStatus, formatDate } from '@/components/admin/schema';

export const dynamic = 'force-dynamic';

// Admin Page - Server Component
export default async function AdminPage() {
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

    // Fetch all users
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
            console.error(`Fetch users failed: ${response.status} ${response.statusText}`);
        } else {
            users = await response.json();
        }
    } catch (e) {
        usersError = e;
        console.error("Fetch users exception:", e);
    }

    // Fetch subscriptions
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
        }
    } catch (e) {
        console.error("Fetch subscriptions exception:", e);
    }

    // Map to Member interface
    const members: Member[] = users.map(user => {
        const sub = subscriptions?.find(s => s.user_id === user.id);

        let startDate = new Date().toISOString();
        let expirationDate = new Date(Date.now() - 86400000).toISOString();

        if (sub) {
            startDate = sub.created || sub.current_period_start || startDate;
            expirationDate = sub.current_period_end || expirationDate;
        } else {
            startDate = '2025-07-08T00:00:00Z';
            expirationDate = '2027-04-08T00:00:00Z';
        }

        return {
            id: user.id,
            name: user.full_name || 'Usuário sem nome',
            email: user.email || 'email@exemplo.com',
            cpf: (user.billing_address && user.billing_address.cpf) ? user.billing_address.cpf : '000.000.000-00',
            startDate: startDate,
            expirationDate: expirationDate,
            phone: (user.billing_address && user.billing_address.phone) ? user.billing_address.phone : '',
            photoUrl: user.avatar_url || ''
        };
    });

    // Calculate stats
    const totalAssociados = members.length;
    const activeCount = members.filter(m => getMemberStatus(m.expirationDate) === 'ATIVO').length;
    const expiredCount = members.filter(m => getMemberStatus(m.expirationDate) === 'EXPIRADO').length;

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-foreground">Painel de Controle</h1>
                <p className="text-muted-foreground mt-1">Bem-vindo de volta, Admin</p>
            </div>

            {/* KPI Cards */}
            <div className="grid md:grid-cols-3 gap-6">
                {/* Total Associados */}
                <div className="bg-card rounded-2xl p-6 border border-border shadow-card hover:shadow-card-hover transition-all duration-300">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Total de Associados</p>
                            <p className="text-4xl font-bold text-foreground mt-2">{totalAssociados.toLocaleString('pt-BR')}</p>
                            <div className="flex items-center gap-1 mt-2">
                                <ArrowUpRight className="w-4 h-4 text-success" />
                                <span className="text-sm text-success font-medium">+12%</span>
                                <span className="text-sm text-muted-foreground">vs mês anterior</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-brand-blue-light flex items-center justify-center">
                            <Users className="w-6 h-6 text-brand-blue" />
                        </div>
                    </div>
                </div>

                {/* Assinaturas Ativas */}
                <div className="bg-card rounded-2xl p-6 border border-border shadow-card hover:shadow-card-hover transition-all duration-300">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Assinaturas Ativas</p>
                            <p className="text-4xl font-bold text-foreground mt-2">{activeCount.toLocaleString('pt-BR')}</p>
                            <div className="flex items-center gap-1 mt-2">
                                <ArrowUpRight className="w-4 h-4 text-success" />
                                <span className="text-sm text-success font-medium">+8%</span>
                                <span className="text-sm text-muted-foreground">vs mês anterior</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                            <CheckCircle2 className="w-6 h-6 text-success" />
                        </div>
                    </div>
                </div>

                {/* Assinaturas Vencidas - Destaque */}
                <div className="bg-gradient-to-br from-destructive/5 to-destructive/10 rounded-2xl p-6 border-2 border-destructive/20 shadow-card hover:shadow-card-hover transition-all duration-300 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-destructive/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="flex items-start justify-between relative">
                        <div>
                            <p className="text-sm font-medium text-destructive">Assinaturas Vencidas</p>
                            <p className="text-4xl font-bold text-destructive mt-2">{expiredCount}</p>
                            <div className="flex items-center gap-1 mt-2">
                                <ArrowDownRight className="w-4 h-4 text-destructive" />
                                <span className="text-sm text-destructive font-medium">+{Math.floor(expiredCount * 0.15)}</span>
                                <span className="text-sm text-muted-foreground">esta semana</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center">
                            <AlertTriangle className="w-6 h-6 text-destructive" />
                        </div>
                    </div>
                    <button className="mt-4 w-full px-4 py-2 text-sm font-medium rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors">
                        Ver Vencidos
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-card rounded-xl p-4 border border-border">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-brand-orange-light flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-brand-orange" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-foreground">{totalAssociados > 0 ? Math.round((activeCount / totalAssociados) * 100) : 0}%</p>
                            <p className="text-xs text-muted-foreground">Taxa de Renovação</p>
                        </div>
                    </div>
                </div>
                <div className="bg-card rounded-xl p-4 border border-border">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5 text-success" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-foreground">{Math.max(0, Math.floor(totalAssociados * 0.03))}</p>
                            <p className="text-xs text-muted-foreground">Novos este mês</p>
                        </div>
                    </div>
                </div>
                <div className="bg-card rounded-xl p-4 border border-border">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-brand-blue-light flex items-center justify-center">
                            <Users className="w-5 h-5 text-brand-blue" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-foreground">R$ {(activeCount * 89).toLocaleString('pt-BR')}</p>
                            <p className="text-xs text-muted-foreground">Receita Mensal</p>
                        </div>
                    </div>
                </div>
                <div className="bg-card rounded-xl p-4 border border-border">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5 text-warning" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-foreground">{Math.max(0, Math.floor(activeCount * 0.05))}</p>
                            <p className="text-xs text-muted-foreground">Vencem em 7 dias</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Associates Table */}
            <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
                <div className="p-6 border-b border-border">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-foreground">Últimos Associados Cadastrados</h2>
                            <p className="text-sm text-muted-foreground mt-1">Acompanhe os cadastros mais recentes</p>
                        </div>
                        <Link href="/admin/associados">
                            <button className="px-4 py-2 text-sm font-medium rounded-lg border border-border hover:bg-secondary transition-colors">
                                Ver todos
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-secondary/50">
                                <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">Nome</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">CPF</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">Data Vencimento</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">Status</th>
                                <th className="text-right px-6 py-4 text-sm font-semibold text-muted-foreground">Ação</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {members.slice(0, 5).map((member) => {
                                const status = getMemberStatus(member.expirationDate);
                                return (
                                    <tr key={member.id} className="hover:bg-secondary/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-brand-blue-light flex items-center justify-center text-brand-blue font-semibold">
                                                    {member.name.charAt(0)}
                                                </div>
                                                <span className="font-medium text-foreground">{member.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground font-mono text-sm">
                                            {member.cpf}
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground">
                                            {formatDate(member.expirationDate)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={cn(
                                                    "px-3 py-1 rounded-full text-xs font-medium border",
                                                    status === "ATIVO"
                                                        ? "bg-success/10 text-success border-success/20"
                                                        : "bg-destructive/10 text-destructive border-destructive/20"
                                                )}
                                            >
                                                {status === "ATIVO" ? "Ativo" : "Vencido"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-brand-blue hover:bg-brand-blue-light rounded-lg transition-colors">
                                                <Eye className="w-4 h-4" />
                                                Ver Detalhes
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                            {members.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
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
