# SMART GYM 360 — GLOBAL DESIGN SYSTEM
> **Prepend this block to EVERY module you give to Stitch.**
> This ensures visual consistency across all 109 pages.
> Stack: Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind CSS · shadcn/ui components

### Specific Restrictions (The ERP Context)
- **Dashboard Consistency:** The ERP relies on the 5-color core architecture (Gold Primary, Blue Info, Green Success, Amber Warning, Red Danger).
- **CTA Gradients (Restricted):** Aggressive gradients (e.g., `#F97316` to `#EF4444`) are **strictly restricted** to Landing Page hero CTAs. They must NEVER be used inside the authenticated ERP dashboard.
- **Social Media Brands:** Official brand colors for social integrations (WhatsApp `#25D366`, Facebook `#1877F2`, YouTube `#FF0000`, Instagram `#E1306C`) MUST be preserved in their native colors. Do not tint or re-color them to match the ERP theme.

---

## 1. COLOR PALETTE

*Note: For v1, the system defaults to Dark Mode. Light mode values are provided below for future-proofing and consistency.*

### Core Colors (The "Luxury Premium Gold" Theme)
| Token | Dark Mode (Default) | Light Mode | Usage |
|---|---|---|---|
| `--primary` | `#FACC15` (Premium Gold) | `#EAB308` | Primary buttons, active nav item, links |
| `--primary-hover` | `#EAB308` (Yellow-500) | `#CA8A04` | Primary button hover state |
| `--primary-subtle` | `rgba(250, 204, 21, 0.15)` | `#FEF9C3` | Soft badge backgrounds, selected row highlight |
| `--bg-page` | `#050505` (Soft Black) | `#F4F4F5` | Main page background |
| `--bg-card` | `#111111` (Elevated Dark) | `#FFFFFF` | Card, panel, table background |
| `--bg-sidebar` | `#050505` (Soft Black) | `#FAFAFA` | Sidebar background |
| `--bg-header` | `#111111` (Elevated Dark) | `#FFFFFF` | Top header background |
| `--bg-input` | `#1A1A1A` (Deep Gray) | `#FFFFFF` | Input field background |
| `--border` | `#27272A` (Zinc-800) | `#E4E4E7` | Card borders, table dividers, input borders |
| `--border-focus` | `#FACC15` | `#EAB308` | Input border on focus |
| `--text-primary` | `#FFFFFF` | `#000000` | All primary text, headings, table values |
| `--text-secondary` | `#A1A1AA` | `#52525B` | Labels, captions, placeholder text |
| `--text-disabled` | `#52525B` | `#A1A1AA` | Disabled states |
| `--skeleton-base` | `#111111` | `#E4E4E7` | Loading skeleton base color |
| `--skeleton-highlight`| `#1A1A1A` | `#F4F4F5` | Loading skeleton shimmer highlight |

### Status Colors (Strictly for statuses)
| Token | Text Color | Background Color | Usage |
|---|---|---|---|
| `--success` | `#22C55E` (Stronger Fitness Green) | `#064E3B` | Active / Working / Present / Resolved |
| `--warning` | `#F59E0B` (Amber) | `#451A03` | Pending / Expiring / Held |
| `--danger` | `#EF4444` (Red) | `#450A0A` | Overdue / Suspended / Broken |
| `--info` | `#3B82F6` (Blue) | `#1E3A5F` | New / Neutral |
| `--purple` | `#C084FC` | `#3B0764` | Ex-Members / Alumni / Custom Tags |

### Payment Mode Colors (Separated to avoid status collision)
| Token | Text Color | Background Color | Usage |
|---|---|---|---|
| `--pay-cash` | `#5EEAD4` (Teal) | `#134E4A` | Cash payments |
| `--pay-upi` | `#67E8F9` (Cyan) | `#164E63` | UPI payments |
| `--pay-card` | `#94A3B8` (Slate)| `#1E293B` | Card payments |
| `--pay-bank` | `#38BDF8` (Sky) | `#0C4A6E` | Bank Transfers |

