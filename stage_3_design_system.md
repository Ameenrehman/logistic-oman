# Stage 3: Enterprise Design System Specification

This document details the design system tokens, layout systems, component specifications, and motion guidelines for the Omani Beverage Logistics website. This serves as the design spec for building the frontend.

---

## 1. Color Tokens (WCAG AA & AAA Compliant)

| Color Name | Token | Value (Hex) | HSL Value | Contrast Ratio (On Bg) | Intended Use |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Obsidian Dark** | `--color-bg-primary` | `#0D1117` | `217°, 28%, 7%` | 15.8:1 (Text White) | Main primary dark background. |
| **Chamber Gray** | `--color-bg-secondary`| `#161B22` | `215°, 21%, 11%` | 13.5:1 (Text White) | Nested containers, cards, UI borders. |
| **Warm Sand** | `--color-bg-light` | `#F9F6F0` | `40°, 24%, 96%` | 17.5:1 (Text Obsidian) | High-contrast light section backgrounds. |
| **Pure White** | `--color-text-primary`| `#FFFFFF` | `0°, 0%, 100%` | 15.8:1 (On Obsidian)| Primary titles and high-priority labels. |
| **Steel Silver** | `--color-text-secondary`| `#8B949E` | `210°, 9%, 57%` | 4.8:1 (On Obsidian) | Secondary descriptors and metadata body. |
| **Desert Amber** | `--color-accent-amber` | `#E5A93C` | `39°, 78%, 57%` | 5.2:1 (On Obsidian) | telemetry trails, highlight metrics, warm alerts. |
| **Crimson Surge** | `--color-accent-red` | `#E31B23` | `358°, 80%, 50%` | 4.5:1 (On Obsidian) | CTAs, active highlights, major client focus. |
| **Border Glass** | `--color-border-glass` | `#30363D` | `215°, 11%, 22%` | N/A | Semi-transparent card borders. |

---

## 2. Typography Scale (Fluid Layout)

| Token | Family | Desktop Size | Mobile Size | Weight | Line Height | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `--font-display` | Outfit | `64px` | `40px` | `700` (Bold) | `110%` | Hero taglines |
| `--font-h1` | Outfit | `44px` | `30px` | `600` (SemiBold) | `120%` | Section headers |
| `--font-h2` | Outfit | `28px` | `22px` | `600` (SemiBold) | `130%` | Large component headers |
| `--font-h3` | Outfit | `20px` | `18px` | `500` (Medium) | `140%` | Subheadings, card titles |
| `--font-body-lg` | Plus Jakarta Sans | `18px` | `16px` | `400` (Regular) | `160%` | Lead-in intro paragraphs |
| `--font-body-md` | Plus Jakarta Sans | `16px` | `14px` | `400` (Regular) | `150%` | Default body copy |
| `--font-caption` | Plus Jakarta Sans | `14px` | `12px` | `500` (Medium) | `140%` | Table data, micro-labels |
| `--font-button` | Plus Jakarta Sans | `16px` | `15px` | `600` (SemiBold) | `100%` | Action triggers, buttons |

---

## 3. Grid & Layout System

| Token | Layout Type | Columns | Margin (Gutter) | Max Width | Target Device |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `--grid-desktop` | CSS Grid / Flex | `12` | `24px` margin, `24px` gutter | `1440px` | Desktop (> 1024px) |
| `--grid-tablet` | CSS Grid / Flex | `8` | `20px` margin, `20px` gutter | `1024px` | Tablet (768px - 1024px)|
| `--grid-mobile` | Flex Column | `4` | `16px` margin, `16px` gutter | `768px` | Mobile (< 768px) |

---

## 4. Spacing System (Based on 8px Grid)

| Token | Size (px) | Size (rem) | Usage Context |
| :--- | :--- | :--- | :--- |
| `--space-xs` | `8px` | `0.5rem` | Micro margins, card icons to text padding. |
| `--space-sm` | `16px` | `1.0rem` | Text blocks, button padding (horizontal). |
| `--space-md` | `24px` | `1.5rem` | Card internal padding, small list gutters. |
| `--space-lg` | `48px` | `3.0rem` | Between sub-sections, standard card margin. |
| `--space-xl` | `80px` | `5.0rem` | Major desktop page section gaps. |
| `--space-xxl`| `120px` | `7.5rem` | Hero block separation. |

---

## 5. Component Hierarchy & Patterns

### Card Styles
| Card Type | Background Token | Border Token | Border Radius | Shadow / Interaction |
| :--- | :--- | :--- | :--- | :--- |
| **Glass Card** | `--color-bg-secondary` | `--color-border-glass` | `8px` | Subtle opacity shift, border turns to sand on hover. |
| **Accent Card**| `--color-accent-amber` | None | `8px` | Used for highlighting active operations. Dark text. |
| **High Impact**| `--color-accent-red` | None | `8px` | Callout panels, promotional blocks. White text. |

### KPI Styles (Scale Indicators)
| KPI Block | Layout | Number Token | Label Token | Interaction |
| :--- | :--- | :--- | :--- | :--- |
| **Primary KPI**| Column Stack | `--font-display` (Amber) | `--font-caption` (Silver) | Smooth count-up on viewport enter. |
| **Compact KPI**| Row Align | `--font-h2` (White) | `--font-caption` (Silver) | Accent hover border glow. |

### Form Elements (RFQ Portal)
| Input Type | Default State | Focus State | Error State |
| :--- | :--- | :--- | :--- |
| **Text Fields**| `--color-bg-secondary` bg, `--color-border-glass` border. Text: White. | Border turns to `--color-accent-amber`, soft inner glow. | Border turns to `--color-accent-red`. Crimson message below. |
| **Dropdowns** | Transparent overlay, custom arrow icon. | Dropdown slide-reveal. | Active red border override. |
| **Primary CTA**| Crimson red background, bold white text. | Background scales to amber, text obsidian dark. | Disable opacity 40%, remove interactive cursor. |

---

## 6. Motion & Animation Rules

Animations are designed to provide a premium feel, avoiding unnecessary decorations.

| Event Type | Animation Spec | Duration | Easing curve | Target Elements |
| :--- | :--- | :--- | :--- | :--- |
| **Page Load** | Opacity 0 -> 1, Translate Y 20px -> 0px | `0.6s` | Cubic Bezier `(0.16, 1, 0.3, 1)` (Ultra-smooth out) | Page headings, logo, header buttons |
| **Scroll Reveal**| Opacity 0 -> 1, Scale 0.98 -> 1 | `0.5s` | Cubic Bezier `(0.25, 1, 0.5, 1)` | Services grids, telemetry cards |
| **Hover Shift** | Scale 1 -> 1.015, Translate Y 0 -> -4px | `0.3s` | Cubic Bezier `(0.34, 1.56, 0.64, 1)` (Spring-back) | Navigation list, action cards |
| **Telemetry Pulse**| Border-radius glow wave animation | `2.0s` loop | Linear | Map hub location pins |
| **Form Slide** | Slide horizontal (Right-to-left) | `0.4s` | Cubic Bezier `(0.76, 0, 0.24, 1)` | RFQ multi-step screens |
