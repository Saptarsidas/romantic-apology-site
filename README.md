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

Open `http://localhost:5173/admin` to edit titles, messages, and photo URLs dynamically.

Admin is now password protected:

- Login URL: `/admin-login`
- Set the initial password with `ADMIN_PASSWORD` on Render.
- Set a strong `COOKIE_SECRET` on Render for signed admin sessions.
- You can change the password from inside the Admin panel after logging in.

## Add Your Pictures

Option 1 (recommended):

1. Put images in `public/photos` (example: `public/photos/page1.jpg`).
2. In Admin page, set image path as `/photos/page1.jpg`.

Option 1B:

- In Admin page, use `Upload Picture` to upload directly from your device.
- Uploaded image is stored on the server and shown instantly.

Crop controls:

- Use `Image Fit` and the focus sliders to position portraits or wide images cleanly.

Option 2:

- Use full image URLs from anywhere (example: `https://.../photo.jpg`).

All admin changes are saved in browser local storage instantly.

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

## Deploy On Render (Web Service)

This project is configured for Render Web Service using Node + Express.

1. Open Render dashboard.
2. Click New +.
3. Select Blueprint and choose this repository.
4. Render will use `render.yaml` automatically.
5. Click Apply.

Or create it manually as Web Service with:

- Build Command: `npm install && npm run build`
- Start Command: `npm start`

The Express server includes SPA fallback to `index.html`, so paths like `/page-4` and `/admin` work on refresh.
