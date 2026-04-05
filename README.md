# FrontHeadlock.github.io

Matrix-inspired interactive resume with a resume-first deployment entry.

⚡️ Live Demo : https://frontheadlock.github.io/

## What This Project Includes

- Resume screen with continuous Matrix rain backdrop
- Non-3D, Canvas 2D based motion/interaction (optimized for smooth rendering)
- Local-only onboarding sources can be kept outside git tracking

## Tech Stack

- React 19 + Vite + TypeScript
- Tailwind CSS
- GSAP, Framer Motion
- Canvas 2D API

## Run Locally

```bash
git clone https://github.com/FrontHeadlock/FrontHeadlock.github.io.git
cd FrontHeadlock.github.io
npm install
npm run dev
```

Open: `http://127.0.0.1:5173/` (or the port shown in terminal)

## Build

```bash
npm run build
```

## Route

- `/` : resume-first entry

## Deploy

This repo is configured for GitHub Pages-style static deployment.
Use your CI workflow (or `npm run build`) and publish the built output.
Tracked deployment scope renders the resume directly. Existing onboarding source files can remain local, but are excluded from git tracking and from the tracked production entry path.
