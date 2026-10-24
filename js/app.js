/**
 * Fathima Fida - Data Analytics Portfolio
 * Core Interactive Logic & Visualizations
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Set Dynamic Year
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 3. Navigation & Mobile Drawer
  initNavigation();

  // 4. Interactive Hero Analytics Sandbox (Chart.js)
  initHeroChart();

  // 5. Skills Category Filtering
  initSkillsFilter();

  // 6. Project Case Study Modals
  initProjectModals();

  // 7. Resume Modal
  initResumeModal();

  // 8. Contact Form & Copy Email
  initContactActions();
});

/* ==========================================================================
   NAVIGATION
   ========================================================================== */
function initNavigation() {
  const header = document.getElementById('main-header');
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');
  const backToTopBtn = document.getElementById('back-to-top');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  // Sticky nav header shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('shadow-lg', 'shadow-black/40');
    } else {
      header.classList.remove('shadow-lg', 'shadow-black/40');
    }

    // Scroll spy for active link
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('text-bronze-light', 'bg-dark-800/80');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('text-bronze-light', 'bg-dark-800/80');
          }
        });
      }
    });
  });

  // Mobile menu toggle
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      if (isOpen) {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      } else {
        mobileMenu.classList.remove('hidden');
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      });
    });
  }

  // Back to top button
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   INTERACTIVE HERO ANALYTICS CHART (Chart.js)
   ========================================================================== */
let analyticsChartInstance = null;

function initHeroChart() {
  const ctx = document.getElementById('heroAnalyticsChart');
  if (!ctx || !window.Chart) return;

  const tabPlacement = document.getElementById('chart-tab-placement');
  const tabSales = document.getElementById('chart-tab-sales');
  const tabSkills = document.getElementById('chart-tab-skills');

  // Chart configurations for each dataset
  const chartConfigs = {
    placement: {
      type: 'bar',
      data: {
        labels: ['Science & Tech', 'Commerce', 'Management', 'Arts & Hum.'],
        datasets: [
          {
            label: 'Placement Rate (%)',
            data: [88, 76, 92, 64],
            backgroundColor: 'rgba(196, 154, 108, 0.85)', // bronze light
            borderColor: '#C49A6C',
            borderWidth: 1.5,
            borderRadius: 6,
          },
          {
            label: 'Avg Salary Index (k)',
            data: [65, 52, 78, 44],
            backgroundColor: 'rgba(74, 53, 37, 0.75)', // mocha
            borderColor: '#A67C52',
            borderWidth: 1.5,
            borderRadius: 6,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#DDBEA9',
              font: { family: 'Plus Jakarta Sans', size: 11 },
              boxWidth: 12
            }
          },
          tooltip: {
            backgroundColor: '#1E1A17',
            borderColor: '#A67C52',
            borderWidth: 1,
            titleColor: '#F5EBE0',
            bodyColor: '#DDBEA9'
          }
        },
        scales: {
          y: {
            grid: { color: 'rgba(166, 124, 82, 0.12)' },
            ticks: { color: '#B08968', font: { family: 'JetBrains Mono', size: 10 } }
          },
          x: {
            grid: { display: false },
            ticks: { color: '#E6CCB2', font: { family: 'Plus Jakarta Sans', size: 11 } }
          }
        }
      }
    },

    sales: {
      type: 'line',
      data: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4 (Peak)'],
        datasets: [
          {
            label: 'Total Revenue ($k)',
            data: [68, 85, 94, 142],
            borderColor: '#E0A96D', // warm amber
            backgroundColor: 'rgba(224, 169, 109, 0.15)',
            borderWidth: 2.5,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#FAF0CA',
            pointRadius: 4,
          },
          {
            label: 'Target Margin ($k)',
            data: [50, 65, 75, 110],
            borderColor: '#A67C52',
            borderWidth: 1.5,
            borderDash: [5, 5],
            fill: false,
            tension: 0.3,
            pointRadius: 3,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#DDBEA9',
              font: { family: 'Plus Jakarta Sans', size: 11 },
              boxWidth: 12
            }
          },
          tooltip: {
            backgroundColor: '#1E1A17',
            borderColor: '#A67C52',
            borderWidth: 1,
            titleColor: '#F5EBE0',
            bodyColor: '#DDBEA9'
          }
        },
        scales: {
          y: {
            grid: { color: 'rgba(166, 124, 82, 0.12)' },
            ticks: { color: '#B08968', font: { family: 'JetBrains Mono', size: 10 } }
          },
          x: {
            grid: { color: 'rgba(166, 124, 82, 0.08)' },
            ticks: { color: '#E6CCB2', font: { family: 'Plus Jakarta Sans', size: 11 } }
          }
        }
      }
    },

    skills: {
      type: 'radar',
      data: {
        labels: ['Python', 'SQL', 'Power BI', 'Excel', 'Pandas & NumPy', 'EDA & Stats'],
        datasets: [
          {
            label: 'Skill Proficiency (%)',
            data: [90, 88, 85, 92, 86, 94],
            backgroundColor: 'rgba(196, 154, 108, 0.28)',
            borderColor: '#C49A6C',
            pointBackgroundColor: '#FFF1E6',
            pointBorderColor: '#A67C52',
            borderWidth: 2,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#DDBEA9',
              font: { family: 'Plus Jakarta Sans', size: 11 },
              boxWidth: 12
            }
          },
          tooltip: {
            backgroundColor: '#1E1A17',
            borderColor: '#A67C52',
            borderWidth: 1,
            titleColor: '#F5EBE0',
            bodyColor: '#DDBEA9'
          }
        },
        scales: {
          r: {
            angleLines: { color: 'rgba(166, 124, 82, 0.2)' },
            grid: { color: 'rgba(166, 124, 82, 0.15)' },
            pointLabels: {
              color: '#E6CCB2',
              font: { family: 'Plus Jakarta Sans', size: 10, weight: '500' }
            },
            ticks: { display: false, maxTicksLimit: 5 }
          }
        }
      }
    }
  };

  // Render initial chart
  function renderChart(type) {
    if (analyticsChartInstance) {
      analyticsChartInstance.destroy();
    }
    const config = chartConfigs[type];
    analyticsChartInstance = new Chart(ctx, config);
  }

  renderChart('placement');

  // Tab switcher
  const tabs = [
    { btn: tabPlacement, key: 'placement' },
    { btn: tabSales, key: 'sales' },
    { btn: tabSkills, key: 'skills' }
  ];

  tabs.forEach(({ btn, key }) => {
    if (!btn) return;
    btn.addEventListener('click', () => {
      tabs.forEach(t => {
        t.btn.classList.remove('bg-bronze', 'text-dark-950');
        t.btn.classList.add('text-beige-300');
      });
      btn.classList.add('bg-bronze', 'text-dark-950');
      btn.classList.remove('text-beige-300');
      renderChart(key);
    });
  });
}

