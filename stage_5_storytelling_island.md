# Stage 5: Isolated Three.js Storytelling Island

This document summarizes the WebGL rendering engine, narrative checkpoints, dynamic imports, and scroll bindings created during Stage 5.

---

## 1. Scene Mechanics & Render Parameters

* **Isolated Canvas**: The canvas is encapsulated within `components/StorytellingIsland.tsx`. It does not bleed into the rest of the layout or block traditional document flows.
* **Liquid Mesh & Condensation**: Rendered inside a physical glass shell, a custom material simulates fluid and bubbles that rise continuously using vertex coordinate offset animations.
* **Ambient Grid**: A grid helper provides visual perspective matching a warehouse or expressway pavement layout.

---

## 2. Scroll-Driven Timeline Checkpoints

As the user scrolls through the `400vh` scroll height container, the scroll progress is calculated (`0.0` to `1.0`) and mapped to camera coordinates and bottle states:

| Progress Range | Story Stage | Camera Positioning / Bottle Transform |
| :--- | :--- | :--- |
| **0.0 - 0.2** | Al Rusayl Bottling Line | Stand tall, center screen, glowing cap highlights. |
| **0.2 - 0.4** | Cold Storage Racks | Shift to left side, tilted angle, showing pallet racks. |
| **0.4 - 0.6** | Transit Vehicle Loading | Zoom out, entry low-angle looking into shipping container. |
| **0.6 - 0.8** | Highway Corridor Transit | Move to right side, speed tilt angles. |
| **0.8 - 1.0** | Retail Fridge & Consumer | Close-up focus, standing straight, rising bubble particles. |

---

## 3. Dynamic Optimization & SSR Protection

To prevent hydration mismatches and server compile issues:
1. **Dynamic Import**: Loaded inside `app/page.tsx` using `next/dynamic` with `ssr: false`.
2. **Hydration Loader**: Includes a custom loading animation to display during WebGL context compilation:
   ```typescript
   const StorytellingIsland = dynamic(() => import("@/components/StorytellingIsland"), {
     ssr: false,
     loading: () => <SpinnerLoader />,
   });
   ```
3. **Scroll Listener Cleanups**: Scroll event listeners are bound inside a `useEffect` hook and cleaned up on unmount.
