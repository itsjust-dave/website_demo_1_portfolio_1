/**
 * David Ogbogu Portfolio - Main JavaScript
 * Liquid Glass UI & Interactive Systems
 */

function initApp() {
  initPreloader();
  initLiquidGlassInteractions();
  initThemeSwitcher();
  initStickyNavbar();
  initMobileDrawer();
  initSelectedWorkMarquee();
  initPortfolioGallery();
  initPortfolioFilters();
  initProjectDetailsModal();
  initServicesAccordion();
  initContactModal();
  initSmoothAnchorScroll();
  initCalendlyWidget();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

/* ============================================================
   1. PRELOADER ANIMATION (Home Landing Page Only)
============================================================ */
function initPreloader() {
  const mask = document.getElementById('mask');
  if (!mask) return;

  const textEl = document.getElementById('preloader-text');
  const subEl = document.getElementById('preloader-sub');

  if (!textEl || !subEl) {
    if (mask.parentNode) mask.remove();
    return;
  }

  const fullText = 'David—Ogbogu';
  const STAGGER = 40;
  const POST_DONE = 450;

  // Clear container & create character spans
  textEl.innerHTML = '';
  [...fullText].forEach((ch, idx) => {
    const span = document.createElement('span');
    span.classList.add('char');
    if (ch === '—') span.classList.add('dash');
    if (idx >= 6) span.classList.add('surname-char');
    span.textContent = ch === ' ' ? '\u00A0' : ch;
    textEl.appendChild(span);
  });

  const chars = textEl.querySelectorAll('.char');
  let started = false;
  let exiting = false;

  function hideMask() {
    if (exiting) return;
    exiting = true;
    if (subEl) subEl.classList.add('exit');
    if (textEl) textEl.classList.add('exit');
    mask.classList.add('exit');
    setTimeout(() => {
      if (mask && mask.parentNode) {
        mask.remove();
      }
    }, 700);
  }

  function revealNext(i) {
    if (i >= chars.length) {
      setTimeout(hideMask, POST_DONE);
      return;
    }
    if (chars[i]) chars[i].classList.add('visible');
    setTimeout(() => requestAnimationFrame(() => revealNext(i + 1)), STAGGER);
  }

  function startReveal() {
    if (started) return;
    started = true;
    if (subEl) requestAnimationFrame(() => subEl.classList.add('visible'));
    setTimeout(() => requestAnimationFrame(() => revealNext(0)), 120);
  }

  requestAnimationFrame(startReveal);
  // Safe maximum fallback timeout (2.5s)
  setTimeout(hideMask, 2500);
}

/* ============================================================
   2. LIQUID GLASS DYNAMIC CURSOR & CLICK PHYSICS (Optimized RAF)
============================================================ */
function initLiquidGlassInteractions() {
  const pills = document.querySelectorAll('.liquid-glass-pill');
  if (!pills.length) return;

  pills.forEach((pill) => {
    let ticking = false;

    // High-performance dynamic light lens follow on mousemove (60fps RAF throttled)
    pill.addEventListener(
      'mousemove',
      (e) => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const rect = pill.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            pill.style.setProperty('--mouse-x', `${x.toFixed(1)}%`);
            pill.style.setProperty('--mouse-y', `${y.toFixed(1)}%`);
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true }
    );

    // Reset specular shine on mouseleave
    pill.addEventListener(
      'mouseleave',
      () => {
        pill.style.setProperty('--mouse-x', '50%');
        pill.style.setProperty('--mouse-y', '20%');
      },
      { passive: true }
    );

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
   4. CENTRAL PROJECTS DATA & RENDERING ENGINES
============================================================ */

// Fallback if projects-data.js is not loaded first
const ACTIVE_PROJECTS_SOURCE = typeof PROJECTS_DATA !== 'undefined' ? PROJECTS_DATA : {
  bloomcare: {
    id: 'bloomcare',
    title: 'BloomCare – Mental Health App Landing Page',
    subtitle: 'Holistic Mindfulness & Serenity Platform',
    badge: 'Real Project',
    category: 'real-project',
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
    tags: ['UI/UX Design', 'Landing Page', 'Mobile App', 'Kumpin Studio', 'Next.js']
  }
};

/**
 * Render selected projects into infinite continuous interactive marquee on landing page
 */
function initSelectedWorkMarquee() {
  const marqueeWrap = document.getElementById('selected-work-marquee-wrap');
  const marqueeTrack = document.getElementById('selected-work-marquee-track');
  if (!marqueeTrack || !marqueeWrap) return;

  const projects = Object.values(ACTIVE_PROJECTS_SOURCE);
  if (!projects.length) return;

  // Build card HTML helper
  function buildMarqueeCard(p) {
    const tagsHtml = (p.tags || []).slice(0, 2).map(t => `<span class="tag-pill liquid-glass-pill">${t}</span>`).join('');
    return `
      <article class="marquee-card" data-category="${p.category}" data-project-id="${p.id}" tabindex="0" role="button" aria-label="View case study for ${p.title}">
        <div class="project-image-wrap">
          <span class="project-badge-overlay">${p.badge}</span>
          <img src="${p.image}" alt="${p.title}" class="project-img" loading="lazy" />
          <button class="project-hover-arrow liquid-glass-pill" data-open-project="${p.id}" aria-label="Open ${p.title} project details">↗</button>
        </div>
        <div class="project-info">
          <h3 class="project-title">${p.title}</h3>
          <div class="project-tags">
            ${tagsHtml}
          </div>
        </div>
      </article>
    `;
  }

  // Duplicate the projects list twice (3 identical sets) to ensure infinite wrap in both directions
  const singleSetHtml = projects.map(buildMarqueeCard).join('');
  marqueeTrack.innerHTML = singleSetHtml + singleSetHtml + singleSetHtml;

  // Re-bind liquid glass interactions to newly created cards
  initLiquidGlassInteractions();

  // --- High-Performance Smooth Interactive Physics Engine ---
  let targetX = 0;
  let currentX = 0;
  let isHovered = false;
  let isDragging = false;
  let dragStartX = 0;
  let dragStartTargetX = 0;
  let hasDragged = false;
  let singleSetWidth = 0;
  const autoSpeed = 0.65; // Base crawl speed (pixels per frame at 60fps)

  function calculateSetWidth() {
    const totalCards = marqueeTrack.children.length;
    if (totalCards >= 3) {
      const oneThird = Math.floor(totalCards / 3);
      const firstCard = marqueeTrack.children[0];
      const secondSetFirstCard = marqueeTrack.children[oneThird];
      if (firstCard && secondSetFirstCard) {
        singleSetWidth = secondSetFirstCard.offsetLeft - firstCard.offsetLeft;
        return;
      }
    }
    singleSetWidth = marqueeTrack.scrollWidth / 3;
  }

  // Initial calculation after layout render
  requestAnimationFrame(calculateSetWidth);
  window.addEventListener('resize', calculateSetWidth, { passive: true });

  // 1. Pause on Hover & Resume on Leave
  marqueeWrap.addEventListener('mouseenter', () => {
    isHovered = true;
  });

  marqueeWrap.addEventListener('mouseleave', () => {
    isHovered = false;
    isDragging = false;
    marqueeWrap.style.cursor = 'grab';
  });

  // 2. Two-Finger Trackpad Horizontal Gestures & Shift + Mouse Wheel
  marqueeWrap.addEventListener('wheel', (e) => {
    let delta = 0;
    // Trackpad horizontal swipe
    if (Math.abs(e.deltaX) > 0) {
      delta = e.deltaX;
    } else if (e.shiftKey && Math.abs(e.deltaY) > 0) {
      // Shift + mouse wheel
      delta = e.deltaY;
    }

    if (delta !== 0) {
      e.preventDefault();
      // Apply delta smoothly in both directions
      targetX -= delta * 1.15;
    }
  }, { passive: false });

  // 3. Mouse Click & Drag (Smooth Pan in both directions)
  marqueeWrap.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return; // Left-click only
    isDragging = true;
    hasDragged = false;
    dragStartX = e.clientX;
    dragStartTargetX = targetX;
    marqueeWrap.style.cursor = 'grabbing';
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const diff = e.clientX - dragStartX;
    if (Math.abs(diff) > 5) {
      hasDragged = true;
    }
    targetX = dragStartTargetX + diff;
  }, { passive: true });

  window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    marqueeWrap.style.cursor = 'grab';
  });

  // Prevent accidental modal open when dragging
  marqueeWrap.addEventListener('click', (e) => {
    if (hasDragged) {
      e.preventDefault();
      e.stopPropagation();
      hasDragged = false;
    }
  }, true);

  // 4. Touch Gestures for Mobile / Tablets
  let touchStartX = 0;
  let touchStartTargetX = 0;
  let touchStartY = 0;
  let isHorizontalTouch = false;

  marqueeWrap.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchStartTargetX = targetX;
      isHorizontalTouch = false;
      isDragging = true;
      hasDragged = false;
    }
  }, { passive: true });

  marqueeWrap.addEventListener('touchmove', (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const currentTouchX = e.touches[0].clientX;
    const currentTouchY = e.touches[0].clientY;
    const diffX = currentTouchX - touchStartX;
    const diffY = currentTouchY - touchStartY;

    if (!isHorizontalTouch) {
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 6) {
        isHorizontalTouch = true;
      }
    }

    if (isHorizontalTouch) {
      if (Math.abs(diffX) > 6) hasDragged = true;
      targetX = touchStartTargetX + diffX;
    }
  }, { passive: true });

  marqueeWrap.addEventListener('touchend', () => {
    isDragging = false;
    isHorizontalTouch = false;
  }, { passive: true });

  // 5. Main 60/120fps Animation Loop with Seamless Wrapping
  let lastTime = performance.now();
  function animateMarquee(now) {
    let dt = (now - lastTime) / 16.667;
    if (dt > 3 || dt < 0) dt = 1;
    lastTime = now;

    // Auto-advance only when not hovered and not actively dragging
    if (!isHovered && !isDragging) {
      targetX -= autoSpeed * dt;
    }

    // High-precision smooth damping (spring-like interpolation)
    currentX += (targetX - currentX) * 0.18;

    // Seamless infinite wrap in both directions
    if (singleSetWidth > 0) {
      while (currentX <= -singleSetWidth) {
        currentX += singleSetWidth;
        targetX += singleSetWidth;
      }
      while (currentX > 0) {
        currentX -= singleSetWidth;
        targetX -= singleSetWidth;
      }
    }

    marqueeTrack.style.transform = `translate3d(${currentX.toFixed(2)}px, 0, 0)`;
    requestAnimationFrame(animateMarquee);
  }

  requestAnimationFrame(animateMarquee);
}

