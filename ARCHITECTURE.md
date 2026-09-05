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
│   │   └── style.css            # Unified CSS design system, liquid glass engine, About page layouts, mobile breakpoints & dark mode tokens
│   ├── js/
│   │   └── main.js              # Preloader, liquid glass physics, theme toggle, project modal, filters, accordion, active nav detection
│   ├── images/
│   │   ├── david_hero_blended.png# Feathered portrait cutout with soft gradient blend
│   │   ├── david_cutout.png     # Transparent portrait cutout
│   │   ├── david_portrait.jpg   # Original studio portrait photo
│   │   ├── david_avatar_themed.png# Studio-graded circular themed avatar
│   │   ├── favicon.png          # High-resolution website favicon
│   │   ├── project-bloomcare.jpg# Showcase mockup 1 (Luxury Mental Health App)
│   │   ├── project-fragwater.jpg# Showcase mockup 2 (Luxury Fragrance Landing Page)
│   │   ├── project-cryptocalm.jpg# Showcase mockup 3 (Luxury Crypto Dashboard & Analytics)
│   │   ├── project-zenpay.jpg   # Showcase mockup 4 (NextGen Private Wealth Banking)
│   │   └── service-phones.jpg   # 3 floating mobile app screens
│   └── screenshots/             # Reference screenshots for layout & styling
├── index.html                   # Core semantic landing page with About Me teaser
├── about.html                   # Dedicated, comprehensive About page
├── ARCHITECTURE.md              # Project architecture & changelog
└── .gitignore                   # Ignored files & system metadata
```

---

## 3. Component Architecture & Mobile Optimization

### A. Preloader Module
- Character-by-character staggered slide-up animation for `David—Ogbogu`.
- Smooth cubic-bezier opacity & transform mask exit revealing the landing page.

### B. Header & Symmetrical Liquid Glass Navigation
- **Desktop Symmetry:** Equal 42px heights, uniform padding, and balanced gaps across the availability badge, navigation pills (`About`, `Work`, `Service`, `Experience`, `Contact`), theme toggle, and CTA button.
- **Cross-Page Routing:** Seamless navigation between `index.html` and `about.html`, maintaining active pill states and smooth scrolling to anchor sections.
- **Mobile Header Row (<820px, <640px, <480px):** Single horizontal row layout with compact "Available" badge, resized 3D capsule theme toggle with proportional translation lens, and circular liquid glass hamburger menu button.
- **Floating Island State on Scroll (`is-scrolled`):** Transforms seamlessly into a compact, fixed glassmorphic island pill centered at `top: 16px` (or `top: 8px` on mobile) with `backdrop-filter: blur(24px) saturate(190%)`, specular rim lighting, and subtle drop shadow.

### C. Liquid Glass Interface & Restored Light Mode Hover Effects
- **Restored Light Mode Hover UX:** Re-engineered `--liquid-sheen-color` (`rgba(255, 255, 255, 0.95)`), enhanced specular rim lighting, subtle luminous background gradient transitions (`linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(240, 244, 252, 0.82))`), and crisp multi-layered shadow lift on hover.
- **Dynamic Cursor Following:** `mousemove` telemetry updates `--mouse-x` and `--mouse-y` coordinates for real-time specular light lens reflections.
- **Liquid Spring Squish:** Elastic squash-and-stretch feedback on click (`cubic-bezier(0.34, 1.56, 0.64, 1)`).

### D. Redesigned 3D Liquid Glass Theme Switcher
- Recreated after the reference capsule design:
  - **Light Mode:** 3D liquid glass spherical lens resting on the left with a radiant Sun icon; "Light" label displayed on the right.
  - **Dark Mode:** 3D liquid glass spherical lens smoothly translated to the right with a glowing crescent Moon icon; "Dark" label displayed on the left.
  - Responsive lens travel physics across 114px (desktop), 94px (tablet/mobile), and 88px (small mobile).

### E. Hero Section & Homepage About Teaser
- Bold display typography: `DAVID` (outlined stroke style) + `OGBOGU` (solid fill style) with responsive `clamp(34px, 11vw, 142px)`.
- Core brand identity positioning: **Data • Technology • Design** (*Building data-informed digital experiences and practical technology solutions*).
- **Homepage About Teaser (`#about-teaser`):** Seamless transition section with concise narrative and liquid glass "Read Full Story ↗" CTA linking to `about.html`.