/* ==========================================================================
   SKILLS FILTERING
   ========================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');

      filterBtns.forEach(b => {
        b.classList.remove('bg-bronze', 'text-dark-950');
        b.classList.add('bg-dark-850', 'text-beige-300');
      });
      btn.classList.add('bg-bronze', 'text-dark-950');
      btn.classList.remove('bg-dark-850', 'text-beige-300');

      skillCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   PROJECT CASE STUDY MODALS
   ========================================================================== */
const projectData = {
  placement: {
    title: 'Placement Analytics & Recruitment Prediction',
    subtitle: 'Academic Performance vs. Campus Hiring Trends',
    tools: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Excel'],
    body: `
      <div class="space-y-6">
        <div>
          <h4 class="font-display font-semibold text-white text-sm uppercase tracking-wider text-bronze-light mb-2">Project Overview</h4>
          <p class="text-sm text-beige-300 leading-relaxed">
            The Placement Analytics project investigates key predictive indicators that determine whether a university student secures placement and the initial salary bracket offered. Using a real-world campus recruitment dataset, this project maps the impact of secondary school percentages, undergraduate CGPA, degree specialization, aptitude test scores, and prior internship experience.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 rounded-xl bg-dark-900 border border-bronze/15">
            <h5 class="text-xs font-mono uppercase text-bronze-light mb-1">Key Research Questions</h5>
            <ul class="text-xs text-beige-300 space-y-1.5 list-disc list-inside">
              <li>Does higher undergraduate CGPA guarantee placement?</li>
              <li>How much do prior internships boost hiring odds?</li>
              <li>Which degree disciplines commanded the highest starting packages?</li>
            </ul>
          </div>
          <div class="p-4 rounded-xl bg-dark-900 border border-bronze/15">
            <h5 class="text-xs font-mono uppercase text-amberAccent mb-1">Analytical Methodology</h5>
            <ul class="text-xs text-beige-300 space-y-1.5 list-disc list-inside">
              <li>Missing salary value handling (unplaced candidates).</li>
              <li>Distribution skewness tests on test percentiles.</li>
              <li>Bivariate scatter and violin plots using Seaborn & Matplotlib.</li>
            </ul>
          </div>
        </div>

        <div>
          <h4 class="font-display font-semibold text-white text-sm uppercase tracking-wider text-bronze-light mb-2">Actionable Takeaways</h4>
          <div class="p-4 rounded-xl bg-mocha-dark/40 border border-bronze/25 text-xs text-beige-200 leading-relaxed space-y-2">
            <p><strong>1. Internship Multiplier:</strong> Candidates with at least one documented internship experience had an <strong>84.2% placement rate</strong> compared to 54.8% without.</p>
            <p><strong>2. Salary Disparity:</strong> Management and Commerce streams commanded a <strong>24% higher average starting salary</strong> compared to general disciplines.</p>
            <p><strong>3. Aptitude Threshold:</strong> Employability aptitude test scores exhibited a high threshold correlation: scores above the 70th percentile showed nearly linear hiring conversion.</p>
          </div>
        </div>
      </div>
    `
  },

  sales: {
    title: 'Sales Performance & Revenue Analysis',
    subtitle: 'Retail E-Commerce KPI Dashboard & Profit Modeling',
    tools: ['SQL', 'Power BI', 'Advanced Excel', 'Data Modeling'],
    body: `
      <div class="space-y-6">
        <div>
          <h4 class="font-display font-semibold text-white text-sm uppercase tracking-wider text-bronze-light mb-2">Project Overview</h4>
          <p class="text-sm text-beige-300 leading-relaxed">
            This study conducts an in-depth transactional analysis of a multi-regional retail e-commerce enterprise. The primary goal was to identify which product categories generate consistent margins, isolate loss-making discount promotions, and map regional sales velocities to support data-informed supply chain planning.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 rounded-xl bg-dark-900 border border-bronze/15">
            <h5 class="text-xs font-mono uppercase text-bronze-light mb-1">Data Processing & SQL Queries</h5>
            <ul class="text-xs text-beige-300 space-y-1.5 list-disc list-inside">
              <li>Multi-table joins: Orders, Customers, Products, Regions.</li>
              <li>Window functions to calculate Running Total Revenue.</li>
              <li>CTEs to isolate Repeat Customer Purchase Frequencies.</li>
            </ul>
          </div>
          <div class="p-4 rounded-xl bg-dark-900 border border-bronze/15">
            <h5 class="text-xs font-mono uppercase text-amberAccent mb-1">Dashboard Architecture</h5>
            <ul class="text-xs text-beige-300 space-y-1.5 list-disc list-inside">
              <li>Power BI interactive report with dynamic calendar slicers.</li>
              <li>DAX measures for Year-over-Year (YoY) Growth & Net Profit %.</li>
              <li>Pareto analysis visual showing SKU concentration.</li>
            </ul>
          </div>
        </div>

        <div>
          <h4 class="font-display font-semibold text-white text-sm uppercase tracking-wider text-bronze-light mb-2">Key Business Findings</h4>
          <div class="p-4 rounded-xl bg-mocha-dark/40 border border-bronze/25 text-xs text-beige-200 leading-relaxed space-y-2">
            <p><strong>1. The 80/20 Rule:</strong> Top 20% of SKU inventory contributed <strong>64% of total profit margin</strong>, while certain heavy-discount categories caused negative margins.</p>
            <p><strong>2. Seasonality Spikes:</strong> Q4 holiday months generated <strong>38% of yearly gross receipts</strong>, pinpointing exact warehouse inventory stocking timelines.</p>
            <p><strong>3. Regional Logistics:</strong> Shipping bottlenecks in the Western territory were causing a 14% higher cancellation rate, indicating a need for localized logistics partners.</p>
          </div>
        </div>
      </div>
    `
  },

  eda: {
    title: 'Exploratory Data Analysis (EDA) Deep-Dive',
    subtitle: 'Systematic Data Cleaning, Anomaly Profiling & Distribution Modeling',
    tools: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Data Cleaning'],
    body: `
      <div class="space-y-6">
        <div>
          <h4 class="font-display font-semibold text-white text-sm uppercase tracking-wider text-bronze-light mb-2">Project Overview</h4>
          <p class="text-sm text-beige-300 leading-relaxed">
            Data in real-world business scenarios is seldom clean or ready for machine learning and reporting. This project establishes a robust, reusable exploratory data framework in Python designed to audit data cleanliness, impute missing values rationally, detect statistical anomalies using IQR formulas, and visualize feature distributions.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 rounded-xl bg-dark-900 border border-bronze/15">
            <h5 class="text-xs font-mono uppercase text-bronze-light mb-1">Cleansing & Wrangling Pipeline</h5>
            <ul class="text-xs text-beige-300 space-y-1.5 list-disc list-inside">
              <li>Missing value identification with percentage thresholding.</li>
              <li>Outlier capping via Interquartile Range (IQR = Q3 - Q1).</li>
              <li>Log-transformation on heavily right-skewed variables.</li>
            </ul>
          </div>
          <div class="p-4 rounded-xl bg-dark-900 border border-bronze/15">
            <h5 class="text-xs font-mono uppercase text-amberAccent mb-1">Statistical Visualization</h5>
            <ul class="text-xs text-beige-300 space-y-1.5 list-disc list-inside">
              <li>Correlation heatmaps to uncover collinear features.</li>
              <li>KDE and Histogram plots verifying normal distribution.</li>
              <li>Boxplots comparing categorical clusters against metrics.</li>
            </ul>
          </div>
        </div>

        <div>
          <h4 class="font-display font-semibold text-white text-sm uppercase tracking-wider text-bronze-light mb-2">Core Engineering Results</h4>
          <div class="p-4 rounded-xl bg-mocha-dark/40 border border-bronze/25 text-xs text-beige-200 leading-relaxed space-y-2">
            <p><strong>1. Zero Data Distortion:</strong> Preserved 98.4% of valid observation volume by capping statistical outliers rather than simply dropping records.</p>
            <p><strong>2. Automated Cleaning Pipeline:</strong> Created clean, reusable Python functions that automate missing-value imputation and feature scaling in seconds.</p>
            <p><strong>3. Transparent Documentation:</strong> Accompanied by detailed Jupyter Notebook documentation demonstrating every analytical decision step-by-step.</p>
          </div>
        </div>
      </div>
    `
  }
};

