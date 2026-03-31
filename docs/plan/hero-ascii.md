# Hero ASCII Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio Hero around a `KyuminPark` ASCII canvas title, remove obsolete Hero UI, strengthen metric-first motion hierarchy, and keep matrix rain continuously alive behind the page.

**Architecture:** Keep the current single-page app structure, but split the Hero changes by responsibility. Add a dedicated ASCII Hero component and hook, move metric-card behavior into focused units, keep link-card motion in the shared button layer, and extract matrix-rain wrap logic into a testable helper so the animation can be verified without relying on visual inspection alone.

**Tech Stack:** React, TypeScript, Tailwind CSS, Framer Motion, Vitest, Testing Library

---

## File Map

- Create: `src/components/Hero/AsciiHero.tsx`
  Hero-only canvas renderer and reduced-motion fallback heading for `KyuminPark`.
- Create: `src/hooks/useAsciiHero.ts`
  Canvas particle setup, decode-in, hover disturbance, and cleanup lifecycle.
- Create: `src/components/Hero/MetricCard.tsx`
  Single metric card with hover lift and short count-up behavior.
- Create: `src/lib/matrixRain.ts`
  Pure helper for matrix column reset / wrap behavior so continuous motion can be tested.
- Create: `src/lib/matrixRain.test.ts`
  Unit tests for the matrix wrap logic.
- Modify: `src/components/Hero/Hero.tsx`
  Replace current Hero composition with ASCII-first layout and compact results panel.
- Modify: `src/components/Hero/HeroLinks.tsx`
  Keep 2x2 grid, remove disabled link dependency assumptions if needed.
- Modify: `src/components/Hero/MetricGrid.tsx`
  Delegate rendering to `MetricCard` and allow first metric to animate first.
- Modify: `src/components/shared/IconLinkButton.tsx`
  Add restrained hover/focus motion for link cards and `OPEN` label movement.
- Modify: `src/components/shared/TerminalFrame.tsx`
  Support a denser metrics panel without excess bottom space.
- Modify: `src/data/profile.ts`
  Remove `Resume PDF`, switch primary Hero naming / summary copy, and preserve factual metrics.
- Modify: `src/types/profile.ts`
  Remove disabled-link assumptions if no longer needed.
- Modify: `src/hooks/useMatrixRain.ts`
  Use the tested wrap helper and keep the background continuously alive.
- Modify: `src/App.test.tsx`
  Lock the new Hero copy, removed elements, and ASCII Hero presence.

### Task 1: Lock the new Hero contract in tests

**Files:**
- Modify: `src/App.test.tsx`

- [ ] **Step 1: Write the failing Hero assertions**

Add assertions for the new contract:

```tsx
expect(screen.getByRole('heading', { name: /KyuminPark/i })).toBeInTheDocument()
expect(screen.queryByRole('heading', { name: /박규민/i })).not.toBeInTheDocument()
expect(screen.queryByText(/DevOps Portfolio/i)).not.toBeInTheDocument()
expect(screen.queryByText(/whoami/i)).not.toBeInTheDocument()
expect(screen.queryByRole('button', { name: /Resume PDF/i })).not.toBeInTheDocument()
expect(screen.getByText(/배포, 인증, 운영 병목을 구조로 해결하는 DevOps 엔지니어입니다\./i)).toBeInTheDocument()
expect(screen.getByTestId('ascii-hero')).toBeInTheDocument()
```

- [ ] **Step 2: Run the targeted test to verify it fails**

Run:

```bash
npm run test -- --run src/App.test.tsx
```

Expected: FAIL because the current Hero still renders `박규민`, `DevOps Portfolio`, `whoami`, and `Resume PDF`.

- [ ] **Step 3: Keep the failing assertions and proceed**

Do not weaken the test to match current behavior.

- [ ] **Step 4: Commit**

Skip commit unless Git is initialized.

### Task 2: Replace the Hero title with a dedicated ASCII component

**Files:**
- Create: `src/components/Hero/AsciiHero.tsx`
- Create: `src/hooks/useAsciiHero.ts`
- Modify: `src/components/Hero/Hero.tsx`
- Test: `src/App.test.tsx`

- [ ] **Step 1: Write the failing reduced-motion / fallback expectation**

Add a test-friendly marker and heading expectation:

```tsx
expect(screen.getByRole('heading', { name: /KyuminPark/i })).toBeInTheDocument()
expect(screen.getByTestId('ascii-hero')).toBeInTheDocument()
```

Expected behavior:
- DOM heading remains accessible
- ASCII canvas container exists for visual rendering

- [ ] **Step 2: Run the targeted test to verify it fails**

Run:

```bash
npm run test -- --run src/App.test.tsx
```

Expected: FAIL because no ASCII Hero component exists yet.

- [ ] **Step 3: Implement the ASCII Hero primitive**

Build:

