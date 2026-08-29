(() => {
  const root = document.documentElement;
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals = [...document.querySelectorAll('.reveal')];

  if (reduced || !('IntersectionObserver' in window)) {
    reveals.forEach((node) => node.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -7% 0px', threshold: 0.08 });
    reveals.forEach((node) => observer.observe(node));
  }

  document.querySelectorAll('.faq-list details').forEach((detail) => {
    detail.addEventListener('toggle', () => {
      if (!detail.open) return;
      document.querySelectorAll('.faq-list details[open]').forEach((other) => {
        if (other !== detail) other.open = false;
      });
    });
  });

  const openLegalTarget = () => {
    if (!location.hash) return;
    const target = document.querySelector(location.hash);
    if (target?.matches('.legal details')) target.open = true;
  };
  window.addEventListener('hashchange', openLegalTarget);
  openLegalTarget();

  root.dataset.ready = 'true';
})();
