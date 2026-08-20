/**
 * Portfolio — GSAP Animations & ScrollTrigger
 * Content stays visible in DOM; scroll animations enhance only.
 */

const PortfolioAnimations = (() => {
  /** Shared scroll reveal — does not hide content before scroll */
  function scrollReveal(targets, vars, triggerOptions = {}) {
    if (!targets || (targets.length !== undefined && !targets.length)) return;

    gsap.from(targets, {
      ...vars,
      immediateRender: false,
      scrollTrigger: {
        toggleActions: 'play none none none',
        ...triggerOptions,
      },
    });
  }

  function init() {
    if (typeof gsap === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    initHeroAnimations();
    initScrollReveals();
    initTimelineAnimations();
    initCounterAnimations();
    initParallax();
    initMagneticButtons();
    initRadarChart();
  }

  function initHeroAnimations() {
    const heroName = document.querySelector('.hero__name');
    const tl = gsap.timeline({ delay: 0.5 });

    tl.from('.hero__greeting', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out',
    });

    if (heroName) {
      tl.from(heroName.querySelectorAll('.hero__name-line'), {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.9,
        ease: 'power4.out',
      }, '-=0.4');
    }

    tl.from('.hero__typing', {
      opacity: 0,
      x: -20,
      duration: 0.6,
    }, '-=0.5')
    .from('.hero__tagline', {
      opacity: 0,
      y: 16,
      duration: 0.8,
    }, '-=0.3')
    .from('.hero__buttons .btn', {
      opacity: 0,
      y: 20,
      stagger: 0.15,
      duration: 0.6,
    }, '-=0.4')
    .from('.stat', {
      opacity: 0,
      scale: 0.9,
      stagger: 0.1,
      duration: 0.5,
    }, '-=0.3')
    .from('.tech-icon', {
      opacity: 0,
      y: 16,
      stagger: 0.08,
      duration: 0.4,
    }, '-=0.2');
  }

  function initScrollReveals() {
    gsap.utils.toArray('.section__header').forEach((header) => {
      scrollReveal(header.children, {
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power3.out',
      }, {
        trigger: header,
        start: 'top 85%',
      });
    });

    gsap.utils.toArray('.glass-card:not(.timeline__content):not(.theme-panel__content)').forEach((card, i) => {
      scrollReveal(card, {
        opacity: 0,
        y: 40,
        duration: 0.55,
        delay: (i % 4) * 0.08,
        ease: 'power2.out',
      }, {
        trigger: card,
        start: 'top 90%',
      });
    });

    gsap.utils.toArray('.project-card').forEach((card, i) => {
      scrollReveal(card, {
        opacity: 0,
        y: 50,
        duration: 0.65,
        delay: (i % 3) * 0.12,
        ease: 'power3.out',
      }, {
        trigger: card,
        start: 'top 92%',
      });
    });

    gsap.utils.toArray('.skill-orb').forEach((orb, i) => {
      scrollReveal(orb, {
        opacity: 0,
        scale: 0.85,
        duration: 0.45,
        delay: (i % 6) * 0.06,
        ease: 'back.out(1.4)',
      }, {
        trigger: orb,
        start: 'top 92%',
      });
    });
  }

  function initTimelineAnimations() {
    const items = document.querySelectorAll('.timeline__item');

    items.forEach((item) => item.classList.add('visible'));

    items.forEach((item, i) => {
      const content = item.querySelector('.timeline__content');
      if (!content) return;

      scrollReveal(content, {
        x: i % 2 === 0 ? -30 : 30,
        duration: 0.7,
        ease: 'power3.out',
        clearProps: 'transform',
      }, {
        trigger: item,
        start: 'top 85%',
      });
    });
  }

  function initCounterAnimations() {
    const counters = document.querySelectorAll('[data-count]');

    counters.forEach((counter) => {
      if (counter.classList.contains('achievement__number--static')) return;

      const target = parseInt(counter.dataset.count, 10);
      if (Number.isNaN(target)) return;

      const suffix = counter.dataset.suffix || '';
      const numberEl = counter.classList.contains('achievement__number') || counter.classList.contains('stat__number')
        ? counter
        : counter.querySelector('.stat__number, .achievement__number');
      const triggerEl = counter.closest('.achievement, .stat') || counter;

      if (!numberEl) return;

      ScrollTrigger.create({
        trigger: triggerEl,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.to({ val: 0 }, {
            val: target,
            duration: 2,
            ease: 'power2.out',
            onUpdate: function () {
              numberEl.textContent = `${Math.floor(this.targets()[0].val).toLocaleString()}${suffix}`;
            },
          });
        },
      });
    });
  }

  function initParallax() {
    if (window.matchMedia('(max-width: 768px)').matches) return;

    gsap.to('.hero__planet', {
      scrollTrigger: {
        trigger: '.section--hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
      y: 120,
      opacity: 0,
    });

    gsap.to('.code-snippet', {
      scrollTrigger: {
        trigger: '.code-snippets',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
      y: -40,
    });
  }

  function initMagneticButtons() {
    if (window.matchMedia('(hover: none)').matches) return;

    document.querySelectorAll('[data-magnetic]').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
          x: x * 0.25,
          y: y * 0.25,
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
        });
      });
    });
  }

  function initTextSplitting() {
    /* Hero title uses two .hero__name-line elements — animated in initHeroAnimations */
  }

  function initRadarChart() {
    const canvas = document.getElementById('radar-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 150;

    const labels = ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Data & AI'];
    const values = [0.89, 0.87, 0.95, 0.75, 0.89, 0.83];
    const numPoints = labels.length;

    let animatedValues = new Array(numPoints).fill(0);

    ScrollTrigger.create({
      trigger: canvas,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        const proxy = { progress: 0 };
        gsap.to(proxy, {
          progress: 1,
          duration: 1.5,
          ease: 'power2.out',
          onUpdate: () => {
            values.forEach((val, i) => {
              animatedValues[i] = val * proxy.progress;
            });
            drawRadar();
          },
        });
      },
    });

    function drawRadar() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let ring = 1; ring <= 4; ring++) {
        ctx.beginPath();
        for (let i = 0; i <= numPoints; i++) {
          const angle = (i / numPoints) * Math.PI * 2 - Math.PI / 2;
          const r = (radius / 4) * ring;
          const x = centerX + Math.cos(angle) * r;
          const y = centerY + Math.sin(angle) * r;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
        ctx.stroke();
      }

      for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2 - Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + Math.cos(angle) * radius,
          centerY + Math.sin(angle) * radius
        );
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.1)';
        ctx.stroke();

        const labelX = centerX + Math.cos(angle) * (radius + 25);
        const labelY = centerY + Math.sin(angle) * (radius + 25);
        ctx.font = '12px Rajdhani, sans-serif';
        ctx.fillStyle = '#8888aa';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(labels[i], labelX, labelY);
      }

      ctx.beginPath();
      for (let i = 0; i <= numPoints; i++) {
        const idx = i % numPoints;
        const angle = (idx / numPoints) * Math.PI * 2 - Math.PI / 2;
        const r = radius * animatedValues[idx];
        const x = centerX + Math.cos(angle) * r;
        const y = centerY + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fillStyle = 'rgba(0, 240, 255, 0.2)';
      ctx.fill();
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 2;
      ctx.stroke();

      for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2 - Math.PI / 2;
        const r = radius * animatedValues[i];
        const x = centerX + Math.cos(angle) * r;
        const y = centerY + Math.sin(angle) * r;

        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#00f0ff';
        ctx.fill();
      }
    }

    drawRadar();
  }

  function initTypingEffect() {
    const typingEl = document.getElementById('typing-text');
    if (!typingEl) return;

    const phrases = [
      'FULL STACK DEVELOPER',
      'PYTHON · JAVASCRIPT · SQL · HTML5 · CSS3',
      'NODE.JS · EXPRESS · VUE.JS · REST APIs',
      'POSTGRESQL · DOCKER · AWS · POSTMAN · PYCHARM',
      'ML · AI · DATA ANALYSIS · JUPYTER NOTEBOOK',
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const current = phrases[phraseIndex];

      if (isDeleting) {
        typingEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = isDeleting ? 40 : 80;

      if (!isDeleting && charIndex === current.length) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 500;
      }

      setTimeout(type, speed);
    }

    setTimeout(type, 2000);
  }

  return { init, initTypingEffect };
})();

if (typeof window !== 'undefined') {
  window.PortfolioAnimations = PortfolioAnimations;
}