- `AsciiHero.tsx` with:
  - accessible `h1` text `KyuminPark`
  - canvas container `data-testid="ascii-hero"`
  - reduced-motion fallback that keeps plain text visible
- `useAsciiHero.ts` with:
  - offscreen text rasterization based on `KyuminPark`
  - random ASCII noise decoding into the final name
  - subtle idle jitter after decode
  - pointer-local disturbance and spring return on leave

- [ ] **Step 4: Replace the current Hero name block**

In `Hero.tsx`:

- remove `StatusBadge`
- remove the `whoami` block
- render `AsciiHero`
- place the compressed summary directly under the title

- [ ] **Step 5: Re-run the targeted test**

Run:

```bash
npm run test -- --run src/App.test.tsx
```

Expected: PASS for the new title, removed old Hero elements, and ASCII Hero presence.

- [ ] **Step 6: Commit**

Skip commit unless Git is initialized.

### Task 3: Remove the Resume PDF path and tighten Hero copy

**Files:**
- Modify: `src/data/profile.ts`
- Modify: `src/types/profile.ts`
- Modify: `src/components/Hero/HeroLinks.tsx`
- Test: `src/App.test.tsx`

- [ ] **Step 1: Write the failing data/UI expectation**

Add assertions that only four actionable links remain and no disabled CTA is rendered:

```tsx
expect(screen.getAllByRole('link', { name: /GitHub|Blog|Email|LinkedIn/i })).toHaveLength(4)
expect(screen.queryByRole('button', { name: /Resume PDF/i })).not.toBeInTheDocument()
```

- [ ] **Step 2: Run the targeted test to verify it fails**

Run:

```bash
npm run test -- --run src/App.test.tsx
```

Expected: FAIL until the disabled link is removed from data/rendering.

- [ ] **Step 3: Remove the disabled link contract**

Update:

- `profile.links` to contain only GitHub, Blog, Email, LinkedIn
- `heroSummary` to `배포, 인증, 운영 병목을 구조로 해결하는 DevOps 엔지니어입니다.`
- `types/profile.ts` to drop `'disabled'` if no longer needed elsewhere

- [ ] **Step 4: Simplify the Hero links renderer**

Ensure `HeroLinks.tsx` and `IconLinkButton.tsx` assume actionable links only, unless disabled support is still needed outside Hero.

- [ ] **Step 5: Re-run the targeted test**

Run:

```bash
npm run test -- --run src/App.test.tsx
```

Expected: PASS with four live links and no Resume PDF.

- [ ] **Step 6: Commit**

Skip commit unless Git is initialized.

### Task 4: Rebuild Hero layout and compact the metrics panel

**Files:**
- Modify: `src/components/Hero/Hero.tsx`
- Modify: `src/components/shared/TerminalFrame.tsx`
- Test: `src/App.test.tsx`

- [ ] **Step 1: Write the failing layout-content assertions**

Lock the intended Hero content:

```tsx
expect(screen.getByText(/배포, 인증, 운영 병목을 구조로 해결하는 DevOps 엔지니어입니다\./i)).toBeInTheDocument()
expect(screen.getByText(/Operational Metrics/i)).toBeInTheDocument()
expect(screen.getByText(/30m -> under 10m/i)).toBeInTheDocument()
```

- [ ] **Step 2: Run the targeted test to verify it fails for the old layout**

Run:

```bash
npm run test -- --run src/App.test.tsx
```

Expected: FAIL until the new Hero composition is in place.

- [ ] **Step 3: Implement the new Hero layout**

Arrange the Hero as:

- left-top: oversized `KyuminPark` ASCII Hero
- left-bottom: compressed summary + 2x2 link grid
- right-bottom: `Operational Metrics` panel

Keep the section responsive; on smaller screens, stack in a readable order without losing hierarchy.

- [ ] **Step 4: Compact the metrics frame**

Reduce the `TerminalFrame` vertical padding or internal spacing only enough to remove the excess bottom void in `Core Results`.

- [ ] **Step 5: Re-run the targeted test**

Run:

```bash
npm run test -- --run src/App.test.tsx
```

Expected: PASS with the new summary and metrics still visible.

- [ ] **Step 6: Commit**

Skip commit unless Git is initialized.

### Task 5: Add metric-card motion hierarchy

**Files:**
- Create: `src/components/Hero/MetricCard.tsx`
- Modify: `src/components/Hero/MetricGrid.tsx`
- Test: `src/App.test.tsx`

- [ ] **Step 1: Write the failing metric structure expectation**

Lock that all four metrics still render and the lead metric remains present:

```tsx
expect(screen.getByText(/30m -> under 10m/i)).toBeInTheDocument()
expect(screen.getByText(/68ms -> 3ms/i)).toBeInTheDocument()
expect(screen.getByText(/3 -> 1/i)).toBeInTheDocument()
expect(screen.getByText(/약 30% 감소/i)).toBeInTheDocument()
```

