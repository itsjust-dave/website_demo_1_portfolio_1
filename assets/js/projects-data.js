/**
 * David Ogbogu Portfolio - Central Projects & Case Studies Data
 * Shared between Landing Page Marquee and Dedicated Portfolio Gallery
 */

const PROJECTS_DATA = {
  bloomcare: {
    id: 'bloomcare',
    title: 'BloomCare – Mental Health App Landing Page',
    subtitle: 'Holistic Mindfulness & Serenity Platform',
    badge: 'Real Project',
    category: 'real-project',
    image: 'assets/images/project-bloomcare.jpg',
    overview: 'BloomCare is a luxury mental wellness ecosystem designed to cultivate daily mindfulness, stress relief, and cognitive balance through calming aesthetic interfaces, biometric mood analysis, and bespoke ambient soundscapes.',
    highlights: [
      'Engineered a calm, obsidian glass aesthetic that significantly lowers cognitive friction.',
      'Interactive mood tracking with fluid generative audio-visual response.',
      'High-conversion responsive landing page and native mobile interface design.',
      'Comprehensive design system with modular design tokens and Dark Mode parity.'
    ],
    metrics: [
      { num: '+164%', label: 'Daily Retention' },
      { num: '4.9 ★', label: 'App Store Rating' },
      { num: '140k+', label: 'Active Users' }
    ],
    tags: ['Landing Page', 'Mobile App', 'Kumpin Studio', 'UI/UX Design', 'Next.js'],
    client: 'Kumpin Studio',
    year: '2026'
  },
  fragwater: {
    id: 'fragwater',
    title: 'FragWater – Luxury Fragrance Landing Page',
    subtitle: 'Haute Parfumerie Digital Flagship',
    badge: 'Real Project',
    category: 'real-project',
    image: 'assets/images/project-fragwater.jpg',
    overview: 'An avant-garde e-commerce showcase for a luxury artisanal fragrance house. Featuring high-fashion editorial typography, ambient fluid interactions, and sensorial product storytelling that converts luxury connoisseurs.',
    highlights: [
      'Bespoke fluid glass aesthetics celebrating perfume bottle craftsmanship.',
      'Seamless micro-interactions with smooth 60fps WebGL visual transitions.',
      'Optimized multi-tier checkout funnel resulting in a 42% increase in AOV.',
      'Recognized with Awwwards Site of the Day and FWA honors.'
    ],
    metrics: [
      { num: '+42%', label: 'Average Order Value' },
      { num: '3.8x', label: 'Time on Page' },
      { num: '99.4%', label: 'Client Satisfaction' }
    ],
    tags: ['E-Commerce', 'Brand Identity', 'WebGL / 3D', 'Next.js', 'Kumpin Studio'],
    client: 'Noir Luxe Fragrances',
    year: '2026'
  },
  cryptocalm: {
    id: 'cryptocalm',
    title: 'CryptoCalm – Crypto Dashboard & Analytics',
    subtitle: 'Institutional-Grade Wealth Management Suite',
    badge: 'Exploration',
    category: 'exploration',
    image: 'assets/images/project-cryptocalm.jpg',
    overview: 'A minimalist private wealth and cryptocurrency asset management terminal. Replaces noisy trading interfaces with obsidian glass cards, calm data visualization, and instant portfolio clarity across multiple blockchains.',
    highlights: [
      'Architected high-density financial charts with champagne gold & cyan radiance.',
      'Real-time WebSocket market telemetry with sub-50ms latency updates.',
      'Zero-clutter hierarchical navigation for multi-million dollar portfolios.',
      'Hardware-accelerated liquid glass UI widgets with dynamic light refraction.'
    ],
    metrics: [
      { num: '$1.2B+', label: 'Assets Tracked' },
      { num: '< 50ms', label: 'Chart Render Latency' },
      { num: '100%', label: 'Zero Clutter' }
    ],
    tags: ['SaaS Platform', 'Fintech UI', 'Data Visualization', 'React', 'TypeScript'],
    client: 'Fintech UI Labs',
    year: '2025'
  },
  zenpay: {
    id: 'zenpay',
    title: 'ZenPay – NextGen Mobile Banking & App',
    subtitle: 'Private Concierge Digital Banking Experience',
    badge: 'Exploration',
    category: 'exploration',
    image: 'assets/images/project-zenpay.jpg',
    overview: 'ZenPay redefines modern private banking with matte titanium aesthetics, biometric authentication, and frictionless global transfers tailored for high-net-worth digital visionaries.',
    highlights: [
      'Crafted an ultra-luxurious dark titanium interface with tactile haptic cues.',
      'Seamless peer-to-peer cross-currency transfers in three taps or less.',
      'Dynamic physical card pairing with virtual luxury obsidian metal debit cards.',
      'End-to-end accessible design patterns compliant with WCAG AAA standards.'
    ],
    metrics: [
      { num: '3.2x', label: 'Conversion Lift' },
      { num: '99.9%', label: 'Uptime Reliability' },
      { num: '< 2.4s', label: 'Transfer Speed' }
    ],
    tags: ['Mobile Design', 'Banking UI', 'Fintech', 'iOS / SwiftUI', 'Micro-interactions'],
    client: 'ZenPay Global',
    year: '2025'
  },
  auraflow: {
    id: 'auraflow',
    title: 'AuraFlow – AI Design Systems Orchestrator',
    subtitle: 'Autonomous Component & Token Generator',
    badge: 'Real Project',
    category: 'real-project',
    image: 'assets/images/project-auraflow.jpg',
    overview: 'A cutting-edge SaaS design platform that automatically harmonizes design tokens, component libraries, and developer codebases using real-time generative AI node graphs and visual telemetry.',
    highlights: [
      'Visual node workflow canvas for automated multi-brand token distribution.',
      'Interactive canvas rendering preview components directly from live CSS/React AST.',
      'Seamless bidirectional sync with Figma, GitHub, and Storybook pipelines.',
      'Engineered a sleek obsidian dark theme with luminous lime and azure accents.'
    ],
    metrics: [
      { num: '85%', label: 'Dev Time Saved' },
      { num: '48k+', label: 'Designers Active' },
      { num: '99.99%', label: 'Sync Accuracy' }
    ],
    tags: ['SaaS Platform', 'Design Systems', 'AI Copilot', 'Web App', 'TypeScript'],
    client: 'Aura Systems Inc',
    year: '2026'
  },
  novapulse: {
    id: 'novapulse',
    title: 'NovaPulse – Spatial Audio & Streaming Platform',
    subtitle: 'Next-Gen 3D Holographic Music Terminal',
    badge: 'Exploration',
    category: 'exploration',
    image: 'assets/images/project-novapulse.jpg',
    overview: 'A spatial audio streaming platform featuring real-time 3D soundwave visualizers, dynamic acoustic room simulation, and a luxury frosted glass media interface built for audiophiles and digital music creators.',
    highlights: [
      'Custom WebGL frequency spectrum shaders rendering fluid real-time audio waveforms.',
      'Ultra-responsive liquid glass transport controls and immersive full-screen player.',
      'Bespoke vinyl record curation interface with dynamic light reflection maps.',
      'Optimized for ultra-wide monitors and high-resolution spatial audio hardware.'
    ],
    metrics: [
      { num: '192kHz', label: 'Hi-Res Lossless' },
      { num: '60 FPS', label: 'WebGL Shader Rate' },
      { num: '4.9 ★', label: 'Audiophile Score' }
    ],
    tags: ['Spatial Audio', 'WebGL / 3D', 'Web App', 'Creative Tech', 'UI/UX Design'],
    client: 'Sonic Labs Exploration',
    year: '2026'
  },
  veloce: {
    id: 'veloce',
    title: 'Veloce – Carbon Neutral Supercar Configurator',
    subtitle: 'Real-Time 3D Automotive Customizer',
    badge: 'Real Project',
    category: 'real-project',
    image: 'assets/images/project-veloce.jpg',
    overview: 'A hypercar 3D configurator that allows buyers to customize paint finishes, aerodynamic carbon fiber packages, interior leather stitching, and performance telemetry in cinematic real-time.',
    highlights: [
      'Ray-traced real-time car rendering in the browser using Three.js and custom PBR shaders.',
      'Interactive paint & carbon fiber material selector with studio lighting switches.',
      'Instant spec-sheet PDF and high-res photo export for bespoke dealership orders.',
      'Boosted customer pre-order engagement by 210% within the first 30 days.'
    ],
    metrics: [
      { num: '+210%', label: 'Engagement Growth' },
      { num: '< 1.8s', label: 'Model Load Time' },
      { num: '$1.45M', label: 'Avg Config Value' }
    ],
    tags: ['3D Configurator', 'Automotive UI', 'Three.js / WebGL', 'E-Commerce', 'Luxury'],
    client: 'Veloce Motors UK',
    year: '2026'
  },
  hypergrid: {
    id: 'hypergrid',
    title: 'HyperGrid – Cloud DevOps Telemetry Suite',
    subtitle: 'Global Infrastructure Command Center',
    badge: 'Exploration',
    category: 'exploration',
    image: 'assets/images/project-hypergrid.jpg',
    overview: 'An infrastructure monitoring command center that displays multi-cloud Kubernetes clusters, live network latency world maps, and automated cybersecurity threat containment streams in one single glassmorphic dashboard.',
    highlights: [
      'Multi-region cluster telemetry tracking 1.4k+ nodes with zero interface stutter.',
      'Interactive SVG world map with animated packets depicting real-time data flows.',
      'Automated cybersecurity anomaly detection alerts with single-click mitigation.',
      'Dark obsidian card architecture adhering to high-density cognitive usability.'
    ],
    metrics: [
      { num: '14 Gbps', label: 'Telemetry Stream' },
      { num: '92 Nodes', label: 'Cluster Monitor' },
      { num: '0.01ms', label: 'Alert Detection' }
    ],
    tags: ['DevOps Dashboard', 'Cloud Telemetry', 'Data Viz', 'Cybersecurity', 'SaaS'],
    client: 'CloudScale Infrastructure',
    year: '2025'
  },
  lumina: {
    id: 'lumina',
    title: 'Lumina – Minimalist Architecture & Studio Portfolio',
    subtitle: 'Editorial Showcase of Brutalist Living',
    badge: 'Real Project',
    category: 'real-project',
    image: 'assets/images/project-lumina.jpg',
    overview: 'A high-end editorial website for an international architectural atelier. Showcases brutalist concrete sanctuaries, water reflection architecture, and monograph publications with high-fashion typography and immersive page transitions.',
    highlights: [
      'Full-bleed editorial gallery layout with smooth inertia scrolling and parallax.',
      'Bespoke architectural plan viewer with vector blueprints and daylight simulator.',
      'Integrated project inquiry portal designed for high-profile residential commissions.',
      'Awarded Best UI and Honorable Mention on Awwwards and CSS Design Awards.'
    ],
    metrics: [
      { num: 'Awwwards', label: 'Honorable Mention' },
      { num: '+68%', label: 'Commission Inquiries' },
      { num: '100/100', label: 'Lighthouse Score' }
    ],
    tags: ['Architecture', 'Editorial Web', 'Luxury Portfolio', 'Animation', 'Next.js'],
    client: 'Lumina Atelier Paris',
    year: '2026'
  },
  omnihealth: {
    id: 'omnihealth',
    title: 'OmniHealth – Clinical AI Diagnostic Workspace',
    subtitle: 'Precision Medicine & Telemetry Terminal',
    badge: 'Exploration',
    category: 'exploration',
    image: 'assets/images/project-omnihealth.jpg',
    overview: 'A clinical diagnostic workspace designed for physicians and researchers, integrating neural MRI scan segmentations, live ECG telemetry, and AI-assisted predictive diagnostics in a clear, distraction-free environment.',
    highlights: [
      'High-resolution multi-planar neural scan slice viewer with AI anomaly detection.',
      'Live biometric graphing with real-time rhythm synchronization and risk alerts.',
      'Accessible dark mode palette designed for low-light diagnostic radiology rooms.',
      'Fully compliant with HIPAA and HL7 medical interface accessibility standards.'
    ],
    metrics: [
      { num: '99.4%', label: 'Diagnostic Clarity' },
      { num: '< 1s', label: 'Scan Reconstruction' },
      { num: 'HIPAA', label: 'Compliant Security' }
    ],
    tags: ['HealthTech', 'Clinical AI', 'Medical Workspace', 'Data Visualization', 'UI/UX'],
    client: 'OmniHealth Medical Systems',
    year: '2025'
  }
};
