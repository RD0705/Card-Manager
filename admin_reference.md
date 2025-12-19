# Referência Visual - Admin UI

Este arquivo contém o código fonte do design aprovado (projeto Lovable/Vite).
Use este código APENAS para extrair a estrutura JSX (HTML) e as classes do Tailwind.
NÃO use a lógica de estado ou os dados mockados (arrays fixos) deste arquivo.

---

## 1. Dashboard Content (Visual dos Cards e Tabela)
**Arquivo Original:** `src/pages/admin/AdminDashboard.tsx`

```tsx
import { 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp,
  MoreHorizontal,
  Eye,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const mockAssociados = [
  { id: 1, nome: "Maria Silva", cpf: "123.456.789-00", vencimento: "15/01/2025", status: "ativo" },
  { id: 2, nome: "João Santos", cpf: "987.654.321-00", vencimento: "10/12/2024", status: "vencido" },
  { id: 3, nome: "Ana Costa", cpf: "456.789.123-00", vencimento: "20/02/2025", status: "ativo" },
  { id: 4, nome: "Pedro Oliveira", cpf: "321.654.987-00", vencimento: "05/11/2024", status: "vencido" },
  { id: 5, nome: "Carla Ferreira", cpf: "654.321.987-00", vencimento: "28/03/2025", status: "ativo" },
];

const AdminDashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Painel de Controle</h1>
        <p className="text-muted-foreground mt-1">Bem-vindo de volta, Admin</p>
      </div>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Total Associados */}
        <div className="bg-card rounded-2xl p-6 border border-border shadow-card hover:shadow-card-hover transition-all duration-300">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total de Associados</p>
              <p className="text-4xl font-bold text-foreground mt-2">1,247</p>
              <div className="flex items-center gap-1 mt-2">
                <ArrowUpRight className="w-4 h-4 text-success" />
                <span className="text-sm text-success font-medium">+12%</span>
                <span className="text-sm text-muted-foreground">vs mês anterior</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-brand-blue-light flex items-center justify-center">
              <Users className="w-6 h-6 text-brand-blue" />
            </div>
          </div>
        </div>

        {/* Assinaturas Ativas */}
        <div className="bg-card rounded-2xl p-6 border border-border shadow-card hover:shadow-card-hover transition-all duration-300">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Assinaturas Ativas</p>
              <p className="text-4xl font-bold text-foreground mt-2">1,089</p>
              <div className="flex items-center gap-1 mt-2">
                <ArrowUpRight className="w-4 h-4 text-success" />
                <span className="text-sm text-success font-medium">+8%</span>
                <span className="text-sm text-muted-foreground">vs mês anterior</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-success" />
            </div>
          </div>
        </div>

        {/* Assinaturas Vencidas - Destaque */}
        <div className="bg-gradient-to-br from-destructive/5 to-destructive/10 rounded-2xl p-6 border-2 border-destructive/20 shadow-card hover:shadow-card-hover transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-destructive/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="flex items-start justify-between relative">
            <div>
              <p className="text-sm font-medium text-destructive">Assinaturas Vencidas</p>
              <p className="text-4xl font-bold text-destructive mt-2">158</p>
              <div className="flex items-center gap-1 mt-2">
                <ArrowDownRight className="w-4 h-4 text-destructive" />
                <span className="text-sm text-destructive font-medium">+23</span>
                <span className="text-sm text-muted-foreground">esta semana</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
          </div>
          <Button variant="destructive" size="sm" className="mt-4 w-full">
            Ver Vencidos
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand-orange-light flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-brand-orange" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">87%</p>
              <p className="text-xs text-muted-foreground">Taxa de Renovação</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">42</p>
              <p className="text-xs text-muted-foreground">Novos este mês</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand-blue-light flex items-center justify-center">
              <Users className="w-5 h-5 text-brand-blue" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">R$ 89k</p>
              <p className="text-xs text-muted-foreground">Receita Mensal</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">15</p>
              <p className="text-xs text-muted-foreground">Vencem em 7 dias</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Associates Table */}
      <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Últimos Associados Cadastrados</h2>
              <p className="text-sm text-muted-foreground mt-1">Acompanhe os cadastros mais recentes</p>
            </div>
            <Button variant="outline" size="sm">
              Ver todos
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
              {mockAssociados.map((associado) => (
                <tr key={associado.id} className="hover:bg-secondary/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-blue-light flex items-center justify-center text-brand-blue font-semibold">
                        {associado.nome.charAt(0)}
                      </div>
                      <span className="font-medium text-foreground">{associado.nome}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground font-mono text-sm">
                    {associado.cpf}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {associado.vencimento}
                  </td>
                  <td className="px-6 py-4">
                    <Badge 
                      variant={associado.status === "ativo" ? "default" : "destructive"}
                      className={cn(
                        "font-medium",
                        associado.status === "ativo" 
                          ? "bg-success/10 text-success hover:bg-success/20 border-success/20" 
                          : "bg-destructive/10 text-destructive hover:bg-destructive/20 border-destructive/20"
                      )}
                    >
                      {associado.status === "ativo" ? "Ativo" : "Vencido"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm" className="text-brand-blue hover:text-brand-blue hover:bg-brand-blue-light">
                      <Eye className="w-4 h-4 mr-1" />
                      Ver Detalhes
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;