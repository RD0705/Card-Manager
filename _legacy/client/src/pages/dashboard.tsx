import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MembersTable } from "@/components/members-table";
import { FilterButtons, type FilterStatus } from "@/components/filter-buttons";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  CreditCard,
  LogOut,
  Users,
  CheckCircle,
  XCircle,
  LayoutDashboard,
} from "lucide-react";
import type { Member } from "@shared/schema";
import { getMemberStatus } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function DashboardPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [activeFilter, setActiveFilter] = useState<FilterStatus>("all");

  const { data: members = [], isLoading } = useQuery<Member[]>({
    queryKey: ["/api/members"],
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
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso.",
      });
      setLocation("/");
    } catch {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível fazer logout.",
      });
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
            <ThemeToggle />
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
