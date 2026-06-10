# Romantic Apology Website (React + Tailwind)

A 7-page interactive apology website with mini-games, smooth route transitions, and mobile-friendly design.

## Tech

- React (Vite)
- JavaScript
- Tailwind CSS
- React Router
- Framer Motion

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Prerequisites

- Node.js 20 LTS (includes npm)
- Git

Check versions:

```bash
node -v
npm -v
git --version
```

## Push To GitHub

```bash
git init
git branch -M main
git add .
git commit -m "Initial commit - romantic apology site"
git remote add origin https://github.com/<your-username>/romantic-apology-site.git
git push -u origin main
```

## Deploy On Render

Use Blueprint deploy so Render reads `render.yaml` automatically.

1. Open Render dashboard.
2. Click New +.
3. Select Blueprint.
4. Pick this GitHub repository.
5. Click Apply.

This project is configured as an SPA with a rewrite rule to `/index.html`, so refreshing deep links like `/page-4` works in production.
