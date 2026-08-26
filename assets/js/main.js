/**
 * David Ogbogu Portfolio - Main JavaScript
 * Liquid Glass UI & Interactive Systems
 */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initLiquidGlassInteractions();
  initThemeSwitcher();
  initStickyNavbar();
  initMobileDrawer();
  initPortfolioFilters();
  initProjectDetailsModal();
  initServicesAccordion();
  initExperiencePreview();
  initContactModal();
});

/* ============================================================
   1. PRELOADER ANIMATION
============================================================ */
function initPreloader() {
  const mask = document.getElementById('mask');
  const textEl = document.getElementById('preloader-text');
  const subEl = document.getElementById('preloader-sub');

  if (!mask || !textEl || !subEl) return;

  const fullText = 'David—Ogbogu';
  const STAGGER = 40;
  const POST_DONE = 450;

  // Clear container & create character spans
  textEl.innerHTML = '';
  [...fullText].forEach((ch) => {
    const span = document.createElement('span');
    span.classList.add('char');
    if (ch === '—') span.classList.add('dash');
    span.textContent = ch === ' ' ? '\u00A0' : ch;
    textEl.appendChild(span);
  });

  const chars = textEl.querySelectorAll('.char');
  let started = false;
  let exiting = false;

  function revealNext(i) {
    if (i >= chars.length) {
      setTimeout(hideMask, POST_DONE);
      return;
    }
    chars[i].classList.add('visible');
    setTimeout(() => requestAnimationFrame(() => revealNext(i + 1)), STAGGER);
  }

  function startReveal() {
    if (started) return;
    started = true;
    requestAnimationFrame(() => subEl.classList.add('visible'));
    setTimeout(() => requestAnimationFrame(() => revealNext(0)), 160);
  }

  function hideMask() {
    if (exiting) return;
    exiting = true;
    subEl.classList.add('exit');
    textEl.classList.add('exit');
    setTimeout(() => {
      mask.classList.add('exit');
      setTimeout(() => {
        if (mask && mask.parentNode) {
          mask.remove();
        }
      }, 1000);
    }, 150);
  }

  startReveal();
  // Fallback safety timeout
  setTimeout(hideMask, 4000);
}

/* ============================================================
   2. LIQUID GLASS DYNAMIC CURSOR & CLICK PHYSICS
============================================================ */
function initLiquidGlassInteractions() {
  const pills = document.querySelectorAll('.liquid-glass-pill');

  pills.forEach((pill) => {
    // Dynamic light lens follow on mousemove
    pill.addEventListener('mousemove', (e) => {
      const rect = pill.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      pill.style.setProperty('--mouse-x', `${x.toFixed(2)}%`);
      pill.style.setProperty('--mouse-y', `${y.toFixed(2)}%`);
    });

    // Reset specular shine on mouseleave
    pill.addEventListener('mouseleave', () => {
      pill.style.setProperty('--mouse-x', '50%');
      pill.style.setProperty('--mouse-y', '50%');
    });

    // Liquid squish on mousedown
    pill.addEventListener('mousedown', () => {
      pill.classList.add('liquid-squish');
    });

    pill.addEventListener('mouseup', () => {
      setTimeout(() => pill.classList.remove('liquid-squish'), 150);
    });
  });
}

/* ============================================================
   3. THEME SWITCHER (LIGHT / DARK INVERSION)
============================================================ */
function initThemeSwitcher() {
  const toggleBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  // Determine initial theme
  if (savedTheme) {
    setTheme(savedTheme);
  } else if (prefersDark.matches) {
    setTheme('dark');
  } else {
    setTheme('light');
  }

  // Handle manual toggle with liquid animation
  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(nextTheme);
    });
  }

  // Listen for OS changes if no manual preference saved
  prefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
}

