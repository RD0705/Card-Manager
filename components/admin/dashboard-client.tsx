"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/admin-ui/button";
import { Badge } from "@/components/admin-ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/admin-ui/dialog";
import { Input } from "@/components/admin-ui/input";
import { Label } from "@/components/admin-ui/label";
import { MemberCardModal } from "@/components/admin/member-card-modal";
import {
    Users,
    CheckCircle2,
    AlertTriangle,
    TrendingUp,
    Eye,
    ArrowUpRight,
    ArrowDownRight,
    UserPlus,
} from "lucide-react";
import type { Member } from "@/components/admin/schema";
import { getMemberStatus } from "@/components/admin/schema";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { cn } from "@/utils/cn";

// Interface para props do Dashboard
export interface DashboardClientProps {
    members: Member[];
    totalMembers?: number;
    activeSubscriptions?: number;
    expiredSubscriptions?: number;
    monthlyRevenue?: number;
    newThisMonth?: number;
    expiringIn7Days?: number;
    renewalRate?: number;
}

// Função para formatar moeda
const formatCurrency = (value: number): string => {
    if (value >= 1000) {
        return `R$ ${(value / 1000).toFixed(0)}k`;
    }
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
};

// Função para formatar números
const formatNumber = (value: number): string => {
    return new Intl.NumberFormat('pt-BR').format(value);
};

