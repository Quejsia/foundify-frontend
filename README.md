# Foundify Frontend (Production-ready scaffold)

This is the frontend for Foundify ✨ (React + Vite + Tailwind). It is pre-configured to connect to your backend:

Default backend URL (change in .env):
  VITE_API_URL=https://foundify-backend-12.onrender.com

## Quick start (local)
1. unzip
2. npm install
3. copy `.env.example` to `.env` and edit if needed
4. npm run dev

## Build for production
npm run build
serve -s dist -l 5000

## PWA
This project includes a basic `public/manifest.json` and `public/sw.js`. After deployment the site should be installable (Add to Home screen).

## Deploy to Vercel
1. Push to GitHub
2. Import project on Vercel, set env var `VITE_API_URL`
3. Deploy
