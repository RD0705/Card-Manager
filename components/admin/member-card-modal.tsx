import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/admin-ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/admin-ui/avatar";
import { StatusBadge } from "@/components/admin/status-badge";
import { Calendar, CreditCard, User } from "lucide-react";
import type { Member, MemberStatus } from "@/components/admin/schema";
import { getMemberStatus } from "@/components/admin/schema";
import { QRCodeDisplay } from "@/components/ui/qr-code-display";

interface MemberCardModalProps {
    member: Member | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
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

function getInitials(name: string): string {
    if (!name) return "";
    return name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
}

export function MemberCardModal({ member, open, onOpenChange }: MemberCardModalProps) {
    if (!member) return null;

    const status: MemberStatus = getMemberStatus(member.expirationDate);
    const isExpired = status === "EXPIRADO";

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl p-0 overflow-hidden" data-testid="modal-member-card">
                <DialogHeader className="p-6 pb-0">
                    <DialogTitle className="text-xl font-semibold flex items-center gap-2">
                        <CreditCard className="w-5 h-5" />
                        Carteirinha Digital
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                        Visualização da carteirinha digital do associado
                    </DialogDescription>
                </DialogHeader>

                <div className="p-6 pt-4">
                    <div className="relative">
                        <div
                            className={`
                relative w-full aspect-[16/10] max-w-lg mx-auto rounded-2xl overflow-hidden
                bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900
                dark:from-slate-700 dark:via-slate-600 dark:to-slate-800
                shadow-2xl
              `}
                        >
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
                                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
                            </div>

                            <div className="relative h-full p-6 flex flex-col justify-between text-white">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                                            <CreditCard className="w-6 h-6 text-primary-foreground" />
                                        </div>
                                        <div>
                                            <span className="font-bold text-lg tracking-wide">CardMember</span>
                                            <p className="text-xs text-white/70">Carteira de Associado</p>
                                        </div>
                                    </div>
                                    <StatusBadge status={status} showIcon={false} size="sm" />
                                </div>

                                <div className="flex items-end gap-6">
                                    <Avatar className="w-20 h-20 border-2 border-white/30 shadow-lg">
                                        <AvatarImage src={member.photoUrl || undefined} alt={member.name} />
                                        <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                                            {getInitials(member.name)}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="flex-1 space-y-1">
                                        <h3 className="text-xl font-bold tracking-wide" data-testid="text-member-name">
                                            {member.name}
                                        </h3>
                                        <p className="text-sm text-white/80 font-mono" data-testid="text-member-cpf">
                                            CPF: {formatCPF(member.cpf)}
                                        </p>
                                        <div className="flex items-center gap-1 text-xs text-white/70">
                                            <User className="w-3 h-3" />
                                            <span>Membro desde: {formatDate(member.startDate)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-end">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-1 text-xs text-white/70">
                                            <Calendar className="w-3 h-3" />
                                            <span>Válido até</span>
                                        </div>
                                        <p className="text-lg font-bold" data-testid="text-expiration-date">
                                            {formatDate(member.expirationDate)}
                                        </p>
                                    </div>

                                    <QRCodeDisplay value={String(member.id)} size={80} />
                                </div>
                            </div>

                            {isExpired && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px]">
                                    <div className="transform -rotate-12">
                                        <span
                                            className="text-5xl sm:text-6xl font-black text-red-500/80 tracking-wider drop-shadow-lg"
                                            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
                                            data-testid="watermark-expired"
                                        >
                                            VENCIDO
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-muted rounded-lg">
                        <h4 className="font-medium mb-2">Informações do Associado</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-muted-foreground">Email:</span>
                                <p className="font-medium" data-testid="text-member-email">{member.email}</p>
                            </div>
                            <div>
                                <span className="text-muted-foreground">Telefone:</span>
                                <p className="font-medium" data-testid="text-member-phone">{member.phone || "Não informado"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
