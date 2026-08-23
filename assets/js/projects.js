/**
 * ==========================================================================
 * PROJECTS & CASE STUDIES MODULE
 * Data catalog and interactive modal viewer for Data, App, and Design Projects
 * ==========================================================================
 */

const PROJECTS_DATA = {
  // 1. DATA ANALYSIS PROJECTS (PRIMARY FOCUS)
  data: [
    {
      id: 'data-1',
      title: 'Predictive Churn Engine & Dynamic Retention Modeling',
      category: 'Data Analytics & ML',
      image: 'assets/images/data-dashboard.jpg',
      shortDesc: 'A machine learning cohort survival model and real-time dashboard identifying at-risk accounts 60 days before contract renewal.',
      kpis: [
        { label: 'Churn Reduction', value: '38.4%' },
        { label: 'Annual Revenue Saved', value: '$3.2M' },
        { label: 'Model AUC-ROC', value: '0.94' },
        { label: 'Daily Predictions', value: '1.2M' }
      ],
      tags: ['Python (XGBoost)', 'SQL / Snowflake', 'dbt', 'Tableau', 'Feature Engineering'],
      problem: 'A high-growth B2B enterprise SaaS platform with 45,000 corporate seats was facing an unexpected 18% annual revenue churn rate. Product and account teams lacked visibility into leading indicators of disengagement until contract expiration notices were triggered.',
      solution: 'Developed an automated end-to-end churn prediction pipeline using Cox Proportional Hazards and XGBoost classifiers. Extracted 85+ granular behavioral features (e.g. weekly feature depth, API error frequencies, support ticket sentiment, executive sponsor login decay) from Snowflake warehouses transformed via dbt.',
      methodology: 'Trained model on 3 years of historical cohort events with temporal cross-validation. Integrated automated daily scoring into a custom Tableau dashboard and webhook triggers feeding directly into Salesforce.',
      codeSnippet: `-- Feature Extraction: Rolling 30-day Engagement Velocity & Anomaly Delta
WITH user_activity AS (
  SELECT 
    account_id,
    DATE_TRUNC('day', event_timestamp) AS event_date,
    COUNT(DISTINCT session_id) AS daily_sessions,
    COUNT(CASE WHEN event_name = 'export_report' THEN 1 END) AS high_value_actions
  FROM analytics_prod.events.fct_telemetry
  WHERE event_timestamp >= CURRENT_DATE - INTERVAL '90 days'
  GROUP BY 1, 2
),
rolling_metrics AS (
  SELECT
    account_id,
    event_date,
    AVG(daily_sessions) OVER (
      PARTITION BY account_id ORDER BY event_date ROWS BETWEEN 29 PRECEDING AND CURRENT ROW
    ) AS rolling_30d_sessions,
    LAG(daily_sessions, 30) OVER (
      PARTITION BY account_id ORDER BY event_date
    ) AS sessions_30d_prior
  FROM user_activity
)
SELECT 
  account_id,
  rolling_30d_sessions,
  SAFE_DIVIDE(rolling_30d_sessions - sessions_30d_prior, sessions_30d_prior) * 100 AS velocity_decay_pct
FROM rolling_metrics
WHERE event_date = CURRENT_DATE - 1;`,
      codeLang: 'SQL',
      businessImpact: 'Enabled Customer Success teams to intervene proactively on 420+ critical enterprise accounts, preserving $3.2M in recurring annual contract value. Increased average account LTV from 2.1 to 3.4 years.'
    },
    {
      id: 'data-2',
      title: 'Healthcare Patient Flow & Emergency Room Telemetry',
      category: 'Data Analytics & Simulation',
      image: 'assets/images/data-healthcare.jpg',
      shortDesc: 'Statistical capacity forecasting model and live telemetry suite reducing hospital ER triage bottlenecks and ICU transfer delays.',
      kpis: [
        { label: 'Wait Time Reduction', value: '42 mins' },
        { label: 'Bed Allocation Acc.', value: '96.2%' },
        { label: 'Patients Impacted', value: '250K+' },
        { label: 'Spike Warning Lead', value: '4.5 hrs' }
      ],
      tags: ['Python (Prophet / Scipy)', 'Real-Time Telemetry', 'PostgreSQL', 'Power BI', 'Monte Carlo'],
      problem: 'A regional healthcare network of 3 hospitals experienced severe emergency room crowding and unpredictable patient surges, causing extended average wait times (87 minutes) and delayed critical care ward transfers.',
      solution: 'Constructed an adaptive time-series forecasting model combining external environmental variables (local weather, epidemiological indices, regional transit alerts) with internal real-time admissions telemetry. Built Monte Carlo bed-occupancy simulations.',
      methodology: 'Simulated 10,000 daily patient admission trajectories under variable staffing constraints to deliver 7-day predictive bed occupancy forecasts and real-time early warning anomaly thresholds.',
      codeSnippet: `# Monte Carlo Hospital Bed Capacity & Surge Probability Simulation
import numpy as np
import scipy.stats as stats

def simulate_bed_occupancy(current_beds, target_los_mean, target_los_std, arrival_rate_lambda, n_simulations=5000):
    """
    Simulates stochastic emergency ward admissions and discharge distributions over 24-hour windows.
    """
    results = []
    for _ in range(n_simulations):
        # Sample Poisson daily arrivals
        daily_arrivals = np.random.poisson(lam=arrival_rate_lambda)
        # Sample log-normal length of stay (LOS) in hours
        sampled_los = np.random.lognormal(mean=target_los_mean, sigma=target_los_std, size=daily_arrivals)
        active_occupied = np.sum(sampled_los > 12) + current_beds * 0.85
        results.append(active_occupied)
    
    p95_surge_occupancy = np.percentile(results, 95)
    probability_overcapacity = np.mean(np.array(results) > 520) # 520 = Total Ward Beds
    return {
        "p95_beds_required": int(p95_surge_occupancy),
        "surge_risk_pct": round(probability_overcapacity * 100, 2)
    }`,
      codeLang: 'Python',
      businessImpact: 'Reduced average emergency triage waiting time by 42 minutes. Hospital clinical administrators achieved a 96.2% staffing alignment accuracy during seasonal flu surges.'
    }
  ],

  // 2. APP PROJECTS
  apps: [
    {
      id: 'app-1',
      title: 'FinPulse: AI Wealth Intelligence & Cashflow Cockpit',
      category: 'Full-Stack Web & Mobile App',
      image: 'assets/images/app-finpulse.jpg',
      shortDesc: 'A responsive financial intelligence application combining automated bank aggregation, predictive runway calculations, and interactive charts.',
      kpis: [
        { label: 'Active Users', value: '45,000+' },
        { label: 'Crash-Free Rate', value: '99.9%' },
        { label: 'Avg Session Time', value: '4.8 mins' },
        { label: 'App Store Rating', value: '4.9 ★' }
      ],
      tags: ['TypeScript', 'React Native / Web', 'Node.js', 'Chart.js', 'PostgreSQL', 'Tailwind/CSS'],
      features: [
        'Real-time automated transaction categorization with NLP heuristics.',
        'Predictive 12-month net worth & liquidity runway Monte Carlo simulator.',
        'Custom interactive SVG charts supporting pinch-to-zoom and timeline scrubbing.',
        'End-to-end AES-256 client-side encrypted storage architecture.'
      ],
      problem: 'Personal finance apps either provided simplistic backwards-looking summaries or overly complex enterprise spreadsheets that overwhelmed everyday users.',
      solution: 'Designed and engineered an ultra-sleek, mobile-first web and mobile application that emphasizes actionable forward-looking insights rather than historical expense logging.',
      businessImpact: 'Scaled to 45,000+ monthly active users within 6 months of public beta, achieving a 68% Day-30 user retention rate.'
    },
    {
      id: 'app-2',
      title: 'OmniMetrics: Real-Time SaaS Telemetry & Funnel Engine',
      category: 'Enterprise SaaS Web App',
      image: 'assets/images/app-omni.jpg',
      shortDesc: 'A low-latency web application for growth teams to inspect live user sessions, conversion funnel drop-offs, and distributed API latency.',
      kpis: [
        { label: 'Data Throughput', value: '10K evt/s' },
        { label: 'UI Render Time', value: '< 16ms' },
        { label: 'Global Latency', value: '45ms' },
        { label: 'Enterprise Teams', value: '120+' }
      ],
      tags: ['React', 'Next.js', 'WebSockets', 'Canvas API', 'Redis', 'Tailwind/Vanilla CSS'],
      features: [
        'Live streaming WebSocket telemetry feed with zero canvas UI frame drops.',
        'Interactive drag-and-drop conversion funnel builder with instant cohort recalculation.',
        'Configurable alert webhooks for sudden drop-offs and latency spikes.',
        'High-density dark mode UI crafted for dual-monitor operations centers.'
      ],
      problem: 'Modern product managers had to wait hours for batched analytics pipelines to diagnose critical conversion drop-offs during major product launches.',
      solution: 'Engineered a streaming analytics UI that renders live telemetry in sub-second latency with smooth 60fps canvas charts.',
      businessImpact: 'Adopted by 120+ software teams to monitor mission-critical product rollouts, cutting incident detection times by 78%.'
    }
  ],

  // 3. DESIGN PROJECTS
  designs: [
    {
      id: 'design-1',
      title: 'Nexus Design System: Enterprise Data Visualization Kit',
      category: 'UI/UX & Design Systems',
      image: 'assets/images/design-nexus.jpg',
      shortDesc: 'A comprehensive, multi-brand Figma design system and token library engineered specifically for dense analytical dashboards and data tools.',
      kpis: [
        { label: 'Atomic Components', value: '140+' },
        { label: 'Accessibility Score', value: '100% AA' },
        { label: 'Design Tokens', value: '380+' },
        { label: 'Adopted Projects', value: '24' }
      ],
      tags: ['Figma Master Components', 'Design Tokens', 'WCAG 2.1 AA', 'Data Viz Guidelines', 'Prototyping'],
      features: [
        'Curated 14-palette categorical and sequential data visualization color system calibrated for color-blind accessibility.',
        'High-density typography scale supporting compact data tables and expansive executive metric cards.',
        'Interactive micro-interaction guidelines for chart hover states, cross-filtering, and drill-downs.',
        'Complete token export integration with style-dictionary into CSS/JSON.'
      ],
      problem: 'Disjointed dashboard styling across 6 engineering teams resulted in inconsistent data interpretations, accessibility violations, and redundant design cycles.',
      solution: 'Researched cognitive load in analytical workflows and designed a cohesive design token architecture with rich components tailored for data-heavy views.',
      businessImpact: 'Accelerated enterprise feature delivery time from 6 weeks to 10 days while achieving 100% WCAG 2.1 AA compliance across all client portals.'
    }
  ]
};

