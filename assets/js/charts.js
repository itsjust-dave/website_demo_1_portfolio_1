/**
 * ==========================================================================
 * CONTINUOUS MOVING CHARTS & DATA VISUALIZATION ENGINE
 * 60fps requestAnimationFrame continuous animated waveforms, particle nodes,
 * and live interactive data analytics simulation.
 * ==========================================================================
 */

class MovingAnalyticsHub {
  constructor() {
    this.canvas = document.getElementById('hub-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.currentView = 'churn'; // 'churn' | 'attribution' | 'telemetry'
    this.animationId = null;
    this.time = 0;

    // Simulation Parameters
    this.params = {
      churn: {
        baseRetention: 70,
        adoptionLift: 15,
        targetRetention: 70,
        targetLift: 15
      },
      attribution: {
        model: 'shapley',
        adSpend: 50000,
        particles: []
      },
      telemetry: {
        streamData: [],
        maxPoints: 60,
        threshold: 85,
        currentVal: 55
      }
    };

    this.init();
  }

  init() {
    this.setupHiDPICanvas();
    this.initTelemetryStream();
    this.initAttributionParticles();
    this.bindEvents();

    // Start 60fps continuous animation loop
    this.startAnimationLoop();

    // Resize listener
    window.addEventListener('resize', () => {
      this.setupHiDPICanvas();
    });
  }

  setupHiDPICanvas() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.width = rect.width;
    this.height = Math.max(320, rect.height || 340);

    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.ctx.resetTransform?.() || this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(dpr, dpr);
  }