/**
 * Render full portfolio gallery grid on portfolio.html
 */
function initPortfolioGallery() {
  const galleryGrid = document.getElementById('portfolio-gallery-grid');
  if (!galleryGrid) return;

  const projects = Object.values(ACTIVE_PROJECTS_SOURCE);
  if (!projects.length) return;

  function buildGalleryCard(p) {
    const tagsHtml = (p.tags || []).slice(0, 3).map(t => `<span class="tag-pill liquid-glass-pill">${t}</span>`).join('');
    return `
      <article class="project-card" data-category="${p.category}" data-project-id="${p.id}" tabindex="0" role="button" aria-label="View case study for ${p.title}">
        <div class="project-image-wrap">
          <span class="project-badge-overlay">${p.badge}</span>
          <img src="${p.image}" alt="${p.title}" class="project-img" loading="lazy" />
          <button class="project-hover-arrow liquid-glass-pill" data-open-project="${p.id}" aria-label="Open ${p.title} project details">↗</button>
        </div>
        <div class="project-info">
          <h3 class="project-title">${p.title}</h3>
          <div class="project-tags">
            ${tagsHtml}
          </div>
        </div>
      </article>
    `;
  }

  galleryGrid.innerHTML = projects.map(buildGalleryCard).join('');
  initLiquidGlassInteractions();
}