/* ============================================================
   4. INTERACTIVE PROJECT DETAILS MODAL
============================================================ */
const PROJECTS_DATA = {
  bloomcare: {
    title: 'BloomCare - Mental Health App Landing Page',
    subtitle: 'Holistic Mindfulness & Serenity Platform',
    badge: 'Real Project',
    image: 'assets/images/project-bloomcare.jpg',
    overview: 'BloomCare is a luxury mental wellness ecosystem designed to cultivate daily mindfulness, stress relief, and cognitive balance through calming aesthetic interfaces and bespoke soundscapes.',
    highlights: [
      'Engineered a calm, obsidian glass aesthetic that lowers cognitive friction.',
      'Interactive mood tracking with fluid generative audio-visual response.',
      'High-conversion responsive landing page and native mobile interface design.',
      'Comprehensive design system with modular design tokens and Dark Mode parity.'
    ],
    metrics: [
      { num: '+164%', label: 'Daily Retention' },
      { num: '4.9 ★', label: 'App Store Rating' },
      { num: '140k+', label: 'Active Users' }
    ],
    tags: ['UI/UX Design', 'Landing Page', 'Mobile App', 'Kumpin Studio', 'Figma', 'Next.js']
  },
  fragwater: {
    title: 'FragWater - Luxury Fragrance Landing Page',
    subtitle: 'Haute Parfumerie Digital Flagship',
    badge: 'Real Project',
    image: 'assets/images/project-fragwater.jpg',
    overview: 'An avant-garde e-commerce showcase for a luxury artisanal fragrance house. Featuring high-fashion editorial typography, ambient fluid interactions, and sensorial product storytelling.',
    highlights: [
      'Bespoke fluid glass aesthetics celebrating perfume bottle craftsmanship.',
      'Seamless micro-interactions with smooth 60fps WebGL visual transitions.',
      'Optimized multi-tier checkout funnel resulting in a 42% increase in AOV.',
      'Recognized with Awwwards Site of the Day and FWA of the Day honors.'
    ],
    metrics: [
      { num: '+42%', label: 'Average Order Value' },
      { num: '3.8x', label: 'Time on Page' },
      { num: '99.4%', label: 'Client Satisfaction' }
    ],
    tags: ['E-Commerce', 'Brand Identity', 'WebGL / 3D', 'Next.js', 'Kumpin Studio', 'Tailwind']
  },
  cryptocalm: {
    title: 'CryptoCalm - Crypto Dashboard & Analytics',
    subtitle: 'Institutional-Grade Wealth Management Suite',
    badge: 'Exploration',
    image: 'assets/images/project-cryptocalm.jpg',
    overview: 'A minimalist private wealth and cryptocurrency asset management terminal. Replaces noisy trading interfaces with obsidian glass cards, calm data visualization, and instant portfolio clarity.',
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
    tags: ['Fintech UI', 'SaaS Dashboard', 'Data Visualization', 'Interaction Design', 'React']
  },
  zenpay: {
    title: 'ZenPay - NextGen Mobile Banking & App',
    subtitle: 'Private Concierge Digital Banking Experience',
    badge: 'Exploration',
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
    tags: ['Mobile Banking', 'Fintech', 'Product Strategy', 'Micro-interactions', 'iOS / SwiftUI']
  }
};

function initProjectDetailsModal() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('project-modal-close');
  const cancelBtn = document.getElementById('project-modal-cancel');
  const projectCards = document.querySelectorAll('.project-card');
  const openButtons = document.querySelectorAll('[data-open-project]');

  if (!modal) return;

  function openProjectModal(projectId) {
    const data = PROJECTS_DATA[projectId] || PROJECTS_DATA.fragwater;

    // Populate modal elements
    const badgeEl = document.getElementById('project-modal-badge');
    const titleEl = document.getElementById('project-modal-title');
    const subtitleEl = document.getElementById('project-modal-subtitle');
    const imgEl = document.getElementById('project-modal-img');
    const descEl = document.getElementById('project-modal-desc');
    const highlightsEl = document.getElementById('project-modal-highlights');
    const metricsEl = document.getElementById('project-modal-metrics');
    const tagsEl = document.getElementById('project-modal-tags');

    if (badgeEl) badgeEl.textContent = data.badge;
    if (titleEl) titleEl.textContent = data.title;
    if (subtitleEl) subtitleEl.textContent = data.subtitle;
    if (imgEl) {
      imgEl.src = data.image;
      imgEl.alt = data.title;
    }
    if (descEl) descEl.textContent = data.overview;

    if (highlightsEl) {
      highlightsEl.innerHTML = data.highlights
        .map(
          (h) => `
        <div class="highlight-item">
          <span class="highlight-bullet">✦</span>
          <span>${h}</span>
        </div>
      `
        )
        .join('');
    }

    if (metricsEl) {
      metricsEl.innerHTML = data.metrics
        .map(
          (m) => `
        <div class="metric-box">
          <div class="metric-num">${m.num}</div>
          <div class="metric-label">${m.label}</div>
        </div>
      `
        )
        .join('');
    }

    if (tagsEl) {
      tagsEl.innerHTML = data.tags
        .map((t) => `<span class="tag-pill liquid-glass-pill">${t}</span>`)
        .join('');
    }

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Re-initialize liquid glass on newly injected tag pills
    initLiquidGlassInteractions();
  }

  function closeProjectModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Trigger from project cards or arrows
  projectCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      const projectId = card.getAttribute('data-project-id');
      if (projectId) {
        openProjectModal(projectId);
      }
    });
  });

  openButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const projectId = btn.getAttribute('data-open-project');
      if (projectId) {
        openProjectModal(projectId);
      }
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeProjectModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeProjectModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeProjectModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeProjectModal();
    }
  });
}