  bindEvents() {
    // Hub Tab buttons
    const tabBtns = document.querySelectorAll('.hub-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.switchView(btn.dataset.view);
      });
    });

    // Churn sliders
    const retentionSlider = document.getElementById('slider-retention');
    const adoptionSlider = document.getElementById('slider-adoption');

    if (retentionSlider) {
      retentionSlider.addEventListener('input', (e) => {
        this.params.churn.targetRetention = parseFloat(e.target.value);
        document.getElementById('val-retention').textContent = `${this.params.churn.targetRetention}%`;
        this.updateChurnOutputs();
      });
    }

    if (adoptionSlider) {
      adoptionSlider.addEventListener('input', (e) => {
        this.params.churn.targetLift = parseFloat(e.target.value);
        document.getElementById('val-adoption').textContent = `+${this.params.churn.targetLift}%`;
        this.updateChurnOutputs();
      });
    }

    // Attribution Model Selectors
    const attrPills = document.querySelectorAll('.attr-model-pill');
    attrPills.forEach(pill => {
      pill.addEventListener('click', () => {
        attrPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.params.attribution.model = pill.dataset.model;
      });
    });
  }

  switchView(viewName) {
    if (this.currentView === viewName) return;
    this.currentView = viewName;

    // Toggle corresponding controls subpanel
    document.querySelectorAll('.hub-controls-subpanel').forEach(panel => {
      panel.style.display = 'none';
    });
    const activePanel = document.getElementById(`controls-${viewName}`);
    if (activePanel) activePanel.style.display = 'flex';
  }

  updateChurnOutputs() {
    const base = this.params.churn.targetRetention;
    const lift = this.params.churn.targetLift;
    const effectiveRetention = Math.min(98.5, base + (lift * 0.45));
    const projectedLtv = Math.round(180 * (1 / ((100 - effectiveRetention) / 100)));
    const annualSavings = Math.round((lift * 28400) + 120000);

    const ltvEl = document.getElementById('sim-ltv-val');
    const revEl = document.getElementById('sim-rev-val');
    if (ltvEl) ltvEl.textContent = `$${projectedLtv}`;
    if (revEl) revEl.textContent = `+$${annualSavings.toLocaleString()}/yr`;
  }

  initTelemetryStream() {
    this.params.telemetry.streamData = [];
    for (let i = 0; i < this.params.telemetry.maxPoints; i++) {
      this.params.telemetry.streamData.push(50 + Math.sin(i * 0.3) * 12);
    }
  }

  initAttributionParticles() {
    this.params.attribution.particles = [];
    for (let i = 0; i < 28; i++) {
      this.params.attribution.particles.push({
        x: Math.random(),
        yChannel: Math.floor(Math.random() * 5),
        speed: 0.004 + Math.random() * 0.006,
        size: 2 + Math.random() * 2.5,
        alpha: 0.3 + Math.random() * 0.7
      });
    }
  }

  startAnimationLoop() {
    const loop = () => {
      this.time += 0.035;

      // Smooth lerp for sliders
      this.params.churn.baseRetention += (this.params.churn.targetRetention - this.params.churn.baseRetention) * 0.1;
      this.params.churn.adoptionLift += (this.params.churn.targetLift - this.params.churn.adoptionLift) * 0.1;

      // Update streaming telemetry
      if (Math.random() < 0.25) {
        const isSpike = Math.random() < 0.08;
        let next = 50 + Math.sin(this.time * 1.5) * 18 + (Math.random() * 10 - 5);
        if (isSpike) next += 26;
        next = Math.max(25, Math.min(96, next));
        this.params.telemetry.streamData.shift();
        this.params.telemetry.streamData.push(next);
        this.params.telemetry.currentVal = next;

        const alertBadge = document.getElementById('telemetry-status-badge');
        if (alertBadge) {
          if (next > this.params.telemetry.threshold) {
            alertBadge.textContent = '⚡ Anomaly Alert (Spike)';
            alertBadge.style.color = 'var(--accent-rose)';
            alertBadge.style.borderColor = 'rgba(244, 63, 94, 0.4)';
          } else {
            alertBadge.textContent = '● Stream Active (Nominal)';
            alertBadge.style.color = 'var(--accent-emerald)';
            alertBadge.style.borderColor = 'rgba(16, 185, 129, 0.3)';
          }
        }
      }

      this.render();
      this.animationId = requestAnimationFrame(loop);
    };

    this.animationId = requestAnimationFrame(loop);
  }

  render() {
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    if (this.currentView === 'churn') {
      this.renderMovingChurn(isDark);
    } else if (this.currentView === 'attribution') {
      this.renderMovingAttribution(isDark);
    } else if (this.currentView === 'telemetry') {
      this.renderMovingTelemetry(isDark);
    }
  }

  // 1. Moving Churn & Cohort Survival Visualizer
  renderMovingChurn(isDark) {
    const ctx = this.ctx;
    const padding = { top: 40, right: 30, bottom: 45, left: 55 };
    const chartW = this.width - padding.left - padding.right;
    const chartH = this.height - padding.top - padding.bottom;

    // Draw Grid & Axes
    const gridColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
    const textColor = isDark ? '#94a3b8' : '#64748b';
    ctx.strokeStyle = gridColor;
    ctx.fillStyle = textColor;
    ctx.font = '11px "JetBrains Mono", monospace';
    ctx.lineWidth = 1;

    for (let i = 0; i <= 4; i++) {
      const yVal = i * 25;
      const y = padding.top + chartH - (i / 4) * chartH;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(this.width - padding.right, y);
      ctx.stroke();
      ctx.fillText(`${yVal}%`, padding.left - 35, y + 4);
    }

    const months = ['M0', 'M2', 'M4', 'M6', 'M8', 'M10', 'M12'];
    months.forEach((m, idx) => {
      const x = padding.left + (idx / (months.length - 1)) * chartW;
      ctx.fillText(m, x - 10, this.height - padding.bottom + 22);
    });

    const monthsCount = 12;
    const baseDecay = (100 - this.params.churn.baseRetention) / 100;
    const liftBonus = (this.params.churn.adoptionLift * 0.35) / 100;

    // Baseline animated moving wave
    this.drawMovingCurve(
      (m, t) => 100 * Math.exp(-baseDecay * (m / 3.8)) + Math.sin(m * 0.8 + t) * 1.5,
      'rgba(148, 163, 184, 0.25)',
      '#64748b',
      padding, chartW, chartH, monthsCount, false
    );

    // Optimized ML Retention wave with pulsing glow
    this.drawMovingCurve(
      (m, t) => Math.min(100, 100 * Math.exp(-(baseDecay - liftBonus) * (m / 4.4)) + Math.sin(m * 1.1 + t * 1.2) * 2.2),
      'rgba(6, 182, 212, 0.22)',
      '#06b6d4',
      padding, chartW, chartH, monthsCount, true
    );

    // Moving scan particle along the curve
    const scanT = (this.time * 0.4) % monthsCount;
    const scanVal = Math.min(100, 100 * Math.exp(-(baseDecay - liftBonus) * (scanT / 4.4)) + Math.sin(scanT * 1.1 + this.time * 1.2) * 2.2);
    const scanX = padding.left + (scanT / monthsCount) * chartW;
    const scanY = padding.top + chartH - (scanVal / 100) * chartH;

    // Pulse Ring around traveling node
    const pulseRad = 6 + Math.sin(this.time * 4) * 3;
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(scanX, scanY, pulseRad + 4, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(scanX, scanY, 5, 0, Math.PI * 2);
    ctx.fill();

    // Top Header & Status Indicator
    ctx.font = '600 12px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#06b6d4';
    ctx.fillRect(padding.left, 16, 10, 10);
    ctx.fillText('Live ML Retention Curve (Continuous Streaming)', padding.left + 16, 25);

    ctx.fillStyle = textColor;
    ctx.fillRect(padding.left + 300, 16, 10, 10);
    ctx.fillText('Baseline Cohort Decay', padding.left + 316, 25);
  }

  drawMovingCurve(formula, areaColor, lineColor, padding, chartW, chartH, totalMonths, withGlow) {
    const ctx = this.ctx;
    const points = [];

    for (let m = 0; m <= totalMonths; m += 0.25) {
      const val = formula(m, this.time);
      const x = padding.left + (m / totalMonths) * chartW;
      const y = padding.top + chartH - (val / 100) * chartH;
      points.push({ x, y });
    }

    if (areaColor) {
      const grad = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartH);
      grad.addColorStop(0, areaColor);
      grad.addColorStop(1, 'rgba(6, 182, 212, 0)');

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      points.forEach(p => ctx.lineTo(p.x, p.y));
      ctx.lineTo(points[points.length - 1].x, padding.top + chartH);
      ctx.lineTo(points[0].x, padding.top + chartH);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();
    }

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    points.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 3;
    if (withGlow) {
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 10;
    }
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  // 2. Moving Multi-Touch Attribution Engine
  renderMovingAttribution(isDark) {
    const ctx = this.ctx;
    const padding = { top: 40, right: 30, bottom: 40, left: 110 };
    const chartW = this.width - padding.left - padding.right;
    const chartH = this.height - padding.top - padding.bottom;

    const channels = ['Paid Search', 'Organic / SEO', 'Paid Social', 'Email CRM', 'Referral / Aff'];
    const models = {
      first: [42, 18, 25, 8, 7],
      linear: [20, 20, 20, 20, 20],
      timeDecay: [14, 16, 24, 28, 18],
      shapley: [28, 24, 21, 16, 11]
    };

    const currentDist = models[this.params.attribution.model] || models.shapley;
    const rowHeight = chartH / channels.length;

    // Draw Animated Channels and Flowing Particles
    channels.forEach((ch, idx) => {
      const y = padding.top + idx * rowHeight;
      // Slight continuous moving ripple on bars
      const pct = currentDist[idx] + Math.sin(this.time * 2 + idx) * 0.8;
      const barW = (pct / 50) * chartW;

      // Channel Label
      ctx.fillStyle = isDark ? '#f8fafc' : '#0f172a';
      ctx.font = '600 12px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(ch, padding.left - 15, y + rowHeight / 2 + 4);

      // Track Background
      ctx.fillStyle = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
      ctx.beginPath();
      ctx.roundRect(padding.left, y + 8, chartW, rowHeight - 16, 6);
      ctx.fill();

      // Moving Gradient Bar
      const grad = ctx.createLinearGradient(
        padding.left + Math.sin(this.time + idx) * 30, 
        0, 
        padding.left + barW, 
        0
      );
      grad.addColorStop(0, idx % 2 === 0 ? '#06b6d4' : '#8b5cf6');
      grad.addColorStop(1, idx % 2 === 0 ? '#10b981' : '#ec4899');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(padding.left, y + 8, Math.max(10, barW), rowHeight - 16, 6);
      ctx.fill();

      // Pct text
      ctx.fillStyle = isDark ? '#ffffff' : '#0f172a';
      ctx.font = '700 11px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillText(
        `${pct.toFixed(1)}% ($${Math.round((pct / 100) * this.params.attribution.adSpend).toLocaleString()})`, 
        padding.left + barW + 10, 
        y + rowHeight / 2 + 4
      );
    });

    // Render Flowing Energy Particles
    this.params.attribution.particles.forEach(p => {
      p.x += p.speed;
      if (p.x > 1) p.x = 0;

      const yChannelPos = padding.top + p.yChannel * rowHeight + rowHeight / 2;
      const xPos = padding.left + p.x * chartW;

      ctx.fillStyle = `rgba(6, 182, 212, ${p.alpha})`;
      ctx.beginPath();
      ctx.arc(xPos, yChannelPos, p.size, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.textAlign = 'left';
  }

  // 3. Moving Real-Time Telemetry & Anomaly Oscilloscope
  renderMovingTelemetry(isDark) {
    const ctx = this.ctx;
    const padding = { top: 40, right: 30, bottom: 40, left: 50 };
    const chartW = this.width - padding.left - padding.right;
    const chartH = this.height - padding.top - padding.bottom;

    const data = this.params.telemetry.streamData;
    const thresholdY = padding.top + chartH - (this.params.telemetry.threshold / 100) * chartH;

    // Moving Scanline Effect
    const scanlineX = padding.left + ((this.time * 60) % chartW);
    ctx.fillStyle = 'rgba(6, 182, 212, 0.08)';
    ctx.fillRect(scanlineX - 20, padding.top, 40, chartH);

    // Threshold Alert Line
    ctx.strokeStyle = 'rgba(244, 63, 94, 0.65)';
    ctx.setLineDash([6, 6]);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(padding.left, thresholdY);
    ctx.lineTo(this.width - padding.right, thresholdY);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#f43f5e';
    ctx.font = '600 10px "JetBrains Mono", monospace';
    ctx.fillText('CRITICAL SURGE THRESHOLD (85%)', this.width - padding.right - 180, thresholdY - 8);

    // Draw Continuous Moving Spline
    ctx.beginPath();
    data.forEach((val, i) => {
      const x = padding.left + (i / (data.length - 1)) * chartW;
      const y = padding.top + chartH - (val / 100) * chartH;
      if (i === 0) ctx.moveTo(x, y);
      else {
        // smooth spline
        const prevX = padding.left + ((i - 1) / (data.length - 1)) * chartW;
        const prevY = padding.top + chartH - (data[i - 1] / 100) * chartH;
        const cpX = (prevX + x) / 2;
        ctx.bezierCurveTo(cpX, prevY, cpX, y, x, y);
      }
    });

    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#10b981';
    ctx.shadowBlur = 12;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Draw Streaming Gradient Glow Fill
    const grad = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartH);
    grad.addColorStop(0, 'rgba(16, 185, 129, 0.25)');
    grad.addColorStop(1, 'rgba(16, 185, 129, 0)');
    ctx.lineTo(this.width - padding.right, padding.top + chartH);
    ctx.lineTo(padding.left, padding.top + chartH);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Pulse Current Active Point
    const currentX = this.width - padding.right;
    const currentY = padding.top + chartH - (this.params.telemetry.currentVal / 100) * chartH;
    const pulseRad = 6 + Math.sin(this.time * 5) * 3;

    ctx.strokeStyle = 'rgba(16, 185, 129, 0.6)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(currentX, currentY, pulseRad + 4, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = this.params.telemetry.currentVal > this.params.telemetry.threshold ? '#f43f5e' : '#10b981';
    ctx.beginPath();
    ctx.arc(currentX, currentY, 6, 0, Math.PI * 2);
    ctx.fill();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.analyticsHubInstance = new MovingAnalyticsHub();
});
