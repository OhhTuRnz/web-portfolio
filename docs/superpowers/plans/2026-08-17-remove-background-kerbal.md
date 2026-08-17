# Remove Background Kerbal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the incorrect tumbling Kerbal from the live portfolio without changing the hero humanoid or shooting-star background.

**Architecture:** Delete the Kerbal-specific markup, scheduling script, animation CSS, and stale comments from the existing global layout. Keep the future flyby concept only in the approved documentation-only design spec; add no dormant runtime component or feature flag.

**Tech Stack:** Astro 5, TypeScript in Astro scripts, CSS animations, PowerShell validation, npm production build

## Global Constraints

- Keep the humanoid point-cloud visualization in the hero section unchanged.
- Keep the shooting-star canvas and its animation unchanged.
- Leave no Kerbal-specific markup, styling, or behavior in production source.
- Define no replacement SVG, image, spacecraft, astronaut, satellite, or character.
- Add no dormant runtime component or feature flag.

---

### Task 1: Remove the live Kerbal implementation

**Files:**
- Modify: `src/layouts/Layout.astro:38-100`
- Modify: `src/layouts/Layout.astro:182`
- Modify: `src/layouts/Layout.astro:321-357`
- Modify: `src/layouts/Layout.astro:406-447`
- Verify: `docs/superpowers/specs/2026-08-17-background-flyby-template-design.md`

**Interfaces:**
- Consumes: the existing `#stars-canvas` shooting-star background and the unchanged hero content rendered through `<slot />`
- Produces: a global layout with no Kerbal DOM node, scheduler, or animation styles

- [ ] **Step 1: Run the removal assertion and verify it fails before editing**

```powershell
$matches = rg -n -i 'kerbal|kb-' src/layouts/Layout.astro
if ($LASTEXITCODE -eq 0) { $matches; exit 1 }
```

Expected: exit 1 with matches for the inline SVG, flight script, styles, and comments.

- [ ] **Step 2: Remove the Kerbal-specific runtime code**

Edit `src/layouts/Layout.astro` to:

- delete the complete `<svg id="kerbal-sprite">...</svg>` block;
- delete the complete Kerbal flight `<script>` block;
- delete `#kerbal-sprite`, `.flying`, `kb-flight`, `kb-leg-drift`, `kb-blink`, and the Kerbal reduced-motion CSS;
- change the canvas stacking comment so it refers only to shooting stars;
- change the shooting-star script heading so it refers only to shooting stars;
- leave the shooting-star canvas and drawing logic byte-for-byte unchanged apart from those comments.

- [ ] **Step 3: Run the removal assertion and verify it passes**

```powershell
$matches = rg -n -i 'kerbal|kb-' src/layouts/Layout.astro
if ($LASTEXITCODE -eq 0) { $matches; exit 1 }
exit 0
```

Expected: exit 0 with no output.

- [ ] **Step 4: Confirm protected visual paths remain present**

```powershell
rg -n 'stars-canvas|function draw\(|robot-canvas|robot-pointcloud\.bin' src/layouts/Layout.astro src/components/Hero.astro
```

Expected: matches for `stars-canvas` and `function draw(` in `Layout.astro`, plus `robot-canvas` and `robot-pointcloud.bin` in the hero/layout sources.

- [ ] **Step 5: Run the production build**

```powershell
npm run build:offline
git restore --source=HEAD -- public/assets/robot-pointcloud.bin
```

Expected: Astro builds all six pages and exits 0. Restore the nondeterministically regenerated point-cloud binary so it is not included in this removal.

- [ ] **Step 6: Review the scoped diff**

```powershell
git diff --check -- src/layouts/Layout.astro
git diff --stat -- src/layouts/Layout.astro
git status --short
```

Expected: no whitespace errors; only the layout is part of the implementation diff, while pre-existing generated `.astro` and `.claude/` state remains uncommitted.

- [ ] **Step 7: Commit the removal**

```powershell
git add src/layouts/Layout.astro
git commit -m "Remove background Kerbal animation"
```

Expected: one commit containing only the live Kerbal removal.