class ProjectsController {
  constructor() {
    this.modalBackdrop = document.getElementById('project-modal-backdrop');
    this.modalContent = document.getElementById('project-modal-content');
    this.modalCloseBtn = document.getElementById('project-modal-close');
    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    // Open case study triggers
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-project-id]');
      if (trigger) {
        e.preventDefault();
        const projectId = trigger.dataset.projectId;
        this.openModal(projectId);
      }
    });

    // Close button
    if (this.modalCloseBtn) {
      this.modalCloseBtn.addEventListener('click', () => this.closeModal());
    }

    // Backdrop click
    if (this.modalBackdrop) {
      this.modalBackdrop.addEventListener('click', (e) => {
        if (e.target === this.modalBackdrop) {
          this.closeModal();
        }
      });
    }

    // Keyboard ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modalBackdrop?.classList.contains('active')) {
        this.closeModal();
      }
    });
  }

  findProjectById(id) {
    const all = [...PROJECTS_DATA.data, ...PROJECTS_DATA.apps, ...PROJECTS_DATA.designs];
    return all.find(p => p.id === id);
  }

  openModal(projectId) {
    const project = this.findProjectById(projectId);
    if (!project || !this.modalContent || !this.modalBackdrop) return;

    // Render Modal Content
    this.modalContent.innerHTML = `
      <div class="modal-case-study">
        <div class="modal-project-header">
          <span class="project-category-badge" style="position: static; margin-bottom: 0.75rem; display: inline-block;">${project.category}</span>
          <h2 style="font-size: clamp(1.5rem, 3vw, 2.2rem); margin-bottom: 0.75rem;">${project.title}</h2>
          <p style="font-size: 1.05rem; color: var(--text-muted); line-height: 1.6;">${project.shortDesc}</p>
        </div>

        <div style="margin: 1.5rem 0; border-radius: var(--border-radius-lg); overflow: hidden; border: 1px solid var(--border-medium);">
          <img src="${project.image}" alt="${project.title}" style="width: 100%; aspect-ratio: 16/9; object-fit: cover;">
        </div>

        <!-- KPI Impact Grid -->
        <div class="project-metrics-grid" style="grid-template-columns: repeat(4, 1fr); margin-bottom: 2rem; padding: 1.25rem;">
          ${project.kpis.map(k => `
            <div class="project-metric-item">
              <span class="metric-kpi-val" style="font-size: 1.4rem;">${k.value}</span>
              <span class="metric-kpi-lbl">${k.label}</span>
            </div>
          `).join('')}
        </div>

        <!-- Case Study Sections -->
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <div>
            <h4 style="color: var(--accent-cyan); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
              <span>🎯</span> Problem & Context
            </h4>
            <p>${project.problem}</p>
          </div>

          <div>
            <h4 style="color: var(--accent-emerald); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
              <span>💡</span> Solution & Strategy
            </h4>
            <p>${project.solution}</p>
          </div>

          ${project.methodology ? `
            <div>
              <h4 style="color: var(--accent-violet); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
                <span>🔬</span> Analytics Methodology
              </h4>
              <p>${project.methodology}</p>
            </div>
          ` : ''}

          ${project.codeSnippet ? `
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <h4 style="color: var(--accent-cyan); display: flex; align-items: center; gap: 0.5rem;">
                  <span>💻</span> Technical Implementation (${project.codeLang})
                </h4>
                <span class="tech-tag">${project.codeLang}</span>
              </div>
              <pre style="background: var(--bg-primary); border: 1px solid var(--border-medium); border-radius: var(--border-radius-md); padding: 1.2rem; overflow-x: auto; font-family: var(--font-mono); font-size: 0.85rem; color: #38bdf8; line-height: 1.5;"><code>${this.escapeHTML(project.codeSnippet)}</code></pre>
            </div>
          ` : ''}

          ${project.features ? `
            <div>
              <h4 style="color: var(--accent-cyan); margin-bottom: 0.5rem;">Core Features & Architecture</h4>
              <ul class="role-highlights">
                ${project.features.map(f => `<li>${f}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          <div style="background: rgba(16, 185, 129, 0.08); border-left: 4px solid var(--accent-emerald); padding: 1.25rem; border-radius: 0 var(--border-radius-md) var(--border-radius-md) 0;">
            <h4 style="color: var(--accent-emerald); margin-bottom: 0.35rem;">🏆 Measurable Business Impact</h4>
            <p style="color: var(--text-main); font-weight: 500;">${project.businessImpact}</p>
          </div>

          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem;">
            ${project.tags.map(t => `<span class="tech-tag" style="background: var(--bg-tertiary);">${t}</span>`).join('')}
          </div>
        </div>
      </div>
    `;

    this.modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    if (!this.modalBackdrop) return;
    this.modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.projectsControllerInstance = new ProjectsController();
});
