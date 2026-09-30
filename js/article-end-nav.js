(() => {
  if (location.pathname.endsWith('article-about.html') || location.pathname.endsWith('article-honglou-backup.html')) return;
  if (!document.querySelector('.reading, #reading')) return;
  if (document.querySelector('.article-end-nav')) return;

  const style = document.createElement('style');
  style.textContent = `
    .article-end-nav{position:fixed;left:4.5vw;bottom:24px;z-index:32;display:flex;align-items:center;font:10px/1.5 Arial,sans-serif;color:#fff;text-shadow:0 1px 4px rgba(0,0,0,.8)}
    .article-end-nav a{display:inline-flex;align-items:center;min-height:40px;padding:10px 14px;color:inherit;text-decoration:none;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.4);border-radius:2px;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
    .article-end-nav a:hover,.article-end-nav a:focus-visible{background:rgba(255,255,255,.28);border-color:rgba(255,255,255,.7)}
    @media(max-width:600px){.article-end-nav{left:12px;bottom:max(14px,env(safe-area-inset-bottom));max-width:calc(100% - 24px)}.article-end-nav a{min-height:42px;padding:9px 11px;white-space:normal}}
  `;
  document.head.appendChild(style);
  const safety = document.createElement('style');
  safety.textContent = `@media(max-width:600px){body{overflow-x:hidden}main{padding-bottom:92px}.reading,.passage,.section,.work-block{max-width:100%;min-width:0}img,video{max-width:100%;height:auto}.reading p,.passage p,.section p{overflow-wrap:anywhere}}`;
  document.head.appendChild(safety);
  const nav = document.createElement('nav');
  nav.className = 'article-end-nav';
  nav.setAttribute('aria-label', '作品结束导航');
  const about = document.createElement('a');
  about.href = 'article-about.html';
  about.dataset.endAbout = 'true';
  nav.append(about);
  (document.querySelector('main') || document.body).append(nav);

  const labels = {
    zh: '作品之外 →',
    fr: 'Au-delà des œuvres →',
    en: 'Beyond the Works →'
  };
  const getLang = () => {
    const query = window.SiteLanguage?.requested?.();
    return query || window.SiteLanguage?.saved?.() || 'en';
  };
  const update = () => {
    const lang = getLang();
    about.textContent = labels[lang] || labels.en;
    about.setAttribute('aria-label', labels[lang] || labels.en);
    about.href = `article-about.html?lang=${encodeURIComponent(lang)}`;
  };
  update();
  document.querySelectorAll('[data-mode],[data-rm-mode]').forEach(button => button.addEventListener('click', () => setTimeout(update, 0)));
})();
