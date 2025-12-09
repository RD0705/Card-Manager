# Design Guidelines: SaaS de Gestão de Carteirinhas

## Design Approach

**Selected System**: Material Design with Shadcn UI adaptation
**Rationale**: Information-dense admin interface requiring clear hierarchy, efficient data display, and professional credibility. Material Design provides proven patterns for tables, badges, and modal interactions while maintaining visual clarity.

**Core Principles**:
- Information clarity over decoration
- Consistent status communication through color-coded badges
- Immediate visual distinction between active/expired states
- Professional, trustworthy aesthetic for B2B context

---

## Typography System

**Font Stack**: Inter (via Google Fonts)
- **Headings**: font-semibold to font-bold
  - H1 (Dashboard): text-2xl md:text-3xl
  - H2 (Sections): text-xl md:text-2xl
  - H3 (Card titles): text-lg
- **Body Text**: font-normal, text-sm to text-base
- **Table Headers**: font-medium, text-sm, uppercase tracking-wide
- **Table Data**: font-normal, text-sm
- **Badges/Labels**: font-medium, text-xs uppercase

---

## Layout System

**Spacing Primitives**: Tailwind units of 2, 4, 6, 8, 12, 16
- Component padding: p-4, p-6, p-8
- Section gaps: gap-4, gap-6, gap-8
- Margin utilities: m-2, m-4, m-6

**Container Structure**:
- Login page: max-w-md centered with min-h-screen flex
- Dashboard: Full-width layout with sidebar navigation (w-64) + main content area (flex-1)
- Data table container: max-w-7xl with p-6 md:p-8
- Modal/Card viewer: max-w-2xl centered overlay

**Grid Patterns**:
- Filter buttons: flex gap-2 horizontal layout, stack on mobile
- Table: w-full with fixed header, scrollable body
- Stats cards (if added): grid-cols-1 md:grid-cols-3 gap-4

---

## Component Library

### 1. Login Page
- Centered card (w-full max-w-md) with shadow-lg
- Logo/brand at top (h-12 mb-8)
- Form inputs with consistent height (h-10)
- Primary button full-width (w-full h-10)
- Minimal background with subtle gradient

### 2. Dashboard Layout
**Sidebar Navigation** (if desktop):
- Fixed w-64 height-full
- Logo area at top (p-6)
- Navigation items with hover states
- Bottom section for user profile

**Main Content Area**:
- Header bar: flex justify-between items-center mb-6
  - Page title (text-2xl font-semibold)
  - Action buttons (Add User, Export, etc.)
- Filter section: flex gap-2 mb-4
  - Pill-style buttons with active state indication
- Data table container with rounded-lg border

### 3. Data Table
**Structure**:
- Header: sticky top-0 with subtle background
- Rows: hover:bg-muted transition, border-b dividers
- Cell padding: px-4 py-3
- Status badge: inline-flex items-center px-2.5 py-0.5 rounded-full
  - ATIVO: Green badge (emerald-100 bg, emerald-800 text)
  - EXPIRADO: Red badge (red-100 bg, red-800 text)
- Action button: "Ver Carteirinha" as text-primary underline or ghost button

**Columns**:
1. Nome (flex-1, font-medium)
2. Email (flex-1, text-muted-foreground)
3. CPF (w-32, monospace font)
4. Data Início (w-28)
5. Vencimento (w-28)
6. Status (w-24, centered)
7. Ações (w-32, right-aligned)

### 4. Carteirinha Digital (Modal)

**Modal Overlay**: 
- Fixed inset-0 bg-black/50 backdrop-blur-sm
- Content: max-w-2xl mx-auto mt-20

**Card Design** (Credit card style):
- Aspect ratio: 16:10 (typical ID card proportion)
- Dimensions: w-full max-w-lg h-64
- Border radius: rounded-2xl
- Background: Gradient or solid with subtle pattern
- Padding: p-8
- Shadow: shadow-2xl

**Card Layout**:
```
┌─────────────────────────────────────┐
│ [Logo]              [Status Badge]  │
│                                     │
│ [Photo]  Nome Completo             │
│ 80x80    CPF: xxx.xxx.xxx-xx       │
│          Membro desde: DD/MM/YYYY  │
│                                     │
│ Válido até: DD/MM/YYYY    [QR Code]│
│                            100x100  │
└─────────────────────────────────────┘
```

**Card Elements**:
- Logo: top-left, h-8
- Status badge: top-right, same styling as table
- Photo: rounded-full w-20 h-20, absolute left-8
- Name: text-xl font-bold, pl-28 (offset from photo)
- Details: text-sm, pl-28, space-y-1
- Expiry date: bottom-left, font-medium
- QR Code: bottom-right, w-24 h-24, placeholder with border

**Expired Overlay**:
- When expired: Add diagonal watermark stripe
- Position: absolute inset-0 with rotate-[-15deg]
- Text: "VENCIDO" in text-6xl font-black opacity-20
- Alternative: Red border-4 around entire card

---

## Filter System
- Button group with border rounded-lg overflow-hidden
- Each button: px-4 py-2, transition-colors
- Active state: solid background, white text
- Inactive state: transparent background, muted text
- States: "Todos" | "Ativos" | "Expirados"

---

## Icons
**Library**: Lucide React (as specified)
- Table actions: Eye, Edit2, Trash2
- Navigation: LayoutDashboard, Users, Settings
- Status indicators: CheckCircle (active), XCircle (expired)
- Filters: Filter, X (clear filter)
- Modal close: X
- Size: Consistent w-4 h-4 or w-5 h-5

---

## Responsive Behavior
- **Mobile (< 768px)**:
  - Hide sidebar, use hamburger menu
  - Table becomes horizontally scrollable
  - Stack filter buttons vertically
  - Carteirinha modal: full-screen overlay, reduce padding
  
- **Tablet (768px - 1024px)**:
  - Collapsible sidebar
  - Table remains full-width
  - Filters stay horizontal

- **Desktop (> 1024px)**:
  - Full sidebar visible
  - Table with comfortable spacing
  - Modal centered with backdrop

---

## Images
No hero images required - this is a utility dashboard. Use:
- Placeholder user photos in table/cards (via UI Avatars or similar)
- Logo placeholder in login and sidebar
- QR code placeholder in membership card (simple border box with text "QR CODE")