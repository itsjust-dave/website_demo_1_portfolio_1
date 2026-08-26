# Project Architecture: David Ogbogu Portfolio

## 1. Overview
High-performance, bespoke portfolio landing page for **David Ogbogu** (Webdesigner & Digital Product Designer). Built with semantic HTML5, Vanilla CSS3 with CSS Custom Properties for full Light/Dark mode inversion, a complete **Liquid Glass Design System**, and lightweight Vanilla JavaScript for micro-interactions, spring physics, and dynamic modals. Fully optimized for seamless responsiveness across mobile, tablet, and desktop viewports.

---

## 2. Directory Structure

```
Website-demo-1/
├── .agents/
│   └── rules/
│       └── always_update_architecture.md
├── assets/
│   ├── css/
│   │   └── style.css            # Unified CSS design system, liquid glass engine, mobile breakpoints & dark mode tokens
│   ├── js/
│   │   └── main.js              # Preloader, liquid glass physics, theme toggle, project modal, filters, accordion
│   ├── images/
│   │   ├── david_hero_blended.png# Feathered portrait cutout with soft gradient blend
│   │   ├── david_cutout.png     # Transparent portrait cutout
│   │   ├── david_portrait.jpg   # Original portrait photo
│   │   ├── david_avatar_themed.png# Studio-graded circular themed avatar
│   │   ├── favicon.png          # High-resolution website favicon
│   │   ├── project-bloomcare.jpg# Showcase mockup 1 (Luxury Mental Health App)
│   │   ├── project-fragwater.jpg# Showcase mockup 2 (Luxury Fragrance Landing Page)
│   │   ├── project-cryptocalm.jpg# Showcase mockup 3 (Luxury Crypto Dashboard & Analytics)
│   │   ├── project-zenpay.jpg   # Showcase mockup 4 (NextGen Private Wealth Banking)
│   │   └── service-phones.jpg   # 3 floating mobile app screens
│   └── screenshots/             # Reference screenshots for layout & styling
├── index.html                   # Core semantic landing page
├── ARCHITECTURE.md              # Project architecture & changelog
└── .gitignore                   # Ignored files & system metadata
```

---

## 3. Component Architecture & Mobile Optimization

### A. Preloader Module
- Character-by-character staggered slide-up animation for `David—Ogbogu`.
- Smooth cubic-bezier opacity & transform mask exit revealing the landing page.

### B. Header & Symmetrical Liquid Glass Navigation
- **Desktop Symmetry:** Equal 42px heights, uniform padding, and balanced gaps across the availability badge, navigation pills (`Work`, `Service`, `Experience`, `Contact` without bracketed numbers), theme toggle, and CTA button.
- **Mobile Header Row (<820px, <640px, <480px):** Single horizontal row layout with compact "Available" badge, resized 3D capsule theme toggle with proportional translation lens, and circular liquid glass hamburger menu button.
- **Floating Island State on Scroll (`is-scrolled`):** Transforms seamlessly into a compact, fixed glassmorphic island pill centered at `top: 16px` (or `top: 8px` on mobile) with `backdrop-filter: blur(24px) saturate(190%)`, specular rim lighting, and subtle drop shadow.
- **Scrollspy Active States:** Dynamically detects current viewport section (`#hero`, `#work`, `#services`, `#experience`, `#contact`) and highlights active nav pills.

### C. Liquid Glass Interface & Physics Engine
- **Refractive Specular Highlights:** Multi-layered inset and drop shadows (`--liquid-glass-shadow`, `--liquid-glass-shadow-hover`) paired with top-rim frosted highlight curves.
- **Dynamic Cursor Following:** `mousemove` telemetry updates `--mouse-x` and `--mouse-y` coordinates for real-time specular light lens reflections.
- **Liquid Spring Squish:** Elastic squash-and-stretch feedback on click (`cubic-bezier(0.34, 1.56, 0.64, 1)`).

### D. Redesigned 3D Liquid Glass Theme Switcher
- Recreated after the reference capsule design:
  - **Light Mode:** 3D liquid glass spherical lens resting on the left with a radiant Sun icon; "Light" label displayed on the right.
  - **Dark Mode:** 3D liquid glass spherical lens smoothly translated to the right with a glowing crescent Moon icon; "Dark" label displayed on the left.
  - Responsive lens travel physics across 114px (desktop), 94px (tablet/mobile), and 88px (small mobile).

