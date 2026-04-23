/* Portfolio site — small interactions */

// Replace a <video> whose source is missing with a "coming soon" placeholder card
function installVideoFallbacks() {
  document.querySelectorAll('video[data-fallback]').forEach(video => {
    const source = video.querySelector('source');
    if (!source) return;
    const handleMissing = () => {
      if (video.dataset.fallbackInserted) return;
      video.dataset.fallbackInserted = '1';
      const msg = video.getAttribute('data-fallback') || 'Video — coming soon';
      const div = document.createElement('div');
      div.className = 'media-placeholder';
      div.innerHTML = '<strong>' + msg + '</strong>' +
        'Will appear here once the file is added to <code>' + source.getAttribute('src') + '</code>.';
      video.replaceWith(div);
    };
    source.addEventListener('error', handleMissing);
    video.addEventListener('error', handleMissing);
    // Also probe with a HEAD request so we show the placeholder even before the user hits play
    fetch(source.getAttribute('src'), { method: 'HEAD' })
      .then(r => { if (!r.ok) handleMissing(); })
      .catch(handleMissing);
  });
}

// For document links with [data-doc-check], probe the file and update the sibling [data-doc-status]
function installDocStatusChecks() {
  document.querySelectorAll('a[data-doc-check]').forEach(link => {
    const status = link.closest('li')?.querySelector('[data-doc-status]');
    if (!status) return;
    fetch(link.getAttribute('href'), { method: 'HEAD' })
      .then(r => {
        if (r.ok) {
          status.textContent = 'Available';
          status.className = 'status ready';
        } else {
          status.textContent = 'Coming soon';
          status.className = 'status not-ready';
          link.removeAttribute('href');
          link.style.cursor = 'default';
          link.style.color = 'var(--muted)';
          link.style.textDecoration = 'none';
        }
      })
      .catch(() => {
        status.textContent = 'Coming soon';
        status.className = 'status not-ready';
      });
  });
}

// Year in footer
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  installVideoFallbacks();
  installDocStatusChecks();

  // Back-to-top button
  const btn = document.getElementById('back-to-top');
  if (btn) {
    const toggleBtn = () => {
      if (window.scrollY > 400) btn.classList.add('visible');
      else btn.classList.remove('visible');
    };
    window.addEventListener('scroll', toggleBtn, { passive: true });
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Active-section highlighting in top nav
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections = Array.from(navLinks)
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const byId = new Map();
    navLinks.forEach(a => byId.set(a.getAttribute('href').slice(1), a));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const link = byId.get(entry.target.id);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach(l => l.style.color = '');
          link.style.color = 'var(--accent)';
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(s => observer.observe(s));
  }
});
