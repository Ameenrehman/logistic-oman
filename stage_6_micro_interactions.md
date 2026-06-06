# Stage 6: Micro Interactions & Smooth Transitions

This document details the micro-interactions, spring transitions, and interactive visual states implemented across the OBL platform.

---

## 1. Animation Guidelines & Transition Physics

To maintain a professional corporate environment while ensuring dynamic interactivity:
* **No Linear Transitions**: All motion transitions utilize custom cubic bezier curves or spring physics to mirror organic, high-end design states.
* **Standard Spring Config**:
  ```typescript
  const springConfig = { type: "spring", stiffness: 300, damping: 25 };
  ```
* **Performance Checks**: Opacity changes, transform scales, and CSS color transformations are offloaded to GPU rendering threads where possible.

---

## 2. Interactive Features Overview

### 1. Navigation Header
* **Route Indicators**: Active page links display a bottom border fade-in and text weight shift.
* **Slide-over Drawer**: The mobile sidebar panel slides out from the right using:
  ```typescript
  initial={{ x: "100%" }}
  animate={{ x: 0 }}
  exit={{ x: "100%" }}
  transition={{ type: "spring", damping: 30, stiffness: 200 }}
  ```

### 2. Services Panel & Cards
* **Interactive Hover Scaling**: Cards lift slightly on mouse hover (`y: -4`, `scale: 1.01`) and display an accent border highlight.
* **Entrance Reveals**: Cards use scroll-triggered reveals with viewports:
  ```typescript
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  ```

### 3. Telemetry Map & Route Overlay
* **Ping Pulses**: Active terminal locations scale out indefinitely using a ping animation to draw user focus.
* **Vector Path Draw**: Connecting transit routes draw dynamically using SVG path length stroke dashes when a terminal is active.

### 4. RFQ Portal Steps
* **Multi-Step AnimatePresence**: Form pages exit left and enter right with opacity slide fades:
  ```typescript
  initial={{ opacity: 0, x: 20 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: -20 }}
  ```
* **Submit Completion Check**: A green check icon expands dynamically using scale spring physics once a proposal request has been logged.