### Border Radius Scale
| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | `4px` | Small elements, checkboxes |
| `--radius-md` | `8px` | Buttons, Inputs, standard elements |
| `--radius-lg` | `12px` | Cards, Panels, standard containers |
| `--radius-xl` | `16px` | Modals, large surface areas |
| `--radius-full`| `999px` | Status badges, circular avatars |

---

## 2. TYPOGRAPHY

- **Font Family:** `Inter` — loaded via `next/font/google` (NOT Google Fonts CDN `@import`): `import { Inter } from 'next/font/google'`
- **Base font-size:** 14px

| Role | Size | Weight | Color | Usage |
|---|---|---|---|---|
| Page Title (H1) | 22px | 700 Bold | `--text-primary` | One per page, top-left |
| Section Heading (H2) | 16px | 600 SemiBold | `--text-primary` | Section titles inside cards |
| Card Label | 11px | 500 Medium | `--text-secondary` | UPPERCASED stat card labels |
| Stat Number | 28px | 700 Bold | `--text-primary` | Big KPI numbers on dashboard cards |
| Table Header | 12px | 600 SemiBold | `--text-secondary` | UPPERCASED column headers |
| Table Cell | 14px | 400 Normal | `--text-primary` | Row data values |
| Button Text | 14px | 500 Medium | White / `--primary` | Primary / ghost buttons |
| Input Text | 14px | 400 Normal | `--text-primary` | User-typed values |
| Caption / Helper | 12px | 400 Normal | `--text-secondary` | Below inputs, footnotes |
| Error Message | 12px | 400 Normal | `--danger` | Below invalid input fields |
| Badge Text | 11px | 600 SemiBold | Varies | Status pill labels |

---

## 3. APP SHELL LAYOUT

Every authenticated page uses this shell. Auth pages (`login`, `signup`, `forgot-password`, `reset-password`) do NOT use this shell.

```
┌──────────────────────────────────────────────────────────────────┐
│  TOP HEADER (height: 64px, position: fixed, top: 0, full-width)  │
│  [☰ Collapse] [📚 Smart Gym 360 Logo]  ··· [🏢 Branch Name ▼] [🔔 Bell (badge count)] [👤 Avatar + Name ▼]  │
├────────────────┬─────────────────────────────────────────────────┤
│  SIDEBAR       │  MAIN CONTENT AREA                              │
│  width: 240px  │  margin-left: 240px                            │
│  (collapsible  │  padding: 24px                                 │
│   to 60px,     │  margin-top: 64px (below header)               │
│   icon-only    │                                                 │
│   mode on      │  [Breadcrumb: Dashboard > Students > Profile]  │
│  position:     │  [Page Title (H1) + subtitle]                  │
│  fixed, left:0 │  [Action Bar: filters left + CTA buttons right] │
│  bg: --bg-sidebar                                               │
│  border-right: │  *Note: Sidebar nav items scroll independently  │
│  1px --border  │  (overflow-y-auto), header/toggle stay pinned.* │
└────────────────┴─────────────────────────────────────────────────┘
```

### Sidebar Nav Groups & Items (in order)
Each nav item has: [Icon] Label · Active state = Gold left border + `--primary-subtle` background + subtle gold glow (`box-shadow: 0 0 15px rgba(250,204,21,.15)`)

