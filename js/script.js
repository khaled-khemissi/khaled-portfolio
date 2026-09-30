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

  /* ---------- project image galleries ---------- */
  document.querySelectorAll('.project-media-player[data-gallery]').forEach(gallery => {
    const projectCase = gallery.closest('.project-case');
    const projectName = projectCase?.dataset.project || '';
    const extra = gallery.querySelector('[data-gallery-extra]');
    const dots = gallery.querySelector('[data-gallery-dots]');
    const hint = gallery.querySelector('[data-gallery-hint]');
    if (!extra || !dots) return;

    const siteRoot = new URL('../', window.location.href);
    const base = gallery.dataset.mediaBase
      ? new URL(gallery.dataset.mediaBase, window.location.href).href
      : new URL(`assets/project/${projectName}/`, siteRoot).href;
    let media = [];
    try { media = JSON.parse(gallery.dataset.media || '[]'); }
    catch (error) { console.error(`Invalid media list for ${projectName}`, error); }

    media.filter(item => item && item.src).forEach((item, index) => {
      const frame = document.createElement('div');
      frame.className = 'gallery-frame';
      frame.hidden = true;
      const src = base + item.src.split('/').map(encodeURIComponent).join('/');
      if (item.type === 'video') {
        const video = document.createElement('video');
        video.className = 'project-video';
        video.controls = true;
        video.preload = 'metadata';
        video.playsInline = true;
        const source = document.createElement('source');
        source.src = src;
        const extension = item.src.split('.').pop().toLowerCase();
        source.type = ({ mp4: 'video/mp4', webm: 'video/webm', mov: 'video/quicktime' })[extension] || 'video/mp4';
        video.addEventListener('error', () => {
          let status = gallery.querySelector('.media-error');
          if (!status) {
            status = document.createElement('p');
            status.className = 'media-error';
            status.setAttribute('role', 'status');
            gallery.append(status);
          }
          status.textContent = 'La vidéo ne peut pas être chargée. Vérifiez que le fichier est bien publié avec le site.';
        });
        video.append(source);
        frame.append(video);
      } else {
        const image = document.createElement('img');
        image.src = src;
        image.alt = item.alt || `${projectName} — image ${index + 1}`;
        image.loading = 'lazy';
        frame.append(image);
      }
      extra.append(frame);
    });

    const frames = Array.from(extra.querySelectorAll('.gallery-frame'));
    if (!frames.length) {
      if (hint) hint.textContent = 'Aucun média supplémentaire pour le moment.';
      return;
    }

    let current = 0;
    const controls = document.createElement('div');
    controls.className = 'gallery-controls';
    controls.innerHTML = '<button class="gallery-control gallery-prev" type="button" aria-label="Média précédent">‹</button><button class="gallery-control gallery-next" type="button" aria-label="Média suivant">›</button>';
    gallery.insertBefore(controls, extra);
    dots.replaceChildren();
    const dotButtons = frames.map((frame, index) => {
      const button = document.createElement('button');
      button.className = 'gallery-dot';
      button.type = 'button';
      button.setAttribute('aria-label', `Afficher le média ${index + 1}`);
      button.addEventListener('click', () => show(index));
      dots.append(button);
      return button;
    });
    function show(index) {
      current = (index + frames.length) % frames.length;
      frames.forEach((frame, i) => { frame.hidden = i !== current; });
      dotButtons.forEach((button, i) => button.setAttribute('aria-current', String(i === current)));
      frames.forEach((frame, i) => { if (i !== current) frame.querySelector('video')?.pause(); });
    }
    controls.querySelector('.gallery-prev').addEventListener('click', () => show(current - 1));
    controls.querySelector('.gallery-next').addEventListener('click', () => show(current + 1));
    show(0);
    if (hint) hint.hidden = true;
  });

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
