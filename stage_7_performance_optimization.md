# Stage 7: Performance Optimization

This document lists the optimization techniques, bundle loading strategies, and asset compression rules applied to OBL.

---

## 1. Asset & Media Optimization

* **Dynamic Image Compression**: All background assets (hero transit, warehouse storage, telemetry screens, fleet truck close-ups) are routed through the `next/image` component. This automatically serves compressed, next-gen formats (WebP/AVIF) depending on user agent capabilities.
* **Responsive Width Queries (`sizes`)**: Images use viewport-specific scaling queries (e.g. `sizes="(max-width: 1024px) 100vw, 50vw"`) to prevent downloading desktop-resolution files on mobile.
* **Layout Shift Protection (CLS)**: Critical image frames are given pre-defined sizes or flex boundaries to prevent page jumps during download.
* **Preloaded Hero Folds**: The primary hero background contains `priority` markers, instructing the browser to preload the image ahead of secondary files.

---

## 2. Code Splitting & Dynamic Imports

* **Bundling Deferrals**: The Three.js canvas library and the GSAP dependency represent significant weight. These packages are completely excluded from the initial page payload using dynamic lazy imports:
  ```typescript
  const StorytellingIsland = dynamic(() => import("@/components/StorytellingIsland"), {
    ssr: false,
    loading: () => <LoadingSpinner />,
  });
  ```
  The browser only fetches these dependencies after the initial DOM content has finished parsing, improving **First Contentful Paint (FCP)** and **Time to Interactive (TTI)**.
* **Static Page Generation**: All routes (About, Services, Fleet, Technology, Coverage, Contact) are pre-rendered as lightweight static HTML pages during the build phase.

---

## 3. Font Delivery

* **Self-Hosted Google Fonts**: Font variables are loaded via `next/font/google` (Outfit and Plus Jakarta Sans), self-hosting files locally to bypass external Google API requests.
* **Flash of Invisible Text (FOIT) Protection**: Both fonts are configured with `display: 'swap'` to guarantee immediate readability during network latency.
