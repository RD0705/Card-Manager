'use client';

import { useState } from "react";
import Link from "next/link";
import Image from 'next/image';
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import {
    LayoutDashboard,
    Users,
    CreditCard,
    Settings,
    Shield,
    Menu,
    X,
    ChevronRight
} from "lucide-react";
import { cn } from "@/utils/cn";

const sidebarLinks = [
    { label: "Visão Geral", href: "/admin", icon: LayoutDashboard },
    { label: "Membros", href: "/admin/associados", icon: Users },
    { label: "Pagamentos", href: "/admin/pagamentos", icon: CreditCard },
    { label: "Configurações", href: "/admin/configuracoes", icon: Settings },
];

export default function AdminShell({
    children,
}: {
    children: React.ReactNode
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-secondary flex">
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "fixed lg:static inset-y-0 left-0 z-50 w-72 sidebar-gradient transform transition-transform duration-300 ease-in-out lg:transform-none",
                sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            )}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-6 border-b border-sidebar-border">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Image 
                                    src="/logo.png" 
                                    alt="CheckUp Benefícios" 
                                    width={40} 
                                    height={40} 
                                    className="rounded-xl"
                                />
                                <div>
                                    <h1 className="font-bold text-sidebar-foreground">CheckUp</h1>
                                    <p className="text-xs text-sidebar-foreground/60">Admin Panel</p>
                                </div>
                            </div>
                            <button
                                className="lg:hidden text-sidebar-foreground"
                                onClick={() => setSidebarOpen(false)}
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-1">
                        {sidebarLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                                        isActive
                                            ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg"
                                            : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                                    )}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <link.icon className="w-5 h-5" />
                                    {link.label}
                                    {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Section - Integrated with Clerk */}
                    <div className="p-4 border-t border-sidebar-border">
                        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-sidebar-accent/50">
                            <UserButton
                                afterSignOutUrl="/"
                                appearance={{
                                    elements: {
                                        avatarBox: "w-10 h-10"
                                    }
                                }}
                            />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-sidebar-foreground truncate">
                                    Administrador
                                </p>
                                <p className="text-xs text-sidebar-foreground/60 truncate">
                                    Painel de Controle
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-h-screen">
                {/* Top Bar */}
                <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-lg border-b border-border h-16 flex items-center px-4 lg:px-8">
                    <button
                        className="lg:hidden mr-4 p-2 rounded-lg hover:bg-secondary transition-colors"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu className="w-6 h-6 text-foreground" />
                    </button>
                    <div className="flex-1" />

                </header>

                {/* Page Content */}
                <div className="p-4 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
