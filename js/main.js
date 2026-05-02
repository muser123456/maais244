    'use strict';

    /* ── Serviços — Tab-panel com animação suave ── */
    (function () {
      var tabs   = Array.prototype.slice.call(document.querySelectorAll('.svc-tab'));
      var panels = Array.prototype.slice.call(document.querySelectorAll('.svc-panel'));
      if (!tabs.length || !panels.length) return;

      function staggerPanel(panel) {
        var items = panel.querySelectorAll('.svc-list li');
        items.forEach(function (el, j) {
          el.style.opacity = '0';
          el.style.transform = 'translateX(-8px)';
          el.style.transition = 'none';
          setTimeout(function () {
            el.style.transition = 'opacity 320ms ease, transform 320ms ease';
            el.style.opacity = '1';
            el.style.transform = 'none';
          }, 120 + j * 45);
        });
        var cards = panel.querySelectorAll('.svc-pkg, .svc-format-card');
        cards.forEach(function (el, j) {
          el.style.opacity = '0';
          el.style.transform = 'translateY(8px)';
          el.style.transition = 'none';
          setTimeout(function () {
            el.style.transition = 'opacity 300ms ease, transform 300ms ease';
            el.style.opacity = '1';
            el.style.transform = 'none';
          }, 140 + j * 60);
        });
        var stats = panel.querySelectorAll('.svc-stat-val');
        stats.forEach(function (el, j) {
          el.style.opacity = '0';
          el.style.transform = 'translateY(10px)';
          el.style.transition = 'none';
          setTimeout(function () {
            el.style.transition = 'opacity 400ms cubic-bezier(.22,.68,0,1.1), transform 400ms cubic-bezier(.22,.68,0,1.1)';
            el.style.opacity = '1';
            el.style.transform = 'none';
          }, 100 + j * 80);
        });
        var extras = panel.querySelectorAll('.svc-stat-note, .svc-cta');
        extras.forEach(function (el, j) {
          el.style.opacity = '0';
          el.style.transition = 'none';
          setTimeout(function () {
            el.style.transition = 'opacity 360ms ease';
            el.style.opacity = '1';
          }, 280 + j * 60);
        });
      }

      function activate(idx) {
        tabs.forEach(function (t, i) {
          var active = (i === idx);
          t.setAttribute('aria-selected', active ? 'true' : 'false');
          t.classList.toggle('svc-tab--active', active);
        });
        panels.forEach(function (p, i) {
          if (i === idx) {
            p.style.display = 'block';
            p.style.animation = 'none';
            void p.offsetWidth;
            p.style.animation = '';
            p.classList.add('svc-panel--active');
            staggerPanel(p);
          } else {
            p.classList.remove('svc-panel--active');
            p.style.display = 'none';
          }
        });
      }

      tabs.forEach(function (tab, i) {
        tab.addEventListener('click', function () { activate(i); });
        tab.addEventListener('keydown', function (e) {
          if (e.key === 'ArrowRight') { activate((i + 1) % tabs.length); tabs[(i + 1) % tabs.length].focus(); }
          if (e.key === 'ArrowLeft')  { var p = (i - 1 + tabs.length) % tabs.length; activate(p); tabs[p].focus(); }
        });
      });

      activate(0);
    })();

    /* Eventos */
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

    /* Angola slider */
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

    /* Angola counter */
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
      }, { threshold: 0.15 });
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
        inner.style.transform = 'translateX(-' + (cur * 100) + '%)';
        dots.forEach((d, idx) => { d.classList.toggle('active', idx === cur); d.setAttribute('aria-selected', String(idx === cur)); });
      };
      const startAuto = () => { clearInterval(timer); timer = setInterval(() => goTo(cur + 1), 5500); };
      if (prev) prev.addEventListener('click', () => { goTo(cur - 1); startAuto(); });
      if (next) next.addEventListener('click', () => { goTo(cur + 1); startAuto(); });
      dots.forEach((d, i) => d.addEventListener('click', () => { goTo(i); startAuto(); }));
      goTo(0); startAuto();
    })();

    /* Portfolio reveal */
    (function () {
      var items = document.querySelectorAll('.pf-item');
      if (!items.length) return;
      if (!window.IntersectionObserver) {
        items.forEach(function (el) { el.classList.add('pf-visible'); });
        return;
      }
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('pf-visible'); io.unobserve(e.target); }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
      items.forEach(function (el) { io.observe(el); });
    })();

    /* Parceiros scroll */
    (function () {
      var track = document.querySelector('.parceiros-track');
      if (!track) return;
      if (!window.IntersectionObserver) { track.classList.add('parceiros-running'); return; }
      var section = document.getElementById('parceiros');
      var started = false;
      var io = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting && !started) {
          started = true;
          track.classList.add('parceiros-running');
          io.disconnect();
        }
      }, { threshold: 0.3 });
      io.observe(section || track);
    })();

    /* Parceiros cor */
    (function () {
      const wrap = document.querySelector('.parceiros-track-wrap');
      const imgs = document.querySelectorAll('.parceiro-img');
      if (!wrap || !imgs.length) return;
      const wrapW  = wrap.getBoundingClientRect().width;
      const centerX = wrapW / 2;
      const liveZone = wrapW * 0.28;
      const fadeZone = wrapW * 0.22;
      function tick() {
        imgs.forEach(img => {
          const rect = img.getBoundingClientRect();
          const wrapRect = wrap.getBoundingClientRect();
          const imgCX = rect.left - wrapRect.left + rect.width / 2;
          const dist  = Math.abs(imgCX - centerX);
          let t;
          if (dist <= liveZone) { t = 0; }
          else if (dist <= liveZone + fadeZone) { t = (dist - liveZone) / fadeZone; }
          else { t = 1; }
          const grayscale  = Math.round(t * 100);
          const brightness = 1 - t * 0.3;
          const opacity    = 1 - t * 0.55;
          img.style.filter  = 'grayscale(' + grayscale + '%) brightness(' + brightness + ')';
          img.style.opacity = opacity;
        });
        requestAnimationFrame(tick);
      }
      tick();
    })();

    /* MVV toggle */
    (function() {
      document.querySelectorAll('.mvv-item').forEach(item => {
        item.addEventListener('click', () => {
          const isOpen = item.classList.contains('open');
          document.querySelectorAll('.mvv-item').forEach(i => i.classList.remove('open'));
          if (!isOpen) item.classList.add('open');
        });
      });
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

    /* ================================================================
       FORMULÁRIO DE AGENDAMENTO — Web3Forms
       ================================================================
       CONFIGURAÇÃO (30 segundos, 1 passo):
         1. Aceda a https://web3forms.com
         2. Coloque o email: micael.luvumbu.mais244@gmail.com
         3. Clique "Create Access Key"
         4. Confirme o email que recebe → copie a Access Key
         5. Substitua 'SUA_ACCESS_KEY_AQUI' abaixo pela chave
         Gratuito: 250 submissoes/mes. Sem conta nem cartao.
    ================================================================ */
    (function () {
      var W3F_KEY = 'SUA_ACCESS_KEY_AQUI'; /* <-- substitua aqui */

      var form       = document.getElementById('agendamento-form');
      var submitBtn  = document.getElementById('form-submit-btn');
      var btnText    = document.getElementById('btn-text');
      var btnLoading = document.getElementById('btn-loading');
      var errorMsg   = document.getElementById('form-error-msg');
      var successBox = document.getElementById('form-success');
      var sendErrBox = document.getElementById('form-send-error');

      if (!form) return;

      form.addEventListener('submit', function (e) {
        e.preventDefault();

        var nome    = form.querySelector('#form-nome').value.trim();
        var email   = form.querySelector('#form-email').value.trim();
        var servico = form.querySelector('#form-servico').value;

        if (!nome || !email || !servico) {
          errorMsg.style.display = 'block';
          if (!nome)       form.querySelector('#form-nome').focus();
          else if (!email) form.querySelector('#form-email').focus();
          else             form.querySelector('#form-servico').focus();
          return;
        }
        errorMsg.style.display = 'none';

        submitBtn.disabled       = true;
        btnText.style.display    = 'none';
        btnLoading.style.display = '';

        var dataEnvio = new Date().toLocaleString('pt-AO', {
          day: '2-digit', month: '2-digit', year: 'numeric',
          hour: '2-digit', minute: '2-digit'
        });

        var payload = {
          access_key:  W3F_KEY,
          subject:     'Novo pedido de consulta +244 — ' + nome,
          from_name:   '+244 Consultoria & Marketing',
          replyto:     email,
          Nome:        nome,
          Empresa:     form.querySelector('#form-empresa').value.trim()  || 'N/A',
          Email:       email,
          Telefone:    form.querySelector('#form-tel').value.trim()       || 'N/A',
          Servico:     servico,
          Data:        form.querySelector('#form-data').value             || 'N/A',
          Horario:     form.querySelector('#form-hora').value             || 'N/A',
          Modalidade:  form.querySelector('#form-modalidade').value       || 'N/A',
          Mensagem:    form.querySelector('#form-mensagem').value.trim()  || '(sem mensagem)',
          Enviado_em:  dataEnvio
        };

        fetch('https://api.web3forms.com/submit', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body:    JSON.stringify(payload)
        })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (data.success) {
            form.style.display       = 'none';
            successBox.style.display = 'block';
          } else {
            throw new Error(data.message || 'Erro desconhecido');
          }
        })
        .catch(function (err) {
          console.error('+244: Erro Web3Forms', err);
          showSendError();
        });
      });

      function showSendError() {
        submitBtn.disabled       = false;
        btnText.style.display    = '';
        btnLoading.style.display = 'none';
        form.style.display       = 'none';
        sendErrBox.style.display = 'block';
      }
    })();

