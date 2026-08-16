// ==========================================================
// KHALED KHEMISSI — PORTFOLIO
// Small, dependency-free interactions:
// 1. Mobile nav toggle
// 2. Scroll-triggered reveal for sections
// 3. Animated language proficiency bars
// 4. Footer year
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.classList.toggle('is-active', isOpen);
    });

    // Close the menu after a link is tapped (mobile UX)
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- mark elements to reveal on scroll ---------- */
  const revealTargets = document.querySelectorAll(
    '.section-head, .about-grid, .stack-layer, .tl-item, .work-card, .edu-list li, .contact-card'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const langFills = document.querySelectorAll('.lang-fill');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Skip the animation entirely; show final state immediately.
    revealTargets.forEach(el => el.classList.add('in-view'));
    langFills.forEach(el => el.classList.add('in-view'));
  } else if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach(el => observer.observe(el));
    langFills.forEach(el => observer.observe(el));
  } else {
    // Fallback for very old browsers
    revealTargets.forEach(el => el.classList.add('in-view'));
    langFills.forEach(el => el.classList.add('in-view'));
  }

  /* ---------- active nav link highlight on scroll ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const link = document.querySelector(`.main-nav a[href="#${id}"]`);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach(l => l.classList.remove('is-active'));
          link.classList.add('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(section => navObserver.observe(section));
  }

});
