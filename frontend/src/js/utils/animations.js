/**
 * animations.js
 * Single shared IntersectionObserver for scroll-reveal animations.
 * Call initScrollAnimations() once on DOMContentLoaded.
 * Call observeReveal() after dynamically inserting new .reveal elements.
 */

let _revealObserver = null;

/** Initialise the shared reveal observer. Must be called once. */
export function initScrollAnimations() {
  _revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        _revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  observeReveal();
}

/**
 * Observe any .reveal elements that haven't been animated yet.
 * Call this after rendering dynamic HTML that contains .reveal classes.
 */
export function observeReveal() {
  if (!_revealObserver) return;
  document.querySelectorAll('.reveal:not(.visible)').forEach((el) =>
    _revealObserver.observe(el)
  );
}
