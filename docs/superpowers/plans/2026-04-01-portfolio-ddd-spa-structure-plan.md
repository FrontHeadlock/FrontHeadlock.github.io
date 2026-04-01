# Portfolio DDD + SPA Structure Refactor Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 기존 포트폴리오 SPA를 `app + features + entities + shared` 경계 구조로 재편성해 장기 유지보수성을 확보한다.

**Architecture:** 기능 단위는 `src/features`로 분리하고, 정적 데이터/타입은 `src/entities`로 이동한다. UI 공용요소는 `src/shared/ui`와 `src/shared/hooks`, `src/shared/lib`로 분리하여 의존 방향을 단순화한다.

**Tech Stack:** Vite, React, TypeScript, Tailwind CSS, Framer Motion, Vitest

---

### Task 1: 구조 생성 및 이동 대상 선언

**Files:**
- Create: `src/shared/ui`
- Create: `src/shared/hooks`
- Create: `src/shared/lib`
- Create: `src/shared/styles`
- Create: `src/features/header`
- Create: `src/features/hero`
- Create: `src/features/about`
- Create: `src/features/experience`
- Create: `src/features/projects`
- Create: `src/features/tech-stack`
- Create: `src/features/contact`
- Create: `src/features/app`
- Create: `src/entities/profile`
- Create: `src/entities/project`
- Create: `src/entities/experience`
- Create: `src/entities/skill`

- [ ] **Step 1: Apply directory scaffold**

```bash
mkdir -p src/features/header src/features/hero src/features/about src/features/experience src/features/projects src/features/tech-stack src/features/contact src/features/app src/entities/profile src/entities/project src/entities/experience src/entities/skill src/shared/ui src/shared/hooks src/shared/lib src/shared/styles
```

Expected: 새 경로가 존재하고 기존 파일은 아직 원위치 상태.

### Task 2: Data/Type 이동

**Files:**
- Move: `src/data/profile.ts` -> `src/entities/profile/data.ts`
- Move: `src/data/projects.ts` -> `src/entities/project/data.ts`
- Move: `src/data/experience.ts` -> `src/entities/experience/data.ts`
- Move: `src/data/skills.ts` -> `src/entities/skill/data.ts`
- Move: `src/types/profile.ts` -> `src/entities/profile/types.ts`
- Move: `src/types/project.ts` -> `src/entities/project/types.ts`
- Move: `src/types/experience.ts` -> `src/entities/experience/types.ts`
- Move: `src/types/skill.ts` -> `src/entities/skill/types.ts`

- [ ] **Step 2: Move only data/type files to entities**

Expected: 각 엔티티 폴더에 `data.ts`, `types.ts` 구성 완성.

### Task 3: Feature/Shared 이동(컴포넌트)

**Files:**
- Move: `src/components/About/About.tsx` -> `src/features/about/About.tsx`
- Move: `src/components/About/*` -> `src/features/about/*`
- Move: `src/components/Contact/Contact.tsx` -> `src/features/contact/Contact.tsx`
- Move: `src/components/Contact/*` -> `src/features/contact/*`
- Move: `src/components/Experience/ExperienceTimeline.tsx` -> `src/features/experience/ExperienceTimeline.tsx`
- Move: `src/components/Experience/TimelineEntry.tsx` -> `src/features/experience/TimelineEntry.tsx`
- Move: `src/components/Header/Header.tsx` -> `src/features/header/Header.tsx`
- Move: `src/components/Header/MobileNav.tsx` -> `src/features/header/MobileNav.tsx`
- Move: `src/components/Hero/Hero.tsx` -> `src/features/hero/Hero.tsx`
- Move: `src/components/Hero/AsciiHero.tsx` -> `src/features/hero/AsciiHero.tsx`
- Move: `src/components/Hero/HeroLinks.tsx` -> `src/features/hero/HeroLinks.tsx`
- Move: `src/components/Hero/MetricCard.tsx` -> `src/features/hero/MetricCard.tsx`
- Move: `src/components/Hero/MetricGrid.tsx` -> `src/features/hero/MetricGrid.tsx`
- Move: `src/components/Projects/ProjectCard.tsx` -> `src/features/projects/ProjectCard.tsx`
- Move: `src/components/Projects/ProjectDetailPanel.tsx` -> `src/features/projects/ProjectDetailPanel.tsx`
- Move: `src/components/Projects/ProjectsSection.tsx` -> `src/features/projects/ProjectsSection.tsx`
- Move: `src/components/Projects/TroubleshootingAlert.tsx` -> `src/features/projects/TroubleshootingAlert.tsx`
- Move: `src/components/TechStack/TechStack.tsx` -> `src/features/tech-stack/TechStack.tsx`
- Move: `src/components/TechStack/SkillCategory.tsx` -> `src/features/tech-stack/SkillCategory.tsx`
- Move: `src/components/TechStack/SkillMeter.tsx` -> `src/features/tech-stack/SkillMeter.tsx`
- Move: `src/components/shared/SectionHeading.tsx` -> `src/shared/ui/SectionHeading.tsx`
- Move: `src/components/shared/Reveal.tsx` -> `src/shared/ui/Reveal.tsx`
- Move: `src/components/shared/Reveal.test.tsx` -> `src/shared/ui/Reveal.test.tsx`
- Move: `src/components/shared/StatusBadge.tsx` -> `src/shared/ui/StatusBadge.tsx`
- Move: `src/components/shared/TerminalFrame.tsx` -> `src/shared/ui/TerminalFrame.tsx`
- Move: `src/components/shared/IconLinkButton.tsx` -> `src/shared/ui/IconLinkButton.tsx`
- Move: `src/components/shared/MatrixRainCanvas.tsx` -> `src/shared/ui/MatrixRainCanvas.tsx`

