"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/admin-ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin-ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/admin-ui/dialog";
import { Input } from "@/components/admin-ui/input";
import { Label } from "@/components/admin-ui/label";
import { MembersTable } from "@/components/admin/members-table";
import { FilterButtons, type FilterStatus } from "@/components/admin/filter-buttons";
import {
    CreditCard,
    LogOut,
    Users,
    CheckCircle,
    XCircle,
    LayoutDashboard,
    UserPlus,
} from "lucide-react";
import type { Member } from "@/components/admin/schema";
import { getMemberStatus } from "@/components/admin/schema";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

export default function DashboardClient({ members: initialMembers }: { members: Member[] }) {
    const router = useRouter();
    const [activeFilter, setActiveFilter] = useState<FilterStatus>("all");
    const [members, setMembers] = useState<Member[]>(initialMembers);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isLoading = false;

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

    const filteredMembers = useMemo(() => {
        if (activeFilter === "all") return members;
        if (activeFilter === "active") {
            return members.filter((m) => getMemberStatus(m.expirationDate) === "ATIVO");
        }
        return members.filter((m) => getMemberStatus(m.expirationDate) === "EXPIRADO");
    }, [members, activeFilter]);

    const handleLogout = async () => {
        router.push("/");
    };

    const handleCreateMember = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Create Supabase client with service role key
            const supabase = createClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
            );

            // Insert into members table
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

            // Add to local state (optimistic) or rely on refresh
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

            // Reset form
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

    return (
        <div className="min-h-screen bg-background">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                            <CreditCard className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <span className="font-bold text-lg hidden sm:block">CardMember</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button variant="default" size="sm" className="gap-2">
                                    <UserPlus className="w-4 h-4" />
                                    <span className="hidden sm:inline">Novo Associado</span>
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

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleLogout}
                            className="gap-2"
                            data-testid="button-logout"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="hidden sm:inline">Sair</span>
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <LayoutDashboard className="w-6 h-6 text-primary" />
                        <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
                    </div>
                    <p className="text-muted-foreground">
                        Gerencie os associados e suas carteirinhas digitais
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Total de Associados
                            </CardTitle>
                            <Users className="w-4 h-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold" data-testid="stat-total">
                                {isLoading ? "-" : counts.all}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Ativos
                            </CardTitle>
                            <CheckCircle className="w-4 h-4 text-emerald-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400" data-testid="stat-active">
                                {isLoading ? "-" : counts.active}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Expirados
                            </CardTitle>
                            <XCircle className="w-4 h-4 text-red-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-red-600 dark:text-red-400" data-testid="stat-expired">
                                {isLoading ? "-" : counts.expired}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <h2 className="text-xl font-semibold">Lista de Associados</h2>
                        <FilterButtons
                            activeFilter={activeFilter}
                            onFilterChange={setActiveFilter}
                            counts={counts}
                        />
                    </div>

                    <MembersTable members={filteredMembers} isLoading={isLoading} />
                </div>
            </main>
        </div>
    );
}
