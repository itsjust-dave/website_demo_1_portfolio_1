# Project Architecture: David Ogbogu Portfolio

## 1. Overview
High-performance, bespoke portfolio landing page for **David Ogbogu** (Webdesigner & Digital Product Designer). Built with semantic HTML5, Vanilla CSS3 with CSS Custom Properties for full Light/Dark mode inversion, and lightweight Vanilla JavaScript for micro-interactions and animations.

---

## 2. Directory Structure

```
Website-demo-1/
├── .agents/
│   └── rules/
│       └── always_update_architecture.md
├── assets/
│   ├── css/
│   │   └── style.css            # Unified CSS design system & dark mode tokens
│   ├── js/
│   │   └── main.js              # Preloader, theme toggle, filters, accordion, hover preview
│   ├── images/
│   │   ├── david_hero_blended.png# Feathered portrait cutout with soft gradient blend
│   │   ├── david_cutout.png     # Transparent portrait cutout
│   │   ├── david_portrait.jpg   # Original portrait photo
│   │   ├── project-bloomcare.jpg# Showcase mockup 1 (Mental Health App)
│   │   ├── project-fragwater.jpg# Showcase mockup 2 (Luxury Fragrance)
│   │   ├── project-cryptocalm.jpg# Showcase mockup 3 (Crypto Dashboard)
│   │   ├── project-zenpay.jpg   # Showcase mockup 4 (Fintech Banking App)
│   │   └── service-phones.jpg   # 3 floating mobile app screens
│   └── screenshots/             # Reference screenshots for layout & styling
├── index.html                   # Core semantic landing page
├── ARCHITECTURE.md              # Project architecture & changelog
└── .gitignore                   # Ignored files & system metadata
```

---

## 3. Component Architecture & Interactions

### A. Preloader Module
- Character-by-character staggered slide-up animation for `David—Ogbogu`.
- Smooth cubic-bezier opacity & transform mask exit revealing the landing page.

### B. Header & Floating Glassmorphic Island Navigation
- **Default State:** Sits naturally in the top header card.
- **Floating Pill State on Scroll (`is-scrolled`):** Transforms seamlessly into a compact, fixed glassmorphic island pill centered at `top: 18px` with `backdrop-filter: blur(20px)`, rounded pill boundaries, and subtle drop shadow.
- **Scrollspy Active States:** Dynamically detects current viewport section (`#hero`, `#work`, `#services`, `#experience`, `#contact`) and highlights active nav links with an underline accent.
- **Controls Available Everywhere:** Availability badge, navigation links, animated theme switcher, and `Let's Collaborate` CTA remain accessible without cluttering or obstructing content.

### C. Hero Section
- Bold display typography: `DAVID` (outlined stroke style) + `OGBOGU` (solid fill style).
- Transparent PNG portrait cutout positioned centrally, layered in front of the display typography.
- Role summary card on left (`Webdesigner`, value proposition, CTA button).
- Floating social pill links on right (`Dribbble`, `Instagram`, `LinkedIn`, `Behance`).

### D. Selected Work Section (`/SELECTED WORK`)
- Subtle `PORTFOLIO` watermark header.
- Filter buttons (`All`, `Real Project`, `Exploration`) with animated card filtering.
- Two-column grid of project cards with thumbnail scaling, badges, and hover arrow buttons.

### E. Services Section (`/SERVICE`)
- Interactive accordion system (`UIUX DESIGN`, `WEB DESIGN & DEV`, `BRANDING`, `MOTIONS & ANIMATIONS`).
- Expanding accordion reveals rich descriptions and phone mockup previews.

### F. Experience Section (`/EXPERIENCE`)
- Watermark background `EXPERIENCE`.
- Experience timeline rows (`Kumpin Studio`, `Mikan Team`, `Microsoft`, `Facebook`, `Apple`).
- Cursor-tracking floating popup preview (`.floating-preview`) displaying company/project mockups on hover.

