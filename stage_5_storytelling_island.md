# Stage 5: Isolated Three.js Storytelling Island (Oman Cold Chain Intelligence)

This document summarizes the WebGL rendering engine, narrative checkpoints, dynamic imports, and scroll bindings implemented in `components/StorytellingIsland.tsx`.

---

## 1. Scene Mechanics & Render Parameters

*   **Isolated Canvas**: The canvas is encapsulated within `components/StorytellingIsland.tsx`. It does not bleed into the rest of the layout or block traditional document flows.
*   **Oman Logistics Grid**: Renders glowing Omani city nodes (Muscat, Sohar, Nizwa, Duqm, Salalah) connected by red lines (`THREE.Line`) to represent the secure cold-chain transit network.
*   **CAD-Style Refrigerator Truck**: Programmatically rendered using basic box and cylinder geometries to eliminate external file load overhead:
    *   **Cabin**: Finished in charcoal obsidian with an outer red CAD wireframe outline (`#E31B23`, `opacity: 0.15`) for a futuristic telemetry aesthetic.
    *   **Volumetric Headlight Cones**: Transparent yellow cylinders (`#FBBF24`, `opacity: 0.16`) projecting forward to simulate headlights.
    *   **Cargo Trailer**: Translucent container walls (`roughness: 0.15`, `transmission: 0.82`) displaying active cooler airflow particle simulations and green/red thermal node alerts.
*   **Lighting Configuration**: High-intensity spot, directional, and point lights (combined with an ambient light intensity of `0.75`) to make the CAD wireframes and metallic materials stand out cleanly.

---

## 2. Scroll-Driven Timeline Checkpoints

As the user scrolls through the `400vh` scroll height container, the scroll progress (`0.0` to `1.0`) is calculated and mapped to camera coordinates, truck positioning, and Omani logistics grid stages:

| Scroll progress | Story Stage | Camera Positioning / Model Transform |
| :--- | :--- | :--- |
| **0.0 - 0.16** | National Logistics Grid Online | Camera descends from top-front. The logistics grid lights up. GPS node starts pulsing. |
| **0.17 - 0.33** | Cold Chain Intelligence | Camera sweeps to an extreme side closeup of the truck trailer. Internal airflow and thermal pings animate. |
| **0.34 - 0.50** | Real-Time Fleet Telemetry | Camera pulls back as wheels spin up. Headlights project volumetric light cones to simulate road dispatch. |
| **0.51 - 0.66** | Omani Distribution Network | Camera shifts to a top-down view showing the Muscat, Sohar, Nizwa, Duqm, and Salalah pathways connecting. |
| **0.67 - 0.83** | Intelligent Cargo Access | Camera zooms into the rear cargo container. The trailer doors slide open, revealing internal cooling vapor. |
| **0.84 - 1.00** | Nationwide Excellence Dashboard | The Three.js canvas dissolves/fades away as a 2D enterprise performance ledger rises. |

---

## 3. Dynamic Optimization & SSR Protection

To prevent hydration mismatches and server compile issues:
1.  **Dynamic Import**: Loaded inside `app/page.tsx` using `next/dynamic` with `ssr: false`.
2.  **Hydration Loader**: Includes a custom loading animation to display during WebGL context compilation:
    ```typescript
    const StorytellingIsland = dynamic(() => import("@/components/StorytellingIsland"), {
      ssr: false,
      loading: () => <SpinnerLoader />,
    });
    ```
3.  **Dynamic Unloading**: The component uses an `IntersectionObserver` to track viewport intersection. If the storytelling section is not visible, the Canvas is completely unloaded from the DOM, freeing GPU memory.
