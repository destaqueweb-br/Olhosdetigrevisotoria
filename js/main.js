/* ============================================================
   OLHOS DE TIGRE VISTORIAS — JAVASCRIPT PRINCIPAL
   Performance-first | Vanilla JS | Compatível com GitHub Pages
   ============================================================ */

(function () {
  'use strict';

  /* ---- CONSTANTES ---- */
  const WA_NUMBER = '5511910339280';
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

    // Fechar ao clicar em qualquer link do menu mobile
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
      });
    });

    // Fechar ao clicar fora do menu
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !mobileMenu.contains(e.target) && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
      }
    });
  }

  /* ---- HEADER SCROLL SHADOW ---- */
  const header = document.querySelector('.header');
  if (header) {
    let lastScroll = 0;
    const handleScroll = () => {
      const current = window.scrollY;
      if (current > 50) {
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
      if (!item) return;

      const answer = item.querySelector('.faq-answer');
      const isActive = item.classList.contains('active');

      // Fechar outros itens abertos
      document.querySelectorAll('.faq-item.active').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('active');
          const otherAnswer = openItem.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = '0';
          const otherBtn = openItem.querySelector('.faq-question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      // Alternar o item clicado
      if (isActive) {
        item.classList.remove('active');
        if (answer) answer.style.maxHeight = '0';
        question.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---- ANIMAÇÕES AO ROLAR (IntersectionObserver) ---- */
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

  /* ---- ACTIVE NAV (compatível com GitHub Pages e domínio próprio) ---- */
  const pathParts = window.location.pathname.split('/');
  const currentPage = pathParts.pop() || 'index.html';
  const cleanCurrentPage = currentPage.split('?')[0].split('#')[0] || 'index.html';

  document.querySelectorAll('.nav__link, .footer__link, .mobile-menu__link').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkParts = href.split('/');
    const linkTarget = linkParts.pop().split('?')[0].split('#')[0];

    if (linkTarget && (linkTarget === cleanCurrentPage || (cleanCurrentPage === 'index.html' && (linkTarget === 'index.html' || linkTarget === './')))) {
      if (!link.classList.contains('nav__dropdown-toggle')) {
        link.classList.add('active');
      }
    }
  });

  /* ---- ANO ATUAL NO FOOTER ---- */
  const anoEl = document.getElementById('ano');
  if (anoEl) {
    anoEl.textContent = new Date().getFullYear();
  }

  /* ---- FORMULÁRIO DE CONTATO (envio direto via WhatsApp) ---- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nomeInput = document.getElementById('nome');
      const telefoneInput = document.getElementById('telefone');
      const servicoSelect = document.getElementById('servico');
      const mensagemInput = document.getElementById('mensagem');

      const nome = nomeInput ? nomeInput.value.trim() : '';
      const telefone = telefoneInput ? telefoneInput.value.trim() : '';
      const servico = servicoSelect ? servicoSelect.value : 'Vistoria Veicular';
      const mensagem = mensagemInput ? mensagemInput.value.trim() : '';

      let texto = `Olá! Me chamo *${nome}* e gostaria de agendar/tirar dúvidas sobre *${servico}*.`;
      if (telefone) {
        texto += `\nMeu telefone de contato: ${telefone}.`;
      }
      if (mensagem) {
        texto += `\nDetalhes adicionais: ${mensagem}`;
      }

      const urlWhatsApp = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(texto)}`;
      window.open(urlWhatsApp, '_blank', 'noopener,noreferrer');
    });
  }

})();
