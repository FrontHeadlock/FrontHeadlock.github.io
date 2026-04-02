# FrontHeadlock.github.io

Matrix-inspired interactive resume with a Canvas onboarding sequence.

⚡️ Live Demo : https://frontheadlock.github.io/

## Tech Stack

- React 19 + Vite + TypeScript
- Tailwind CSS
- GSAP, Framer Motion
- Canvas 2D API

## Run Locally

```bash
git clone https://github.com/FrontHeadlock/FrontHeadlock.github.io.git
cd FrontHeadlock.github.io
```

```bash
npm install
npm run dev
```

Open: `http://127.0.0.1:5173/` (or the port shown in terminal)

## Route Behavior

- `/` : onboarding first, then resume
- `/resume` : resume-focused entry

## Deploy

This repo is configured for GitHub Pages-style static deployment.
Use your CI workflow (or `npm run build`) and publish the built output.
