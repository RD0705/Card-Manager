import { Search, MoreHorizontal, Eye } from "lucide-react";
import Button from "@/components/ui/Button";
// import Input from "@/components/ui/Input"; // Replaced by SearchInput
import SearchInput from "./search-input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/admin-ui/table";
import { Badge } from "@/components/admin-ui/badge";
import { createClient } from '@/utils/supabase/server';
import Link from "next/link";

export default async function AssociadosPage({ searchParams }: { searchParams?: { status?: string } }) {
    const supabase = createClient();
    const statusFilter = (searchParams?.status || 'all') as 'all' | 'active' | 'inactive';

    let query = supabase.from('members').select('*').order('created_at', { ascending: false });
    if (statusFilter === 'active') {
        query = query.eq('status', 'active');
    } else if (statusFilter === 'inactive') {
        query = query.eq('status', 'inactive');
    }

    const { data: members, error } = await query;

    if (error) {
        console.error("Error fetching members:", error);
    }

    const getStatusBadge = (expirationDate: string | null) => {
        if (!expirationDate) {
            return (
                <Badge className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-0">
                    Pendente
                </Badge>
            );
        }
        const now = new Date();
        const expiry = new Date(expirationDate);

        if (expiry < now) {
            return (
                <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border-0">
                    Vencido
                </Badge>
            );
        }
        return (
            <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-0">
                Ativo
            </Badge>
        );
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-foreground">Associados</h1>
                <p className="text-muted-foreground">
                    Gerencie todos os associados cadastrados no sistema
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                    <SearchInput
                        className="pl-10"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Link href="/admin/associados">
                        <Button
                            variant="flat"
                            className={statusFilter === 'all'
                                ? "bg-brand-blue text-white hover:bg-brand-blue/90"
                                : "border-2 border-brand-blue text-brand-blue hover:bg-brand-blue/10"}
                        >
                            Todos
                        </Button>
                    </Link>
                    <Link href="/admin/associados?status=active">
                        <Button
                            variant="flat"
                            className={statusFilter === 'active'
                                ? "bg-brand-blue text-white hover:bg-brand-blue/90"
                                : "border-2 border-brand-blue text-brand-blue hover:bg-brand-blue/10"}
                        >
                            Ativos
                        </Button>
                    </Link>
                    <Link href="/admin/associados?status=inactive">
                        <Button
                            variant="flat"
                            className={statusFilter === 'inactive'
                                ? "bg-brand-blue text-white hover:bg-brand-blue/90"
                                : "border-2 border-brand-blue text-brand-blue hover:bg-brand-blue/10"}
                        >
                            Inativos
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Table */}
            <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-secondary/50">
                            <TableHead className="font-semibold">Nome</TableHead>
                            <TableHead className="font-semibold">CPF</TableHead>
                            <TableHead className="font-semibold">Plano</TableHead>
                            <TableHead className="font-semibold">Status</TableHead>
                            <TableHead className="font-semibold text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {members && members.length > 0 ? (
                            members.map((member: any) => (
                                <TableRow key={member.id} className="hover:bg-secondary/30">
                                    <TableCell className="font-medium">{member.full_name || 'Sem nome'}</TableCell>
                                    <TableCell className="text-muted-foreground">{member.cpf || '-'}</TableCell>
                                    <TableCell>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                            {member.plan || 'Standard'}
                                        </span>
                                    </TableCell>
                                    <TableCell>{getStatusBadge(member.expiration_date)}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="flat" className="h-8 px-2 text-xs gap-1">
                                                <Eye className="w-4 h-4" />
                                                Ver
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                    Nenhum associado encontrado.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                    Mostrando {members?.length || 0} resultados
                </p>
            </div>
        </div>
    );
}
