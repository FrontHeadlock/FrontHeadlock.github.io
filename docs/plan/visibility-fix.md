# Visibility Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stop the portfolio content from disappearing a few seconds after initial load while keeping all major sections visible by default.

**Architecture:** Debug from the top of the render tree downward. First determine whether the content is being unmounted, visually hidden, or covered by a background layer. Then disable or simplify one shared runtime system at a time until the root cause is isolated, and apply the smallest possible fix with regression coverage.

**Tech Stack:** React, TypeScript, Framer Motion, Tailwind CSS, Vitest, Testing Library

---

### Task 1: Lock the debugging contract to the new spec

**Files:**
- Reference: `docs/specs/visibility-fix.md`
- Create: `docs/plan/visibility-fix.md`

- [ ] **Step 1: Read the spec and extract the contract**

Confirm these are the only goals for this cycle:

- content must stay visible after 3+ seconds
- matrix rain must stay behind content
- opacity increase must remain restrained
- avoid broad redesign or architecture rewrite

- [ ] **Step 2: Keep the debug scope narrow**

Do not redesign layout, rewrite content, or remove the entire animation system before root cause is proven.

- [ ] **Step 3: Use this plan as the execution contract**

Treat the spec and this plan as the source of truth for the rest of the debugging cycle.

### Task 2: Reproduce and classify the failure in the running app

**Files:**
- Inspect: `src/App.tsx`
- Inspect: `src/components/shared/Reveal.tsx`
- Inspect: `src/components/shared/MatrixRainCanvas.tsx`
- Inspect: `src/hooks/useScrollReveal.ts`
- Inspect: `src/hooks/useMatrixRain.ts`

- [ ] **Step 1: Reproduce the bug in preview**

Run:

```bash
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

Expected: initial content appears, then the user-reported disappearance can be observed.

- [ ] **Step 2: Determine whether DOM is removed or only hidden**

Use browser inspection or targeted logging to answer:

- do section nodes still exist after 3 seconds?
- if yes, what are `opacity`, `display`, `visibility`, `transform`, and `z-index`?

- [ ] **Step 3: Record the first hard fact**

Write down one concrete finding before any fix:

- `DOM removed`
- `DOM present but hidden`
- `DOM present but covered`

### Task 3: Test the highest-probability shared systems one at a time

**Files:**
- Modify as needed: `src/components/shared/Reveal.tsx`
- Modify as needed: `src/components/shared/MatrixRainCanvas.tsx`
- Modify as needed: `src/hooks/useMatrixRain.ts`
- Modify as needed: `src/hooks/useTypingEffect.ts`
- Modify as needed: `src/hooks/useDecodeText.ts`

- [ ] **Step 1: Disable only the background layer**

Temporarily remove or short-circuit `MatrixRainCanvas`.

Expected: if content no longer disappears, the root cause is in the background layer path.

- [ ] **Step 2: Restore background and disable only shared reveal behavior**

Temporarily render `Reveal` as a plain wrapper without runtime state.

Expected: if disappearance stops here, the root cause is in shared reveal / motion state.

- [ ] **Step 3: Restore reveal and disable only timed text effects**

Temporarily bypass:

- `useTypingEffect`
- `useDecodeText`

Expected: if disappearance stops here, the root cause is in timed state churn.

- [ ] **Step 4: Stop after the first confirmed cause**

Do not stack speculative fixes. Once one isolation step clearly changes the bug, fix that specific path first.

### Task 4: Add a regression test for the confirmed failure mode

**Files:**
- Modify or create: `src/App.test.tsx`
- Modify or create: `src/components/shared/Reveal.test.tsx`
- Modify or create: a focused test file near the confirmed root cause

- [ ] **Step 1: Write the failing regression test**

Examples, depending on root cause:

- content wrapper keeps visible state after initial animation
- background canvas never exceeds content stacking layer
- timed hooks settle without clearing visible content

- [ ] **Step 2: Run the targeted test and verify it fails for the right reason**

Run:

```bash
npm run test -- --run <targeted-test-file>
```

Expected: FAIL because the bug is reproduced in the test.

- [ ] **Step 3: Implement the minimal fix**

Fix only the confirmed root cause. Avoid mixing unrelated cleanup into this change.

- [ ] **Step 4: Re-run the targeted test**

Run:

```bash
npm run test -- --run <targeted-test-file>
```

Expected: PASS

### Task 5: Re-verify real browser behavior and keep matrix rain visible but subordinate

**Files:**
- Modify as needed: `src/styles/matrix-effects.css`
- Modify as needed: `src/hooks/useMatrixRain.ts`

- [ ] **Step 1: Verify content persists in preview**

Re-open `http://127.0.0.1:4173/` and wait at least 3 seconds.

Expected: all sections remain visible without collapsing to the background-only state.

- [ ] **Step 2: Tune matrix rain only after visibility is stable**

If content is stable, adjust matrix rain intensity in small steps only.

Expected: slightly more visible rain, but text still reads clearly.

- [ ] **Step 3: Avoid reintroducing the regression**

If a visual tweak reintroduces the disappearance, revert that tweak and keep the stable version.

### Task 6: Final verification

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

- [ ] **Step 3: Verify the served preview responds**

Run:

```bash
npm run preview -- --host 127.0.0.1 --port 4173
curl -I -L http://127.0.0.1:4173/
```

Expected: `HTTP/1.1 200 OK`

- [ ] **Step 4: Confirm the completion criteria against the spec**

Check all of these:

- sections remain visible after 3+ seconds
- no background-only collapse
- matrix rain stays behind content
- readability remains acceptable

- [ ] **Step 5: Commit**

Skip commit unless Git is initialized in `resume`.