```
📊  Dashboard
📈  Reports
── CRM ──────────────────────
📞  Enquiries
── Members ──────────────────
🏋️  All Members
➕  New Membership
👥  Group Membership
🛑  Ex-Members
🗄️  Document Vault
🏅  Referral Bonus
── Lockers & Batches ────────
🗺️  Locker Matrix
🔒  Lockers
🔄  Batches
↔️  Batch Migration
📋  Allocations
📜  Locker History
── Finance ──────────────────
💰  Collect Fee
📋  Subscriptions
🔁  Renewals
💳  Payments
🤝  Payment Promises
🛡️  Trust Scores
💼  Security Deposits
⏰  Late Fees
🚫  Auto-Suspend
🧾  Invoice
🧾  Receipt
👥  Referrals
💸  Refunds
── Operations ───────────────
📅  Attendance
📋  Absentee Report
📷  QR Scanner
📅  Holiday Calendar
── Accounts & Assets ────────
💸  Expenses
📊  Financial Reports
📊  Daily Settlement
🔒  Locker Gap Report
🔍  Batch Gap Analyzer
🏭  Assets
🔧  Asset Maintenance
── Communication ─────────────
📢  Notices
💬  Complaints
🔔  Notification Center
📱  WhatsApp Logs
📱  WhatsApp Templates
── Admin ─────────────────────
🏢  Branches
👥  Staff & Users
🔑  Permissions
💰  Plans
🎟️  Coupons
⏳  Waitlist
🚫  Blacklist
🔍  Audit Logs
📤  Bulk Import
📥  Data Export
💾  Backups
🧾  GST & Tax Settings
── System ────────────────────
⚙️  Settings
👤  Profile
🎨  Branding
📱  WhatsApp Integration
```

---

## 4. STATUS BADGE RULES (Universal — Apply to ALL pages)

> **CRITICAL ARCHITECTURE RULE:** The status-to-color mapping MUST live in a single constants file (e.g. `src/config/statusBadgeConfig.ts`), never as inline if/else or switch-case statements inside individual components. (Consistent with Frontend Rule 3/35).

Badges are small pill-shaped labels: `border-radius: var(--radius-full)`, `padding: 2px 10px`, `font-size: 11px`, `font-weight: 600`.

| Status Value | Text Color | Background | Icon |
|---|---|---|---|
| Active / Working / Present / Sent / Delivered / Resolved / Paid / Fulfilled | `--success text` | `--success bg` | ✅ |
| Expiring Soon / Pending / In-Progress / Moderate / Maintenance / Held / Late | `--warning text` | `--warning bg` | ⚠️ |
| Occupied / Suspended / Failed / Low Trust / Overdue / Due / Broken | `--danger text` | `--danger bg` | 🔴 |
| Exited / Inactive / Expired / Lost / Cancelled / Forfeited | `--text-secondary` | `#1E1E2E` | — |
| New / Interested / Visited | `--info text` | `--info bg` | 🔵 |
| Alumni | `--purple` | `--purple-bg` | 🟣 |
| Blacklisted | `#FCA5A5` | `#7F1D1D` | ⛔ |

*(Note: Payment Modes (Cash, UPI, Card, Bank) use `--pay-*` tokens mapped in Section 1 to avoid visual collision with these statuses.)*

---

## 5. REUSABLE COMPONENT PATTERNS

### 5a. KPI / Stat Card
- Size: roughly 200–260px wide, height ~120px
- Structure: Top-left icon (32px, in a rounded square with subtle color background) + label (UPPERCASE, 11px, `--text-secondary`) · Below: Big number (28px bold, `--text-primary`) · Bottom: Trend line ("↑ 12% vs last month" in green, or "↓ 3%" in red)
- Background: Subtle premium gold gradient `linear-gradient(180deg, rgba(250,204,21,0.08), rgba(255,255,255,0.02))` over `--bg-card`, border: `1px solid --border`, border-radius: var(--radius-lg)
- Arranged in a row of 3–5 cards at the top of dashboard/report pages

### 5b. Data Table
- Header row: `background: rgba(250,204,21,0.05)`, UPPERCASE 12px `--text-secondary`, sortable columns show ↑↓ arrows on hover
- Data rows: alternating subtle zebra stripe (`--bg-card` / slightly lighter), 48px row height
- Row hover: `background: rgba(250,204,21,0.08)`, subtle highlight
- Inline row actions (rightmost column): small icon buttons — ✏️ Edit, 🗑️ Delete — shown on row hover. **There is NO View/Eye button — clicking the entire row opens the detail view (see Frontend Rule 19).**
- Pagination bar (below table): "Showing 1–25 of 143 results" + Previous / Next buttons + rows-per-page selector (10 / 25 / 50)
- Empty state (no rows): Centered SVG illustration + "No [items] found" (16px, `--text-secondary`) + optional CTA button