### E. Hero Section (Mobile Optimized)
- Bold display typography: `DAVID` (outlined stroke style) + `OGBOGU` (solid fill style) with responsive `clamp(34px, 11vw, 142px)`.
- Portrait cutout centered with responsive dimensions (`260px` - `310px` on mobile) layered between typography and content.
- Hero content grid stacked cleanly on mobile with centered role summary, full-width CTA button, and 2x2 grid of liquid glass social pills.

### F. Selected Work Section (`/SELECTED WORK`) (Mobile Centered Layout)
- **Centered Category Tabs:** `All`, `Real Project`, and `Exploration` tabs are center-aligned on mobile with symmetrically equal gaps and balanced padding.
- **Centered "View All Work" Button:** Positioned directly below the centered tabs with matching horizontal center alignment.
- **Project Cards:** Single-column on mobile with permanently visible, touch-friendly liquid glass arrow buttons in the bottom-right corner.
- Luxury FragWater dark theme styling across BloomCare, FragWater, CryptoCalm, and ZenPay.

### G. Interactive Subtle Project Details Modal (Mobile Responsive)
- Touch-friendly bottom-sheet / modal card (`95%` width, `88vh` max height, smooth momentum scrolling).
- Highlights & metrics adapted to single-column and 3-column compact responsive cards.
- Stacked touch-friendly action buttons (`46px` height) and accessible close button.

### H. Services & Experience Sections (Mobile Responsive)
- Accordion header padding optimized for touch targets (min `44px`).
- Experience rows formatted with responsive stacked metadata and hover preview disabled on touch screens to prevent touch conflicts.

### I. CTA & Footer Section (Mobile Responsive)
- Responsive heading wrapping gracefully across all phone screen widths.
- Avatar pill centered with 2x2 grid for social channels.

---

## 4. Version Changelog

| Timestamp | Version | Description |
| :--- | :--- | :--- |
| `2026-08-25T11:58:00+01:00` | `v1.0.0` | Initial release of David Ogbogu Portfolio Landing Page. |
| `2026-08-25T12:17:00+01:00` | `v1.0.1` | Hero portrait blending refinement with gradient masking. |
| `2026-08-25T14:43:00+01:00` | `v1.0.2` | Startup screen enhancements with motion-blur exit. |
| `2026-08-25T15:52:00+01:00` | `v1.0.3` | Floating Glassmorphic Island Navigation. |
| `2026-08-25T15:58:00+01:00` | `v1.0.4` | Initial Mobile Navigation Drawer & responsive styling. |
| `2026-08-25T16:15:00+01:00` | `v1.0.5` | Mobile Header Single-Line Alignment. |
| `2026-08-25T16:25:00+01:00` | `v1.0.6` | Social Channels vector icon update. |
| `2026-08-25T16:29:00+01:00` | `v1.0.7` | Social Icon Theme Synchronization. |
| `2026-08-25T16:51:00+01:00` | `v1.0.8` | Hero Portrait Alignment & Theme Grading. |
| `2026-08-25T17:00:00+01:00` | `v1.0.9` | CTA Typography Refinement. |
| `2026-08-26T10:45:00+01:00` | `v2.0.0` | Major Enhancement: Symmetrical Liquid Glass Navigation, Liquid Glass UI Engine, 3D Theme Switcher, Studio Avatar & Favicon, Live Social Links, FragWater Luxury Mockups, and Project Details Modal. |
| `2026-08-26T10:58:00+01:00` | `v2.0.1` | Comprehensive Mobile Optimization: fine-tuned single-line mobile header row, responsive 3D theme switcher lens translation, stacked hero layout with centered portrait, and responsive modal bottom-sheet adaptations. |
| `2026-08-26T11:08:00+01:00` | `v2.0.2` | Mobile Category Tabs & CTA Centering: center-aligned `All`, `Real Project`, and `Exploration` filter tabs with symmetrical equal spacing on mobile, and center-aligned the `View All Work` button below them. |
