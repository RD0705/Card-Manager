import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/admin-ui/table";
import { Button } from "@/components/admin-ui/button";
import { StatusBadge } from "@/components/admin/status-badge";
import { MemberCardModal } from "@/components/admin/member-card-modal";
import { Eye, Users } from "lucide-react";
import type { Member, MemberStatus } from "@/components/admin/schema";
import { getMemberStatus } from "@/components/admin/schema";
import { Skeleton } from "@/components/admin-ui/skeleton";

interface MembersTableProps {
    members: Member[];
    isLoading?: boolean;
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}

function formatCPF(cpf: string): string {
    if (!cpf) return "";
    const cleaned = cpf.replace(/\D/g, "");
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

function TableSkeleton() {
    return (
        <>
            {Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-28" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-8 w-24" /></TableCell>
                </TableRow>
            ))}
        </>
    );
}

function EmptyState() {
    return (
        <TableRow>
            <TableCell colSpan={7} className="h-48">
                <div className="flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                        <Users className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium text-lg mb-1">Nenhum associado encontrado</h3>
                    <p className="text-sm text-muted-foreground">
                        Não há associados que correspondam aos filtros selecionados.
                    </p>
                </div>
            </TableCell>
        </TableRow>
    );
}

export function MembersTable({ members, isLoading }: MembersTableProps) {
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleViewCard = (member: Member) => {
        setSelectedMember(member);
        setModalOpen(true);
    };

    return (
        <>
            <div className="rounded-lg border overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50">
                                <TableHead className="font-semibold text-xs uppercase tracking-wide">Nome</TableHead>
                                <TableHead className="font-semibold text-xs uppercase tracking-wide">Email</TableHead>
                                <TableHead className="font-semibold text-xs uppercase tracking-wide">CPF</TableHead>
                                <TableHead className="font-semibold text-xs uppercase tracking-wide">Data Início</TableHead>
                                <TableHead className="font-semibold text-xs uppercase tracking-wide">Vencimento</TableHead>
                                <TableHead className="font-semibold text-xs uppercase tracking-wide text-center">Status</TableHead>
                                <TableHead className="font-semibold text-xs uppercase tracking-wide text-right">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableSkeleton />
                            ) : members.length === 0 ? (
                                <EmptyState />
                            ) : (
                                members.map((member) => {
                                    const status: MemberStatus = getMemberStatus(member.expirationDate);
                                    return (
                                        <TableRow
                                            key={member.id}
                                            className="hover:bg-muted/30 transition-colors"
                                            data-testid={`row-member-${member.id}`}
                                        >
                                            <TableCell className="font-medium" data-testid={`text-name-${member.id}`}>
                                                {member.name}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground" data-testid={`text-email-${member.id}`}>
                                                {member.email}
                                            </TableCell>
                                            <TableCell className="font-mono text-sm" data-testid={`text-cpf-${member.id}`}>
                                                {formatCPF(member.cpf)}
                                            </TableCell>
                                            <TableCell data-testid={`text-start-${member.id}`}>
                                                {formatDate(member.startDate)}
                                            </TableCell>
                                            <TableCell data-testid={`text-expiration-${member.id}`}>
                                                {formatDate(member.expirationDate)}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <StatusBadge status={status} />
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleViewCard(member)}
                                                    data-testid={`button-view-card-${member.id}`}
                                                >
                                                    <Eye className="w-4 h-4 mr-2" />
                                                    Ver Carteirinha
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <MemberCardModal
                member={selectedMember}
                open={modalOpen}
                onOpenChange={setModalOpen}
            />
        </>
    );
}
