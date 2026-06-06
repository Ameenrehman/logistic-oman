# Stage 5B: Mobile Fallback Experience

This document details the responsive optimization and mobile fallback strategy executed during Stage 5B.

---

## 1. Performance-Driven Mobile Checkpoints

On viewport widths narrower than **768px** (tablets and mobile phones), resource-heavy WebGL initialization is disabled:

* **WebGL Canvas Offloading**: The `<Canvas>` component is completely excluded from the render tree, preventing loading of Three.js geometry, physical shaders, and environment environment maps.
* **CPU and Battery Savings**: Saves local GPU rendering overhead, ensuring a fluid 60fps scrolling experience on low-spec smartphones and legacy devices.

---

## 2. 2D Interactive Sizing Deck

The WebGL scene is replaced with a premium 2D mobile timeline:

* **Horizontal Swipe Layout**: A horizontal swipe deck enables standard touch control navigation.
* **Aesthetic Consistency**: Contains identical narrative checkpoints, subtitles, and SLA metrics.
* **Vector Icon Preview**: Displays a vector SVG schematic illustrating the bottle shell, liquid, and gas bubble elements dynamically colored to match the Omani beverage design system.
* **Step Sizing Markers**: Displays step dots (e.g. `01 / 06`) illustrating progress along the logistics journey.
