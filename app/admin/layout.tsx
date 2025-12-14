import AdminShell from "@/components/admin/admin-shell";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const user = await currentUser();

    // Enforce Admin Role
    if (user?.publicMetadata?.role !== 'admin') {
        redirect('/');
    }

    return (
        <AdminShell>
            {children}
        </AdminShell>
    );
}