#### Table Accessibility and Interaction Rules
- Tables must preserve semantic HTML structure: `table`, `thead`, `tbody`, `th`, `td`.
- Sortable headers must expose current sorting state through accessible labels.
- Row-click navigation must not prevent keyboard users from reaching inline actions.
- Row actions must be keyboard accessible.
- On mobile, choose one documented pattern:
  1. Horizontal scroll with frozen primary identifier, or
  2. Convert each record into an accessible card layout.
- Never hide essential financial, status, or permission information solely because of viewport size.

### 5c. Form Layout
- **Simple form** (≤6 fields): single column, centered card, max-width 560px
- **Complex form** (>6 fields): two-column grid inside a full-width card, grouped in labeled sections separated by a horizontal rule
- Each field: Label above (14px, `--text-secondary`, bold) → Input below → Helper/error text below input (12px)
- Required fields: Label has red asterisk `*`
- Input styling: `background: --bg-input`, `border: 1px solid --border`, border-radius: var(--radius-md), padding: 10px 14px, focus: `border-color: --border-focus` + subtle gold glow
- Form footer: Buttons right-aligned — Cancel (ghost) | Save/Submit (primary)

#### Form Interaction States
Every form field must explicitly support:
- Default
- Hover
- Focus-visible
- Filled
- Validation error
- Validation success where meaningful
- Disabled
- Read-only
- Loading/submitting

Accessibility requirements:
- Every input must have a programmatically associated `<label>`.
- Error text must be connected through `aria-describedby`.
- Invalid fields must expose `aria-invalid="true"`.
- Required fields must be marked semantically, not only through color.
- Error messages must be announced accessibly where appropriate.

### 5d. Modal / Dialog
- Overlay: `backdrop: rgba(0,0,0,0.6)`, centered, **`z-40`** (Tailwind class — see Section 12 Z-Index Scale)
- Modal card: `background: var(--bg-card)`, border-radius: var(--radius-xl), padding: 28px, max-width: 480px
- Structure: Title (18px bold) + Description text + Content area + Footer buttons
- **Confirmation/Destructive modal:** Icon = ⚠️ (amber) or 🗑️ (red) · Description explains what will happen · Buttons: "Cancel" (ghost, left) + "Confirm" (danger red, right)
- **Form modal / Drawer:** Slide-in from right, width 480px, full-height, has its own form + Save/Cancel footer

### 5e. Visual Grid (Locker / Equipment Matrix)
- CSS Grid, auto-fill columns (8–10 per row depending on count)
- Each cell: 64×64px, rounded: var(--radius-md), colored by status (see badge rules above)
- Cell content: locker/equipment number centered (bold, 13px)
- Hover: scales up slightly (transform: scale 1.05), shows tooltip popover (member name + batch + expiry)
- Empty cell (free): click → quick-assign action
- Occupied cell (red): click → navigates to `member-profile.tsx`

### 5f. Kanban Board
- Horizontal scrollable columns container
- Each column = a status lane: header with status badge + count · Cards stacked vertically below
- Card: `background: --bg-card`, border-radius: var(--radius-lg), padding: 14px, border-left: 3px solid [status color]
- Card content: Name (bold), Phone (masked: 98****2310), tag/badge for batch or date

### 5g. Wizard / Stepper
- Left panel: vertical step list numbered 01–05, active step in `--primary`, completed steps with ✅ checkmark
- Right panel: current step form content
- Top: progress bar (fills from 0% → 100% as steps complete)
- Footer: "← Back" ghost button (left) + "Next →" primary button (right)

### 5h. Timeline (for follow-ups, history logs)
- Vertical line on left (2px, `--border`)
- Each entry: colored dot on line + date (bold, `--text-secondary`) + content card to the right
- Newest entry at top