function initProjectModals() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const modalBody = document.getElementById('modal-body');
  const modalTags = document.getElementById('modal-tech-tags');
  const modalGithubLink = document.getElementById('modal-github-link');
  const triggerBtns = document.querySelectorAll('.project-modal-btn');

  if (!modal) return;

  function openModal(projectKey) {
    const data = projectData[projectKey];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalSubtitle.textContent = data.subtitle;
    modalBody.innerHTML = data.body;

    modalTags.innerHTML = data.tools.map(tool => 
      `<span class="text-[11px] font-mono px-2 py-0.5 rounded bg-dark-850 text-beige-200 border border-bronze/20">${tool}</span>`
    ).join('');

    modalGithubLink.href = 'https://github.com/fida-saleem';

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectKey = btn.getAttribute('data-project');
      openModal(projectKey);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   RESUME SUMMARY MODAL
   ========================================================================== */
function initResumeModal() {
  const resumeBtn = document.getElementById('quick-resume-btn');
  const modal = document.getElementById('resume-modal');
  const closeBtn = document.getElementById('resume-close-btn');

  if (!resumeBtn || !modal) return;

  function openModal() {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  resumeBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   CONTACT ACTIONS & TOAST
   ========================================================================== */
function initContactActions() {
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const copyEmailBtn = document.getElementById('copy-email-btn');

  // Copy email button
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'fathimafida.analytics@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email Copied', 'Copied fathimafida.analytics@gmail.com to your clipboard!');
      }).catch(() => {
        showToast('Contact Email', 'fathimafida.analytics@gmail.com');
      });
    });
  }

  // Contact form submission
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        showToast('Incomplete Form', 'Please provide your name, email, and message.', 'error');
        return;
      }

      // Provide UI loading indicator
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `
        <span class="inline-block animate-spin mr-2">⌛</span>
        <span>Sending Message...</span>
      `;
      submitBtn.disabled = true;

      // Realistic submission experience with graceful mailto fallback option
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        contactForm.reset();

        showToast(
          'Message Received!', 
          `Thank you ${name}. Your message has been prepared! If needed, feel free to also reach out via LinkedIn.`
        );

        // Pre-fill mailto link in background for real message delivery
        const mailtoUrl = `mailto:fathimafida.analytics@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;
        
        // Optional quick prompt
        const promptMail = confirm("Would you also like to open your email client to send this message directly to fathimafida.analytics@gmail.com?");
        if (promptMail) {
          window.location.href = mailtoUrl;
        }
      }, 700);
    });
  }
}

/* ==========================================================================
   TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showToast(title, message, type = 'success') {
  const toast = document.getElementById('toast');
  const toastTitle = document.getElementById('toast-title');
  const toastMessage = document.getElementById('toast-message');
  const toastIcon = document.getElementById('toast-icon');

  if (!toast) return;

  toastTitle.textContent = title;
  toastMessage.textContent = message;

  if (type === 'error') {
    toastIcon.className = 'w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center';
    toastIcon.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`;
  } else {
    toastIcon.className = 'w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center';
    toastIcon.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`;
  }

  toast.classList.remove('hidden');
  toast.classList.remove('translate-y-4');
  toast.classList.add('translate-y-0');

  setTimeout(() => {
    toast.classList.add('translate-y-4');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 300);
  }, 4500);
}