### F. Dedicated About Page (`about.html`) Architecture
- **Value-First Hook & Studio Portrait:** Lead positioning statement, studio-framed portrait card with liquid glass bezel and live status indicator.
- **The Journey Arc:** 6-step interactive narrative progression from *Engineering (UNN) → Tech → Data → Software → Design → Digital Products*.
- **5 Core Focus Areas:** Liquid glass cards for *Data Analytics & BI*, *Web Development*, *UI/UX Design*, *Digital Tech & Creative Work*, and *Project Management*.
- **Experience Highlights:** Real-world feature cards for *Enugu Tech Festival 2026*, *TEDx Enugu*, *BTG Multimedia*, and *Deloitte Job Simulation*.
- **My Project Approach ("How I Think"):** Systematic 6-step engineering methodology (*Understand, Research, Analyze, Design, Build, Improve*).
- **Skills Matrix:** Categorized interactive skill tags with hover elevation.
- **Philosophy & Continuous Learning:** The Product Intersection Loop (*Data → UI/UX → Web Dev → Analytics → AI*) and core philosophy.
- **Education & Certifications:** UNN B.Eng Electronics & Computer Engineering, Ministry of Innovation, OSHA, and ALX credentials.
- **Frictionless Contact Modal:** Centered fixed popup modal overlay (`.modal-backdrop`) with clean form inputs.
- **Standard Multipage Navigation Footer (`.site-footer-multipage`):** 4-column structured footer with Brand Identity & Live Status Badge, Pages Navigation, Areas of Expertise, Connect Social Channels, and Sub-footer Bar with Back-to-Top trigger.

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
| `2026-09-01T12:55:00+01:00` | `v2.1.0` | About Page Release & Liquid Glass Hover Restoration: Dedicated `about.html` page with full multidisciplinary narrative, restored light-mode liquid glass hover effects, updated symmetrical navigation (`About`, `Work`, `Service`, `Experience`, `Contact`), and homepage About Me teaser section. |
| `2026-09-01T13:20:00+01:00` | `v2.1.1` | Visual Spacing Overhaul & Standard Multipage Footer: Expanded section paddings (90px–100px), unclustered card grid layouts, removed circular bottom inline modal artifact, properly configured fixed popup modal, and implemented a standard 4-column multipage navigation footer across `about.html` and `index.html`. |
| `2026-09-01T13:42:00+01:00` | `v2.1.2` | Home Navbar Navigation & Session-Aware Preloader: Added explicit `Home` pill button across desktop navbar and mobile drawer on both `index.html` and `about.html`, enhanced scrollspy active state detection, removed preloader DOM from `about.html`, and updated `main.js` with `sessionStorage` guard so startup character animation only plays on initial landing and never interrupts intra-site navigation. |
| `2026-09-01T13:50:00+01:00` | `v2.1.3` | Dedicated Homepage Section Navigation Dock: Streamlined the global header navbar to clean page-level navigation (`[Home]` and `[About]`), and introduced a distinctive, dedicated liquid glass Section Navigation Dock on the homepage only (`[✦ Work] [❖ Service] [◈ Experience] [✉ Contact]`) with active scrollspy tracking. |
| `2026-09-01T13:52:00+01:00` | `v2.1.4` | Floating Sticky Homepage Section Dock: Transformed the homepage section navigation into a persistent floating glassmorphic dock (`position: fixed; bottom: 28px; left: 50%`) that follows the user as they scroll throughout the home page, providing quick one-click jump navigation to Work, Service, Experience, and Contact at all times. |
| `2026-09-01T14:04:00+01:00` | `v2.1.5` | Performance & Fluidity Engine, Smooth Theme Switching, and Edge-to-Edge Adaptive Layout: Eliminated empty side gutter blanks by making `.site-wrapper` full width with responsive centered section containers (`max-width: 1320px`), unified 60fps RAF scroll and mouse telemetry loops, added hardware-accelerated fluid modal/popup transitions, smooth in-page anchor gliding, and universal cubic-bezier theme transitions. |
| `2026-09-01T14:08:00+01:00` | `v2.1.6` | Hero Typography Proportion Refinement: Restored tight framing between `DAVID` and `OGBOGU` around the hero portrait by constraining `.hero-title-wrap` and `.hero-content-grid` to `max-width: 1140px; margin: 0 auto;`, eliminating the excessive horizontal gap while keeping the site layout responsive. |
| `2026-09-01T14:16:00+01:00` | `v2.1.7` | Hero Headline Full-Fit Fluid Typography: Configured `clamp(48px, 11.2vw, 156px)` with centered layout and tight responsive gap (`clamp(14px, 3.2vw, 48px)`) directly above the portrait cutout, ensuring the massive headline spans the width of the hero without empty space between words. |
| `2026-09-01T14:24:00+01:00` | `v2.1.8` | Classy Vector Icon Redesign for About Page: Replaced all generic emojis in Core Competencies and Skills Matrix with bespoke, theme-adaptive vector SVG icons housed in frosted glassmorphic capsules (`.focus-card-icon`, `.skill-category-icon`), matching the site's aesthetic language. |
| `2026-09-01T15:06:00+01:00` | `v2.2.0` | Official 2026 Brand Guidelines Theme Overhaul: Implemented the official visual identity with Bitter Lime (`#D2FF00`), Pine Tree (`#2C3023`), Morning Snow (`#F4F4ED`), Rose Tonic (`#FFDEDE`), Brilliant Azure (`#3898EC`), and Maire Dark (`#282C20`) across `:root` and `[data-theme="dark"]`, featuring Bitter Lime specular top-rim card borders (`border-top: 2px solid #D2FF00`), energetic hover glows, active pill highlights, and updated preloader typography. |
| `2026-09-01T15:28:00+01:00` | `v2.2.1` | Light Mode Refinement & Natural Experience Row Interaction: Restored surname `OGBOGU` to crisp primary text color in Light Mode, restored full original natural colors on the hero profile portrait cutout (`david_cutout.png`), removed the circular lemon lens overlay from the about preview card photo, restored original frosted crystal liquid glass buttons/navbars without lemon shadows, and removed the intrusive floating preview popup in the Experience section for a cleaner, intuitive row slide highlight. |
| `2026-09-01T15:35:00+01:00` | `v2.2.2` | Revert Light Mode Customizations to Official 2026 Brand Guidelines: Reverted Light Mode tokens, hero portrait blend (`david_hero_blended.png`), about preview card sheen overlay, Bitter Lime specular top-rim cards (`border-top: 2px solid #D2FF00`), and interactive highlights back to the cohesive 2026 Brand Guidelines visual aesthetic across Morning Snow (`#F4F4ED`), Bitter Lime (`#D2FF00`), and Pine Tree (`#2C3023`). |
| `2026-09-01T15:48:00+01:00` | `v2.2.3` | Light Mode Bitter Lime Surname, Natural Portrait & Clean Glass Shadows: Updated surname `OGBOGU` color to Bitter Lime (`#D2FF00`) in Light Mode, restored original full-color profile portrait cutout (`david_cutout.png`), removed circular lemon lens sheen from photo in "A Little About Me" card, and stripped lemon-colored hover shadows from liquid glass buttons and navigation bars in Light Mode while preserving all specular borders, backgrounds, and active states. |
| `2026-09-01T15:50:00+01:00` | `v2.2.4` | Black Text Stroke Outline for Surname in Light Mode: Added responsive black/dark stroked border (`-webkit-text-stroke: clamp(2px, 0.22vw, 3.2px) var(--hero-name-stroke); paint-order: stroke fill;`) to `.hero-last-name` in Light Mode, delivering a bold frame around the Bitter Lime `OGBOGU` fill to ensure high contrast against the light canvas. |
| `2026-09-01T15:52:00+01:00` | `v2.2.5` | Thicker Surname Black Border: Increased the text stroke width on `.hero-last-name` to `clamp(3px, 0.38vw, 5.5px)` with `paint-order: stroke fill;`, enhancing visual impact and border thickness around the Bitter Lime typography. |
| `2026-09-01T15:55:00+01:00` | `v2.2.6` | Defined Clean Borders on All Light Mode Buttons: Added refined 1.5px dark borders across `.btn`, `.btn-primary`, `.btn-secondary`, `.nav-pill`, `.section-dock-btn`, `.filter-tab-btn`, `.social-pill`, `.status-badge`, `.theme-toggle-btn`, and `.modal-close-btn` in Light Mode for sharp button definition without excessive thickness. |
| `2026-09-01T16:10:00+01:00` | `v2.2.7` | Pristine Liquid Glass Restoral, Shadow Removal & Border Highlight Elimination: Removed all resting gradient dome highlights (`.liquid-glass-pill::before` disabled), removed box-shadows from all pills/buttons across the entire site, removed dark mode bitter-lemon border highlights, eliminated specular highlights from buttons and navigation bars in both light and dark modes, and configured responsive bitter-lemon hover effects only when cursor is over interactive elements. |
| `2026-09-02T11:05:00+01:00` | `v2.3.0` | Selected Work Infinite Marquee, Compact Single-Line Tabs, Dedicated Portfolio Gallery Page & Case Study Modal: Overhauled the Selected Work section with compact one-line filter tabs, converted static grid into a smooth infinite continuous marquee with hover pause, created `portfolio.html` living gallery page showing all 10 projects, created central `assets/js/projects-data.js` single-source data model, generated 6 new high-res dummy project case studies (`AuraFlow`, `NovaPulse`, `Veloce`, `HyperGrid`, `Lumina`, `OmniHealth`), integrated universal Case Study modal with metrics, highlights, and tags, and updated global navigation headers. |
| `2026-09-02T11:10:00+01:00` | `v2.3.1` | Preloader Fail-Safe Guard & ReadyState Timing Fix: Resolved browser blank screen issue where preloader mask overlay remained stuck due to DOMContentLoaded event timing race condition; added `document.readyState` check, faster smooth dismissal, and inline fail-safe dismissal script in `index.html`. |
| `2026-09-02T11:15:00+01:00` | `v2.3.2` | Zero-Flash Preloader & Theme Synchronization: Resolved theme flash by adding synchronous `<head>` theme initializers across all pages, aligned preloader background tokens to match Light Mode (`#F4F4ED` Morning Snow) and Dark Mode (`#282C20` Pine Tree Void) so the site never flashes dark-to-light, enhanced surname stroke styling on preloader, and restored reliable startup animation playback. |
| `2026-09-02T11:55:00+01:00` | `v2.3.3` | Portfolio Page Aesthetic Polish, Multipage Footer Harmonization & Overflow Fix: Redesigned the portfolio page header with an elegant, spacious layout (`.portfolio-page-header`), removed clustered text and project counter, eliminated horizontal screen overflow on header and footer, harmonized the multipage footer to use identical `.footer-brand-col`, `.footer-nav-col`, and `.footer-nav-link` design tokens as `index.html` and `about.html`, and matched atmospheric background across both light and dark modes. |
| `2026-09-02T12:00:00+01:00` | `v2.3.4` | Header Pill Cleanup on Portfolio Page: Removed the redundant top eyebrow capsule (`Archive • Case Studies • 2025–2026`) from the portfolio page header for a cleaner and more direct layout. |
| `2026-09-02T12:01:00+01:00` | `v2.3.5` | Portfolio Title Simplification: Updated the main heading on `portfolio.html` to `/PROJECT GALLERY` for a clean, bold section title aligned with site-wide typography standards. |
| `2026-09-02T12:03:00+01:00` | `v2.3.6` | CTA Heading Fluid Auto-Fit & Multi-Line Wrapping: Removed forced `white-space: nowrap` from `.cta-heading`, reduced font size to `clamp(22px, 3.2vw, 38px)`, and constrained `max-width: 860px; margin: 0 auto;` so the headline fits perfectly on all screen resolutions without overflowing or requiring zooming out. |
| `2026-09-02T12:06:00+01:00` | `v2.3.7` | Global Multipage Navigation Sync: Verified and ensured the `[Portfolio]` navigation link pill and footer link are present and active across all three pages (`index.html`, `about.html`, and `portfolio.html`) in both desktop navbar and mobile drawer. |
| `2026-09-02T12:11:00+01:00` | `v2.3.8` | CTA Heading Sentence Line-Break Structuring: Structured the two sentences within `.cta-heading` onto separate block lines (`HAVE A PROJECT IN MIND?` and `LET'S BUILD SOMETHING EXTRAORDINARY.`) for balanced, impactful typographic presentation. |
| `2026-09-02T12:13:00+01:00` | `v2.3.9` | Compact Portfolio Gallery Grid & Card Proportions: Refined `.portfolio-gallery-grid` into a sleek 3-column layout (`repeat(3, 1fr)` with 24px gap on desktop, 2-column on tablets), reduced card padding to `15px 16px`, project title font to `15.5px`, tag pills to `11px`, and hover action pills for a high-density, modern gallery layout. |
| `2026-09-02T12:16:00+01:00` | `v2.4.0` | Footer Navigation Cleanup & Renaming: Removed `Services` and `Experience` links from the multipage global footer across all pages (`index.html`, `about.html`, and `portfolio.html`), and renamed `Contact Modal` to `Contact Me`. |
| `2026-09-02T13:10:00+01:00` | `v2.5.0` | Contact Form Redesign & Zero-Cost Backend Integration: Overhauled the "Let's Collaborate" modal across `index.html`, `about.html`, and `portfolio.html` with new fields (`First Name`, `Last Name [Optional]`, `Your Email`, `Preferred Alternative Contact`, `Project Details`), integrated live RFC email validation with UI cues, added local lead persistence, and built a dedicated serverless Google Apps Script backend (`backend/google_apps_script_backend.js`) for automated dual-email dispatch (inbox lead notification + visitor auto-confirmation) and Google Sheets logging with colored Status dropdowns (`Pending`, `Responded`, `Finalized`) at $0 marginal cost. |
| `2026-09-02T13:15:00+01:00` | `v2.5.1` | Primary Email Update: Updated all mailto hyperlinks, footers, resume request actions, and backend notification configurations site-wide from `davidogbogu277@gmail.com` to `official.ogbogudavid@gmail.com`. |
| `2026-09-02T13:22:00+01:00` | `v2.5.2` | Primary Email Correction: Replaced email across all HTML pages, mailto links, global footers, and Google Apps Script backend configuration with `davidogbogu2005@gmail.com`. |
| `2026-09-02T13:30:00+01:00` | `v2.5.3` | Live Google Apps Script Endpoint Linked: Integrated the deployed Web App URL (`https://script.google.com/macros/s/AKfycbxi6zoq-dq194W3D2-V6DrCKcGCPxjgMEEe3gQ2rOsm3nnNUDS8ZJSmXNwoB8qt0fL9ow/exec`) into `assets/js/main.js` to activate live auto-emailing, lead logging, and auto-replying. |
| `2026-09-02T13:42:00+01:00` | `v2.5.4` | 12-Hour Google Sheets Formatting, Dedicated Inline Email Validation & Shake Feedback: Updated Google Apps Script backend to format timestamps strictly in 12-hour format with AM/PM (`yyyy-MM-dd hh:mm:ss a`), added direct `GmailApp` dual-dispatch with fallback, and implemented active client-side email validation with inline error messaging (`.field-error-text`), dummy domain blocking, typo suggestions, and input shake animation. |
| `2026-09-02T13:55:00+01:00` | `v2.5.5` | Email Template Deliverability & Subject Optimization: Removed `⚡` emoji from admin email subject and header, streamlined visitor confirmation email into a clean, personal, text-first format with matching multipart plain-text to maximize primary inbox deliverability and prevent automated spam classification. |
| `2026-09-02T14:01:00+01:00` | `v2.5.6` | Visitor Auto-Reply Copy Customization: Updated the client confirmation email copy in `backend/google_apps_script_backend.js` to the exact user-specified executive response phrasing. |
| `2026-09-02T14:07:00+01:00` | `v2.5.7` | Mobile & Tablet Admin Email Layout Optimization: Rebuilt `sendAdminNotificationEmail` using a mobile-first, card-stacked layout with fluid viewports, distinct card modules for Full Name, Email, Alternative Contact, and Project Details, and a prominent full-width touch-friendly reply button for clean readability across iOS, Android, tablets, and desktop. |
| `2026-09-02T14:59:00+01:00` | `v2.5.8` | Modal Hover Shadow Glow & Border Highlight Removal: Removed the bitter-lemon top border highlight and the cursor hover shadow glow from `.liquid-glass-card` / `#contact-modal`, ensuring smooth, static, natural liquid glass appearance without distracting glow effects. |
| `2026-09-02T15:06:00+01:00` | `v2.5.9` | Global Typography Migration to Geist: Upgraded entire portfolio typeface from Outfit to Geist (and Geist Mono for metadata) across `style.css`, `index.html`, `about.html`, `portfolio.html`, `README.md`, and Google Apps Script configuration with tailored optical tracking and hierarchical weight distribution. |
| `2026-09-02T15:39:00+01:00` | `v2.6.0` | Client Confirmation Email Branded Card Template: Redesigned visitor confirmation email in `backend/google_apps_script_backend.js` with the executive card-stacked layout matching the admin notification template (pill badge, greeting card, highlighted response card with dark left border, channel summary, and full-width quick reply button) with zero emojis and 100% mobile/desktop responsive optimization. |






















