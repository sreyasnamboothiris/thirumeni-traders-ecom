# 📗 Thirumeni Traders — Project Specification

**Project:** Thirumeni Traders E-commerce Platform
**Developer:** Sreyas S
**Type:** Single-dev, part-time monolith (Laravel + Inertia + React)
**Status of this doc:** Living document — update as scope evolves
**Related docs:**
- `Tracker/Thirumeni Traders Sprint 01 phase 01 Layout Ui layer.md` (Phase 1 plan)
- `Database/CartTable.md` (cart design notes)

---

## 1. Overview

An e-commerce platform for Thirumeni Traders with two surfaces:

| Surface | Purpose |
|---|---|
| **Admin panel** | Manage products, categories, brands, customers, users |
| **Public storefront** | Browse/search products, view details, cart & checkout |

A **core requirement** is full **bilingual support (English ⇄ Malayalam)**:
1. **UI language switching (i18n)** — all interface text toggles between EN and ML
2. **Live transliteration input** — admins can type English letters that convert live into Malayalam script when entering Malayalam data (Google Input Tools style)

### Goals
- Clean, maintainable codebase a single part-time dev can sustain
- Reusable layout + form/listing components for fast future modules
- Bilingual-first data model (retrofitting i18n late is expensive)

### Non-goals (for now)
- Multi-vendor / marketplace features
- Payment gateway integration (post-cart phase)
- Mobile apps

---

## 2. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Backend | **Laravel 12**, PHP 8.2+ | Sanctum installed; Ziggy for named routes in JS |
| Frontend bridge | **Inertia v2** (`@inertiajs/react`) | No separate API layer for now |
| UI | **React 18 + TypeScript** | `resources/js` is the app root |
| Styling | **Tailwind CSS** | shadcn-style primitives via Radix (`Components/ui/`), `lucide-react`, `framer-motion` |
| Forms/uploads | Custom `FormBuilder`, `react-dropzone`, `react-toastify` | Existing in-house patterns |
| Build | Vite 6 | Standard Laravel Vite plugin |
| Testing | PHPUnit (backend) | Frontend tests: none yet |

---

## 3. Architecture & Conventions

```
app/
  Http/Controllers/<Domain>/   Domain-grouped controllers (Product/, Customer/, Profile/)
  Http/Requests/               Form Request validation per entity
  Models/                      Eloquent models
resources/js/
  Pages/                       Inertia pages (Admin/, Product/, Profile/, HomePage/)
  Layouts/                     AdminLayout, DashboardLayout, GuestLayout...
  Components/                  Shared components (+ Components/ui = Radix/shadcn base)
  FormBuilder/                 Config-driven form rendering
  hooks/                       useFetchList, useInertiaPost, useCustomForm...
  interfaces/                  Shared TS types
```

**Rules**
- Controllers stay thin: validate via Form Requests, orchestrate models, return Inertia responses
- No premature service/repository layers; extract when logic repeats across controllers
- New pages must use the shared Layouts — no one-off page chrome
- Prefer extending `FormBuilder` + `ListingPage/*` components over bespoke forms/tables

---

## 4. Functional Modules

### 4.1 Products (admin CRUD) ✅ partially built
- Fields: `sku, name, slug, category_id, brand_id, price_mrp, price_sell, cost_price, tax_rate, stock_qty, reorder_point, reorder_qty, weight_grams, length_mm, width_mm, height_mm, description, thumbnail_url, status(draft|active|archived)`
- Image handling: thumbnail + gallery via `product_images` table (uuid paths under `storage/app/public/products`)
- Gaps tracked in §5 debt register

### 4.2 Categories & Brands 🔲 planned
- Controllers exist as empty stubs (`CategoryController`, `BrandController`) — unrouted
- Migrations + models wiring (`category_id`/`brand_id` FKs currently dangling) required before product forms can use them

### 4.3 Customers ✅ partial
- `index / create / store / edit` exist; missing `show / update / destroy`
- Shared `CustomerFormComponent`; listing uses shared ListingPage components

### 4.4 Users & Roles ✅ partial
- Breeze auth flows; `Role` model + roles table
- Admin UserManagement pages exist (`UserIndex`, `UserCreate`, `UserShow`) behind ad-hoc `/ui/admin/*` routes — needs proper naming + role middleware

### 4.5 Storefront 🔲 planned
- Home page shell exists (`HomePage/HomeIndexPage`, `/home`)
- Product listing/detail pages for public surface, search & filters (reuse admin listing internals where possible)
- Cart per `Database/CartTable.md`; orders/checkout deferred

### 4.6 Bilingual Support (EN ⇄ ML) ⭐ core requirement

#### A. UI language switching (i18n)
| Concern | Approach |
|---|---|
| Strings | `lang/en/*.php` + `lang/ml/*.php` (and/or JSON files) |
| Locale detection | Middleware reads locale from URL segment or cookie → `App::setLocale()` |
| Frontend access | Share via `Inertia::share(['locale' => ..., 'translations' => ...])`; use **`laravel-react-i18n`** so React reads Laravel `lang/` files directly (single source of truth) — fallback: `react-i18next` kept in sync manually |
| Switcher | Header toggle calls backend (set cookie) then `router.reload()` so server-rendered strings refresh |
| Rendering | Load **Noto Sans Malayalam**; set `lang="ml"` on ML subtrees so shaping/fonts behave |
| SEO (storefront) | Localized routes (`/en/...`, `/ml/...`) decided at Phase 3; admin can stay cookie-based |

