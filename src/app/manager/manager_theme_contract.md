# Manager Module — Theme Contract

> Defines the visual design tokens every `manager/` component depends on.
> Cross-reference with `globals.css` and `web_global_design.md` before adding any new UI.

---

## CSS Variables This Module Depends On

| Token | CSS Variable | Tailwind Class | Usage |
|-------|-------------|----------------|-------|
| Primary Brand | `var(--primary)` | `text-primary`, `bg-primary` | CTAs, focus rings, active nav indicator |
| Primary Hover | `var(--primary-hover)` | `bg-primary-hover` | Button hover state |
| Primary Subtle | `var(--primary-subtle)` | `bg-primary-subtle` | Active nav bg, KPI card tint |
| Page Background | `var(--bg-page)` | `bg-page` | Root page canvas |
| Card Background | `var(--bg-card)` | `bg-card` | Cards, panels, table rows |
| Sidebar Background | `var(--bg-sidebar)` | `bg-sidebar` | Sidebar shell |
| Header Background | `var(--bg-header)` | `bg-header` | Top navigation bar |
| Input Background | `var(--bg-input)` | `bg-input` | Form inputs, search boxes, selects |
| Overlay Background | `var(--bg-overlay)` | `bg-overlay` | Modal backdrops |
| Popover Background | `var(--bg-popover)` | `bg-popover` | Dropdowns, tooltips |
| Border | `var(--border)` | `border-border` | All dividers, input borders, card edges |
| Focus Border | `var(--border-focus)` | `border-border-focus` | Focus ring color |
| Primary Text | `var(--text-primary)` | `text-primary` | Main readable text |
| Secondary Text | `var(--text-secondary)` | `text-secondary` | Muted labels, captions, placeholders |
| Disabled Text | `var(--text-disabled)` | `text-disabled` | Disabled inputs, ghost states |
| Success | `var(--success)` / `var(--success-bg)` | `text-success`, `bg-success-bg` | Paid, active, checked-in |
| Warning | `var(--warning)` / `var(--warning-bg)` | `text-warning`, `bg-warning-bg` | Pending, partial, expiring |
| Danger | `var(--danger)` / `var(--danger-bg)` | `text-danger`, `bg-danger-bg` | Overdue, error, destructive |
| Info | `var(--info)` / `var(--info-bg)` | `text-info`, `bg-info-bg` | Notices, informational badges |
| Skeleton Base | `var(--skeleton-base)` | `bg-skeleton-base` | Loading skeleton blocks |
| Skeleton Highlight | `var(--skeleton-highlight)` | — | Shimmer animation highlight |

---

## Forbidden Patterns

- ❌ `bg-[var(--bg-card)]` — use `bg-card` Tailwind token instead
- ❌ `bg-[#1A1A2E]` or any hardcoded hex — define in `globals.css` first
- ❌ `bg-muted`, `text-destructive`, `text-muted-foreground`, `text-primary-foreground` — these are **shadcn** tokens, NOT this project's tokens
- ❌ `--surface`, `--muted` — these CSS variables do NOT exist in `globals.css`
- ❌ `rounded-[var(--radius-md,8px)]` — use `rounded-md` mapped via tailwind config
- ❌ Generic spinner `<Loader2 animate-spin>` for page loading — use `skeleton-shimmer` class

---

## Active Nav Pattern (Design §3)

```tsx
className={`... ${isActive
  ? 'bg-primary-subtle border-l-[3px] border-l-primary text-primary nav-active-glow font-bold'
  : 'text-secondary hover:bg-input border-l-[3px] border-l-transparent'
}`}
```

---

## Card Elevation Pattern

```tsx
<div className="card-elevated p-6">  {/* uses .card-elevated from globals.css */}
```

---

## Skeleton Loading Pattern (Design §28)

```tsx
<div className="h-8 bg-skeleton-base rounded-lg skeleton-shimmer" />
```

---

## Status Badge Pattern

```tsx
<span className="px-2 py-0.5 rounded-full text-xs font-bold bg-success-bg text-success">Active</span>
<span className="px-2 py-0.5 rounded-full text-xs font-bold bg-danger-bg text-danger">Overdue</span>
<span className="px-2 py-0.5 rounded-full text-xs font-bold bg-warning-bg text-warning">Pending</span>
```
