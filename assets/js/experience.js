/**
 * ==========================================================================
 * WORK EXPERIENCE & CAREER ROADMAP MODULE
 * Data store and interactive filtering for career history & impact
 * ==========================================================================
 */

const EXPERIENCE_DATA = [
  {
    id: 'exp-1',
    role: 'Lead Analytics Engineer & UX Strategist',
    company: 'Quantis Intelligence Labs',
    period: '2023 — Present',
    category: 'data',
    description: 'Spearheading the core enterprise analytics platform architecture while directing the UX design system for multi-tenant BI dashboards serving Fortune 500 clients.',
    highlights: [
      'Architected high-throughput dbt and Snowflake data modeling pipelines processing 45M+ daily event telemetry records.',
      'Designed and coded the "Nexus" visualization component library, decreasing dashboard build cycle time by 48%.',
      'Engineered automated anomaly detection models in Python (Prophet & Isolation Forests), preventing an estimated $2.4M in downtime billing losses.'
    ],
    kpi: 'Reduced decision latency by 64% across 18 enterprise client accounts.',
    techStack: ['Python', 'SQL', 'Snowflake', 'dbt', 'Figma', 'TypeScript', 'React', 'Tableau API']
  },
  {
    id: 'exp-2',
    role: 'Senior Data Analyst & Product Architect',
    company: 'Verve Technologies',
    period: '2021 — 2023',
    category: 'data',
    description: 'Directed product analytics, behavioral user cohort modeling, and statistical A/B experimentation frameworks for consumer fintech and SaaS web applications.',
    highlights: [
      'Designed end-to-end multi-touch marketing attribution algorithms using Shapley Values and Markov chains.',
      'Built interactive executive KPI dashboards in Tableau and Power BI integrated directly with PostgreSQL databases.',
      'Conducted extensive user interviews and usability tests to redesign the SaaS onboarding funnel, increasing trial-to-paid conversion by 34%.'
    ],
    kpi: 'Unlocked $4.8M in incremental annual recurring revenue via conversion optimization.',
    techStack: ['SQL', 'Python (Pandas/Scipy)', 'Tableau', 'Power BI', 'Mixpanel', 'Figma', 'JavaScript']
  },
  {
    id: 'exp-3',
    role: 'UI/UX Product Designer & Web Developer',
    company: 'Studio Helix Interactive',
    period: '2019 — 2021',
    category: 'design',
    description: 'Created responsive web and mobile application prototypes for venture-backed startups with a strong focus on data-rich dashboards and interactive data tools.',
    highlights: [
      'Designed 14+ high-fidelity digital products from wireframes and user personas to production React frontends.',
      'Established a unified token-based design system in Figma adhering strictly to WCAG 2.1 AA accessibility standards.',
      'Implemented custom SVG and canvas data visualizations for medical telemetry and logistics monitoring.'
    ],
    kpi: 'Delivered 100% on-time product launches with an average client Net Promoter Score of 92.',
    techStack: ['Figma', 'UI/UX Research', 'Design Systems', 'HTML5', 'CSS3/Sass', 'React', 'D3.js']
  },
  {
    id: 'exp-4',
    role: 'Data Visualization & BI Specialist',
    company: 'Acro Data Solutions',
    period: '2017 — 2019',
    category: 'data',
    description: 'Translated complex relational and time-series datasets into actionable, beautiful interactive visual reports and automated data pipelines.',
    highlights: [
      'Authored 200+ advanced SQL queries and stored procedures for financial and supply chain reporting.',
      'Developed responsive executive BI portals using web technologies (HTML/CSS/JS) wrapper around REST APIs.',
      'Trained cross-functional stakeholders on data literacy and self-service analytics.'
    ],
    kpi: 'Automated 120+ weekly manual reporting hours into real-time pipelines.',
    techStack: ['SQL Server', 'Python', 'Power BI', 'Tableau', 'Excel VBA', 'JavaScript']
  }
];

class ExperienceController {
  constructor() {
    this.container = document.getElementById('timeline-items-container');
    this.filterButtons = document.querySelectorAll('.exp-filter-btn');
    this.currentFilter = 'all';
    this.init();
  }

  init() {
    if (!this.container) return;
    this.bindEvents();
    this.render();
  }

  bindEvents() {
    this.filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentFilter = btn.dataset.filter;
        this.render();
      });
    });
  }

  render() {
    const filtered = this.currentFilter === 'all'
      ? EXPERIENCE_DATA
      : EXPERIENCE_DATA.filter(item => item.category === this.currentFilter);

    this.container.innerHTML = filtered.map((item, idx) => `
      <div class="timeline-item reveal-on-scroll is-revealed stagger-${(idx % 4) + 1}">
        <div class="timeline-node" aria-hidden="true"></div>
        <div class="timeline-card">
          <div class="timeline-header">
            <div class="role-title-group">
              <h3>${item.role}</h3>
              <div class="company-name">${item.company}</div>
            </div>
            <span class="role-period-badge">${item.period}</span>
          </div>
          <p class="role-description">${item.description}</p>
          <ul class="role-highlights">
            ${item.highlights.map(h => `<li>${h}</li>`).join('')}
          </ul>
          <div class="kpi-callout">
            <strong>Measurable Impact:</strong> ${item.kpi}
          </div>
          <div class="role-tech-stack">
            ${item.techStack.map(t => `<span class="tech-tag">${t}</span>`).join('')}
          </div>
        </div>
      </div>
    `).join('');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.experienceControllerInstance = new ExperienceController();
});
