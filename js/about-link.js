(() => {
  const labels = { zh: '去到作品之外', fr: 'Au-delà des œuvres', en: 'Beyond the Works' };
  const lang = window.SiteLanguage?.requested?.() || window.SiteLanguage?.saved?.() || 'en';
  document.querySelectorAll('[data-about-link]').forEach(link => {
    const current = labels[lang] || labels.en;
    link.textContent = current;
    link.setAttribute('aria-label', current);
    link.href = `article-about.html?lang=${encodeURIComponent(lang)}`;
  });
})();
