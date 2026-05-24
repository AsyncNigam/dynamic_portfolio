<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=nextdotjs" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/GSAP-Animations-88CE02?style=for-the-badge&logo=greensock&logoColor=white" />
  <img src="https://img.shields.io/badge/Firebase-Hosting-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
</p>

<h1 align="center">Nigam Prasad Sahoo — Developer Portfolio</h1>

<p align="center">
  <strong>An immersive, scroll-driven developer portfolio built with Next.js 16, GSAP scroll physics, and Firebase.</strong>
  <br />
  Featuring interactive architecture diagrams, high-fidelity mobile mockups, and cinematic GSAP transitions.
</p>

<p align="center">
  <a href="https://nigam-portfolio-2026.web.app/"><strong>🌐 Live Site</strong></a> &nbsp;·&nbsp;
  <a href="https://github.com/emmabostian/developer-portfolios"><strong>📋 Featured in developer-portfolios</strong></a>
</p>

---

## ✨ Highlights

- **GSAP Scroll-Inversion Track** — Vertical scroll converts to a horizontal project slider with snap points, progress bar, and smooth momentum physics
- **Interactive Architecture Canvases** — Animated SVG diagrams with data-packet flow visualizations for backend/fullstack projects
- **Pixel-Perfect Mobile Mockups** — Edge-to-edge device frames with camera notch, status bar, and side buttons rendering live chat and notes UIs
- **Cinematic Section Reveals** — `clip-path` + scale + opacity transitions scrubbed to scroll position
- **Glassmorphism Design System** — `backdrop-filter` glass cards, layered glow effects, and gradient text utilities
- **Fully Static Deployment** — Zero Cloud Functions, pure static export on Firebase Hosting via GitHub Actions CI/CD

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Language** | TypeScript (strict mode) |
| **Styling** | Tailwind CSS 4 + custom `@theme` tokens |
| **Animations** | GSAP 3 — ScrollTrigger, clip-path, MotionPath |
| **Fonts** | Inter + JetBrains Mono (next/font/google) |
| **Hosting** | Firebase Hosting (static) |
| **CI/CD** | GitHub Actions → auto-deploy on `main` push |
| **Database** | Cloud Firestore (portfolio data) |
| **Admin** | Dev-only `/admin` panel with JSON editor |

---

## 🏗 Architecture

```
dynamic-portfolio-ecosystem/
├── app/
│   ├── page.tsx                 # Main portfolio page (scroll-driven)
│   ├── admin/page.tsx           # Dev-only admin panel
│   ├── layout.tsx               # Root layout + SEO metadata
│   └── globals.css              # Design system (glassmorphism, glows, gradients)
├── components/
│   ├── animations/
│   │   └── GSAPWrappers.tsx     # ScrollInversionTrack, CinematicZoom, FadeInUp
│   ├── canvas/
│   │   └── SystemArchitectureCanvas.tsx  # Animated SVG architecture diagrams
│   ├── mockups/
│   │   └── MobileMockup.tsx     # High-fidelity device frame component
│   ├── terminal/
│   │   └── InteractiveTerminal.tsx       # Easter-egg terminal overlay
│   └── integrations/
│       └── Integrations.tsx     # GitHub contribution heatmap
├── data/
│   └── portfolio.json           # Structured resume/project data (6 projects)
├── scripts/
│   └── seed-firestore.js        # Firestore batch seeding script
└── .github/workflows/
    └── firebase-hosting-merge.yml  # CI/CD pipeline
```

---

## 🚀 Projects Showcased

| # | Project | Type | Accent | Visual |
|---|---------|------|--------|--------|
| 1 | **Quantum Safe Messenger** | Mobile | Emerald | Chat mockup with PQ encryption UI |
| 2 | **Flight Booking System** | Backend | Blue | 4-node microservices architecture diagram |
| 3 | **Nexus AI Productivity Suite** | Mobile | Purple | Notes list with AI summary card |
| 4 | **FocusFlow** | Mobile | Orange | Fatigue analytics dashboard mockup |
| 5 | **Student Management LMS** | Fullstack | Indigo | 3-node client–API–DB architecture |
| 6 | **Coffee Shop v2.0** | Mobile | Amber | E-commerce cart chat interface |

Each project card includes **GitHub source links** and **YouTube demo buttons** where available.

---

## 🖥 Local Development

```bash
# Clone
git clone https://github.com/AsyncNigam/dynamic_portfolio.git
cd dynamic_portfolio

# Install
npm install

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the site runs with hot reload via Turbopack.

### Admin Panel

Navigate to [http://localhost:3000/admin](http://localhost:3000/admin) in development mode to access the local-only admin panel with:
- Tabbed JSON editor for Firestore collections
- PDF resume drag-and-drop upload zone
- Terminal-style operation status log

> The admin panel is **automatically locked** in production with a 403 screen.

### Seed Firestore

```bash
# Set credentials
export GOOGLE_APPLICATION_CREDENTIALS="path/to/service-account.json"

# Run seeder
node scripts/seed-firestore.js
```

---

## 📦 Deployment

Every push to `main` triggers the GitHub Actions pipeline:

```
Push to main → npm install → next build → Firebase deploy (static hosting)
```

The workflow uses the `FIREBASE_CLI_EXPERIMENTS: webframeworks` flag and deploys to [nigam-portfolio-2026.web.app](https://nigam-portfolio-2026.web.app/).

---

## 🏆 Featured In

<a href="https://github.com/emmabostian/developer-portfolios">
  <img src="https://img.shields.io/badge/developer--portfolios-Featured-success?style=for-the-badge&logo=github" />
</a>

This portfolio is listed in [**emmabostian/developer-portfolios**](https://github.com/emmabostian/developer-portfolios) — a curated collection of developer portfolio sites for inspiration.

---

## 📄 License

MIT © [Nigam Prasad Sahoo](https://github.com/AsyncNigam)
