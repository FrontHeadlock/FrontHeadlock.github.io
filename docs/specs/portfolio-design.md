# Portfolio Design Spec

## Overview

- Topic: DevOps Engineer resume and portfolio website for Kyumin Park
- Workspace: `/Users/kyum/Desktop/vibe/cv/resume`
- Language: Korean-first, with limited English labels where useful
- Primary goal: Help hiring managers understand technical strengths, structural judgment, and measurable outcomes within a few seconds
- Secondary goal: Present the work with a restrained terminal-inspired identity without compromising readability

## Product Intent

This site is not a concept piece. It is a hiring-oriented resume site for a DevOps engineer. Visual polish should support credibility, not compete with the content.

The design should make the following clear as early as possible:

1. This candidate improves operational systems structurally, not cosmetically.
2. This candidate reduces deployment friction through automation and standardization.
3. This candidate can design cloud infrastructure and reproducible delivery pipelines.
4. This candidate investigates failures to root cause and improves systems at the tool and architecture level.

## Source Constraints

All content must remain within facts explicitly provided by the user in the prompt and reference images.

Allowed factual sources for this build:

- User prompt in this thread
- User-supplied contact links
- User-supplied project ordering
- User-supplied screenshots with project descriptions, roles, tech stacks, dates, and troubleshooting notes

Disallowed:

- Invented companies, dates, durations, headcounts, or responsibilities
- Placeholder external URLs pretending to be real
- Fake code snippets
- Unsupported claims about infrastructure, performance, or project scope
- Direct mention of RPC or gRPC

## Chosen Technical Direction

### Decision

Build a new `Vite + React + TypeScript` single-page application in `resume`, styled with `Tailwind CSS`, animated with `Framer Motion`, and modularized into data, hooks, components, and utilities.

### Why this direction

- The requested stack is React + Tailwind + Framer Motion.
- The page has interaction-heavy sections: scroll reveal, typed hero, hover states, expandable project details, and a canvas background.
- `ukint-vs.github.io` provides a strong reference for information-first composition and restrained motion language, but its Astro structure is not the right direct foundation for this request.
- `pretext` is not a UI starter, but it reinforces an important principle: readability and text layout stability take precedence over decorative behavior.

### What to reuse conceptually from nearby projects

From `ukint-vs.github.io`:

- Clear top-level section flow
- Strong typography and spacing discipline
- Lightweight text scramble / decode feel
- Decoration that stays behind content

From `pretext`:

- Avoid animations that disturb line wrapping or reading rhythm
- Keep dense text blocks stable and easy to scan
- Treat text rendering and spacing as first-class product concerns

## Information Architecture

The site will be a single-page resume flow with anchored navigation:

1. Home
2. About
3. Experience
4. Projects
5. Tech Stack
6. Contact

This order is intentional:

- `Hero` establishes role and measurable outcomes quickly.
- `About` frames how the candidate solves problems.
- `Experience` gives chronological and contextual confidence.
- `Projects` provides the proof.
- `Tech Stack` helps technical reviewers validate fit.
- `Contact` closes without interrupting the proof-first narrative.

## Content Model

### Hero

Required content:

- Name: `박규민 / Kyumin Park`
- Role: `DevOps Engineer / Cloud & CI/CD Engineer`
- Short summary focused on structure, automation, and operational reliability
- Core metric cards:
  - Deployment Time: `30m -> under 10m`
  - Auth Latency: `68ms -> 3ms`
  - Network Round Trips: `3 -> 1`
  - Service Latency: `약 30% 감소`
- Links:
  - GitHub: `https://github.com/FrontHeadlock`
  - Blog: `https://frontheadlock.tistory.com/`
  - Email: `southvi1@naver.com`
  - LinkedIn: `linkedin.com/in/kyumin19/?skipRedirect=true`

Resume PDF must not be faked. The UI will show a disabled or placeholder-style button instead of a download link.

### About

The section should summarize:

- Structural problem solving rather than symptom treatment
- Deployment automation and operational standardization
- Cloud infrastructure design and reproducible delivery
- Root cause analysis at the tool and pipeline level

This section should stay compact and hiring-focused.

### Experience

Use a log-style timeline, informed by the screenshots and the prompt. It should not invent unsupported employers or durations. Dates are shown only where supplied in the source images.

Expected entries:

1. `Geulda` tourism promotion app
   - Date from screenshot: `25.10 - 11`
   - Role context: team lead / planning / backend lead / infrastructure environment and deployment automation
2. `OldYoung` welfare recommendation application
   - Date from screenshot: `25.06 - 08`
   - Role context: PM / design / backend / deployment environment / AI chatbot development
3. `Jenkins 기반 CI/CD 파이프라인 구축, Docker Compose 멀티 서비스 배포 안정화`
   - Date from screenshot: `25.06 - 08`
