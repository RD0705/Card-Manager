export interface Member {
    id: string;
    name: string;
    email: string;
    cpf: string;
    startDate: string;
    expirationDate: string;
    phone?: string;
    photoUrl?: string;
}

export type MemberStatus = "ATIVO" | "EXPIRADO" | "CANCELADO" | "PENDENTE";

export function getMemberStatus(expirationDate: string): MemberStatus {
    const today = new Date();
    const expiration = new Date(expirationDate);

    // Reset time part to compare only dates
    today.setHours(0, 0, 0, 0);
    expiration.setHours(0, 0, 0, 0);

    if (expiration < today) {
        return "EXPIRADO";
    }
    return "ATIVO";
}

export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}
