# Stage 4: Build Enterprise Website — Next.js, Tailwind, & Framer Motion

This document summarizes the core components, directories, and compilation tests conducted during Stage 4.

---

## 1. Directory Structure

The Next.js App Router workspace is structured for scalable component reuse:

```text
/e:/logistic-website
├── app/
│   ├── about/page.tsx       # Company history, leadership & certificates
│   ├── contact/page.tsx     # Office locations, direct numbers, RFQ form
│   ├── coverage/page.tsx    # Terminals list, regional and GCC transit timelines
│   ├── fleet/page.tsx       # Heavy, rigid, and van specs with safety policies
│   ├── services/page.tsx    # Temperature cold chain specs and WMS details
│   ├── technology/page.tsx  # Central command center features and API integration
│   ├── globals.css          # Design system CSS tokens and glassmorphism styling
│   ├── layout.tsx           # Outfit / Plus Jakarta Sans fonts and wrappers
│   └── page.tsx             # Main portal mapping all landing pages
├── components/
│   ├── Header.tsx           # Premium navigation and mobile drawer
│   ├── Footer.tsx           # Quick links and compliance badges
│   ├── TrustDashboard.tsx   # Incrementing numbers and client lists
│   ├── ServicesPanel.tsx    # Three-category overview cards
│   ├── TelemetryMap.tsx     # Oman SVG interactive map and active pulse dots
│   └── RfqForm.tsx          # Multi-step logistics proposal request portal
├── public/
│   └── images/
│       ├── hero_oman_transit.png
│       ├── warehouse_automated.png
│       ├── fleet_truck_close.png
│       └── control_center_tech.png
```

---

## 2. Dependencies & Build Tests

### Technical Packages Installed
* **`next` / `react` / `react-dom`**: Next.js App Router (Turbopack bundler).
* **`framer-motion`**: Clean spring-easing transitions and reveal effects.
* **`lucide-react`**: Consistent high-quality icon vectors.
* **`react-intersection-observer`**: Viewport trigger tracking for counters and slide-ins.

### Build Compilation Results
A production build was executed successfully without compilation warning triggers:
```text
▲ Next.js (Turbopack)
  Creating an optimized production build ...
✓ Compiled successfully
  Running TypeScript ...
  Finished TypeScript ...
  Generating static pages ...
✓ Generating static pages (10/10)
  Finalizing page optimization ...
Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /about
├ ○ /contact
├ ○ /coverage
├ ○ /fleet
├ ○ /services
└ ○ /technology
```
All routes are successfully pre-rendered as highly optimized static HTML pages.

---

## 3. SEO, Typography, and Accessibility Checks
* **SEO Metadata**: Descriptive title patterns, descriptive taglines, local keywords (Oman, Muscat, Al Rusayl, Dhofar), and Open Graph schemas are embedded inside the main Layout metadata.
* **A11y (Accessibility)**: Color contrasts meet WCAG AA standards (minimum 4.5:1, typical > 13:1 on obsidian backgrounds). Clear form labels, select placeholders, and text tags are used on input panels.
* **Typography Scale**: Configured Outfit font for geometric headings, and Plus Jakarta Sans for body text using standard viewport size scaling.