4. `CATXI JWTFilterChain 내부 무중단 토큰 재발급 구조 도입`
   - Date from screenshot: `25.05 - 12`
5. `CATXI` taxi ride-sharing application
   - Role context from screenshot: backend lead / auth and approval environment setup

The Experience section should feel like an operational log, not a decorative résumé timeline.

### Projects

Use exactly four featured project cards in this order:

1. `Geulda`
2. `OldYoung`
3. `Kubernetes 기반 주차 관리 서비스`
4. `CATXI`

Each card must show:

- Project title
- One-line summary
- Core result or operational focus
- Key tech stack

Clicking a card opens an expandable detail panel below the card grid.

### Project Detail Schema

Every detail panel must contain:

1. 프로젝트 개요
2. 맡은 역할
3. 문제 상황
4. 해결 방식
5. 성과 / 수치
6. 트러블슈팅 경험
7. 배운 점

The wording must follow this logic:

- What was the problem
- Why that was operationally meaningful
- What structural judgment was made
- How the system was changed
- What improved as a result

Each project detail must include at least one troubleshooting block in the format:

- 문제
- 원인 분석
- 조치
- 결과

Those blocks should be visually treated like alert / trace cards.

### Tech Stack

Use category-based groups instead of a flat badge cloud.

Recommended categories:

- Cloud
- CI/CD
- Container / Orchestration
- Backend / Auth
- Monitoring
- Collaboration / Ops

Each skill item should look like a system status row or restrained progress meter. The design must suggest familiarity without exaggerated percentage claims.

### Contact

Contact items:

- GitHub
- Blog
- Email
- LinkedIn
- Resume PDF placeholder

Use real links only where supplied. No fake social links.

### Portfolio Infrastructure Meta

Add a very small footer or about-side meta block labeled like:

- `Portfolio Delivery`

Because no actual deployment topology was provided, the copy must remain generic and true, for example:

- React SPA
- Static delivery ready
- Deployment path configurable

Avoid pretending that CDN, S3, CloudFront, or pipeline details are already implemented unless they are actually created in this project.

## Visual Direction

### Theme

- Background: `#0a0a0a`
- Accent: `#00ff41`
- Body text: `#e0e0e0`
- Mono emphasis: JetBrains Mono
- Body font: Pretendard

### Tone

The page should combine:

- matrix-terminal atmosphere
- premium engineering portfolio restraint
- high information density with clear hierarchy

The accent green should be used for:

- labels
- borders
- active states
- metrics
- short decorative traces

It must not be used for long paragraphs.

### Layout Character

- Wide enough for credibility on desktop
- Comfortable reading width for long Korean text
- Strong section rhythm
- Clear contrast between summary blocks and detail blocks
- Mobile-safe stacked layouts without horizontal scrolling

## Motion Direction

### Motion principles

- Motion supports comprehension, not spectacle
- Motion should be strongest in summaries and state changes
- Motion must fade into the background during long-form reading
- Respect `prefers-reduced-motion`

### Required motion patterns

1. Hero typing effect
   - Simulate terminal input for name and role
   - Run once on load

2. Scroll reveal
   - Sections fade and rise slightly into view
   - Some headings can use a very light decode effect

3. Hover micro-interactions
   - Skill items: subtle scale + green glow
   - Project cards: border scan / glow / slight glitch accent

4. Background matrix effect
   - HTML canvas
   - very low opacity
   - low visual noise
   - must never reduce text readability

## Interaction Design

### Navigation

- Sticky header with anchor links
- Active section highlighting
- Mobile navigation collapses into a simple menu, not a heavy drawer

### Project Card Expansion

Chosen pattern: expandable inline detail panel

Reason:

- Better for hiring managers comparing projects quickly
- Less disruptive than a modal
- Better on mobile than a detached side panel
- Works well with Framer Motion `layoutId`

Interaction expectations:

- Clicking a card opens its detail panel
- Clicking the same card again can collapse it
- Open state must be visually distinct
- The detail panel should animate from the selected card context rather than appearing abruptly

### Readability safeguards

- Dense text sections must have sufficient line height
- Visual separators between problem / approach / result blocks
- Lists for achievements and troubleshooting where scanning matters
- Avoid center-aligned long text

## Proposed Component Architecture

