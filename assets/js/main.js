/**
 * David Ogbogu Portfolio - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initThemeSwitcher();
  initStickyNavbar();
  initMobileDrawer();
  initPortfolioFilters();
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
   2. THEME SWITCHER (LIGHT / DARK INVERSION)
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

  // Handle manual toggle
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
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
   3. PORTFOLIO FILTERING
============================================================ */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-tab-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
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
   4. SERVICES ACCORDION
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
   5. EXPERIENCE HOVER FLOATING PREVIEW
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
   6. CONTACT MODAL & FORM
============================================================ */
function initContactModal() {
  const openBtns = document.querySelectorAll('[data-open-contact]');
  const modal = document.getElementById('contact-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const contactForm = document.getElementById('contact-form');

  if (!modal) return;

  function openModal() {
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
   7. STICKY FLOATING NAVBAR & SCROLLSPY
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

  window.addEventListener('scroll', () => {
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
  }, { passive: true });
}

/* ============================================================
   8. MOBILE NAVIGATION DRAWER
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


