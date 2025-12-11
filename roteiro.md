# Plano de Migração: Frontend Vite -> Next.js App Router

Este roteiro contém todas as instruções necessárias para migrar o "Frontend dos Sonhos" (Vite) para a infraestrutura atual (Next.js 14 + Supabase + Clerk).

## 1. Mapeamento de Arquivos

| Arquivo de Origem (Vite) | Arquivo de Destino (Next.js) | Função Principal | Notas de Migração |
| :--- | :--- | :--- | :--- |
| `src/pages/Index.tsx` | `app/page.tsx` | Landing Page | Substituir `<img>` por `next/image`, `<a>` por `next/link`. |
| `src/pages/admin/AdminLayout.tsx` | `app/admin/layout.tsx` | Layout do Admin | Integrar Navbar/Sidebar fixa. Adicionar `<UserButton />` do Clerk na Sidebar. |
| `src/pages/admin/AdminDashboard.tsx` | `app/admin/page.tsx` | Dashboard Principal | Conectar dados reais do Supabase (substituir `mockAssociados`). |
| `src/components/ui/*.tsx` | `components/ui/*.tsx` | Componentes ShadCN | Copiar todos os componentes faltantes. |
| `src/index.css` | `app/globals.css` | Estilos Globais | Mesclar variáveis CSS (`:root`) e animações. |
| `tailwind.config.ts` | `tailwind.config.js` | Configuração Tailwind | Copiar extensão de tema (cores, animações, radius). |

**Observação:** No projeto de referência, as rotas `/admin/associados`, `/admin/pagamentos`, etc., apontam todas para o `AdminDashboard`. No Next.js, recomenda-se criar `app/admin/associados/page.tsx`, etc., mesmo que inicialmente sejam cópias ou placeholders.

## 2. Dependências Faltantes

Execute os comandos abaixo para instalar as bibliotecas de UI e utilitários presentes no novo design:

```bash
# Componentes UI e Utilitários (Radix, Recharts, Sonner, etc.)
npm install @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-aspect-ratio @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-context-menu @radix-ui/react-dropdown-menu @radix-ui/react-hover-card @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-tooltip
npm install embla-carousel-react input-otp recharts sonner vaul next-themes date-fns

# Garantir dependências comuns (caso não estejam atualizadas)
npm install lucide-react clsx tailwind-merge tailwindcss-animate class-variance-authority
```

## 3. Instruções de Código para o Claude Opus (Prompt Block)

Copie e cole os prompts abaixo para a IA (Opus) executar a migração por etapas.

### Tarefa A: Configuração Base e Estilização
> **Contexto:** Preciso unificar o visual. Temos um `index.css` (Vite) rico em variáveis CSS e um `globals.css` (Next.js) básico.
>
> **Ação:**
> 1. Atualize o arquivo `tailwind.config.js` do projeto Next.js com todo o conteúdo de `theme.extend` do arquivo `frontend-ref/tailwind.config.ts` (cores `brand-*`, animações, keyframes).
> 2. Copie todas as variáveis CSS dentro de `@layer base { :root { ... } }` e `.dark { ... }` do arquivo `frontend-ref/src/index.css` para o `app/globals.css`. Mantenha as diretivas do Tailwind.
> 3. Copie as classes utilitárias personalizadas (@layer utilities) de animação (`.animate-float`, `.animate-fade-in`, etc.).
> 4. Instale/Copie todos os componentes de UI da pasta `frontend-ref/src/components/ui` para `components/ui` no Next.js. Certifique-se de que eles importem o `cn` de `@/lib/utils` corretamente.

### Tarefa B: Migrar a Landing Page
> **Contexto:** Migrar a `Index.tsx` do Vite para `app/page.tsx` no Next.js.
>
> **Ação:**
> 1. Substitua o conteúdo de `app/page.tsx` pelo conteúdo de `frontend-ref/src/pages/Index.tsx`.
> 2. Refatore `<img>` para `<Image />` do Next.js. Lembre-se de configurar `width` e `height` ou `fill`. (Dica: Se forem imagens locais, mova de `frontend-ref/public` para `public` no Next.js).
> 3. Refatore tags `<a>` ou `Link` do `react-router-dom` para `Link` do `next/link`.
> 4. Verifique se há componentes interativos (que usam hooks) e adicione `'use client'` no topo do arquivo se necessário, ou extraia-os para componentes menores.

### Tarefa C: Migrar o Admin Layout e Dashboard
> **Contexto:** O Admin deve ser protegido e ter a nova Sidebar estilizada.
>
> **Ação:**
> 1. **Layout:** Crie/Atualize `app/admin/layout.tsx` baseando-se em `frontend-ref/src/pages/admin/AdminLayout.tsx`.
>    - Integre o `<UserButton />` do Clerk na posição correta da Sidebar ou Header.
>    - Adicione a verificação de autenticação (middleware já deve cuidar, mas renderize o layout com a sidebar).
> 2. **Dashboard:** Copie `frontend-ref/src/pages/admin/AdminDashboard.tsx` para `app/admin/page.tsx`.
>    - **Integração Supabase:** Onde houver `mockAssociados`, substitua por uma chamada real de dados (`supabase.from('users').select('*')`...). Se for Server Component, faça o fetch direto.
>    - Mantenha os Cards de KPI e Gráficos (Recharts) com o visual novo (`bg-card`, `shadow-card`).

## 4. Checkpoints de Estilização

Para garantir fidelidade visual, verifique se estes itens foram migrados:

- **Fonte:** O projeto novo usa `Plus Jakarta Sans`. Certifique-se de importar essa fonte em `app/layout.tsx` (via `next/font/google`) e aplicar na variável `--font-sans` ou diretamente no `body`.
- **Cores Específicas:**
    - `--brand-blue`: `210 100% 20%` (Primária)
    - `--brand-orange`: `24 100% 50%` (Acento)
    - `--success`: `142 76% 36%`
- **Sombras:** As classes `shadow-card` e `shadow-button` são customizadas no CSS. Verifique se funcionam.

---

**Fim do Roteiro.** Entregue este arquivo para que o desenvolvimento prossiga.
