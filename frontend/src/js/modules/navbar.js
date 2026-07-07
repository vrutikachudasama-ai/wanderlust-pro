/**
 * navbar.js
 * Sticky navbar scroll behaviour, active-link highlighting via
 * IntersectionObserver, and mobile menu toggle.
 */

export function initNavbar() {
  const navbar   = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);

    if (backToTop) {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }
  }, { passive: true });

  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((l) => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      });
    }, { rootMargin: '-20% 0px -70% 0px' });

    sections.forEach((s) => observer.observe(s));
  }
}

export function toggleMobileMenu() {
  document.getElementById('mobileMenu')?.classList.toggle('open');
}

export function closeMobileMenu() {
  document.getElementById('mobileMenu')?.classList.remove('open');
}
