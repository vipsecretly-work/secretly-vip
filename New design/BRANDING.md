# SECRETLY® Core Branding Guidelines

This document serves as the absolute source of truth for all design decisions, adding new pages, generating components, and modifying styling within the SECRETLY® project. 

The aesthetic is **Avant-Garde Editorial Minimalist**. It relies heavily on stark contrast, extreme negative space, aggressive scale typography, and structural lines.

## 1. Core Palette
Do not use generic grays, blues, or soft pastels. Stick rigidly to this stark palette:
*   **Brand Red (Primary):** `var(--red)` or `#ff0033`
*   **Absolute Black:** `var(--black)` or `#111111`
*   **Absolute White:** `var(--white)` or `#ffffff`
*   **Structural Lines:** `var(--line)` or `rgba(0, 0, 0, 0.1)`

*Rule: Red should be used as a sharp accent, a solid block, or an interactable active state. Black is the default text color.*

## 2. Typography System
Two fonts govern the entire application. Do not deviate.
*   **Brand Headings (`var(--f-brand)` / `Ahsing`):**
    *   Used *exclusively* for massive structural headings, the main wordmark, and major section titles.
    *   **Always: `text-transform: uppercase`**
    *   **Line-height:** Tightly compacted (`0.85` to `1.0`), meaning descenders and ascenders visually crash into surrounding boxes.
    *   **Scale:** Massive (`clamp(48px, 10vw, 240px)`).

*   **Body & Utility (`var(--f-body)` / `Inter`):**
    *   Used for all UI elements, navigation, small metadata, dates, and paragraph tags.
    *   **Metadata/Labels:** `font-size: 11px`, `fontWeight: 700`, `letter-spacing: 0.15em`, `text-transform: uppercase`.
    *   **Main Copy:** Clean, legible sizes without clutter. Do not use generic, unstyled sans-serif.

## 3. Structural Layout (The Red Frame)
The entire application is framed within a solid red viewport casing:
*   **The Outer Void:** The `body` background is `var(--red)`.
*   **The Core Container:** A white card (`#ffffff`) sits inside the body with a `16px` margin all around (`padding: 16px` on `body`, `100%` width/height for the inner container).
*   **Corner Radii:** The inner white container has sharp but visible border rounding.

## 4. Texture & Material
*   **High-End Frosted Glass:** Use `backdrop-filter: blur(20px)` to `blur(40px)` on floating elements (navbars, search overlays) over white backgrounds (`rgba(255, 255, 255, 0.9)`).
*   **No Soft Drop Shadows:** Do not use modern SaaS-style soft box-shadows. Shadows should be hard, non-existent, or extremely subtle (`0 4px 20px rgba(0,0,0,0.05)`).
*   **Border Lines:** Use hard 1px black or red lines to separate sections structurally (like an editorial grid in a magazine).

## 5. Interactions & Animations
*   Buttons should not look like thick capsules or pills unless structurally required. Prefer flat text buttons with expanding underline borders or color shifts (Black -> Red on hover).
*   Animations must be buttery smooth (`60fps`). Do not use heavy DOM filters for particles. Use `canvas` layers.
*   Interactions should feel stark and instantaneous, or highly editorial (e.g., full-screen overlays fading in quickly, zero bounce).

*WHEN CREATING NEW PAGES, ALWAYS ADHERE TO THESE RULES TO MAINTAIN THE 'SECRETLY' IDENTITY.*