### 5i. Command Palette (Ctrl+K)
- **Overlay:** `backdrop: rgba(0,0,0,0.6)`
- **Modal card:** Centered, top-aligned (margin-top: 10vh), max-width 600px.
- **Content:** Large input field with magnifying glass icon `🔍 Search or jump to...`.
- **Results:** Grouped by category (e.g., Pages, Recent Members, Actions) with keyboard up/down navigation support.
- **Trigger:** Global `Ctrl+K` listener on all pages.

### 5j. Confirmation Drawer (Not just Modal)
- **Usage:** For complex confirmations requiring data context (e.g., "You are about to refund ₹5,000. Here are the transaction details: [...]").
- **Layout:** Slide-in from the right side, width 480px, full-height.
- **Footer:** Cancel (ghost) | Confirm Action (danger or primary).

### 5k. Inline Editable Cell Pattern
- **Usage:** For rapid editing inside data tables without opening a modal.
- **Default State:** Text display with `truncate`.
- **Active State (On click):** Input field appears in-place with `--border-focus` ring.
- **Save (On blur/Enter):** Save changes and revert to text display.
- **Cancel (On Escape):** Revert without saving.
- **Loading:** Show a small spinner inside the cell while the API call is in flight.

---

## 6. FEEDBACK & STATE PATTERNS

### Toast Notifications
- Position: Bottom-right corner, fixed
- Size: 320px wide, padding: 16px, border-radius: var(--radius-lg)
- ✅ Success: green left border + "✅ [message]"
- ❌ Error: red left border + "❌ [message]"
- Auto-dismiss after 4 seconds with slide-out animation

### Loading State
- Show skeleton loaders (using `--skeleton-base` and `--skeleton-highlight`) that match the exact layout of the page content
- Tables: show 5–8 skeleton rows with random widths
- Stat cards: show shimmer blocks the size of the card

### Empty State
- Centered in the content area
- Simple SVG icon (related to the entity — e.g., 🎓 for students, 💳 for payments)
- Heading: "No [items] yet" (16px, `--text-secondary`)
- Subtext: "Get started by adding your first [item]" (13px, `--text-secondary`)
- CTA button: Primary button "➕ Add [item]" (if user has permission)

### Form Validation
- Validate on submit + on blur
- Error: red border on input (`border-color: --danger`) + error message below (12px, `--danger`)
- Success: green border on input after valid value entered

### Confirmation Dialogs (REQUIRED FOR these actions)
Always show a modal before executing: Delete, Soft-Delete, Blacklist, Suspend, Mark Exit, Forfeit Deposit, Close Register, Process Refund, Remove from Waitlist, Revoke Permission.

---

## 7. BUTTON HIERARCHY RULES

| Type | Style | Usage |
|---|---|---|
| **Primary** | Solid `--primary` background, white text, border-radius: var(--radius-md), padding: 10px 20px | Main CTA per page (one per view) |
| **Danger Primary** | Solid `--danger` background, off-white text (to pass WCAG contrast) | Destructive confirm actions (Delete, Blacklist, Exit) |
| **Ghost / Outlined** | Transparent bg, `--border` border, `--text-primary` text | Secondary actions (Cancel, Export, Back) |
| **Ghost Danger** | Transparent bg, `--danger` border, `--danger` text | Soft destructive (Mark Lost, Deactivate) |
| **Icon Button** | 32×32px circle or square, icon only | Inline table row actions (Edit ✏️, Delete 🗑️) |
| **Text Link** | No bg, no border, `--primary` text, underline on hover | Navigation links, "Forgot Password?", "Add Category" |
| **Segmented Control** | Joined button group, selected = `--primary` bg | Payment mode selector (Cash/UPI/Card), view toggles |

### Button Placement Rules
- **Page-level CTA** (e.g., "Add Student", "New Admission"): TOP-RIGHT of the action bar
- **Form submit** (e.g., "Save", "Confirm"): BOTTOM-RIGHT of the form card
- **Destructive** (e.g., "Delete", "Blacklist"): Always paired with "Cancel" ghost button to its LEFT
- **Inline row actions**: Rightmost column of data tables, shown on row hover only
- **Wizard "Next/Back"**: Footer of wizard step — Back (left ghost) | Next (right primary)

