/**
 * ==========================================================================
 * MAIN APPLICATION CONTROLLER
 * Navigation, Themes, ScrollSpy, Animations, Estimator & Form handlers
 * ==========================================================================
 */

class PortfolioApp {
  constructor() {
    this.initTheme();
    this.initNavigation();
    this.initScrollReveals();
    this.initStatsCounter();
    this.initProjectEstimator();
    this.initContactForm();
    this.initBackToTop();
    this.initResumeDownload();
  }

  // 1. Theme Management (Dark / Light)
  initTheme() {
    const themeBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', nextTheme);
        localStorage.setItem('portfolio-theme', nextTheme);

        // Re-render chart canvas on theme change
        if (window.analyticsHubInstance) {
          window.analyticsHubInstance.render();
        }
      });
    }
  }

  // 2. Navigation, Sticky Header & ScrollSpy
  initNavigation() {
    const header = document.querySelector('.site-header');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
    const mobileDrawer = document.getElementById('mobile-nav-drawer');
    const sections = document.querySelectorAll('section[id]');

    // Header blur on scroll
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
      this.updateScrollSpy(sections, navLinks);
    });

    // Mobile menu toggle
    if (mobileMenuBtn && mobileDrawer) {
      mobileMenuBtn.addEventListener('click', () => {
        const isOpen = mobileDrawer.classList.toggle('open');
        mobileMenuBtn.setAttribute('aria-expanded', isOpen);
        mobileMenuBtn.innerHTML = isOpen
          ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>'
          : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
      });

      // Close mobile menu on link click
      mobileDrawer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mobileDrawer.classList.remove('open');
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
          mobileMenuBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
        });
      });
    }
  }

  updateScrollSpy(sections, navLinks) {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  // 3. Scroll Reveal Animations (Intersection Observer)
  initScrollReveals() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (!('IntersectionObserver' in window)) {
      revealElements.forEach(el => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          // Trigger skill progress bars if within skills section
          if (entry.target.classList.contains('skill-category-card')) {
            entry.target.querySelectorAll('.skill-progress-fill').forEach(fill => {
              fill.style.width = fill.dataset.level || '85%';
            });
          }
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  }

  // 4. Hero Stats Number Counter Animation
  initStatsCounter() {
    const statCounters = document.querySelectorAll('.stat-number[data-target]');
    if (!statCounters.length) return;

    let animated = false;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !animated) {
        animated = true;
        statCounters.forEach(counter => {
          const target = parseFloat(counter.dataset.target);
          const duration = 1800; // ms
          const startTime = performance.now();
          const isDecimal = target % 1 !== 0;

          const updateCount = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = easeProgress * target;

            counter.textContent = isDecimal
              ? currentVal.toFixed(1)
              : Math.floor(currentVal).toLocaleString();

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              counter.textContent = isDecimal ? target.toFixed(1) : target.toLocaleString();
            }
          };

          requestAnimationFrame(updateCount);
        });
      }
    }, { threshold: 0.3 });

    const statsStrip = document.querySelector('.hero-stats-strip');
    if (statsStrip) observer.observe(statsStrip);
  }

  // 5. Interactive Project Estimator Widget
  initProjectEstimator() {
    const typePills = document.querySelectorAll('.type-pill-btn');
    const estimateVal = document.getElementById('estimated-scope-val');
    const estimateTime = document.getElementById('estimated-time-val');

    const rates = {
      'data-viz': { cost: '$4,500 – $8,500', time: '2 – 3 Weeks' },
      'ml-pipeline': { cost: '$8,000 – $16,000', time: '4 – 6 Weeks' },
      'app-design': { cost: '$6,000 – $12,000', time: '3 – 5 Weeks' },
      'fullstack': { cost: '$12,000 – $24,000', time: '6 – 10 Weeks' }
    };

    typePills.forEach(pill => {
      pill.addEventListener('click', () => {
        typePills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const projectType = pill.dataset.type;
        if (rates[projectType]) {
          if (estimateVal) estimateVal.textContent = rates[projectType].cost;
          if (estimateTime) estimateTime.textContent = rates[projectType].time;
        }
      });
    });
  }

  // 6. Interactive Contact Form with Validation & Feedback Toast
  initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // 1. Anti-spam honeypot check
      const botCheck = document.getElementById('form-botcheck');
      if (botCheck && botCheck.value.trim() !== '') {
        // Silently drop bot submissions
        form.reset();
        this.showToast('Thank you! Your project inquiry has been received.');
        return;
      }

      // 2. Validate fields
      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const msgInput = document.getElementById('contact-message');

      const nameVal = nameInput ? nameInput.value.trim() : '';
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const msgVal = msgInput ? msgInput.value.trim() : '';

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!nameVal || nameVal.length < 2) {
        this.showToast('⚠️ Please enter a valid name (at least 2 characters).');
        nameInput?.focus();
        return;
      }

      if (!emailVal || !emailRegex.test(emailVal)) {
        this.showToast('⚠️ Please enter a valid email address.');
        emailInput?.focus();
        return;
      }

      if (!msgVal || msgVal.length < 5) {
        this.showToast('⚠️ Please enter project details (at least 5 characters).');
        msgInput?.focus();
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      // Disable and show loading
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg style="animation: spin-slow 1s linear infinite;" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
          <path d="M12 2a10 10 0 0 1 10 10" />
        </svg>
        Sending Inquiry...
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        form.reset();
        this.showToast('Thank you! Your project inquiry has been received. I will respond within 24 hours.');
      }, 1000);
    });
  }

  // 7. Download CV Simulation
  initResumeDownload() {
    const resumeBtns = document.querySelectorAll('.download-cv-btn');
    resumeBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.showToast('📄 David_Ogbogu_Data_Analyst_Product_Designer_CV.pdf downloaded successfully!');
      });
    });
  }

  // 8. Back to Top Button
  initBackToTop() {
    const backBtn = document.getElementById('back-to-top');
    if (!backBtn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backBtn.style.opacity = '1';
        backBtn.style.pointerEvents = 'auto';
      } else {
        backBtn.style.opacity = '0';
        backBtn.style.pointerEvents = 'none';
      }
    });

    backBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 9. Toast Notification System (Secure text node insertion)
  showToast(message) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    
    // Create icon
    const iconWrapper = document.createElement('span');
    iconWrapper.innerHTML = `
      <svg class="toast-icon-emerald" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    `;
    
    // Create text span safely
    const textSpan = document.createElement('span');
    textSpan.textContent = message;

    toast.appendChild(iconWrapper);
    toast.appendChild(textSpan);
    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.portfolioApp = new PortfolioApp();
});
