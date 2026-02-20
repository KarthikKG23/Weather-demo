# SkyDash Advanced Weather Dashboard

SkyDash is a beautiful, advanced weather dashboard built with React, Vite, and tailwind. It features real-time weather analytics, historical charting, and immersive full-screen canvas animated backgrounds directly mapped to weather conditions.

## Features

- **Glassmorphism UI**: High quality, premium blurred aesthetics via Tailwind CSS.
- **Dynamic Context**: Weather data context integrated globally, preventing prop drilling.
- **History Analytics**: Date-picker integrated historical weather graph via lazily-loaded Recharts.
- **Auto-Location**: Detect user geometry and fetch context.
- **Living Backgrounds**: HTML5 Canvas Particle Engine rendering unique snow, rain, thunder, and starry skies dynamically depending on the API condition code.
- **Animations**: Framer Motion page transitions and interactive hover effects.

## Quickstart

1. Clone or download this project.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set your environment variables in `.env`:
   ```env
   VITE_WEATHERSTACK_API_KEY=your_key_here
   VITE_WEATHERSTACK_BASE_URL=http://api.weatherstack.com/
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Tech Stack

- **React 18** (Vite + TypeScript)
- **Tailwind CSS**
- **Recharts** (Lazy Loaded)
- **Framer Motion**
- **Lucide Icons**
- **Axios**
- **React Router v6**
- **Date-Fns**

## Building for Production

To create an optimized production build:
```bash
npm run build
```
Then preview the compiled package:
```bash
npm run preview
```
