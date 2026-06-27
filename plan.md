# Implementation Plan - ECHO UI/UX Redesign (3D Smart City Aesthetic)

This plan focuses on a complete visual overhaul of the ECHO platform to meet the "3D Smart City Intelligence" requirement while preserving existing data logic and Supabase integration.

## Scope Summary
- **Visual Redesign**: Implement a 3D civic dashboard aesthetic with soft elevation, floating cards, and glassmorphism.
- **Color System**: Primary (#1B5E20), Accent (#F9A825), Background (#FAFAFA), Text (#212121).
- **Global Layout**: 
  - Mobile: Bottom navigation.
  - Tablet: Collapsible side nav.
  - Desktop: Multi-panel sidebar + main view.
- **3D Components**: Floating cards with depth, glowing map pins, step-by-step reporting form with transitions, and animated AI intelligence panels.
- **Gamification**: Glowing 3D rewards counter and badge grid with hover animations.

## Non-Goals
- Modifying the Supabase database schema or table names.
- Changing backend business logic/API routes.
- Adding new functional features not requested in the UI overhaul.

## Auth & RLS model
**Auth in scope:** No (Preserving existing logic)
**Model:** supabase_auth (Already implemented)
**RLS strategy:** Existing policies (Do not touch)
**Frontend implication:** Ensure 3D login/register pages maintain existing form submission logic.

## Migration baseline
**Local migrations in project:** existing
**User confirmed proceed on connected DB:** yes

## Affected Areas
- **CSS/Theme**: `src/index.css` and Tailwind configuration (via `vite.config.ts` or inline classes).
- **Layouts**: `src/components/layout/MainLayout.tsx`, `Sidebar.tsx`, `Navbar.tsx`.
- **Pages**: All dashboard and feature pages (Dashboard, Map, Report, AI Insights, etc.).
- **Components**: Creation of new 3D-styled wrapper components for cards and buttons.

## Ordered Phases

### Phase 1: Global Styles & Theme (3D Foundation)
- Update `src/index.css` with 3D elevation utility classes, glassmorphism variables, and the new color palette.
- Implement "Floating" card component with custom shadow layers.
- Specialist: `frontend_engineer`

### Phase 2: Navigation & Layout Overhaul
- Rebuild `Sidebar.tsx` and `Navbar.tsx` for Desktop/Tablet.
- Create `BottomNav.tsx` for Mobile view.
- Update `MainLayout.tsx` to handle responsive layout switches (Bottom Nav vs Sidebar).
- Specialist: `frontend_engineer`

### Phase 3: Dashboard & AI Insights (The "Smart City" View)
- Redesign `Dashboard.tsx` with the 3D Hero Score Card (glowing ring).
- Redesign `AIIntelligencePanel.tsx` with animated counters and glassmorphism.
- Specialist: `frontend_engineer`

### Phase 4: Interactive 3D Map & Information Cards
- Update `Map.tsx` with elevated 3D container.
- Implement glowing pin effects for Red/Yellow/Green risks.
- Build the "Bottom sliding 3D info card" for map selections.
- Specialist: `frontend_engineer`

### Phase 5: Step-by-Step Reporting Form
- Transform `ReportHazard.tsx` into a multi-step animated form.
- Add 3D "Drag-drop" upload box.
- Specialist: `frontend_engineer`

### Phase 6: Rewards, Events & Government Control
- Redesign `Rewards.tsx` with glowing 3D counters and badge zoom effects.
- Redesign `CleanupEvents.tsx` with elevated event cards.
- Redesign `GovernmentDashboard.tsx` with "Enterprise Control" styling (grid + depth).
- Specialist: `frontend_engineer`

### Phase 7: Polish & Micro-interactions
- Add scale/shadow transitions to all buttons and cards.
- Final responsiveness check for tablet split-views.
- Specialist: `quick_fix_engineer`

## Execution Handoff

**Plan status:** ready

**Dispatch order:**
1. frontend_engineer — Core UI/UX rebuild (Phases 1-6)
2. quick_fix_engineer — Micro-interactions and final polish (Phase 7)

**Per-agent instructions:**

### 1. frontend_engineer
- **Phases:** 1-6
- **Scope:** Rebuild all UI components to match the 3D Smart City aesthetic. 
- **Files:**
  - `src/index.css`: Add 3D utility classes.
  - `src/components/layout/*`: Redesign for responsiveness and depth.
  - `src/pages/*`: Complete redesign of every page mentioned in the plan.
- **Constraints:** Do NOT change any `supabase` calls, table names, or field names. Keep `AppContext.tsx` logic as is, only modify UI consumption.
- **Acceptance criteria:**
  - UI uses #1B5E20 (Green) and #F9A825 (Amber) correctly.
  - All cards have visible depth (shadows) and floating effects.
  - Reporting form is multi-step with slide transitions.
  - Map pins have a "glow" effect.
  - Mobile version has a functional bottom nav.

### 2. quick_fix_engineer
- **Phases:** 7
- **Scope:** Fine-tune hover animations, button lift effects, and micro-interactions.
- **Files:** `src/components/ui/button.tsx` (if present) or inline styles in pages.
- **Acceptance criteria:**
  - Hovering over buttons/cards results in a "lift" (scale + shadow change).
  - Screen transitions are smooth (fade/slide).
