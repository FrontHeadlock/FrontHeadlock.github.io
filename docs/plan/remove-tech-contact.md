# Remove Tech Contact Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the `Tech Stack` and `Contact` sections from the portfolio UI and keep the remaining flow focused on `Home`, `About`, `Experience`, and `Projects`.

**Architecture:** Apply the smallest possible UI change. First remove the two tabs from the header navigation, then remove the two sections from the page render path, then update tests and spacing so the page still ends cleanly after `Projects`. Leave the underlying data and component files in place unless they are required for the render path.

**Tech Stack:** React, TypeScript, Tailwind CSS, Vitest

---

### Task 1: Remove the two navigation tabs

**Files:**
- Modify: `src/components/Header/Header.tsx`
- Inspect: `src/components/Header/MobileNav.tsx`
- Test: `src/App.test.tsx`

- [ ] **Step 1: Write the failing nav test**

Add assertions that these tabs are absent:

```tsx
expect(screen.queryByRole('link', { name: /Tech Stack/i })).not.toBeInTheDocument()
expect(screen.queryByRole('link', { name: /Contact/i })).not.toBeInTheDocument()
```

- [ ] **Step 2: Run the targeted test to verify it fails**

Run:

```bash
npm run test -- --run src/App.test.tsx
```

Expected: FAIL because both tabs still render.

- [ ] **Step 3: Remove the nav items**

Update the shared `sections` list so only these remain:

- `Home`
- `About`
- `Experience`
- `Projects`

- [ ] **Step 4: Re-run the test**

Run:

```bash
npm run test -- --run src/App.test.tsx
```

Expected: nav assertions pass.

- [ ] **Step 5: Commit**

Skip commit unless Git is initialized.

### Task 2: Remove the two sections from the page render path

**Files:**
- Modify: `src/App.tsx`
- Inspect: `src/components/TechStack/TechStack.tsx`
- Inspect: `src/components/Contact/Contact.tsx`
- Test: `src/App.test.tsx`

- [ ] **Step 1: Write the failing section-removal test**

Add assertions that these sections are absent:

```tsx
expect(screen.queryByRole('region', { name: /Tech Stack/i })).not.toBeInTheDocument()
expect(screen.queryByRole('region', { name: /Contact/i })).not.toBeInTheDocument()
```

- [ ] **Step 2: Run the targeted test to verify it fails**

Run:

```bash
npm run test -- --run src/App.test.tsx
```

Expected: FAIL because both sections still render.

- [ ] **Step 3: Remove the render path**

Stop rendering `TechStack` and `Contact` in `App.tsx`.

- [ ] **Step 4: Re-run the test**

Run:

```bash
npm run test -- --run src/App.test.tsx
```

Expected: section-removal assertions pass.

- [ ] **Step 5: Commit**

Skip commit unless Git is initialized.

### Task 3: Clean up the final page ending

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/components/Projects/ProjectsSection.tsx` if needed
- Test: `src/App.test.tsx`

- [ ] **Step 1: Write the failing layout-flow test**

Add a simple assertion that `Projects` still renders as the final major section entry point:

```tsx
expect(screen.getByRole('button', { name: /Geulda/i })).toBeInTheDocument()
expect(screen.queryByText(/기술은 나열하지 않고/i)).not.toBeInTheDocument()
expect(screen.queryByText(/핵심 정보와 운영 결과를 빠르게 검토할 수 있는/i)).not.toBeInTheDocument()
```

- [ ] **Step 2: Run the targeted test to verify it fails if flow is incomplete**

Run:

```bash
npm run test -- --run src/App.test.tsx
```

Expected: FAIL until the old sections are no longer visible.

- [ ] **Step 3: Adjust spacing only if needed**

If removing the lower sections leaves awkward whitespace, trim the bottom spacing around `Projects` or `main` only.

- [ ] **Step 4: Re-run the test**

Run:

```bash
npm run test -- --run src/App.test.tsx
```

Expected: PASS

- [ ] **Step 5: Commit**

Skip commit unless Git is initialized.

### Task 4: Final verification

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

- nav has 4 tabs only
- `Tech Stack` section is gone
- `Contact` section is gone
- `Projects` remains readable as the last section

- [ ] **Step 5: Commit**

Skip commit unless Git is initialized.

