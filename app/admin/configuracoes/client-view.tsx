'use client';

import { UserPlus, Trash2, Shield, AlertTriangle } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Label } from "@/components/admin-ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/admin-ui/table";
import { addAdmin, removeAdmin } from './actions';
import { useRef } from 'react';

export default function SettingsClient({ admins }: { admins: any[] }) {
    const formRef = useRef<HTMLFormElement>(null);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-foreground">Configurações</h1>
                <p className="text-muted-foreground">
                    Gerencie administradores e configurações do sistema
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-card rounded-xl border border-border shadow-card p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-brand-blue-light flex items-center justify-center">
                            <UserPlus className="w-5 h-5 text-brand-blue" />
                        </div>
                        <div>
                            <h2 className="font-semibold text-foreground">Adicionar Administrador</h2>
                            <p className="text-sm text-muted-foreground">Convide um novo admin por e-mail</p>
                        </div>
                    </div>

                    <form action={async (formData) => {
                        await addAdmin(formData);
                        formRef.current?.reset();
                    }} ref={formRef} className="space-y-4">
                        <div>
                            <Label htmlFor="email">E-mail do administrador</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="novo.admin@empresa.com"
                                className="mt-1.5"
                                required
                            />
                        </div>
                        <Button className="w-full gap-2 bg-brand-orange text-white hover:bg-brand-orange/90">
                            <UserPlus className="w-4 h-4" />
                            Convidar Administrador
                        </Button>
                    </form>
                </div>

                <div className="bg-card rounded-xl border border-border shadow-card p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                            <Shield className="w-5 h-5 text-yellow-500" />
                        </div>
                        <div>
                            <h2 className="font-semibold text-foreground">Sistema</h2>
                            <p className="text-sm text-muted-foreground">Configurações gerais do sistema</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl">
                            <div className="flex items-center gap-3">
                                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                                <div>
                                    <Label htmlFor="maintenance" className="font-medium">Modo Manutenção</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Desativa acesso público temporariamente
                                    </p>
                                </div>
                            </div>
                            <div className="w-11 h-6 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl">
                            <div>
                                <Label className="font-medium">Notificações por E-mail</Label>
                                <p className="text-sm text-muted-foreground">
                                    Receber alertas de novos cadastros
                                </p>
                            </div>
                            <div className="w-11 h-6 bg-brand-blue rounded-full relative">
                                <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
                <div className="p-6 border-b border-border">
                    <h2 className="font-semibold text-foreground">Lista de Administradores</h2>
                    <p className="text-sm text-muted-foreground">
                        Todos os usuários com acesso administrativo
                    </p>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow className="bg-secondary/50">
                            <TableHead className="font-semibold">E-mail</TableHead>
                            <TableHead className="font-semibold">Função</TableHead>
                            <TableHead className="font-semibold">Adicionado em</TableHead>
                            <TableHead className="font-semibold text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {admins.map((admin) => (
                            <TableRow key={admin.id} className="hover:bg-secondary/30">
                                <TableCell className="font-medium">{admin.email}</TableCell>
                                <TableCell>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${admin.role === "Super Admin"
                                        ? "bg-brand-orange/10 text-brand-orange"
                                        : "bg-brand-blue/10 text-brand-blue"
                                        }`}>
                                        {admin.role}
                                    </span>
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                    {new Date(admin.created_at).toLocaleDateString("pt-BR")}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end">
                                        <form action={async () => {
                                            if (confirm('Tem certeza que deseja remover este administrador?')) {
                                                await removeAdmin(admin.id)
                                            }
                                        }}>
                                            <Button
                                                className="text-red-500 hover:text-red-600 bg-transparent hover:bg-red-50 h-8 px-2"
                                                disabled={admin.role === "Super Admin"}
                                                type="submit"
                                            >
                                                <Trash2 className="w-4 h-4 gap-1" />
                                                Remover
                                            </Button>
                                        </form>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