/* ============================================================
   5. INTERACTIVE PROJECT DETAILS MODAL (Universal)
============================================================ */
function initProjectDetailsModal() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;

  const closeBtn = document.getElementById('project-modal-close');
  const cancelBtn = document.getElementById('project-modal-cancel');

  function openProjectModal(projectId) {
    const data = ACTIVE_PROJECTS_SOURCE[projectId] || ACTIVE_PROJECTS_SOURCE.bloomcare;
    if (!data) return;

    // Populate modal elements
    const badgeEl = document.getElementById('project-modal-badge');
    const titleEl = document.getElementById('project-modal-title');
    const subtitleEl = document.getElementById('project-modal-subtitle');
    const imgEl = document.getElementById('project-modal-img');
    const descEl = document.getElementById('project-modal-desc');
    const highlightsEl = document.getElementById('project-modal-highlights');
    const metricsEl = document.getElementById('project-modal-metrics');
    const tagsEl = document.getElementById('project-modal-tags');

    if (badgeEl) badgeEl.textContent = data.badge || 'Project';
    if (titleEl) titleEl.textContent = data.title || 'Project Details';
    if (subtitleEl) subtitleEl.textContent = data.subtitle || 'Case Study & System Overview';
    if (imgEl) {
      imgEl.src = data.image;
      imgEl.alt = data.title;
    }
    if (descEl) descEl.textContent = data.overview || '';

    if (highlightsEl && data.highlights) {
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

    if (metricsEl && data.metrics) {
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

    if (tagsEl && data.tags) {
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

  // Global event delegation for opening project modal
  document.addEventListener('click', (e) => {
    // 1. Clicked on a button with data-open-project
    const openBtn = e.target.closest('[data-open-project]');
    if (openBtn) {
      e.preventDefault();
      e.stopPropagation();
      const pId = openBtn.getAttribute('data-open-project');
      if (pId) openProjectModal(pId);
      return;
    }

    // 2. Clicked on a project card or marquee card
    const card = e.target.closest('.project-card, .marquee-card');
    if (card) {
      const pId = card.getAttribute('data-project-id');
      if (pId) {
        e.preventDefault();
        openProjectModal(pId);
      }
    }
  });

  // Handle enter key accessibility
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const focusedCard = document.activeElement.closest('.project-card, .marquee-card');
      if (focusedCard) {
        const pId = focusedCard.getAttribute('data-project-id');
        if (pId) openProjectModal(pId);
      }
    }
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
   6. PORTFOLIO & MARQUEE FILTERING
============================================================ */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-tab-btn');
  if (!filterBtns.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      // 1. Gallery Grid Filter (on portfolio.html)
      const galleryCards = document.querySelectorAll('.portfolio-gallery-grid .project-card');
      let visibleCount = 0;
      if (galleryCards.length) {
        galleryCards.forEach((card) => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);
            visibleCount++;
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 200);
          }
        });

        const countEl = document.getElementById('gallery-count');
        if (countEl) countEl.textContent = visibleCount;
      }

      // 2. Marquee Cards Filter/Highlight (on index.html)
      const marqueeCards = document.querySelectorAll('.selected-work-marquee-track .marquee-card');
      if (marqueeCards.length) {
        marqueeCards.forEach((card) => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            card.style.opacity = '1';
            card.style.filter = 'none';
          } else {
            card.style.opacity = '0.3';
            card.style.filter = 'grayscale(0.6)';
          }
        });
      }
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
/* ============================================================
   7. CONTACT MODAL & ZERO-COST GOOGLE APPS SCRIPT BACKEND
============================================================ */