- [ ] **Step 3: Move component files**

Expected: 기능별/공통별 폴더 구조로 이동 완료.

### Task 4: Hooks/Lib/Style 이동

**Files:**
- Move: `src/hooks/useActiveSection.ts` -> `src/shared/hooks/useActiveSection.ts`
- Move: `src/hooks/useAsciiHero.ts` -> `src/shared/hooks/useAsciiHero.ts`
- Move: `src/hooks/useDecodeText.ts` -> `src/shared/hooks/useDecodeText.ts`
- Move: `src/hooks/useMatrixRain.ts` -> `src/shared/hooks/useMatrixRain.ts`
- Move: `src/hooks/useScrollReveal.ts` -> `src/shared/hooks/useScrollReveal.ts`
- Move: `src/hooks/useTypingEffect.ts` -> `src/shared/hooks/useTypingEffect.ts`
- Move: `src/lib/cn.ts` -> `src/shared/lib/cn.ts`
- Move: `src/lib/matrixRain.ts` -> `src/shared/lib/matrixRain.ts`
- Move: `src/lib/motion.ts` -> `src/shared/lib/motion.ts`
- Move: `src/lib/matrixRain.test.ts` -> `src/shared/lib/matrixRain.test.ts`
- Move: `src/styles/matrix-effects.css` -> `src/shared/styles/matrix-effects.css`
- Move: `src/index.css` -> `src/shared/styles/globals.css`
- Modify: `src/main.tsx` to import `./shared/styles/globals.css` (or `./shared/styles` equivalent)

- [ ] **Step 4: Move utilities and styles**

Expected: 공유 로직/스타일이 `shared`로 통합되고 main 진입점 import가 수정됨.

### Task 5: App 구성 및 import 경로 정합성 수정

**Files:**
- Modify: `src/main.tsx`
- Modify: `src/App.tsx`
- Modify: `src/features/*`
- Modify: `src/shared/ui/*`
- Modify: `src/entities/*/data.ts`
- Modify: `src/shared/lib/matrixRain.test.ts`
- Modify: `src/App.test.tsx`
- Modify: `src/components/shared/MatrixRainCanvas.tsx` (if 남아있는 경우 제거/이동)

- [ ] **Step 5: Update import paths by layer**

- `./data/*` → `./entities/*/data`
- `./types/*` → `./entities/*/types`
- `./components/shared/*` → `./shared/ui/*`
- `./hooks/*` → `./shared/hooks/*`
- `./lib/*` → `./shared/lib/*`

Expected: TypeScript 컴파일 및 테스트에서 import 에러가 없음.

### Task 6: 정리 및 검증

**Files:**
- Remove: 빈 `src/components`, `src/data`, `src/hooks`, `src/lib`, `src/styles`, `src/types` 디렉토리(비어있을 경우)
- Delete: 중복 파일 잔여물(동일 경로에 복제본이 생긴 경우)
- Modify: `src/shared/styles/globals.css`, `src/shared/styles/matrix-effects.css`
- Test: `src/App.test.tsx`, `src/shared/ui/Reveal.test.tsx`, `src/shared/lib/matrixRain.test.ts`

- [ ] **Step 6: Clean-up and verify tests**

Expected: 테스트/빌드 통과, 기존 기능 회귀 없음.

### Task 7: 최종 확인

**Files:**
- Run: build + test only

- [ ] **Step 7: Final verification**

Run:

```bash
npm run test -- --run
npm run build
```

Expected:
- 모든 테스트 통과
- 빌드 통과
- import/구조 변경으로 동작 불일치 없음
