/* ============================================================
   OLHOS DE TIGRE VISTORIAS — JAVASCRIPT PRINCIPAL
   Performance-first | Vanilla JS | Sem dependências externas
   ============================================================ */

(function () {
  'use strict';

  /* ---- CONSTANTES ---- */
  const WA_NUMBER = '5511944445555';
  const WA_MSG_DEFAULT = encodeURIComponent('Olá! Encontrei a Olhos de Tigre Vistorias pelo site e gostaria de informações sobre vistoria veicular.');

  /* ---- MENU MOBILE ---- */
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const body = document.body;

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Fechar ao clicar em link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
      });
    });

    // Fechar ao clicar fora
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
      }
    });
  }

  /* ---- HEADER SCROLL ---- */
  const header = document.querySelector('.header');
  if (header) {
    let lastScroll = 0;
    const handleScroll = () => {
      const current = window.scrollY;
      if (current > 80) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
      } else {
        header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
      }
      lastScroll = current;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  /* ---- FAQ ACCORDION ---- */
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isActive = item.classList.contains('active');

      // Fechar todos
      document.querySelectorAll('.faq-item.active').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('active');
          openItem.querySelector('.faq-answer').style.maxHeight = '0';
          openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle atual
      if (isActive) {
        item.classList.remove('active');
        answer.style.maxHeight = '0';
        question.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---- SCROLL ANIMATIONS ---- */
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: mostrar tudo
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

  /* ---- LAZY LOADING (fallback para navegadores sem suporte nativo) ---- */
  if (!('loading' in HTMLImageElement.prototype) && 'IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    });
    document.querySelectorAll('img[data-src]').forEach(img => imgObserver.observe(img));
  }

  /* ---- WHATSAPP TRACKING ---- */
  document.querySelectorAll('a[href*="wa.me"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Tracking básico via console (integrar com GA4 se disponível)
      if (typeof gtag !== 'undefined') {
        gtag('event', 'whatsapp_click', {
          'event_category': 'CTA',
          'event_label': btn.dataset.ctaLabel || document.title,
        });
      }
    });
  });

  /* ---- ACTIVE NAV ---- */
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav__link, .footer__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (currentPath === href || currentPath.endsWith(href))) {
      link.classList.add('active');
    }
  });

  /* ---- SMOOTH SCROLL para âncoras internas ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerH = header ? header.offsetHeight : 70;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH - 20;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---- FORM SUBMIT (WhatsApp redirect) ---- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = document.getElementById('nome')?.value || '';
      const servico = document.getElementById('servico')?.value || 'vistoria';
      const msg = encodeURIComponent(`Olá! Me chamo ${nome} e gostaria de informações sobre ${servico}.`);
      window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank', 'noopener,noreferrer');
    });
  }

})();
