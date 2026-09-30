(function(){
  const valid = ['zh','fr','en'];
  const key = 'site-language';
  const modeKey = 'site-reading-mode';
  function query(){
    try { const value = new URLSearchParams(location.search).get('lang'); return valid.includes(value) ? value : ''; }
    catch (_) { return ''; }
  }
  function saved(){
    try { const value = localStorage.getItem(key); return valid.includes(value) ? value : ''; }
    catch (_) { return ''; }
  }
  function initial(fallback){ return query() || saved() || fallback || 'en'; }
  function set(value){ if(valid.includes(value)){ try { localStorage.setItem(key,value); localStorage.removeItem(modeKey); } catch (_) {} } }
  function requested(){ return query(); }
  function savedMode(){ try { return localStorage.getItem(modeKey) || ''; } catch (_) { return ''; } }
  function setMode(value){ try { localStorage.setItem(modeKey,value); } catch (_) {} }
  window.SiteLanguage = {valid, query, requested, saved, initial, set, savedMode, setMode};
})();
