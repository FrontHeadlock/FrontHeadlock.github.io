# FrontHeadlock.github.io

Matrix-inspired interactive resume with a Canvas onboarding sequence.

## What This Project Includes

- 5-second Matrix-style onboarding (`/`) with interactive fragmentation effects
- Resume screen with continuous Matrix rain backdrop
- Non-3D, Canvas 2D based motion/interaction (optimized for smooth rendering)

## Tech Stack

- React 19 + Vite + TypeScript
- Tailwind CSS
- GSAP, Framer Motion
- Canvas 2D API

## Run Locally

```bash
npm install
npm run dev
```

Open: `http://127.0.0.1:5173/` (or the port shown in terminal)

## Build / Preview

```bash
npm run build
npm run preview
```

## Route Behavior

- `/` : onboarding first, then resume
- `/resume` : resume-focused entry

## Deploy

This repo is configured for GitHub Pages-style static deployment.
Use your CI workflow (or `npm run build`) and publish the built output.