---

## 8. RESPONSIVE BEHAVIOR

| Breakpoint | Behavior |
|---|---|
| Desktop ≥1280px | Full sidebar (240px) + full content. Tables show all columns. |
| Tablet 768–1279px | Sidebar collapses to icon-only (60px). Tables scroll horizontally. |
| Mobile <768px | Sidebar hidden, accessible via hamburger menu drawer. Tables become card-stacks. Forms single-column. KPI cards use horizontal scroll or 2-col grid. Charts use reduced height & simplified legend. |

---

## 9. ICON DICTIONARY & STYLING (Elite SaaS Standard)

> **CRITICAL RULE:** Emojis used in this document (📊, ✅, 🔴, 🎓, etc.) are strictly shorthand for human readability. Actual implementation MUST use the **exact Lucide icon component** specified below. NEVER mix icon families.

### 9a. Icon Styling Rules
- **Size:** `size={18}` (18px is the sweet spot; do not use 16px or 24px).
- **Weight:** `strokeWidth={2}` (Never mix 1.5 and 2).
- **Default State:** `text-zinc-400`
- **Hover State:** `text-white`
- **Active State:** `text-yellow-400` (Gold)

### 9b. The Fixed Page-by-Page Dictionary
| Module / Page | Lucide Icon | Rationale |
|---|---|---|
| **Dashboard** | `LayoutDashboard` | Instantly recognizable structure |
| **Reports** | `FileBarChart` | Better than generic charts |
| **All Members** | `Users` | Standard |
| **New Membership** | `UserPlus` | Standard |
| **Ex-Members** | `UserMinus` | `UserX` implies a ban/error |
| **Referral Bonus** | `Gift` | Psychologically rewarding |
| **Lockers** | `Lock` | Standard |
| **Locker Matrix** | `Grid3X3` | Matrix = visualization |
| **Batches** | `Clock` | Time-based groups |
| **Batch Migration** | `ArrowRightLeft` | Indicates movement |
| **Attendance** | `CalendarCheck` | Better than generic calendar |
| **QR Scanner** | `ScanLine` | Modern physical feel |
| **Collect Fee** | `IndianRupee` | Currency specific |
| **Payments** | `Wallet` | Standard |
| **Refunds** | `Undo2` | Clear reversal |
| **Trust Scores** | `ShieldCheck` | Trust = Security, not trophies |
| **Complaints** | `MessageSquareWarning` / `TriangleAlert` | Clear escalation |
| **Audit Logs** | `History` | Enterprise tracking |
| **Backups** | `DatabaseBackup` | Data safety |
| **Settings** | `Settings` | Standard |

> 🚫 **DO NOT ABUSE THE DUMBBELL ICON:** Use `Dumbbell` ONLY for Workout/Equipment specific modules. Using it for members or CRM looks amateur.

---

## 10. CHART STYLE GUIDE (for `reports.tsx`, `financial-reports.tsx`, `dashboard.tsx`)

**Canonical chart library: ApexCharts** (`react-apexcharts`). Do NOT use Recharts or Chart.js — the project uses ApexCharts exclusively.

| Chart Type | Colors | Usage |
|---|---|---|
| Bar Chart (grouped) | Income bars: `#FACC15` (Gold) · Expense bars: `#EF4444` (Red) | Income vs Expense monthly comparison |
| Line Chart | Line: `#22C55E` (Green) · Area fill: `rgba(34,197,94,0.15)` | Revenue trend over months |
| Pie / Donut Chart | Slice colors: Gold, Emerald, Amber, Blue, Purple, Red (in that order) | Shift occupancy, expense category breakdown |
| Horizontal Bar | Single color: `#FACC15` | Equipment utilization, member growth |

All charts: dark background (`--bg-card`), `--text-secondary` axis labels, gridlines `rgba(255,255,255,0.05)`, tooltips with dark card style matching the design system.

---

## 11. THEMING & DARK/LIGHT MODE