> Decision rule: **UI chrome strings live in lang files; user-entered business data lives in DB columns (see C). Never machine-translate stored data.**

#### B. Transliteration input
- Reusable `<TransliterateInput>` wrapper (around existing `TextInput` / FormBuilder field types) using a Varnam-based JS library (or equivalent Indic rule-set lib)
- Behavior: user types Latin letters → inline suggestions → commits Malayalam Unicode text into the underlying field value
- Used wherever admins enter Malayalam content: product `name_ml`, `description_ml`, category/brand ML names
- Must degrade gracefully: plain typing/pasting of native Malayalam always allowed

#### C. Bilingual data model
- Add nullable `*_ml` columns alongside English ones (e.g. `products.name_ml`, `description_ml`; categories/brands get ML name columns in their initial migrations)
- Malayalam is *optional* per record; UI falls back to English when blank
- Existing `malayalam_months` / `malayalam_stars` reference tables already follow the "native Malayalam label" pattern — reuse as precedent

### 4.7 Legacy / pending-decision modules
- `Temple`, `Shop`, `Photo` models + temple CRUD exist (routes currently **unauthenticated**) — confirm whether this stays in scope or gets archived
- `MalayalamMonth`, `MalayalamStar` reference data — likely feeds product tagging later

---

## 5. Debt Register (known issues to fix)

| # | Issue | Location | Severity |
|---|---|---|---|
| D1 | Broken redirects: controller targets `route('product.index')` but resource is `/products` (`products.index`) | `Product/ProductController.php` | 🔴 breaks store/update/delete |
| D2 | Product model `$fillable` mismatches migration (`price_buy`, `price_discount`, `stock` vs `price_sell`, `cost_price`, `tax_rate`, `stock_qty`, ...) | `Models/Product.php` ↔ products migration | 🔴 silent data loss |
| D3 | `temple` resource routes outside `auth` middleware | `routes/web.php` | 🔴 public write access |
| D4 | Category/Brand stubs with no tables while products reference them | controllers + migrations | 🟠 |
| D5 | Duplicate Profile controllers; root one dead | `Http/Controllers/ProfileController.php` | 🟠 |
| D6 | ~15 `"*.copy.tsx"` duplicate components | `resources/js/Components/` | 🟡 delete |
| D7 | Both old (`@inertiajs/inertia@0.11`) and new (`@inertiajs/react@2`) packages installed; Tailwind v3 config + v4 Vite plugin mixed | `package.json`, configs | 🟡 dedupe deps |
| D8 | Ad-hoc test routes (`/ui/admin/*`) in production route file | `routes/web.php` | 🟡 move behind named group/middleware |

---

## 6. Roadmap

| Phase | Focus | Status |
|---|---|---|
| **1** | UI foundation (Admin + User layouts), product module refactor, product API integration | 🔄 tracked in Sprint 01 Phase 01 doc (May 5–17, 2026) |
| **2** | Debt burn-down (D1–D8) · Categories & Brands migrations/CRUD · Customer CRUD completion · **Bilingual foundation: locale middleware, lang files, i18n hook-up, `<TransliterateInput>` prototype, `*_ml` columns** | 🔲 next |
| **3** | Storefront: public product browse/search/detail · cart (per CartTable.md) · localized public routes | 🔲 |
| **4** | Orders & checkout · payments evaluation · role-based admin permissions hardening | 🔲 |

> Rationale for bilingual timing: scaffolding i18n in Phase 2 means every Phase 3 storefront string is written translated-once instead of retrofitted. Transliteration inputs ship as soon as ML data columns exist.

---

## 7. Non-Functional Requirements

- **Auth:** session-based (Breeze) for web; Sanctum reserved for any future API needs; all write routes behind `auth` + (Phase 4) role middleware
- **Images:** local `public` disk, uuid filenames (current pattern); CDN/S3 swap deferred
- **Responsiveness:** layouts mobile-first basic (Phase 1 scope), refined later
- **Fonts/a11y:** Malayalam-capable webfont loaded lazily only when locale/content requires it
- **Testing:** feature tests for every controller action from Phase 2 onward; product module tests added during Phase 1 refactor
- **Style:** Pint for PHP; no frontend linter configured yet (add Pint config parity / ESLint decision in Phase 2)

---

## 8. Constraints & Principles

- ⏱ Part-time, single developer — small vertical slices, shippable each session
- 🚫 No over-engineering: reuse `FormBuilder` / ListingPage patterns instead of frameworks-of-the-week
- ✔ Clarity over cleverness; delete dead code aggressively (copy files, unused controllers)
- 🌐 Bilingual is a first-class concern, not an afterthought

---

## 9. Success Criteria (project level)

- Admin can fully manage products/categories/brands/customers/users through consistent UI
- Storefront browsable in both EN and ML with a working switcher; admins can enter Malayalam data via typing **or** transliteration
- Zero entries left in the Debt Register (§5) by end of Phase 2
- A new CRUD module can be added in ≤ 2 days using existing layout/form/listing patterns

---

## 10. Open Questions

1. Temple/Shop modules — in scope, or archive? (blocks D3 fix)
2. Payment gateway preference for Phase 4 (Razorpay?)?
3. Should storefront URLs be localized (`/ml/products`) or cookie-only for Phase 3?
4. Any need for other languages beyond EN/ML long-term (affects whether we generalize the `*_ml` column pattern)?
