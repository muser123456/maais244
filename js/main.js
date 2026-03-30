    'use strict';

    /* Eventos — animação de entrada escalonada */
    (function() {
      const cards = document.querySelectorAll('.evento-anim');
      if (!cards.length || !window.IntersectionObserver) {
        cards.forEach(c => c.classList.add('visible'));
        return;
      }
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
        });
      }, { threshold: 0.15 });
      cards.forEach(c => io.observe(c));
    })();

    /* Angola — slider de fundo */
    (function() {
      const slides = document.querySelectorAll('.angola-slide');
      if (!slides.length) return;
      let current = 0;
      setInterval(() => {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
      }, 5000);
    })();

    /* Angola — counter animado */
    (function() {
      const cards = document.querySelectorAll('.angola-stat-num');
      if (!cards.length) return;
      let animated = false;

      function animateCounters() {
        if (animated) return;
        animated = true;
        cards.forEach(el => {
          const target = parseInt(el.dataset.target, 10);
          const duration = 1800;
          const step = target / (duration / 16);
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= target) { current = target; clearInterval(timer); }
            el.textContent = Math.floor(current);
          }, 16);
        });
      }

      const section = document.getElementById('angola');
      if (!section || !window.IntersectionObserver) { animateCounters(); return; }
      const io = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) { animateCounters(); io.disconnect(); }
      }, { threshold: 0.3 });
      io.observe(section);
    })();

    /* Hero slider */
    (function() {
      const INTERVAL = 5000;
      const slides   = document.querySelectorAll('.hero-slide');
      const contents = document.querySelectorAll('.hero-slide-content');
      const dots     = document.querySelectorAll('.hero-dot');
      if (!slides.length) return;
      let current = 0, timer;

      function goTo(i) {
        slides[current].classList.remove('active');
        contents[current].classList.remove('active');
        dots[current].classList.remove('active');
        current = (i + slides.length) % slides.length;
        slides[current].classList.add('active');
        contents[current].classList.add('active');
        dots[current].classList.add('active');
      }

      function start() {
        clearInterval(timer);
        timer = setInterval(() => goTo(current + 1), INTERVAL);
      }

      dots.forEach((d, i) => d.addEventListener('click', () => { goTo(i); start(); }));
      start();
    })();

    /* Sticky header */
    (function() {
      const header = document.getElementById('header');
      if (!header) return;
      const update = () => header.classList.toggle('scrolled', window.scrollY > 48);
      window.addEventListener('scroll', update, { passive: true });
      update();
    })();

    /* Back to top */
    (function() {
      const btn = document.getElementById('backTop');
      if (!btn) return;
      window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400), { passive: true });
      btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    })();

    /* Mobile hamburger */
    (function() {
      const btn = document.getElementById('hamburger');
      const menu = document.getElementById('mobileMenu');
      if (!btn || !menu) return;
      const toggle = open => {
        btn.classList.toggle('open', open);
        menu.classList.toggle('open', open);
        btn.setAttribute('aria-expanded', String(open));
        menu.setAttribute('aria-hidden', String(!open));
      };
      btn.addEventListener('click', () => toggle(!btn.classList.contains('open')));
      menu.querySelectorAll('.mobile-nav-link').forEach(l => l.addEventListener('click', () => toggle(false)));
    })();

    /* Scroll reveal */
    (function() {
      const els = document.querySelectorAll('.reveal');
      if (!els.length || !window.IntersectionObserver) {
        els.forEach(el => el.classList.add('visible'));
        return;
      }
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
      }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });
      els.forEach(el => io.observe(el));
    })();

    /* Active nav on scroll */
    (function() {
      const sections = document.querySelectorAll('section[id]');
      const links = document.querySelectorAll('.nav-link');
      const update = () => {
        let active = '';
        sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) active = s.id; });
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + active));
      };
      window.addEventListener('scroll', update, { passive: true });
      update();
    })();

    /* Testimonials slider */
    (function() {
      const inner = document.getElementById('sliderInner');
      const dots = document.querySelectorAll('.slider-dot');
      const prev = document.getElementById('prevSlide');
      const next = document.getElementById('nextSlide');
      if (!inner) return;
      const total = inner.children.length;
      let cur = 0, timer;
      const goTo = i => {
        cur = (i + total) % total;
        inner.style.transform = `translateX(-${cur * 100}%)`;
        dots.forEach((d, idx) => { d.classList.toggle('active', idx === cur); d.setAttribute('aria-selected', String(idx === cur)); });
      };
      const startAuto = () => { clearInterval(timer); timer = setInterval(() => goTo(cur + 1), 5500); };
      if (prev) prev.addEventListener('click', () => { goTo(cur - 1); startAuto(); });
      if (next) next.addEventListener('click', () => { goTo(cur + 1); startAuto(); });
      dots.forEach((d, i) => d.addEventListener('click', () => { goTo(i); startAuto(); }));
      goTo(0); startAuto();
    })();

    /* Smooth anchors */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', function(e) {
        const t = document.querySelector(this.getAttribute('href'));
        if (!t) return;
        e.preventDefault();
        t.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    /* Form feedback */
    (function() {
      const form = document.querySelector('form[aria-label="Formulário de agendamento"]');
      if (!form) return;
      const submit = form.querySelector('.form-submit');
      form.addEventListener('submit', e => {
        e.preventDefault();
        if (submit) {
          submit.disabled = true;
        }
      });
    })();