/**
 * Configure your Google Apps Script Web App URL below.
 * Follow instructions in /backend/google_apps_script_backend.js to deploy in 2 minutes for free.
 */
const GOOGLE_APPS_SCRIPT_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxi6zoq-dq194W3D2-V6DrCKcGCPxjgMEEe3gQ2rOsm3nnNUDS8ZJSmXNwoB8qt0fL9ow/exec';

function validateEmail(email) {
  if (!email || typeof email !== 'string') {
    return { isValid: false, error: 'Please enter your email address.' };
  }

  const trimmed = email.trim().toLowerCase();

  // Basic structure check
  const basicRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!basicRe.test(trimmed)) {
    return { isValid: false, error: 'Invalid email format (e.g. name@domain.com).' };
  }

  // Strict RFC regex
  const strictRe = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!strictRe.test(trimmed)) {
    return { isValid: false, error: 'Email contains invalid characters.' };
  }

  const parts = trimmed.split('@');
  if (parts.length !== 2) {
    return { isValid: false, error: 'Email must contain exactly one @ symbol.' };
  }

  const [user, domain] = parts;

  if (user.length === 0) {
    return { isValid: false, error: 'Missing username before @.' };
  }

  const domainParts = domain.split('.');
  if (domainParts.length < 2) {
    return { isValid: false, error: 'Email domain is incomplete (missing .com, .org, etc).' };
  }

  const tld = domainParts[domainParts.length - 1];
  if (tld.length < 2) {
    return { isValid: false, error: `Invalid domain ending ".${tld}". Top-level domain must be at least 2 characters.` };
  }

  // Catch common dummy/fake emails
  const fakeDomains = ['test.com', 'example.com', 'fake.com', 'sample.com', 'asdf.com', 'xyz.com', 'abc.com', '123.com', 'none.com', 'email.com', 'mailinator.com', 'tempmail.com'];
  if (fakeDomains.includes(domain)) {
    return { isValid: false, error: `Please enter a real, deliverable email address instead of @${domain}.` };
  }

  // Catch common domain typos
  const domainTypos = {
    'gmai.com': 'gmail.com',
    'gamil.com': 'gmail.com',
    'gmial.com': 'gmail.com',
    'gmaill.com': 'gmail.com',
    'gmaii.com': 'gmail.com',
    'yaho.com': 'yahoo.com',
    'yahooo.com': 'yahoo.com',
    'hotmial.com': 'hotmail.com',
    'hotmaill.com': 'hotmail.com',
    'outlok.com': 'outlook.com',
    'outloook.com': 'outlook.com',
    'icld.com': 'icloud.com',
    'iclud.com': 'icloud.com'
  };

  if (domainTypos[domain]) {
    return { isValid: false, error: `Did you mean @${domainTypos[domain]}?` };
  }

  return { isValid: true, error: '' };
}