1. **Never use hardcoded Tailwind colors** for backgrounds or text (e.g., `bg-white`, `bg-gray-900`, `text-black`, `text-white`) unless explicitly required for a specific UI element (like a primary button where text is always white).
2. **The One Canonical Pattern for CSS Variables:** Define the variable in `globals.css` → map it as a named token in `tailwind.config.ts` → use the Tailwind class name in JSX (e.g., `bg-card`, `text-primary`). **Never use `bg-[var(--bg-card)]` or `bg-[#1A1A2E]` directly in JSX.**
3. **Theme Provider**: Ensure the app is wrapped in a `ThemeProvider` (like `next-themes`) that toggles a `.dark` class on the `<html>` or `<body>` tag.
4. **CSS Setup**: In your global CSS file (e.g., `globals.css`), define the light mode variables inside `:root { ... }` and the dark mode variables inside `.dark { ... }`.
5. **Gradients & Shadows**: For gradients and shadows, use variables like `var(--primary)` instead of hardcoded hex/rgba. Note that shadows like `shadow-black/50` will need to switch to `shadow-gray-200/50` or similar when implementing Light Mode.

---

## 12. PREMIUM UI & MICRO-INTERACTIONS (The WOW Factor)

1. **Universal Micro-Animations:** No interactive element should change state instantly.
   - Apply `transition-all duration-200 ease-in-out` universally to buttons, cards, list items, and dropdown items.
   - **Hover effects:** Cards should elevate (`hover:-translate-y-1 hover:shadow-lg`), and buttons should have subtle brightness changes.
   - **Active states:** Buttons should scale down slightly when clicked (`active:scale-95`).
2. **Glassmorphism & Depth (Z-Axis Elevation):**
   - **Sticky Headers:** Must not be solid flat colors. Use translucent backgrounds with blur (e.g., `bg-[var(--bg-header)]/80 backdrop-blur-md`).
   - **Modals, Tooltips, & Dropdowns:** Must use deep, soft shadows to create physical separation from the background (e.g., `shadow-2xl shadow-black/50` in dark mode).
3. **Custom Premium Scrollbars:**
   - Implement custom thin scrollbars globally via CSS: `::-webkit-scrollbar { width: 6px; height: 6px; }`, with a rounded thumb (`bg-[var(--border)]`) and a transparent track.
4. **Strict Z-Index Layering Scale:**
   - `z-10`: Sticky Table Headers & Sticky Action Bars
   - `z-20`: Top App Header (Navbar)
   - `z-30`: Popovers, Tooltips, & Dropdowns
   - `z-40`: Modal Overlays & Dialogs
   - `z-50`: Toast Notifications & Critical Alerts

---

## 13. ENTERPRISE UX SAFEGUARDS & ACCESSIBILITY

1. **Data Overflow Strategy (Truncation + Tooltips):** Use `truncate` and wrap with a Tooltip.
2. **Irreversible Action Safeguards ("Type-to-Confirm"):** For highly destructive actions, require typing a confirmation phrase.
3. **Enterprise Accessibility (WCAG Focus Rings):** Provide explicit `focus-visible` styles.
4. **Keyboard Navigation and Screen Reader Requirements:** Ensure full keyboard operability, focus trapping in dialogs, accessible labels, and non-color-only status cues.

---

## 14. PRINT & EXPORT STYLES
- **`@media print` rules:** Hide sidebar, header, action bars, and toast notifications.
- **Print typography:** Ensure black text on a pure white background.
- **Pattern:** Use a `PrintableWrapper` component for printable areas.

---

## 15. GLOBAL KEYBOARD SHORTCUT MAP
- `Ctrl + K`: Global search/command palette
- `Esc`: Close any open modal, drawer, or dropdown
- `Ctrl + S`: Submit the active form
- `?`: Show a keyboard shortcut help overlay

---

## 16. NOTIFICATION & ALERT BANNER PATTERNS
- **Placement:** Below the top header, pushing page content down.
- **Usage:** Subscription expiry warnings, maintenance mode alerts.
- **Styles:** Background colors from Section 1 (e.g., `--warning-bg`). Include dismiss `X` icon.

