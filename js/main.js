/**
 * Portfolio — Main Application Controller
 * Navigation, data, interactions, and easter eggs
 */

(() => {
  'use strict';

  const CONTACT_EMAIL = 'pradipkprajapati27@gmail.com';

  /** UPI / Chai support — update these values anytime */
  const PAYMENT_CONFIG = {
    upiId: '980pk4456@oksbi',
    receiverName: 'Pradip Kumar Prajapati',
    defaultAmount: 100,
  };

  /** Social & contact links for support modal */
  const SOCIAL_LINKS = {
    github: 'https://github.com/pradipNP',
    linkedin: 'https://www.linkedin.com/in/pradipkprajapati',
    email: 'pradipkprajapati27@gmail.com',
  };

  let openModalCount = 0;

  function lockPageScroll() {
    if (openModalCount === 0) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      window.ParticleSystem?.setCursorTrailPaused?.(true);
    }
    openModalCount += 1;
  }

  function unlockPageScroll() {
    openModalCount = Math.max(0, openModalCount - 1);
    if (openModalCount === 0) {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      window.ParticleSystem?.setCursorTrailPaused?.(false);
    }
  }

  const SKILLS = [
    { name: 'HTML5', level: 95, category: 'frontend' },
    { name: 'CSS3', level: 92, category: 'frontend' },
    { name: 'JavaScript (ES6+)', level: 90, category: 'frontend' },
    { name: 'Vue.js', level: 80, category: 'frontend' },
    { name: 'Node.js', level: 90, category: 'backend' },
    { name: 'Express.js', level: 86, category: 'backend' },
    { name: 'REST APIs', level: 84, category: 'backend' },
    { name: 'PostgreSQL', level: 95, category: 'database' },
    { name: 'SQL', level: 95, category: 'database' },
    { name: 'Docker', level: 70, category: 'devops' },
    { name: 'AWS Cloud', level: 80, category: 'devops' },
    { name: 'Git', level: 92, category: 'tools' },
    { name: 'GitHub', level: 95, category: 'tools' },
    { name: 'VS Code', level: 98, category: 'tools' },
    { name: 'Ubuntu', level: 80, category: 'tools' },
    { name: 'Jupyter Notebook', level: 90, category: 'tools' },
    { name: 'Postman', level: 80, category: 'tools' },
    { name: 'PyCharm', level: 90, category: 'tools' },
    { name: 'Python', level: 95, category: 'data' },
    { name: 'Machine Learning', level: 80, category: 'data' },
    { name: 'Artificial Intelligence', level: 81, category: 'data' },
    { name: 'Data Analysis', level: 75, category: 'data' },
  ];

  const GITHUB_PROFILE = 'https://github.com/pradipNP';

  const PROJECTS = [
    {
      id: 1,
      title: 'Nepal Live Rates',
      description: 'Real-time Nepal financial and commodity rates — forex, gold, silver, fuel, LPG, and crude oil with charts and calculators.',
      category: 'major',
      categoryLabel: 'Self Project',
      image: 'assets/project/nlr.png',
      stack: ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'Express.js', 'Chart.js', 'Axios', 'Cloudflare Pages'],
      demo: 'https://nepal-live-rates.pages.dev/',
      github: 'https://github.com/pradipNP/nepal-live-rates',
      details: 'Nepal Live Rates is a modern web application delivering live financial and commodity market data for Nepal. It tracks forex (Nepal Rastra Bank), gold and silver prices, petrol, diesel, LPG, kerosene, aviation fuel, and global crude oil (WTI & Brent) with interactive charts, 7-day historical trends, unit calculators, area selection, and auto-refresh. Built with a vanilla JavaScript frontend and Node.js/Express backend scraping official sources (NRB, FENEGOSIDA, NOC Nepal), deployed on Cloudflare Pages with the API hosted on Render.',
    },
    {
      id: 2,
      title: 'Shova Creation Photography',
      description: 'Client wedding photography portfolio for Shova Creation — hero slider, dynamic gallery, blog, gear showcase, and EmailJS contact.',
      category: 'major',
      categoryLabel: 'Client Project',
      image: 'assets/project/sc.png',
      stack: ['HTML5', 'CSS3', 'JavaScript', 'EmailJS', 'Netlify', 'Google Maps'],
      demo: 'https://shovacreation.netlify.app/',
      github: 'https://github.com/pradipNP/shova-photography-website',
      details: 'Shova Creation Photography is a hand-coded static portfolio website built for a Nepal-based wedding and event photography business. Features include a full-screen hero slider, portfolio grid with lightbox viewer, dynamic gallery pages (wedding, events, custom categories), blog articles, services and FAQ sections, testimonial and gear carousels, animated stats counters, EmailJS-powered contact form, WhatsApp quick contact, Google Maps embed, and fully responsive layouts — deployed on Netlify.',
    },
    {
      id: 3,
      title: 'Agent Racchha',
      description: 'Open-source Windows computer-use AI agent — natural language desktop control with planning, UI perception, verification, and recovery.',
      category: 'major',
      categoryLabel: 'Self Project',
      image: 'assets/project/ar.png',
      stack: ['Python', 'FastAPI', 'React', 'TypeScript', 'Electron', 'Gemini API', 'UI Automation'],
      demo: 'https://github.com/pradipNP/agent-racchha',
      github: 'https://github.com/pradipNP/agent-racchha',
      details: 'Agent Racchha (Racchha AI) is an open-source Windows computer-use agent that understands natural language, observes the desktop via UI Automation, plans validated typed actions, controls applications, verifies results, and performs bounded recovery on failure. Built with Python/FastAPI backend, React/TypeScript/Electron frontend, Gemini API for structured intent resolution, Chrome DevTools Protocol for browser workflows, and speech input/TTS — following an Understand → Observe → Plan → Act → Verify → Recover architecture with safety allowlists and 300+ automated tests.',
    },
  ];

  const COMMANDS = [
    { label: 'Go to Home', action: () => scrollTo('#home'), shortcut: 'H' },
    { label: 'Go to About', action: () => scrollTo('#about'), shortcut: 'A' },
    { label: 'Go to Resume', action: () => scrollTo('#resume'), shortcut: 'R' },
    { label: 'Go to Portfolio', action: () => scrollTo('#portfolio'), shortcut: 'P' },
    { label: 'Go to Contact', action: () => scrollTo('#contact'), shortcut: 'C' },
    { label: 'Open Terminal', action: () => DevTerminal.open(), shortcut: 'T' },
    { label: 'View Resume', action: () => scrollTo('#resume'), shortcut: 'V' },
  ];

  const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
  let konamiIndex = 0;

  document.addEventListener('DOMContentLoaded', () => {
    initProfilePhoto();

    ParticleSystem.init(() => {
      PortfolioAnimations.init();
      PortfolioAnimations.initTypingEffect();

      const themeContent = document.getElementById('theme-panel-content');
      if (typeof gsap !== 'undefined' && themeContent) {
        gsap.set(themeContent, { clearProps: 'opacity,transform' });
      }
    });

    DevTerminal.init();
    initNavigation();
    initCustomCursor();
    initSkills();
    initPortfolio();
    initContactForm();
    initCommandPalette();
    initThemePanel();
    initResumeFilters();
    initKonamiCode();
    initLazyLoading();
    initProjectModal();
    initSupportChai();
  });

  /** Profile video with image and silhouette fallbacks */
  function initProfilePhoto() {
    const DBG = '[ProfileMedia]';
    const video = document.getElementById('hero-profile-video');
    const fallbackImg = document.getElementById('hero-profile-fallback');
    const wrap = document.querySelector('.hero__profile-wrap');
    const source = video?.querySelector('source');

    console.log(DBG, 'video element found:', !!video);
    console.log(DBG, 'video source found:', source?.getAttribute('src') || 'none');
    console.log(DBG, 'fallback image found:', !!fallbackImg);

    if (!wrap) {
      console.warn(DBG, 'profile wrap not found');
      return;
    }

    const showImageFallback = (reason) => {
      console.log(DBG, 'fallback image shown:', reason);
      if (video) {
        video.classList.add('hero__profile-media--hidden');
        video.pause();
      }
      wrap.classList.remove('hero__profile-wrap--fallback');
      wrap.classList.add('hero__profile-wrap--image-fallback');
      if (fallbackImg) {
        fallbackImg.hidden = false;
        fallbackImg.classList.remove('hero__profile-media--hidden');
      }
    };

    const showCanvasFallback = (reason) => {
      console.log(DBG, 'canvas fallback shown:', reason);
      if (video) {
        video.classList.add('hero__profile-media--hidden');
        video.pause();
      }
      if (fallbackImg) {
        fallbackImg.hidden = true;
        fallbackImg.classList.add('hero__profile-media--hidden');
      }
      wrap.classList.remove('hero__profile-wrap--image-fallback');
      wrap.classList.add('hero__profile-wrap--fallback');
      if (typeof ParticleSystem !== 'undefined' && ParticleSystem.initAvatar) {
        ParticleSystem.initAvatar();
      }
    };

    const showVideo = () => {
      wrap.classList.remove('hero__profile-wrap--image-fallback', 'hero__profile-wrap--fallback');
      if (fallbackImg) {
        fallbackImg.hidden = true;
        fallbackImg.classList.add('hero__profile-media--hidden');
      }
      if (video) {
        video.classList.remove('hero__profile-media--hidden');
      }
    };

    let lastKnownTime = 0;

    /** Freeze on last frame after intro plays once (mobile-safe seek) */
    const freezeOnLastFrame = () => {
      if (!video) return;

      video.loop = false;
      video.dataset.finished = 'true';

      const resolveTargetTime = () => {
        if (Number.isFinite(video.duration) && video.duration > 0) {
          return Math.max(0, video.duration - 0.08);
        }
        if (lastKnownTime > 0.1) return lastKnownTime;
        return null;
      };

      const holdFrame = () => {
        video.pause();
      };

      const seekAndHold = () => {
        const targetTime = resolveTargetTime();
        if (targetTime === null) return false;

        if (Math.abs(video.currentTime - targetTime) < 0.05) {
          holdFrame();
          return true;
        }

        const onSeeked = () => {
          video.removeEventListener('seeked', onSeeked);
          holdFrame();
        };

        video.addEventListener('seeked', onSeeked, { once: true });

        try {
          video.currentTime = targetTime;
        } catch {
          video.removeEventListener('seeked', onSeeked);
          holdFrame();
        }

        return true;
      };

      if (!seekAndHold()) {
        video.addEventListener('loadedmetadata', () => seekAndHold(), { once: true });
      }
    };

    const playVideo = () => {
      if (!video || video.classList.contains('hero__profile-media--hidden')) return;
      if (video.dataset.finished === 'true') {
        freezeOnLastFrame();
        return;
      }

      video.loop = false;
      video.muted = true;
      video.defaultMuted = true;
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');
      video.playsInline = true;

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          /* iOS may block until user gesture — loader click handler retries */
        });
      }
    };

    if (fallbackImg) {
      fallbackImg.addEventListener('error', () => showCanvasFallback('image load error'));
    }

    if (!video) return;

    video.loop = false;
    showVideo();

    video.addEventListener('ended', freezeOnLastFrame);

    video.addEventListener('timeupdate', () => {
      if (video.dataset.finished === 'true') return;
      if (video.currentTime > 0.05) {
        lastKnownTime = video.currentTime;
      }
      if (Number.isFinite(video.duration) && video.duration > 0 && video.currentTime >= video.duration - 0.12) {
        freezeOnLastFrame();
      }
    });

    video.addEventListener('loadeddata', () => {
      console.log(DBG, 'video loaded');
      showVideo();
      if (video.dataset.finished !== 'true') playVideo();
    });

    video.addEventListener('playing', () => {
      console.log(DBG, 'video playing event');
      showVideo();
    });

    video.addEventListener('error', () => {
      console.error(DBG, 'video error:', video.error?.message || 'unknown');
      showImageFallback('video load error');
    });

    source?.addEventListener('error', () => showImageFallback('source load error'));

    if (video.readyState >= 2 && video.dataset.finished !== 'true') {
      console.log(DBG, 'video readyState:', video.readyState);
      playVideo();
    }

    // Retry playback after boot loader finishes (intro only, not after end)
    const loader = document.getElementById('loader');
    if (loader) {
      const retryAfterLoader = () => {
        if (loader.classList.contains('hidden') && video.dataset.finished !== 'true') {
          playVideo();
        }
      };

      const loaderObserver = new MutationObserver(retryAfterLoader);
      loaderObserver.observe(loader, { attributes: true, attributeFilter: ['class'] });

      document.addEventListener('click', () => {
        if (video.dataset.finished !== 'true') playVideo();
      }, { once: true });
    }

    // Restore last frame when returning via browser back/forward cache
    window.addEventListener('pageshow', (event) => {
      if (video.dataset.finished === 'true') {
        freezeOnLastFrame();
      } else if (event.persisted) {
        playVideo();
      }
    });

    document.addEventListener('visibilitychange', () => {
      if (video.classList.contains('hero__profile-media--hidden')) return;
      if (video.dataset.finished === 'true') {
        freezeOnLastFrame();
        return;
      }
      if (document.hidden) video.pause();
      else playVideo();
    });
  }

  function initNavigation() {
    const nav = document.getElementById('nav');
    const navLinks = document.getElementById('nav-links');
    const toggle = document.getElementById('nav-toggle');
    const links = document.querySelectorAll('.nav__link');

    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
      updateActiveNavLink();
    }, { passive: true });

    toggle?.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
    });

    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        scrollTo(link.getAttribute('href'));
        navLinks.classList.remove('open');
        toggle?.classList.remove('open');
      });
    });

    updateActiveNavLink();
  }

  function scrollTo(selector) {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      closeCommandPalette();
    }
  }

  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav__link');
    let current = '';

    sections.forEach((section) => {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) current = section.getAttribute('id');
    });

    links.forEach((link) => {
      link.classList.toggle('active', link.dataset.section === current);
    });
  }

  function initCustomCursor() {
    if (window.matchMedia('(hover: none)').matches) return;

    const cursor = document.getElementById('cursor');
    const rocket = cursor?.querySelector('.cursor__rocket');
    const pulse = document.getElementById('cursor-pulse');
    if (!cursor || !rocket) return;

    let mouseX = 0;
    let mouseY = 0;
    let lastX = 0;
    let lastY = 0;
    let angle = -90;
    let cursorMode = 'default';

    const btnTargets = 'button, .btn, [data-magnetic]';
    const linkTargets = 'a, .nav__link, .social-link';
    const cardTargets = '.project-card, .glass-card, .skill-orb, .hero__profile-wrap';
    const pointerTargets = 'button, .btn, .nav__link, .social-link, .theme-panel__music, #music-toggle, .modal__close, .modal__actions a, .project-card__btn, .filter-btn, label';
    const textTargets = '#contact-name, #contact-email, #contact-subject, #contact-message, #chai-custom-amount';
    const textFieldIds = ['contact-name', 'contact-email', 'contact-subject', 'contact-message'];
    const rocketButtonTargets = '#contact-form button[type="submit"]';

    function isContactTextField(el) {
      return !!el && textFieldIds.includes(el.id);
    }

    function isOverContactTextField(target) {
      if (target?.closest?.(textTargets)) return true;

      const label = target?.closest?.('label[for]');
      return !!label && textFieldIds.includes(label.htmlFor);
    }

    function resolveCursorMode(target) {
      if (target?.closest?.(rocketButtonTargets)) {
        return 'default';
      }

      if (target?.closest?.(pointerTargets)) {
        return 'pointer';
      }

      if (isOverContactTextField(target)) {
        return 'text';
      }

      const active = document.activeElement;
      if (isContactTextField(active) && isOverContactTextField(target)) {
        return 'text';
      }

      return 'default';
    }

    function applyCursorMode(mode) {
      cursorMode = mode;
      cursor.classList.toggle('cursor--pointer', mode === 'pointer');
      cursor.classList.toggle('cursor--text', mode === 'text');
    }

    function updateCursorState(e) {
      const target = e?.target ?? document.elementFromPoint(mouseX, mouseY);
      applyCursorMode(resolveCursorMode(target));

      if (cursorMode !== 'default') {
        cursor.classList.remove('hover', 'hover-link', 'hover-card');
        return;
      }

      const onInteractive = target?.closest?.(`${btnTargets}, ${linkTargets}, ${cardTargets}`);
      const onLink = target?.closest?.(linkTargets);
      const onCard = target?.closest?.(cardTargets);

      cursor.classList.toggle('hover', !!onInteractive);
      cursor.classList.toggle('hover-link', !!onLink);
      cursor.classList.toggle('hover-card', !!onCard);
    }

    function updateCursorPosition(x, y) {
      const dx = x - lastX;
      const dy = y - lastY;
      const speed = Math.hypot(dx, dy);

      if (cursorMode === 'default' && speed > 0.4) {
        angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
        rocket.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
      }

      cursor.classList.toggle('moving', speed > 1.2 && cursorMode === 'default');
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;

      lastX = x;
      lastY = y;
    }

    function handlePointerMove(e) {
      if (e.pointerType === 'touch') return;

      mouseX = e.clientX;
      mouseY = e.clientY;
      updateCursorPosition(mouseX, mouseY);
      updateCursorState(e);
    }

    const moveEvent = window.PointerEvent ? 'pointermove' : 'mousemove';
    document.addEventListener(moveEvent, handlePointerMove, { passive: true, capture: true });

    document.addEventListener('pointerover', (e) => {
      if (e.pointerType === 'touch') return;
      updateCursorState(e);
    }, { capture: true });

    document.addEventListener('focusin', updateCursorState);
    document.addEventListener('focusout', () => {
      requestAnimationFrame(updateCursorState);
    });

    document.addEventListener('mousedown', () => {
      if (pulse) {
        pulse.classList.remove('active');
        void pulse.offsetWidth;
        pulse.classList.add('active');
      }
    });
  }

  function initSkills() {
    const section = document.getElementById('skills');
    const grid = document.getElementById('skills-grid');
    if (!section || !grid) return;

    function renderSkills(category = 'all') {
      const filtered = category === 'all'
        ? SKILLS
        : SKILLS.filter((skill) => skill.category === category);

      grid.innerHTML = filtered.map(
        (skill) => `
        <div class="skill-orb" data-category="${skill.category}" style="--progress: ${skill.level}%">
          <span class="skill-orb__name">${skill.name}</span>
          <span class="skill-orb__level">${skill.level}%</span>
        </div>
      `
      ).join('');

      if (typeof gsap !== 'undefined') {
        gsap.fromTo(
          grid.querySelectorAll('.skill-orb'),
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, duration: 0.35, stagger: 0.04, ease: 'back.out(1.4)' }
        );
      }
    }

    section.querySelectorAll('.skills__cat-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        section.querySelectorAll('.skills__cat-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        renderSkills(btn.dataset.category);
      });
    });

    renderSkills('all');
  }

  function initPortfolio() {
    renderProjects('major');

    document.querySelectorAll('.portfolio__filters .filter-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.portfolio__filters .filter-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        renderProjects(btn.dataset.filter);
      });
    });
  }

  function renderProjectImage(project) {
    if (project.image) {
      return `<img src="${project.image}" alt="${project.title} preview" class="project-card__thumb" loading="lazy">`;
    }
    return project.icon || '';
  }

  function renderProjects(filter) {
    const grid = document.getElementById('portfolio-grid');
    if (!grid) return;

    const filtered = filter === 'all' || filter === 'major'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter);

    grid.innerHTML = filtered.map((project) => `
      <article class="project-card" data-id="${project.id}" data-category="${project.category}">
        <div class="project-card__image">${renderProjectImage(project)}</div>
        <div class="project-card__body">
          <span class="project-card__category">${project.categoryLabel || project.category}</span>
          <h3 class="project-card__title">${project.title}</h3>
          <p class="project-card__desc">${project.description}</p>
          <div class="project-card__stack">
            ${project.stack.map((t) => `<span class="project-card__tag">${t}</span>`).join('')}
          </div>
          <div class="project-card__actions">
            <button class="project-card__btn project-card__btn--demo" data-action="demo" data-id="${project.id}">Live Demo</button>
            <button class="project-card__btn project-card__btn--github" data-action="github" data-id="${project.id}">GitHub</button>
            <button class="project-card__btn project-card__btn--details" data-action="details" data-id="${project.id}">Details</button>
          </div>
        </div>
      </article>
    `).join('');

    grid.querySelectorAll('[data-action]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(btn.dataset.id, 10);
        const project = PROJECTS.find((p) => p.id === id);
        if (!project) return;

        if (btn.dataset.action === 'details') openProjectModal(project);
        else if (btn.dataset.action === 'demo') {
          const url = project.demo && project.demo !== '#' ? project.demo : project.github;
          if (url && url !== '#') window.open(url, '_blank', 'noopener,noreferrer');
        } else if (btn.dataset.action === 'github' && project.github && project.github !== '#') {
          window.open(project.github, '_blank', 'noopener,noreferrer');
        }
      });
    });

    if (!window.matchMedia('(hover: none)').matches) {
      grid.querySelectorAll('.project-card').forEach((card) => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          card.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-8px)`;
        });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
      });
    }
  }

  function initProjectModal() {
    const modal = document.getElementById('project-modal');
    modal?.querySelector('.modal__close')?.addEventListener('click', closeProjectModal);
    modal?.querySelector('.modal__backdrop')?.addEventListener('click', closeProjectModal);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && !modal.hidden) closeProjectModal();
    });
  }

  function openProjectModal(project) {
    const modal = document.getElementById('project-modal');
    const body = document.getElementById('modal-body');
    if (!modal || !body) return;

    body.innerHTML = `
      ${project.image
        ? `<img src="${project.image}" alt="${project.title} preview" class="modal__project-image">`
        : `<div style="font-size: 3rem; margin-bottom: 16px;">${project.icon || ''}</div>`}
      <p class="modal__project-type">${project.categoryLabel || project.category}</p>
      <h3 id="modal-title">${project.title}</h3>
      <p>${project.details}</p>
      <div class="modal__tech-stack">
        ${project.stack.map((t) => `<span class="project-card__tag">${t}</span>`).join('')}
      </div>
      <div class="modal__actions">
        <a href="${project.demo && project.demo !== '#' ? project.demo : project.github}" class="btn btn--primary btn--sm" target="_blank" rel="noopener noreferrer">Live Demo →</a>
        <a href="${project.github}" class="btn btn--secondary btn--sm" target="_blank" rel="noopener noreferrer">View on GitHub</a>
      </div>
    `;

    modal.hidden = false;
    lockPageScroll();

    if (typeof gsap !== 'undefined') {
      gsap.from('.modal__content', { scale: 0.8, opacity: 0, duration: 0.4, ease: 'back.out(1.7)' });
    }
  }

  function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    if (!modal) return;
    modal.hidden = true;
    unlockPageScroll();
  }

  function initSupportChai() {
    const modal = document.getElementById('chai-modal');
    const openBtn = document.getElementById('chai-open-btn');
    const closeBtn = document.getElementById('chai-modal-close');
    const backdrop = modal?.querySelector('.chai-modal__backdrop');
    const tiers = document.querySelectorAll('.chai-tier');
    const customInput = document.getElementById('chai-custom-amount');
    const amountDisplay = document.getElementById('chai-selected-amount');
    const upiDisplay = document.getElementById('chai-upi-id');
    const receiverDisplay = document.getElementById('chai-receiver-name');
    const copyBtn = document.getElementById('chai-copy-upi');
    const copySuccess = document.getElementById('chai-copy-success');
    const qrCanvas = document.getElementById('chai-qr-canvas');
    const qrFrame = document.getElementById('chai-qr-frame');
    const qrError = document.getElementById('chai-qr-error');
    const paymentTerminal = document.getElementById('chai-payment-terminal');
    const githubStar = document.getElementById('chai-github-star');
    const githubFollow = document.getElementById('chai-github-follow');
    const focusPaymentBtn = document.getElementById('chai-focus-payment');
    const afterEmail = document.getElementById('chai-after-email');
    const afterLinkedin = document.getElementById('chai-after-linkedin');
    const afterGithub = document.getElementById('chai-after-github');
    const copyEmailBtn = document.getElementById('chai-copy-email');
    const emailCopySuccess = document.getElementById('chai-email-copy-success');

    if (!modal || !openBtn) return;

    let selectedAmount = PAYMENT_CONFIG.defaultAmount;
    let qrRenderTimer = null;

    if (upiDisplay) upiDisplay.textContent = PAYMENT_CONFIG.upiId;
    if (receiverDisplay) receiverDisplay.textContent = PAYMENT_CONFIG.receiverName;

    if (githubStar && SOCIAL_LINKS.github) {
      githubStar.href = `${SOCIAL_LINKS.github}?tab=repositories`;
    }
    if (githubFollow && SOCIAL_LINKS.github) {
      githubFollow.href = SOCIAL_LINKS.github;
    }
    if (afterEmail && SOCIAL_LINKS.email) {
      afterEmail.href = `mailto:${SOCIAL_LINKS.email}`;
    }
    if (afterLinkedin && SOCIAL_LINKS.linkedin) {
      afterLinkedin.href = SOCIAL_LINKS.linkedin;
    }
    if (afterGithub && SOCIAL_LINKS.github) {
      afterGithub.href = SOCIAL_LINKS.github;
    }

    function buildUpiPaymentUrl(amount) {
      const params = new URLSearchParams();
      params.set('pa', PAYMENT_CONFIG.upiId);
      params.set('pn', PAYMENT_CONFIG.receiverName);
      params.set('am', String(Math.max(1, Math.round(amount))));
      params.set('cu', 'INR');
      return `upi://pay?${params.toString()}`;
    }

    function formatAmount(amount) {
      return `₹${Math.max(1, Math.round(amount))}`;
    }

    function clearQrCanvas() {
      if (!qrCanvas) return;
      const ctx = qrCanvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, qrCanvas.width, qrCanvas.height);
      }
    }

    function showQrError(message = 'Unable to generate QR code') {
      if (qrError) {
        qrError.textContent = message;
        qrError.hidden = false;
      }
      if (qrCanvas) qrCanvas.hidden = true;
      qrFrame?.classList.remove('is-updating', 'is-revealed');
    }

    function hideQrError() {
      if (qrError) qrError.hidden = true;
      if (qrCanvas) qrCanvas.hidden = false;
    }

    async function renderUpiQr(amount) {
      console.log('QR container:', qrFrame);

      if (!qrCanvas) {
        console.error('[SupportChai] QR canvas element not found');
        showQrError('Unable to generate QR code');
        return;
      }

      if (typeof QRCode === 'undefined') {
        console.error('[SupportChai] QRCode is not defined — qrcode.js failed to load');
        showQrError('Unable to generate QR code');
        return;
      }

      const paymentUrl = buildUpiPaymentUrl(amount);
      console.log('UPI URL:', paymentUrl);

      hideQrError();
      clearQrCanvas();
      qrFrame?.classList.add('is-updating');
      qrFrame?.classList.remove('is-revealed');

      try {
        await QRCode.toCanvas(qrCanvas, paymentUrl, {
          width: 200,
          margin: 1,
          color: {
            dark: '#0a0a1a',
            light: '#ffffff',
          },
        });

        qrFrame?.classList.remove('is-updating');
        qrFrame?.classList.add('is-revealed');

        if (typeof gsap !== 'undefined' && qrFrame) {
          gsap.fromTo(qrFrame, { scale: 0.96, opacity: 0.85 }, { scale: 1, opacity: 1, duration: 0.35, ease: 'power2.out' });
        }
      } catch (err) {
        console.error('[SupportChai] QR generation failed:', err);
        clearQrCanvas();
        showQrError('Unable to generate QR code');
      }
    }

    if (typeof QRCode !== 'undefined') {
      console.log('QR library loaded');
    } else {
      console.error('[SupportChai] QRCode is not defined — check qrcode.js CDN / network');
    }

    function scheduleQrRender(amount) {
      clearTimeout(qrRenderTimer);
      qrRenderTimer = setTimeout(() => renderUpiQr(amount), customInput && document.activeElement === customInput ? 180 : 0);
    }

    function setAmount(amount, { animateTier = true, deferQr = false } = {}) {
      selectedAmount = Math.max(1, Math.round(Number(amount) || PAYMENT_CONFIG.defaultAmount));
      if (amountDisplay) {
        amountDisplay.textContent = formatAmount(selectedAmount);
        amountDisplay.classList.remove('is-pulse');
        void amountDisplay.offsetWidth;
        amountDisplay.classList.add('is-pulse');
      }

      tiers.forEach((tier) => {
        const isActive = Number(tier.dataset.amount) === selectedAmount;
        tier.classList.toggle('active', isActive);
        if (isActive && animateTier && typeof gsap !== 'undefined') {
          gsap.fromTo(tier, { scale: 0.96 }, { scale: 1, duration: 0.3, ease: 'back.out(2)' });
        }
      });

      if (customInput && document.activeElement !== customInput) {
        const preset = Array.from(tiers).some((t) => Number(t.dataset.amount) === selectedAmount);
        customInput.value = preset ? '' : String(selectedAmount);
      }

      if (deferQr) {
        clearTimeout(qrRenderTimer);
        qrRenderTimer = setTimeout(() => renderUpiQr(selectedAmount), 480);
      } else {
        scheduleQrRender(selectedAmount);
      }
    }

    async function copyText(text, { onSuccess, btn, successEl, defaultLabel = 'Copy' }) {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const fallback = document.createElement('textarea');
        fallback.value = text;
        document.body.appendChild(fallback);
        fallback.select();
        document.execCommand('copy');
        document.body.removeChild(fallback);
      }

      if (btn) {
        btn.classList.add('copied');
        btn.textContent = 'Copied!';
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.textContent = defaultLabel;
        }, 2200);
      }

      if (successEl) {
        successEl.hidden = false;
        setTimeout(() => { successEl.hidden = true; }, 2800);
      }

      onSuccess?.();
    }

    function openChaiModal() {
      modal.hidden = false;
      lockPageScroll();
      setAmount(PAYMENT_CONFIG.defaultAmount, { deferQr: true });

      if (typeof gsap !== 'undefined') {
        gsap.fromTo(modal.querySelector('.chai-modal__backdrop'), { opacity: 0 }, { opacity: 1, duration: 0.3 });
        gsap.fromTo(modal.querySelector('.chai-modal__panel'), { scale: 0.92, opacity: 0, y: 24 }, { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: 'back.out(1.4)' });
      }
    }

    function closeChaiModal() {
      modal.hidden = true;
      unlockPageScroll();
      if (copySuccess) copySuccess.hidden = true;
      if (emailCopySuccess) emailCopySuccess.hidden = true;
      if (copyBtn) copyBtn.classList.remove('copied');
      if (copyEmailBtn) copyEmailBtn.classList.remove('copied');
    }

    openBtn.addEventListener('click', openChaiModal);
    closeBtn?.addEventListener('click', closeChaiModal);
    backdrop?.addEventListener('click', closeChaiModal);

    tiers.forEach((tier) => {
      tier.addEventListener('click', () => {
        setAmount(Number(tier.dataset.amount));
        if (customInput) customInput.value = '';
      });
    });

    customInput?.addEventListener('input', () => {
      if (customInput.value) {
        tiers.forEach((t) => t.classList.remove('active'));
        setAmount(Number(customInput.value), { animateTier: false });
      }
    });

    customInput?.addEventListener('focus', () => {
      tiers.forEach((t) => t.classList.remove('active'));
    });

    copyBtn?.addEventListener('click', () => {
      copyText(PAYMENT_CONFIG.upiId, {
        btn: copyBtn,
        successEl: copySuccess,
        defaultLabel: 'Copy',
      });
    });

    copyEmailBtn?.addEventListener('click', () => {
      copyText(SOCIAL_LINKS.email, {
        btn: copyEmailBtn,
        successEl: emailCopySuccess,
        defaultLabel: 'Copy Email',
      });
    });

    focusPaymentBtn?.addEventListener('click', () => {
      paymentTerminal?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      tiers[0]?.focus?.();
      if (typeof gsap !== 'undefined' && paymentTerminal) {
        gsap.fromTo(paymentTerminal, { boxShadow: '0 0 0 rgba(0,240,255,0)' }, {
          boxShadow: '0 0 30px rgba(0,240,255,0.35)',
          duration: 0.4,
          yoyo: true,
          repeat: 1,
        });
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.hidden) closeChaiModal();
    });

    setAmount(PAYMENT_CONFIG.defaultAmount);
  }

  function setContactFormStatus(message, type = 'success') {
    const statusEl = document.getElementById('contact-form-status');
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.hidden = false;
    statusEl.classList.remove('form-status--success', 'form-status--error');
    statusEl.classList.add(type === 'error' ? 'form-status--error' : 'form-status--success');
  }

  function clearContactFormStatus() {
    const statusEl = document.getElementById('contact-form-status');
    if (!statusEl) return;
    statusEl.hidden = true;
    statusEl.textContent = '';
    statusEl.classList.remove('form-status--success', 'form-status--error');
  }

  async function sendContactEmail(data) {
    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_EMAIL)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        _replyto: data.email,
        _subject: `[Portfolio Contact] ${data.subject}`,
        _template: 'table',
      }),
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.success === false) {
      throw new Error(result.message || 'Unable to send message');
    }

    return result;
  }

  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const fields = {
      name: { el: document.getElementById('contact-name'), error: document.getElementById('name-error'), validate: (v) => v.trim().length >= 2 },
      email: { el: document.getElementById('contact-email'), error: document.getElementById('email-error'), validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
      subject: { el: document.getElementById('contact-subject'), error: document.getElementById('subject-error'), validate: (v) => v.trim().length >= 3 },
      message: { el: document.getElementById('contact-message'), error: document.getElementById('message-error'), validate: (v) => v.trim().length >= 10 },
    };

    Object.entries(fields).forEach(([key, field]) => {
      field.el?.addEventListener('input', () => {
        const valid = field.validate(field.el.value);
        field.el.classList.toggle('valid', valid && field.el.value.length > 0);
        field.el.classList.toggle('invalid', !valid && field.el.value.length > 0);
        field.error.textContent = '';
        clearContactFormStatus();
      });
      field.el?.addEventListener('blur', () => {
        if (field.el.value && !field.validate(field.el.value)) {
          field.error.textContent = getErrorMessage(key);
        }
      });
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearContactFormStatus();

      const honey = document.getElementById('contact-honey');
      if (honey?.value) return;

      let isValid = true;

      Object.entries(fields).forEach(([key, field]) => {
        if (!field.validate(field.el.value)) {
          field.el.classList.add('invalid');
          field.error.textContent = getErrorMessage(key);
          isValid = false;
        }
      });

      if (!isValid) return;

      const data = Object.fromEntries(new FormData(form));
      const btn = form.querySelector('button[type="submit"]');
      const btnText = btn?.querySelector('.btn__text');
      const originalText = btnText?.textContent || 'Transmit Message';

      if (btn) btn.disabled = true;
      if (btnText) btnText.textContent = 'Transmitting…';

      try {
        await sendContactEmail(data);
        if (btnText) btnText.textContent = 'Message Transmitted ✓';
        setContactFormStatus('Message sent! I will reply to your email soon.', 'success');
        setTimeout(() => clearContactFormStatus(), 4000);
        form.reset();
        Object.values(fields).forEach((f) => f.el.classList.remove('valid', 'invalid'));
        Object.values(fields).forEach((f) => { if (f.error) f.error.textContent = ''; });

        setTimeout(() => {
          if (btnText) btnText.textContent = originalText;
          if (btn) btn.disabled = false;
        }, 4000);
      } catch (err) {
        console.error('[ContactForm]', err);
        if (btnText) btnText.textContent = originalText;
        if (btn) btn.disabled = false;
        setContactFormStatus('Could not send message. Please email me directly at pradipkprajapati27@gmail.com', 'error');
      }
    });
  }

  function getErrorMessage(field) {
    return {
      name: 'Name must be at least 2 characters',
      email: 'Please enter a valid email address',
      subject: 'Subject must be at least 3 characters',
      message: 'Message must be at least 10 characters',
    }[field] || 'Invalid input';
  }

  function initCommandPalette() {
    const palette = document.getElementById('cmd-palette');
    const input = document.getElementById('cmd-input');
    const list = document.getElementById('cmd-list');
    const openBtn = document.getElementById('cmd-palette-btn');
    if (!palette || !input || !list) return;

    openBtn?.addEventListener('click', openCommandPalette);
    palette.querySelector('.cmd-palette__backdrop')?.addEventListener('click', closeCommandPalette);

    input.addEventListener('input', () => renderCommandList(input.value));
    input.addEventListener('keydown', (e) => {
      const items = list.querySelectorAll('.cmd-palette__item');
      const active = list.querySelector('.cmd-palette__item.active');
      let index = Array.from(items).indexOf(active);

      if (e.key === 'ArrowDown') { e.preventDefault(); setActiveItem(items, Math.min(index + 1, items.length - 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveItem(items, Math.max(index - 1, 0)); }
      else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = list.querySelector('.cmd-palette__item.active') || items[0];
        if (selected) COMMANDS[parseInt(selected.dataset.index, 10)]?.action();
      } else if (e.key === 'Escape') closeCommandPalette();
    });

    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        palette.hidden ? openCommandPalette() : closeCommandPalette();
      }
    });

    renderCommandList('');
  }

  function renderCommandList(query) {
    const list = document.getElementById('cmd-list');
    const filtered = COMMANDS.filter((cmd) => cmd.label.toLowerCase().includes(query.toLowerCase()));

    list.innerHTML = filtered.map((cmd, i) => {
      const originalIndex = COMMANDS.indexOf(cmd);
      return `<li class="cmd-palette__item ${i === 0 ? 'active' : ''}" data-index="${originalIndex}">${cmd.label}<span class="cmd-palette__shortcut">${cmd.shortcut || ''}</span></li>`;
    }).join('');

    list.querySelectorAll('.cmd-palette__item').forEach((item) => {
      item.addEventListener('click', () => COMMANDS[parseInt(item.dataset.index, 10)]?.action());
    });
  }

  function setActiveItem(items, index) {
    items.forEach((item, i) => item.classList.toggle('active', i === index));
  }

  function openCommandPalette() {
    document.getElementById('cmd-palette').hidden = false;
    const input = document.getElementById('cmd-input');
    input.value = '';
    renderCommandList('');
    setTimeout(() => input.focus(), 50);
  }

  function closeCommandPalette() {
    const palette = document.getElementById('cmd-palette');
    if (palette) palette.hidden = true;
  }

  function initThemePanel() {
    const panel = document.getElementById('theme-panel');
    const toggle = document.getElementById('theme-toggle');
    const content = document.getElementById('theme-panel-content');
    const colors = document.querySelectorAll('.theme-color');
    const musicToggle = document.getElementById('music-toggle');
    if (!panel || !toggle) return;

    const ACCENTS = ['cyan', 'magenta', 'green', 'orange', 'purple'];

    function setPanelOpen(isOpen) {
      panel.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
    }

    function applyAccent(color) {
      if (!ACCENTS.includes(color)) return;

      if (color === 'cyan') {
        document.documentElement.removeAttribute('data-accent');
      } else {
        document.documentElement.setAttribute('data-accent', color);
      }

      colors.forEach((btn) => btn.classList.toggle('active', btn.dataset.color === color));
      localStorage.setItem('portfolio-accent', color);
    }

    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      setPanelOpen(!panel.classList.contains('open'));
    });

    content?.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    colors.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        applyAccent(btn.dataset.color);
      });
    });

    musicToggle?.addEventListener('change', (e) => {
      e.stopPropagation();
      e.target.checked ? startAmbientSound() : stopAmbientSound();
    });

    document.addEventListener('click', (e) => {
      if (panel.contains(e.target)) return;
      setPanelOpen(false);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setPanelOpen(false);
    });

    const saved = localStorage.getItem('portfolio-accent');
    applyAccent(saved && ACCENTS.includes(saved) ? saved : 'cyan');

    if (typeof gsap !== 'undefined' && content) {
      gsap.set(content, { clearProps: 'opacity,transform' });
    }
  }

  let ambientCtx = null;
  let ambientOsc = null;

  function startAmbientSound() {
    try {
      ambientCtx = new (window.AudioContext || window.webkitAudioContext)();
      ambientOsc = ambientCtx.createOscillator();
      const gain = ambientCtx.createGain();
      ambientOsc.type = 'sine';
      ambientOsc.frequency.setValueAtTime(110, ambientCtx.currentTime);
      gain.gain.setValueAtTime(0.02, ambientCtx.currentTime);
      ambientOsc.connect(gain);
      gain.connect(ambientCtx.destination);
      ambientOsc.start();
    } catch (err) {
      console.warn('Ambient sound unavailable:', err);
    }
  }

  function stopAmbientSound() {
    ambientOsc?.stop();
    ambientOsc = null;
    ambientCtx?.close();
    ambientCtx = null;
  }

  function equalizeResumeHeights() {
    const expItems = [...document.querySelectorAll('.resume__items[data-category="experience"] .resume__item')];
    const eduItems = [...document.querySelectorAll('.resume__items[data-category="education"] .resume__item')];

    expItems.forEach((item) => { item.style.minHeight = ''; });
    eduItems.forEach((item) => { item.style.minHeight = ''; });

    if (window.innerWidth <= 768) return;

    expItems.forEach((item, index) => {
      const eduItem = eduItems[index];
      if (!eduItem || item.classList.contains('hidden') || eduItem.classList.contains('hidden')) return;
      const height = Math.max(item.offsetHeight, eduItem.offsetHeight);
      item.style.minHeight = `${height}px`;
      eduItem.style.minHeight = `${height}px`;
    });
  }

  function initResumeFilters() {
    document.querySelectorAll('.resume__controls .filter-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        document.querySelectorAll('.resume__controls .filter-btn').forEach((b) => {
          if (b.dataset.filter) b.classList.remove('active');
        });
        btn.classList.add('active');

        document.querySelectorAll('.resume__item').forEach((item) => {
          item.classList.toggle('hidden', filter !== 'all' && item.dataset.type !== filter);
        });

        requestAnimationFrame(equalizeResumeHeights);
      });
    });

    equalizeResumeHeights();
    window.addEventListener('resize', equalizeResumeHeights);
    window.addEventListener('load', equalizeResumeHeights);
  }

  function initKonamiCode() {
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const expected = KONAMI_CODE[konamiIndex];

      if (e.code === expected) {
        e.preventDefault();
        konamiIndex += 1;

        if (konamiIndex >= KONAMI_CODE.length) {
          konamiIndex = 0;
          triggerKonamiEffect();
        }
        return;
      }

      if (e.code === KONAMI_CODE[0]) {
        konamiIndex = 1;
        e.preventDefault();
        return;
      }

      konamiIndex = 0;
    }, { capture: true });
  }

  function triggerKonamiEffect() {
    const overlay = document.createElement('div');
    overlay.className = 'konami-overlay';
    document.body.appendChild(overlay);
    document.body.classList.add('glitch');

    if (typeof DevTerminal !== 'undefined') {
      DevTerminal.open();
      DevTerminal.printLine('🎮 KONAMI CODE ACTIVATED — ULTRA MODE ENABLED', 'success');
      DevTerminal.printLine('All systems operating at 200% capacity.', 'success');
    }

    setTimeout(() => {
      overlay.remove();
      document.body.classList.remove('glitch');
    }, 2000);
  }

  function initLazyLoading() {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '100px' }
    );

    document.querySelectorAll('.project-card, .skill-orb').forEach((el) => observer.observe(el));
  }
})();