- [ ] **Step 2: Run the targeted test to verify it fails if metric rendering changes incorrectly**

Run:

```bash
npm run test -- --run src/App.test.tsx
```

Expected: FAIL only if the metric rendering is broken during extraction.

- [ ] **Step 3: Extract `MetricCard`**

Implement a focused metric card that supports:

- lift-on-hover
- short count-up or value emphasis on hover
- stronger motion hierarchy than link cards
- lead-card early enter behavior for `Deployment Time`

- [ ] **Step 4: Update `MetricGrid` to delegate to `MetricCard`**

Keep the data contract stable and preserve all existing metric copy.

- [ ] **Step 5: Re-run the targeted test**

Run:

```bash
npm run test -- --run src/App.test.tsx
```

Expected: PASS with all metric values intact.

- [ ] **Step 6: Commit**

Skip commit unless Git is initialized.

### Task 6: Add restrained link-card motion

**Files:**
- Modify: `src/components/shared/IconLinkButton.tsx`
- Modify: `src/components/Hero/HeroLinks.tsx`
- Test: `src/App.test.tsx`

- [ ] **Step 1: Write the failing accessibility assertion**

Lock that the four link cards remain actionable links:

```tsx
expect(screen.getByRole('link', { name: /GitHub/i })).toBeInTheDocument()
expect(screen.getByRole('link', { name: /Blog/i })).toBeInTheDocument()
expect(screen.getByRole('link', { name: /Email/i })).toBeInTheDocument()
expect(screen.getByRole('link', { name: /LinkedIn/i })).toBeInTheDocument()
```

- [ ] **Step 2: Run the targeted test to verify it fails if link semantics are broken**

Run:

```bash
npm run test -- --run src/App.test.tsx
```

Expected: FAIL only if the interaction rewrite breaks accessible link output.

- [ ] **Step 3: Add the micro-interaction layer**

Implement:

- subtle card translation
- restrained icon shift if useful
- `OPEN` label movement
- keyboard-visible focus state matching hover hierarchy

Keep the motion weaker than the metric cards.

- [ ] **Step 4: Re-run the targeted test**

Run:

```bash
npm run test -- --run src/App.test.tsx
```

Expected: PASS with link semantics preserved.

- [ ] **Step 5: Commit**

Skip commit unless Git is initialized.

### Task 7: Make matrix rain continuously wrap and test it

**Files:**
- Create: `src/lib/matrixRain.ts`
- Create: `src/lib/matrixRain.test.ts`
- Modify: `src/hooks/useMatrixRain.ts`

- [ ] **Step 1: Write the failing pure helper test**

Create a test for column wrap behavior:

```ts
it('wraps a finished column back above the canvas', () => {
  const next = advanceColumn({
    position: 900,
    canvasHeight: 800,
    speed: 12,
    resetOffset: 120,
    variance: 0,
  })

  expect(next).toBeLessThan(0)
})
```

- [ ] **Step 2: Run the targeted test to verify it fails**

Run:

```bash
npm run test -- --run src/lib/matrixRain.test.ts
```

Expected: FAIL because the helper does not exist yet.

- [ ] **Step 3: Implement the pure helper**

Add a small utility that:

- advances a column by speed
- resets columns above the visible area when they pass the lower threshold
- keeps the logic deterministic enough for unit testing

- [ ] **Step 4: Wire the helper into `useMatrixRain.ts`**

Replace inline column-reset math with the helper while preserving the current visual tone.

- [ ] **Step 5: Re-run the targeted test**

Run:

```bash
npm run test -- --run src/lib/matrixRain.test.ts
```

Expected: PASS

- [ ] **Step 6: Commit**

Skip commit unless Git is initialized.

### Task 8: Final verification

**Files:**
- Verify: all touched files

- [ ] **Step 1: Run the full test suite**

Run:

```bash
npm run test -- --run
```

Expected: PASS

- [ ] **Step 2: Run the production build**

Run:

```bash
npm run build
```

Expected: PASS

- [ ] **Step 3: Verify the preview still serves**

Run:

```bash
npm run preview -- --host 127.0.0.1 --port 4173
curl -I -L http://127.0.0.1:4173/
```

Expected: `HTTP/1.1 200 OK`

- [ ] **Step 4: Check completion criteria against the spec**

Confirm:

- Hero headline is `KyuminPark`
- `DevOps Portfolio`, `whoami`, `Resume PDF`, and Hero-main `박규민` are gone
- ASCII Hero canvas is present with DOM fallback heading
- summary copy is compressed
- metrics panel is denser and still readable
- lead metric still reads `30m -> under 10m`
- link cards remain 2x2 and accessible
- matrix rain remains active behind the page

- [ ] **Step 5: Commit**

Skip commit unless Git is initialized.