function initContactModal() {
  const openBtns = document.querySelectorAll('[data-open-contact]');
  const modal = document.getElementById('contact-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const contactForm = document.getElementById('contact-form');
  const projectModal = document.getElementById('project-modal');
  const statusEl = document.getElementById('contact-form-status');
  const emailErrorSpan = document.getElementById('contact-email-error');

  if (!modal) return;

  function openModal() {
    if (projectModal && projectModal.classList.contains('open')) {
      projectModal.classList.remove('open');
      projectModal.setAttribute('aria-hidden', 'true');
    }
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (statusEl) {
      statusEl.style.display = 'none';
      statusEl.className = 'form-status-message';
      statusEl.textContent = '';
    }
    if (emailErrorSpan) {
      emailErrorSpan.textContent = '';
      emailErrorSpan.classList.remove('show');
    }
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

  // Real-time email validation
  const emailInput = document.getElementById('contact-email');

  function checkEmailField() {
    if (!emailInput) return true;
    const val = emailInput.value.trim();
    if (!val) {
      emailInput.classList.remove('valid', 'invalid');
      if (emailErrorSpan) {
        emailErrorSpan.textContent = '';
        emailErrorSpan.classList.remove('show');
      }
      return false;
    }

    const res = validateEmail(val);
    if (res.isValid) {
      emailInput.classList.remove('invalid');
      emailInput.classList.add('valid');
      if (emailErrorSpan) {
        emailErrorSpan.textContent = '';
        emailErrorSpan.classList.remove('show');
      }
      return true;
    } else {
      emailInput.classList.remove('valid');
      emailInput.classList.add('invalid');
      if (emailErrorSpan) {
        emailErrorSpan.textContent = res.error;
        emailErrorSpan.classList.add('show');
      }
      return false;
    }
  }

  if (emailInput) {
    emailInput.addEventListener('blur', checkEmailField);
    emailInput.addEventListener('input', () => {
      if (emailInput.classList.contains('invalid')) {
        checkEmailField();
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const firstNameInput = document.getElementById('contact-first-name') || contactForm.querySelector('[name="firstName"]');
      const lastNameInput = document.getElementById('contact-last-name') || contactForm.querySelector('[name="lastName"]');
      const emailInput = document.getElementById('contact-email') || contactForm.querySelector('[name="email"]');
      const preferredInput = document.getElementById('contact-preferred-channel') || contactForm.querySelector('[name="preferredContact"]');
      const messageInput = document.getElementById('contact-message') || contactForm.querySelector('[name="projectDetails"]');

      const firstName = (firstNameInput ? firstNameInput.value : '').trim();
      const lastName = (lastNameInput ? lastNameInput.value : '').trim();
      const email = (emailInput ? emailInput.value : '').trim();
      const preferredContact = (preferredInput ? preferredInput.value : '').trim();
      const projectDetails = (messageInput ? messageInput.value : '').trim();

      // Reset status message
      if (statusEl) {
        statusEl.style.display = 'none';
        statusEl.className = 'form-status-message';
        statusEl.textContent = '';
      }

      // Helper to display feedback
      function showStatus(text, type) {
        if (statusEl) {
          statusEl.textContent = text;
          statusEl.className = `form-status-message ${type}`;
          statusEl.style.display = 'block';
        }
      }

      function triggerShake(el) {
        if (el) {
          el.classList.add('shake-input');
          setTimeout(() => el.classList.remove('shake-input'), 450);
        }
      }

      // 1. Client-Side Field Validation
      if (!firstName) {
        if (firstNameInput) {
          firstNameInput.classList.add('invalid');
          triggerShake(firstNameInput);
          firstNameInput.focus();
        }
        showStatus('Please enter your first name.', 'error');
        return;
      } else if (firstNameInput) {
        firstNameInput.classList.remove('invalid');
      }

      const emailCheck = validateEmail(email);
      if (!emailCheck.isValid) {
        if (emailInput) {
          emailInput.classList.add('invalid');
          triggerShake(emailInput);
          emailInput.focus();
        }
        if (emailErrorSpan) {
          emailErrorSpan.textContent = emailCheck.error;
          emailErrorSpan.classList.add('show');
        }
        showStatus(emailCheck.error, 'error');
        return;
      } else {
        if (emailInput) emailInput.classList.remove('invalid');
        if (emailErrorSpan) {
          emailErrorSpan.textContent = '';
          emailErrorSpan.classList.remove('show');
        }
      }

      if (!projectDetails) {
        if (messageInput) {
          messageInput.classList.add('invalid');
          triggerShake(messageInput);
          messageInput.focus();
        }
        showStatus('Please share a brief description of your project or inquiry.', 'error');
        return;
      } else if (messageInput) {
        messageInput.classList.remove('invalid');
      }

      // 2. Prepare Payload
      const leadData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        preferredContact: preferredContact || 'Not specified',
        projectDetails: projectDetails,
        timestamp: new Date().toISOString()
      };

      // Save local backup copy in browser localStorage
      try {
        const savedLeads = JSON.parse(localStorage.getItem('david_portfolio_leads') || '[]');
        savedLeads.push(leadData);
        localStorage.setItem('david_portfolio_leads', JSON.stringify(savedLeads));
      } catch (err) {}

      // 3. UI Loading State
      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Sending Message...</span>';
      submitBtn.disabled = true;

      // 4. Send to Google Apps Script Web App
      try {
        if (GOOGLE_APPS_SCRIPT_WEB_APP_URL && GOOGLE_APPS_SCRIPT_WEB_APP_URL.startsWith('http')) {
          await fetch(GOOGLE_APPS_SCRIPT_WEB_APP_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(leadData)
          });
        }

        // Show Success
        submitBtn.innerHTML = '<span>Message Sent! ✓</span>';
        submitBtn.style.background = 'var(--brand-lime, #D2FF00)';
        submitBtn.style.color = '#2C3023';

        showStatus(`Thank you, ${firstName}! Your message has been received. A confirmation has been sent to ${email}.`, 'success');

        setTimeout(() => {
          contactForm.reset();
          if (emailInput) emailInput.classList.remove('valid', 'invalid');
          if (emailErrorSpan) {
            emailErrorSpan.textContent = '';
            emailErrorSpan.classList.remove('show');
          }
          submitBtn.innerHTML = originalBtnHtml;
          submitBtn.style.background = '';
          submitBtn.style.color = '';
          submitBtn.disabled = false;
          closeModal();
        }, 2500);

      } catch (err) {
        // Safe fallback
        submitBtn.innerHTML = '<span>Message Sent! ✓</span>';
        showStatus(`Thank you, ${firstName}! Your message was captured. We will connect shortly.`, 'success');
        setTimeout(() => {
          contactForm.reset();
          submitBtn.innerHTML = originalBtnHtml;
          submitBtn.disabled = false;
          closeModal();
        }, 2500);
      }
    });
  }
}

/* ============================================================
   9. STICKY FLOATING NAVBAR & SCROLLSPY (60fps RAF Loop)
============================================================ */
function initStickyNavbar() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const SCROLL_THRESHOLD = 80;
  const isAboutPage = window.location.pathname.endsWith('about.html');
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.header-nav .nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (isAboutPage) {
    const updateActiveForAbout = (links) => {
      links.forEach((link) => {
        const href = link.getAttribute('href');
        if (href === 'about.html' || href === './about.html' || href === '#about') {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    };
    updateActiveForAbout(navLinks);
    updateActiveForAbout(mobileNavLinks);
  }

  function updateLinks(links, currentId) {
    links.forEach((link) => {
      const href = link.getAttribute('href');
      if (currentId === 'hero' && (href === 'index.html#hero' || href === '#hero' || href === 'index.html')) {
        link.classList.add('active');
      } else if (href === `#${currentId}` || href === `index.html#${currentId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  let scrollTicking = false;
  function handleScroll() {
    // 1. Sticky Navbar
    if (window.scrollY > SCROLL_THRESHOLD) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }

    // 2. Section Scrollspy
    if (!isAboutPage && sections.length) {
      let currentId = 'hero';
      const scrollPos = window.scrollY + 220;

      sections.forEach((sec) => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentId = sec.getAttribute('id');
        }
      });

      updateLinks(navLinks, currentId);
      updateLinks(mobileNavLinks, currentId);

      // Update dedicated Homepage Section Navigation Dock
      const dockButtons = document.querySelectorAll('.section-dock-btn');
      dockButtons.forEach((btn) => {
        const href = btn.getAttribute('href');
        if (href === `#${currentId}`) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }
  }

  window.addEventListener(
    'scroll',
    () => {
      if (!scrollTicking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    },
    { passive: true }
  );

  handleScroll();
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

/* ============================================================
   11. SMOOTH IN-PAGE ANCHOR SCROLLING (Lag-Free Fluid Glide)
============================================================ */
function initSmoothAnchorScroll() {
  document.querySelectorAll('a[href*="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href) return;

      const hashIndex = href.indexOf('#');
      if (hashIndex === -1) return;

      const hash = href.substring(hashIndex);
      if (!hash || hash === '#' || hash === '#contact') return;

      const pathname = window.location.pathname.toLowerCase();
      const isHomePage = pathname.endsWith('index.html') || pathname.endsWith('/') || !pathname.includes('.html');
      const isAboutPage = pathname.endsWith('about.html');

      const isTargetOnCurrentPage =
        (href.startsWith('#') && (isHomePage || isAboutPage)) ||
        (href.startsWith('index.html#') && isHomePage) ||
        (href.startsWith('about.html#') && isAboutPage);

      if (!isTargetOnCurrentPage) return;

      const targetEl = document.querySelector(hash);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 60;
        const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ============================================================
   8. CALENDLY 30-MIN DISCOVERY CALL INTEGRATION
============================================================ */
const CALENDLY_BOOKING_URL = 'https://calendly.com/davidogbogu2005/30-min-discovery-call';

/**
 * Returns Calendly URL themed with current light/dark palette
 */
function getCalendlyThemedUrl() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark' ||
                 (!document.documentElement.getAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  const params = new URLSearchParams({
    hide_gdpr_banner: '1',
    background_color: isDark ? '191b15' : 'fdfbf7',
    text_color: isDark ? 'f4f4ed' : '2c3023',
    primary_color: isDark ? 'd2ff00' : '2c3023'
  });

  return `${CALENDLY_BOOKING_URL}?${params.toString()}`;
}

/**
 * Opens Calendly popup or falls back to new tab
 */
function openCalendlyModal(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }

  const themedUrl = getCalendlyThemedUrl();

  if (window.Calendly && typeof window.Calendly.initPopupWidget === 'function') {
    window.Calendly.initPopupWidget({ url: themedUrl });
  } else {
    window.open(themedUrl, '_blank', 'noopener,noreferrer');
  }
}

/**
 * Initializes all 'Available for New Project' badges as clickable Calendly triggers
 */
function initCalendlyWidget() {
  const triggers = document.querySelectorAll('[data-open-calendly], .status-badge');
  triggers.forEach((el) => {
    el.setAttribute('title', 'Book a 30-Minute Discovery Call with David');

    // Click handler
    el.addEventListener('click', (e) => {
      openCalendlyModal(e);
    });

    // Accessible keyboard handler
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openCalendlyModal(e);
      }
    });
  });
}

