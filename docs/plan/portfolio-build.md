# Kyumin Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-quality React/Tailwind/Framer Motion portfolio site for Kyumin Park in `/Users/kyum/Desktop/vibe/cv/resume` based on the approved Korean design spec.

**Architecture:** Create a Vite + React + TypeScript SPA with data-driven sections, shared motion helpers, and restrained matrix-inspired presentation. Keep content truth-bound to the approved spec and screenshots while separating profile data, project data, experience logs, and UI behavior into focused modules.

**Tech Stack:** Vite, React, TypeScript, Tailwind CSS, Framer Motion, lucide-react, Vitest, Testing Library

---

### Task 1: Scaffold the app shell and toolchain

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `index.html`
- Create: `postcss.config.js`
- Create: `tailwind.config.ts`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/index.css`
- Create: `src/vite-env.d.ts`
- Create: `src/test/setup.ts`

- [ ] **Step 1: Write the failing smoke test plan target**

Define the first visible contract for the app:

```tsx
render(<App />)
expect(screen.getByRole('navigation')).toBeInTheDocument()
expect(screen.getByRole('heading', { name: /박규민/i })).toBeInTheDocument()
```

- [ ] **Step 2: Set up the project and test runner**

Run after files are created:

```bash
npm install
```

Expected: dependencies install successfully and `npm run test -- --run` can execute.

- [ ] **Step 3: Add the minimal shell implementation**

Create the Vite entry, CSS pipeline, Tailwind setup, and a minimal `App.tsx` that can satisfy the first smoke test later.

- [ ] **Step 4: Verify the scaffold**

Run:

```bash
npm run test -- --run
```

Expected: failing app-content tests if feature UI is not implemented yet, but the test runner itself should be operational.

- [ ] **Step 5: Commit**

Repository is not initialized in `resume`, so skip commit unless the user later initializes Git.

### Task 2: Add typed data models and source-of-truth content

**Files:**
- Create: `src/types/profile.ts`
- Create: `src/types/project.ts`
- Create: `src/types/experience.ts`
- Create: `src/types/skill.ts`
- Create: `src/data/profile.ts`
- Create: `src/data/projects.ts`
- Create: `src/data/experience.ts`
- Create: `src/data/skills.ts`
- Test: `src/App.test.tsx`

- [ ] **Step 1: Write failing test for factual rendering**

```tsx
expect(screen.getByText(/DevOps Engineer \/ Cloud & CI\/CD Engineer/)).toBeInTheDocument()
expect(screen.getByText(/Deployment Time/i)).toBeInTheDocument()
expect(screen.getByText(/Geulda/)).toBeInTheDocument()
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npm run test -- --run src/App.test.tsx
```

Expected: FAIL because the full data-driven UI is not implemented yet.

- [ ] **Step 3: Implement the data modules and initial render path**

Add typed content files using only approved facts from `docs/specs/portfolio-design-ko.md`.

- [ ] **Step 4: Re-run the targeted test**

Run:

```bash
npm run test -- --run src/App.test.tsx
```

Expected: data-dependent assertions pass or move to the next missing behavior.

- [ ] **Step 5: Commit**

Skip commit unless Git is initialized.

### Task 3: Build the page structure and shared presentation primitives

**Files:**
- Create: `src/components/shared/SectionHeading.tsx`
- Create: `src/components/shared/Reveal.tsx`
- Create: `src/components/shared/TerminalFrame.tsx`
- Create: `src/components/shared/StatusBadge.tsx`
- Create: `src/components/shared/IconLinkButton.tsx`
- Modify: `src/App.tsx`
- Modify: `src/index.css`
- Test: `src/App.test.tsx`

- [ ] **Step 1: Write failing test for section structure**

```tsx
expect(screen.getByRole('link', { name: /About/i })).toBeInTheDocument()
expect(screen.getByRole('region', { name: /Projects/i })).toBeInTheDocument()
expect(screen.getByRole('region', { name: /Tech Stack/i })).toBeInTheDocument()
```

- [ ] **Step 2: Verify the failure**

Run:

```bash
npm run test -- --run src/App.test.tsx
```

Expected: FAIL because sections and landmarks are incomplete.

- [ ] **Step 3: Implement the shared layout primitives**

Build the top-level structure so the app has semantic landmarks, readable spacing, and reusable cards/frames.

- [ ] **Step 4: Verify the structure passes**

Run:

```bash
npm run test -- --run src/App.test.tsx
```

Expected: section and navigation assertions pass.

- [ ] **Step 5: Commit**

Skip commit unless Git is initialized.

### Task 4: Implement Hero, About, Experience, and Contact sections

**Files:**
- Create: `src/components/Header/Header.tsx`
- Create: `src/components/Header/MobileNav.tsx`
- Create: `src/components/Hero/Hero.tsx`
- Create: `src/components/Hero/MetricGrid.tsx`
- Create: `src/components/Hero/HeroLinks.tsx`
- Create: `src/components/About/About.tsx`
- Create: `src/components/Experience/ExperienceTimeline.tsx`
- Create: `src/components/Experience/TimelineEntry.tsx`
- Create: `src/components/Contact/Contact.tsx`
- Create: `src/hooks/useTypingEffect.ts`
- Create: `src/hooks/useActiveSection.ts`
- Modify: `src/App.tsx`
- Test: `src/App.test.tsx`

- [ ] **Step 1: Write failing tests for hero metrics and contact behavior**

```tsx
expect(screen.getByText(/30m/)).toBeInTheDocument()
expect(screen.getByRole('link', { name: /GitHub/i })).toHaveAttribute('href', expect.stringContaining('github.com'))
expect(screen.getByRole('button', { name: /Resume PDF/i })).toBeDisabled()
```

- [ ] **Step 2: Verify the failure**

Run:

```bash
npm run test -- --run src/App.test.tsx
```

Expected: FAIL until the sections are implemented.

- [ ] **Step 3: Implement the content sections**

Wire the profile, experience, and contact modules into presentational sections with the approved Korean copy.

- [ ] **Step 4: Re-run the tests**

Run:

```bash
npm run test -- --run src/App.test.tsx
```

Expected: hero, timeline, and contact assertions pass.

- [ ] **Step 5: Commit**

Skip commit unless Git is initialized.

### Task 5: Implement Projects and expandable detail panels

**Files:**
- Create: `src/components/Projects/ProjectsSection.tsx`
- Create: `src/components/Projects/ProjectCard.tsx`
- Create: `src/components/Projects/ProjectDetailPanel.tsx`
- Create: `src/components/Projects/TroubleshootingAlert.tsx`
- Modify: `src/App.tsx`
- Test: `src/App.test.tsx`

- [ ] **Step 1: Write failing interaction test**

```tsx
await user.click(screen.getByRole('button', { name: /Geulda/ }))
expect(screen.getByText(/프로젝트 개요/)).toBeInTheDocument()
expect(screen.getByText(/트러블슈팅 경험/)).toBeInTheDocument()
```

- [ ] **Step 2: Verify the failure**

Run:

```bash
npm run test -- --run src/App.test.tsx
```

Expected: FAIL because project interactions are not implemented yet.

- [ ] **Step 3: Implement project cards and inline expansion**

Use Framer Motion layout animations for the selected card and the expandable detail panel.

- [ ] **Step 4: Verify project behavior**

Run:

```bash
npm run test -- --run src/App.test.tsx
```

Expected: project open/close behavior passes, including troubleshooting content visibility.

- [ ] **Step 5: Commit**

Skip commit unless Git is initialized.

### Task 6: Implement Tech Stack and restrained motion systems

**Files:**
- Create: `src/components/TechStack/TechStack.tsx`
- Create: `src/components/TechStack/SkillCategory.tsx`
- Create: `src/components/TechStack/SkillMeter.tsx`
- Create: `src/hooks/useDecodeText.ts`
- Create: `src/hooks/useMatrixRain.ts`
- Create: `src/lib/motion.ts`
- Create: `src/styles/matrix-effects.css`
- Modify: `src/index.css`
- Test: `src/App.test.tsx`

- [ ] **Step 1: Write failing test for tech stack visibility**

```tsx
expect(screen.getByText(/Cloud/)).toBeInTheDocument()
expect(screen.getByText(/CI\/CD/)).toBeInTheDocument()
expect(screen.getByText(/Kubernetes/)).toBeInTheDocument()
```

- [ ] **Step 2: Verify the failure**

Run:

```bash
npm run test -- --run src/App.test.tsx
```

Expected: FAIL until the stack section is rendered.

- [ ] **Step 3: Implement the stack UI and reduced-noise animation hooks**

Add the categorized skill rows and low-opacity decorative effects with motion-reduction support.

- [ ] **Step 4: Re-run the tests**

Run:

```bash
npm run test -- --run src/App.test.tsx
```

Expected: tech stack assertions pass and no existing tests regress.

- [ ] **Step 5: Commit**

Skip commit unless Git is initialized.

### Task 7: Verify build quality and polish the final output

**Files:**
- Modify: any touched implementation files as needed

- [ ] **Step 1: Run the full test suite**

```bash
npm run test -- --run
```

Expected: PASS

- [ ] **Step 2: Run the production build**

```bash
npm run build
```

Expected: PASS with generated production bundle

- [ ] **Step 3: Run an optional local preview smoke check**

```bash
npm run preview -- --host 127.0.0.1 --port 4173
```

Expected: preview server starts if manual browser review is needed.

- [ ] **Step 4: Final review against spec**

Confirm the implementation still matches:

- project ordering
- no fabricated links or facts
- no forbidden protocol wording
- readable dark theme
- restrained motion

- [ ] **Step 5: Commit**

Skip commit unless Git is initialized.