---

## 17. DATA DENSITY MODES
- **Compact Mode:** 32px row height, smaller font (12px).
- **Comfortable Mode (Default):** 48px row height, standard 14px font.
- **Implementation:** Toggle in settings/header; persist with `useLocalStorage` hook.

---

## 18. RIGHT-CLICK CONTEXT MENU PATTERN
- Actions: Edit, Delete, Copy ID. No View button.
- Styling: Small dropdown with `shadow-2xl` and `z-30`.

---

## 19. TOOLTIP DESIGN SPECIFICATION
- Background: `var(--bg-card)` with `1px solid var(--border)`.
- Typography: `12px`, `var(--text-primary)`.
- Layout: `max-width: 240px`, word-wrap enabled.
- Arrow: Small triangle.
- Animation/Delay: 300ms show, 100ms hide.
- Z-index: `z-30`.

---

## 20. FORM FIELD DISABLED & READ-ONLY STATES
- **Disabled:** `opacity: 0.5`, `cursor: not-allowed`.
- **Read-only:** Full opacity, `cursor: default`, subtle `--border` dashed.
- **Filled/Success:** `border-color: --success` with checkmark icon.

---

## 21. NUMBER & CURRENCY FORMATTING RULES
- **Currency:** Indian format (`₹1,23,456.00`).
- **Large Numbers:** Abbreviate (`₹12.4L`, `₹2.3Cr`).
- **Percentages:** 1 decimal (`12.5%`).
- **Negative Numbers:** Red `--danger` with minus sign.
- Centralized in `src/lib/formatters.ts`.

---

## 22. TABLE COLUMN WIDTH STRATEGY
- ID: `w-24`
- Name: flexible, `min-width`, `truncate`
- Status Badge: `w-28`
- Date: `w-32`
- Amount/Number: fixed, right-aligned
- Action: `w-20`

---

## 23. RESPONSIVE AND MOBILE INTERACTION POLICY
- Central breakpoints, sidebars collapse into drawer, minimum touch target 44×44px, test on all devices.

---

## 24. ASYNC UI STATE SYSTEM
- Loading, Empty, Error, Permission-Denied, Offline states defined.

---

## 25. DRAG & DROP INTERACTION PATTERN
- Library: `@dnd-kit/core`.
- Dragging: `opacity: 0.5`, `cursor: grabbing`, `scale-105`.
- Valid Drop Target: `border: 2px dashed var(--primary)`, background `rgba(250,204,21,0.08)`.
- Invalid Drop Target: `border: 2px dashed var(--danger)`.
- Animation: `transition: transform 200ms ease`.

---

## 26. LOADING BUTTON STATE
- Replace text with `Loader2` spinner, disable button, retain width.

---

## 27. MOBILE CARD-STACK TABLE PATTERN
- Cards with title, status badge, label/value pairs, actions at bottom or `...` menu.

---

## 28. GLOBAL LOADING, EMPTY, & ERROR STATES
- Top routing progress bar (`nextjs-toploader`) with `--primary`.
- `loading.tsx` skeleton UI.
- `error.tsx` with retry button.
- `not-found.tsx` branded 404.

---

## 29. MOTION ACCESSIBILITY — `prefers-reduced-motion` Compliance (WCAG 2.2 Mandatory)
- Use `motion-safe:` and `motion-reduce:` prefixes.
- Global CSS override to disable motion when reduced.
- Motion token scale defined.

---

## 30. DARK MODE SURFACE ELEVATION SCALE (Depth Without Shadows)
- Add `--bg-floating`, `--bg-overlay`, `--bg-popover` to `globals.css` and map in `tailwind.config.ts`.
- Modals use `bg-overlay`; dropdowns use `bg-popover`.
- Add borders for dark mode elevation.
- Z-index matches elevation layers.

---

*END OF GLOBAL DESIGN SYSTEM — Paste this block before every module you give to Stitch.*