### G. CTA & Footer Section
- Prominent `HAVE A PROJECT IN MIND?` callout with collaboration copy.
- Contact button opening the inquiry modal.
- Footer social pill bar featuring avatar pill (`David Ogbogu`) + external channels + copyright notice.

### H. Contact Modal
- Backdrop-blur overlay modal containing an inquiry form with validation and simulated submission feedback.

---

## 4. Design System & Theme Inversion

| Token Variable | Light Mode | Dark Mode |
| :--- | :--- | :--- |
| `--bg-page` | `#e8ebf0` (cloud mesh) | `#07070a` (cosmic dark) |
| `--bg-container` | `#ffffff` | `#101015` |
| `--bg-card` | `#ffffff` | `#15151c` |
| `--text-primary` | `#111114` | `#f4f4f6` |
| `--text-secondary` | `#52525b` | `#a1a1aa` |
| `--border-card` | `rgba(0, 0, 0, 0.08)` | `rgba(255, 255, 255, 0.1)` |
| `--btn-primary-bg` | `#111114` | `#ffffff` |
| `--btn-primary-text` | `#ffffff` | `#09090b` |
| `--status-dot` | `#10b981` | `#34d399` |

---

## 5. Version Changelog

| Timestamp | Version | Description |
| :--- | :--- | :--- |
| `2026-08-25T11:58:00+01:00` | `v1.0.0` | Initial release of David Ogbogu Portfolio Landing Page: preloader, hero with portrait cutout and stroke typography, selected work grid with category filters, interactive services accordion, experience hover preview, stylish light/dark theme switcher, and contact modal. |
| `2026-08-25T12:17:00+01:00` | `v1.0.1` | Hero portrait blending refinement: feathered alpha boundaries, anchored bottom alignment with smooth CSS gradient masking, and adjusted headline typography spacing for clear non-disruptive placement. |
| `2026-08-25T14:43:00+01:00` | `v1.0.2` | Startup screen enhancements: enlarged preloader typography to massive display scale (`clamp(54px, 8.5vw, 115px)`), intensified character entrance zoom-in, and added pronounced `scale(3.5)` motion-blur exit zoom effect. |
| `2026-08-25T15:52:00+01:00` | `v1.0.3` | Floating Glassmorphic Island Navigation: transformed header into an uncluttered, compact floating pill upon scroll with real-time scrollspy active section tracking. |
| `2026-08-25T15:58:00+01:00` | `v1.0.4` | Comprehensive Mobile Optimization: added slide-in mobile navigation drawer with hamburger toggle, responsive stacked hero layout with optimized portrait positioning, touch-friendly filter horizontal scrolls, single-column responsive grids, and iOS-safe form inputs. |
| `2026-08-25T16:15:00+01:00` | `v1.0.5` | Mobile Header Single-Line Alignment: enforced non-wrapping header layout, added responsive `Available` status badge text on mobile viewports, and miniaturized theme toggle/hamburger buttons for perfect horizontal row fit. |
| `2026-08-25T16:25:00+01:00` | `v1.0.6` | Social Channels Update: replaced Dribbble with GitHub and Behance with WhatsApp with SVG vector icons across Hero, Mobile Drawer, Footer, and Schema metadata (configured with placeholder targets `#`). |
| `2026-08-25T16:29:00+01:00` | `v1.0.7` | Social Icon Theme Synchronization: added explicit dimensional rules (`15px x 15px`) and `currentColor` inheritance for social vector icons so they seamlessly adapt to the website's light/dark design theme and hover states. |
| `2026-08-25T16:51:00+01:00` | `v1.0.8` | Hero Portrait Alignment & Theme Grading: straightened posture and head tilt (-4.2° counter-alignment), centered horizontal axis of symmetry at exact midpoint, and applied high-contrast studio monochrome grading to match the website's minimalist design theme. |
| `2026-08-25T17:00:00+01:00` | `v1.0.9` | CTA Typography Refinement: formatted 'HAVE A PROJECT IN MIND?' to display cleanly on a single line across all viewports with uncluttered letter spacing (`0.03em`) and generous word breathing room (`0.08em`). |
