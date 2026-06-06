# Stage 5: GSAP ScrollTrigger Storytelling Timeline (Oman Cold Chain Intelligence)

This document summarizes the GSAP ScrollTrigger pinned parallax sections, narrative checkpoints, and scroll bindings implemented in `components/StorytellingTimeline.tsx`.

---

## 1. Architecture Overview

*   **Engine**: GSAP ScrollTrigger with per-section pinning (`pin: true`, `pinSpacing: false`).
*   **Six pinned sections**, each `100vh`, sequentially pinning as the user scrolls.
*   **Parallax backgrounds**: Each section's background image scrubs from `y: 15%` → `y: -15%` with `scale: 1.1` → `1` as you scroll through it.
*   **Content fade-in**: Text panels fade+slide up (`y: 40, opacity: 0` → `y: 0, opacity: 1`) linked to scroll via `scrub: 1`.
*   **3D removed**: The programmatic Three.js truck model was removed. All sections use full-bleed premium imagery.
*   **Lazy image loading**: Browser-native and React lazy loading with multiple WebP/AVIF breakpoints.

---

## 2. Scroll-Driven Timeline Panels

| Panel | Story Stage | Background Image |
| :--- | :--- | :--- |
| **1** | National Logistics Grid Online | `/images/hero_oman_transit.png` |
| **2** | Cold Chain Intelligence | `/images/cold-chain-trailer-interrior-1920w.webp` (new) |
| **3** | Real-Time Fleet Telemetry | `/images/control_center_tech.png` |
| **4** | Nationwide Distribution Network | `/images/oman-network-map-1920w.webp` (new) |
| **5** | Verified Cold-Chain Delivery | `/images/cargo-door-opening-1920w.webp` (new) |
| **6** | Operational Excellence Ledger | Pure 2D KPI dashboard (no background image) |

---

## 3. GSAP ScrollTrigger Details

Each section gets:

```typescript
// Pin the section
ScrollTrigger.create({
  trigger: section,
  start: "top top",
  end: "bottom bottom",
  pin: true,
  pinSpacing: false,
});

// Parallax background
gsap.fromTo(bg,
  { y: "15%", scale: 1.1 },
  { y: "-15%", scale: 1, ease: "none",
    scrollTrigger: { trigger: section, start: "top bottom",
    end: "bottom top", scrub: 1.5 }
  }
);

// Content fade-in
gsap.fromTo(content,
  { y: 40, opacity: 0 },
  { y: 0, opacity: 1, ease: "power2.out",
    scrollTrigger: { trigger: section, start: "top 80%",
    end: "top 30%", scrub: 1 }
  }
);
```

*   **Progress bar**: Fixed top bar (3px, crimson→amber gradient) scales from 0 to 1 across the full page scroll.

---

## 4. Image Assets (New)

| Asset | Generated Sizes | Formats |
| :--- | :--- | :--- |
| `cold-chain-trailer-interrior` | 640w, 1280w, 1920w | WebP, AVIF, JPEG (fallback) |
| `oman-network-map` | 640w, 1280w, 1920w | WebP, AVIF, JPEG (fallback) |
| `cargo-door-opening` | 640w, 1280w, 1920w | WebP, AVIF, JPEG (fallback) |

Generated via `sharp` in `scripts/convert-images.mjs`.

---

## 5. Mobile Fallback

At `< 768px`, the GSAP pinned sections are replaced with a vertical accordion/infographic layout (same content, stack layout). No scroll-linked animations on mobile.

---

## 6. Dynamic Import

```typescript
const StorytellingTimeline = dynamic(() => import("@/components/StorytellingTimeline"), {
  ssr: false,
  loading: () => <SpinnerLoader />,
});
```