/* ============================================================
   5. PORTFOLIO FILTERING
============================================================ */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-tab-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ============================================================
   6. SERVICES ACCORDION
============================================================ */
function initServicesAccordion() {
  const serviceItems = document.querySelectorAll('.service-item');

  serviceItems.forEach((item) => {
    const header = item.querySelector('.service-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all items
      serviceItems.forEach((i) => i.classList.remove('active'));

      // If clicked item was not active, open it
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ============================================================
   7. EXPERIENCE HOVER FLOATING PREVIEW
============================================================ */
function initExperiencePreview() {
  const expRows = document.querySelectorAll('.experience-row');
  const floatingPreview = document.getElementById('floating-preview');
  const previewImg = document.getElementById('floating-preview-img');

  if (!floatingPreview || !previewImg || !expRows.length) return;

  expRows.forEach((row) => {
    row.addEventListener('mouseenter', () => {
      const imgSrc = row.getAttribute('data-preview');
      if (imgSrc) {
        previewImg.src = imgSrc;
        floatingPreview.classList.add('visible');
      }
    });

    row.addEventListener('mousemove', (e) => {
      const offsetX = 30;
      const offsetY = -60;
      floatingPreview.style.left = `${e.clientX + offsetX}px`;
      floatingPreview.style.top = `${e.clientY + offsetY}px`;
    });

    row.addEventListener('mouseleave', () => {
      floatingPreview.classList.remove('visible');
    });
  });
}

/* ============================================================
   8. CONTACT MODAL & FORM
============================================================ */
function initContactModal() {
  const openBtns = document.querySelectorAll('[data-open-contact]');
  const modal = document.getElementById('contact-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const contactForm = document.getElementById('contact-form');
  const projectModal = document.getElementById('project-modal');

  if (!modal) return;

  function openModal() {
    if (projectModal && projectModal.classList.contains('open')) {
      projectModal.classList.remove('open');
      projectModal.setAttribute('aria-hidden', 'true');
    }
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  openBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = 'Sending Message...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = 'Message Sent! ✓';
        submitBtn.style.background = '#10b981';
        submitBtn.style.color = '#ffffff';

        setTimeout(() => {
          contactForm.reset();
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.style.color = '';
          submitBtn.disabled = false;
          closeModal();
        }, 1500);
      }, 1000);
    });
  }
}

/* ============================================================
   9. STICKY FLOATING NAVBAR & SCROLLSPY
============================================================ */
function initStickyNavbar() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const SCROLL_THRESHOLD = 80;

  function updateNavbar() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  // Scrollspy active indicator
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener(
    'scroll',
    () => {
      let currentId = '';
      const scrollPos = window.scrollY + 220;

      sections.forEach((sec) => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentId = sec.getAttribute('id');
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    },
    { passive: true }
  );
}

/* ============================================================
   10. MOBILE NAVIGATION DRAWER
============================================================ */
function initMobileDrawer() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-drawer');
  const closeBtn = document.getElementById('mobile-drawer-close');
  const overlay = document.getElementById('mobile-drawer-overlay');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!drawer) return;

  function openDrawer() {
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (menuBtn) {
    menuBtn.addEventListener('click', openDrawer);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  if (overlay) {
    overlay.addEventListener('click', closeDrawer);
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}