export default function DashboardClient({
    members: initialMembers,
    totalMembers: propTotalMembers,
    activeSubscriptions: propActiveSubscriptions,
    expiredSubscriptions: propExpiredSubscriptions,
    monthlyRevenue = 0,
    newThisMonth = 0,
    expiringIn7Days = 0,
    renewalRate: propRenewalRate,
}: DashboardClientProps) {
    const router = useRouter();
    const [members, setMembers] = useState<Member[]>(initialMembers);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);
    const [isCardModalOpen, setIsCardModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        cpf: "",
        phone: "",
        startDate: new Date().toISOString().split('T')[0],
        expirationDate: "",
    });

    const counts = useMemo(() => {
        const active = members.filter((m) => getMemberStatus(m.expirationDate) === "ATIVO").length;
        const expired = members.filter((m) => getMemberStatus(m.expirationDate) === "EXPIRADO").length;
        return {
            all: members.length,
            active,
            expired,
        };
    }, [members]);

    // Usar props ou calcular do estado local
    const totalMembers = propTotalMembers ?? counts.all;
    const activeSubscriptions = propActiveSubscriptions ?? counts.active;
    const expiredSubscriptions = propExpiredSubscriptions ?? counts.expired;
    const renewalRate = propRenewalRate ?? (totalMembers > 0 ? Math.round((activeSubscriptions / totalMembers) * 100) : 0);

    const handleCreateMember = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const supabase = createClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
            );

            const { data, error } = await supabase
                .from('members')
                .insert({
                    full_name: formData.name,
                    email: formData.email,
                    cpf: formData.cpf,
                    phone: formData.phone,
                    start_date: formData.startDate,
                    expiration_date: formData.expirationDate,
                    status: 'active'
                })
                .select()
                .single();

            if (error) {
                console.error('Error creating member:', error);
                alert('Erro ao criar associado. Verifique o console.');
                return;
            }

            const newMember: Member = {
                id: data.id,
                name: data.full_name,
                email: data.email,
                cpf: data.cpf,
                phone: data.phone,
                startDate: data.start_date,
                expirationDate: data.expiration_date,
                photoUrl: ""
            };

            setMembers([...members, newMember]);

            setFormData({
                name: "",
                email: "",
                cpf: "",
                phone: "",
                startDate: new Date().toISOString().split('T')[0],
                expirationDate: "",
            });

            setIsDialogOpen(false);
            alert('Associado criado com sucesso!');
            router.refresh();
        } catch (error) {
            console.error('Error:', error);
            alert('Erro ao criar associado.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Últimos 5 membros para a tabela
    const recentMembers = members.slice(0, 5);

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Painel de Controle</h1>
                    <p className="text-muted-foreground mt-1">Bem-vindo de volta, Admin</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="gap-2">
                            <UserPlus className="w-4 h-4" />
                            Novo Associado
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Cadastrar Novo Associado</DialogTitle>
                            <DialogDescription>
                                Preencha os dados do novo associado abaixo.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleCreateMember} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nome Completo *</Label>
                                <Input
                                    id="name"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="João da Silva"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email *</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="joao@exemplo.com"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="cpf">CPF *</Label>
                                    <Input
                                        id="cpf"
                                        required
                                        value={formData.cpf}
                                        onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                                        placeholder="000.000.000-00"
                                        maxLength={14}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Telefone</Label>
                                    <Input
                                        id="phone"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="(00) 00000-0000"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="startDate">Data de Início *</Label>
                                    <Input
                                        id="startDate"
                                        type="date"
                                        required
                                        value={formData.startDate}
                                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="expirationDate">Data de Vencimento *</Label>
                                    <Input
                                        id="expirationDate"
                                        type="date"
                                        required
                                        value={formData.expirationDate}
                                        onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsDialogOpen(false)}
                                    disabled={isSubmitting}
                                >
                                    Cancelar
                                </Button>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? "Cadastrando..." : "Cadastrar"}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* KPI Cards - 3 Principais */}
            <div className="grid md:grid-cols-3 gap-6">
                {/* Total Associados */}
                <div className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Total de Associados</p>
                            <p className="text-4xl font-bold text-foreground mt-2">{formatNumber(totalMembers)}</p>
                            <div className="flex items-center gap-1 mt-2">
                                <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                                <span className="text-sm text-emerald-500 font-medium">+12%</span>
                                <span className="text-sm text-muted-foreground">vs mês anterior</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                            <Users className="w-6 h-6 text-blue-500" />
                        </div>
                    </div>
                </div>

                {/* Assinaturas Ativas */}
                <div className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Assinaturas Ativas</p>
                            <p className="text-4xl font-bold text-foreground mt-2">{formatNumber(activeSubscriptions)}</p>
                            <div className="flex items-center gap-1 mt-2">
                                <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                                <span className="text-sm text-emerald-500 font-medium">+8%</span>
                                <span className="text-sm text-muted-foreground">vs mês anterior</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                        </div>
                    </div>
                </div>

                {/* Assinaturas Vencidas - Destaque */}
                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border-2 border-red-200 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-red-100 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="flex items-start justify-between relative">
                        <div>
                            <p className="text-sm font-medium text-red-600">Assinaturas Vencidas</p>
                            <p className="text-4xl font-bold text-red-600 mt-2">{formatNumber(expiredSubscriptions)}</p>
                            <div className="flex items-center gap-1 mt-2">
                                <ArrowDownRight className="w-4 h-4 text-red-600" />
                                <span className="text-sm text-red-600 font-medium">+23</span>
                                <span className="text-sm text-muted-foreground">esta semana</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-red-200 flex items-center justify-center">
                            <AlertTriangle className="w-6 h-6 text-red-600" />
                        </div>
                    </div>
                    <Button variant="destructive" size="sm" className="mt-4 w-full">
                        Ver Vencidos
                    </Button>
                </div>
            </div>

            {/* Quick Stats - 4 Cards menores */}
            <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-card rounded-xl p-4 border border-border">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-orange-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-foreground">{renewalRate}%</p>
                            <p className="text-xs text-muted-foreground">Taxa de Renovação</p>
                        </div>
                    </div>
                </div>
                <div className="bg-card rounded-xl p-4 border border-border">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-foreground">{formatNumber(newThisMonth)}</p>
                            <p className="text-xs text-muted-foreground">Novos este mês</p>
                        </div>
                    </div>
                </div>
                <div className="bg-card rounded-xl p-4 border border-border">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                            <Users className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-foreground">{formatCurrency(monthlyRevenue)}</p>
                            <p className="text-xs text-muted-foreground">Receita Mensal</p>
                        </div>
                    </div>
                </div>
                <div className="bg-card rounded-xl p-4 border border-border">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5 text-amber-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-foreground">{formatNumber(expiringIn7Days)}</p>
                            <p className="text-xs text-muted-foreground">Vencem em 7 dias</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Associates Table */}
            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-foreground">Últimos Associados Cadastrados</h2>
                            <p className="text-sm text-muted-foreground mt-1">Acompanhe os cadastros mais recentes</p>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/admin/associados">
                                Ver todos
                            </Link>
                        </Button>
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
                            {recentMembers.map((member) => {
                                const status = getMemberStatus(member.expirationDate);
                                const isActive = status === "ATIVO";
                                return (
                                    <tr key={member.id} className="hover:bg-secondary/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 font-semibold">
                                                    {member.name.charAt(0)}
                                                </div>
                                                <span className="font-medium text-foreground">{member.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground font-mono text-sm">
                                            {member.cpf}
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground">
                                            {new Date(member.expirationDate).toLocaleDateString('pt-BR')}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge
                                                variant={isActive ? "default" : "destructive"}
                                                className={cn(
                                                    "font-medium",
                                                    isActive
                                                        ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border-emerald-200"
                                                        : "bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
                                                )}
                                            >
                                                {isActive ? "Ativo" : "Vencido"}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-blue-500 hover:text-blue-600 hover:bg-blue-50"
                                                onClick={() => {
                                                    setSelectedMember(member);
                                                    setIsCardModalOpen(true);
                                                }}
                                            >
                                                <Eye className="w-4 h-4 mr-1" />
                                                Ver Carteirinha
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                            {recentMembers.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                                        Nenhum associado cadastrado ainda.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Member Card Modal */}
            <MemberCardModal
                member={selectedMember}
                open={isCardModalOpen}
                onOpenChange={setIsCardModalOpen}
            />
        </div>
    );
}