```text
src/
  components/
    Header/
      Header.tsx
      MobileNav.tsx
    Hero/
      Hero.tsx
      MetricGrid.tsx
      HeroLinks.tsx
    About/
      About.tsx
    Experience/
      ExperienceTimeline.tsx
      TimelineEntry.tsx
    Projects/
      ProjectsSection.tsx
      ProjectCard.tsx
      ProjectDetailPanel.tsx
      TroubleshootingAlert.tsx
    TechStack/
      TechStack.tsx
      SkillCategory.tsx
      SkillMeter.tsx
    Contact/
      Contact.tsx
    shared/
      SectionHeading.tsx
      Pill.tsx
      StatusBadge.tsx
      Reveal.tsx
      TerminalFrame.tsx
      IconLinkButton.tsx
  data/
    profile.ts
    experience.ts
    projects.ts
    skills.ts
  hooks/
    useTypingEffect.ts
    useScrollReveal.ts
    useDecodeText.ts
    useMatrixRain.ts
    useActiveSection.ts
  lib/
    cn.ts
    motion.ts
    format.ts
  styles/
    globals.css
    matrix-effects.css
  types/
    profile.ts
    experience.ts
    project.ts
    skill.ts
```

## Data Modeling Rules

### Profile data

Should include:

- Name
- Korean and English role labels
- Summary
- Metrics
- Links

### Project data

Each featured project object should support:

- `slug`
- `title`
- `subtitle`
- `summary`
- `techStack`
- `highlights`
- `overview`
- `role`
- `problem`
- `approach`
- `outcomes`
- `troubleshooting[]`
- `learnings`
- optional `architectureNotes`

### Experience data

Each timeline entry should support:

- `title`
- `dateLabel` when known
- `category`
- `summary`
- `techStack`
- `role`

### Skill data

Each category contains a list of:

- `name`
- `category`
- `displayLevel` as restrained qualitative labels or short bars, not percentages

## Content Drafting Guidance

### Geulda

Use the prompt and screenshots to emphasize:

- AWS public/private subnet architecture with Bastion Host, NAT Gateway, ALB
- Deployment standardization using Jenkins + AWX
- Manual six-step deployment automated
- Deployment time reduced from 30 minutes to under 10 minutes
- Operational improvements around multi-server rollout
- Troubleshooting around Jenkins DinD memory pressure and controller/agent separation

### OldYoung

Use only claims supported by screenshots and prompt:

- Welfare recommendation app using RAG
- Deployment environment setup and AI chatbot development
- AWS + Jenkins + AWX + Docker environment narrative only if directly tied to provided text
- Focus on user-input-based welfare classification and recommendation flow

Avoid inventing performance numbers unless explicitly supplied.

### Kubernetes parking service

Use the prompt only:

- Django
- Kubernetes
- Saga Pattern
- Circuit Breaker
- Service consistency and fault isolation
- Approx. 30 percent latency reduction
- Focus on operable service structure and stability

Do not mention forbidden protocol terms.

### CATXI

Unify the provided authentication and app material carefully:

- Taxi ride-sharing app context
- Backend lead / auth and approval environment setup
- Spring Security, JWT, Redis, OAuth2
- Token refresh moved into filter-chain-level structure
- Network round trips reduced from 3 to 1
- Auth latency reduced from 68ms to 3ms

Troubleshooting narrative should stay on:

- expired token entering controller flow
- structural inefficiency in reissue handling
- moving refresh handling into filter chain

## Accessibility Requirements

- Semantic landmarks and heading order
- Keyboard reachable navigation and cards
- Visible focus states
- Sufficient color contrast on dark background
- Motion reduction support
- Canvas background marked decorative
- Links and buttons clearly distinguishable

## Responsive Behavior

### Desktop

- Hero with summary on left and metrics/actions on right or stacked within a framed terminal block
- Project cards in 2-column grid
- Tech stack in multi-column grouped layout

### Tablet

- Cards collapse cleanly
- Expandable detail panel remains inline

### Mobile

- Single-column flow
- Sticky header remains compact
- Project detail content uses clear subheadings and short blocks
- Metric cards stack with strong spacing

## Testing and Verification Strategy

Minimum verification expected once implementation starts:

- TypeScript build passes
- Tailwind styles compile correctly
- Framer Motion interactions work without layout breakage
- Keyboard navigation works for interactive project cards
- `prefers-reduced-motion` path disables non-essential motion
- Mobile layout remains readable

## Non-Goals

- No fabricated PDF resume asset
- No fake company timeline
- No blog CMS or admin system
- No direct code snippet generation for projects without provided code
- No excessive terminal theatrics that reduce readability

## Open Implementation Notes

- If a real resume PDF is added later, replace the placeholder button without changing the layout contract.
- If real deployment information for the portfolio itself is later provided, the footer meta block can be upgraded from generic to concrete.
- If more detailed dates are supplied later, the experience timeline can move from mixed date / sequence style to full chronological dates.

## Approved Direction Captured From User

- Work in `/Users/kyum/Desktop/vibe/cv/resume`
- Prefer a structure informed by `pretext` and `ukint` rather than ignoring them
- Use the actual contact values provided by the user
- Featured projects order:
  1. Geulda
  2. OldYoung
  3. Kubernetes
  4. CATXI
- Project detail pattern: expandable inline panel
- Experience may incorporate screenshot-backed dates and role descriptions
