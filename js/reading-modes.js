(() => {
  if (document.body.classList.contains('mengji') && document.querySelector('.reading-toolbar')) return;
  if (document.getElementById('rm-toolbar')) return;
  const isReview = !!document.querySelector('.review-section');
  const reading = document.querySelector('.reading');
  const passages = isReview ? [...document.querySelectorAll('.review-section')] : [...document.querySelectorAll('.reading .passage')];
  if (!reading && !isReview) return;
  const pageTitle = document.querySelector('h1')?.textContent?.trim() || '';
  const titleMap = {
    '小说': {zh:'小说', en:'Fiction', fr:'Fiction'},
    '诗歌': {zh:'诗歌', en:'Poetry', fr:'Poésie'},
    '散文': {zh:'只有当下', en:'Only the Present', fr:'Seul le présent'},
    '信函': {zh:'感谢信', en:'A Letter of Thanks', fr:'Lettre de remerciement'},
    '影评': {zh:'《爱乐之城》：沉醉与祛魅', en:'How (dis)enchanted is La La Land?', fr:'La La Land, entre enchantement et désenchantement'}
  };
  const novelSections=[
    {id:'introduction',zh:'引言',en:'Introduction',fr:'Introduction'},
    {id:'dream-1',zh:'文段一：蓝洞',en:'Excerpt I: The Blue Hole',fr:'Extrait I : Le trou bleu'},
    {id:'dream-2',zh:'文段二：选拔',en:'Excerpt II: The Selection',fr:'Extrait II : La sélection'},
    {id:'dream-3',zh:'文段三：地牢',en:'Excerpt III: The Dungeon',fr:'Extrait III : Le cachot'}
  ];
  const isCorrespondence = pageTitle === '信函';
  const isNovel = pageTitle === '小说';
  const isPoetry = /(?:^|\/)article-poetry\.html$/i.test(location.pathname) && pageTitle === '诗歌';
  const poetryWork = {id:'poetry-work',target:'dream-1',zh:'第一首：柔尘',en:'Poem I: Soft Dust',fr:'Premier poème : Douce poussière'};
  const isProse = /(?:^|\/)article-prose\.html$/i.test(location.pathname) && pageTitle === '散文';
  const proseWork = {id:'prose-work',target:'dream-1',zh:'第一篇：只有当下',en:'Essay I: Only the Present',fr:'Premier essai : Seul le présent'};
  const isReading = /(?:^|\/)article-reading\.html$/i.test(location.pathname) && pageTitle === '读后感';
  const readingWork = {id:'reading-work',zh:'第一篇：谁在讲故事？——国产古装剧的文学失语与资本暴政',en:'Essay I: Who Is Telling the Story? — The Silencing of Literary Craft and the Tyranny of Capital in Chinese Costume Dramas',fr:'Premier essai : Qui raconte l’histoire ? — L’écriture réduite au silence et la tyrannie du capital dans les séries chinoises en costumes'};
  const style = document.createElement('style');
  style.textContent = `
.rm-title-translations{writing-mode:horizontal-tb!important;text-align:center;color:#7B8277;font:12px/1.7 Georgia,serif;margin:-28px auto 38px;width:min(620px,calc(100% - 48px))}.rm-title-translations span{display:block}.rm-title-translations .rm-title-fr{margin-top:2px}body.rm-single[data-rm-lang=zh] .rm-title-translations{display:none}body.rm-single[data-rm-lang=en] .rm-title-translations .rm-title-fr{display:none}body.rm-single[data-rm-lang=fr] .rm-title-translations .rm-title-en{display:none}
#rm-toolbar{position:sticky;top:0;z-index:30;display:flex;justify-content:center;gap:6px;padding:10px 4.5vw;background:rgba(253,251,247,.95);border-top:1px solid rgba(123,130,119,.15);border-bottom:1px solid rgba(123,130,119,.2);backdrop-filter:blur(8px)}
#rm-toolbar button{border:0;background:transparent;color:#7B8277;padding:7px 12px;font:11px Arial,sans-serif;letter-spacing:.08em;cursor:pointer}#rm-toolbar button.active{color:#1A1A1A;border-bottom:1px solid #4A5D4E}#rm-toolbar .rm-toc{margin-right:18px;color:#4A5D4E}
#rm-backdrop{position:fixed;inset:0;z-index:40;background:rgba(26,26,26,.22);opacity:0;pointer-events:none;transition:opacity .25s}#rm-backdrop.open{opacity:1;pointer-events:auto}#rm-drawer{position:fixed;top:0;left:0;bottom:0;z-index:41;width:min(360px,88vw);padding:76px 30px 30px;background:#FDFBF7;box-shadow:12px 0 35px rgba(26,26,26,.12);transform:translateX(-105%);transition:transform .3s;overflow:auto}#rm-drawer.open{transform:translateX(0)}#rm-drawer-close{position:absolute;right:20px;top:18px;border:0;background:none;color:#7B8277;font-size:24px;cursor:pointer}#rm-drawer h2{font-size:18px;font-weight:400;color:#4A5D4E;margin:0 0 24px}.rm-toc-list a{display:block;padding:10px 0 14px;margin-bottom:12px;color:#1A1A1A;border-bottom:1px solid rgba(123,130,119,.15);line-height:1.55}.rm-toc-list small{display:block;color:#7B8277;font-size:.86em}.rm-single .reading .passage{display:block!important;width:min(760px,calc(100% - 48px))!important;margin:0 auto 2rem!important;grid-template-columns:none!important}.rm-single .reading .passage .original,.rm-single .reading .passage .translation-left,.rm-single .reading .passage .translation-right{display:none!important;grid-column:auto!important;grid-row:auto!important;float:none!important;position:static!important;transform:none!important;width:100%!important;max-width:100%!important;min-width:0!important;margin:0!important;padding:0!important;border:0!important;box-shadow:none!important;font-size:1.12rem!important;line-height:2!important;color:#1A1A1A!important;text-align:left!important}.rm-single[data-rm-lang=zh] .reading .passage .original,.rm-single[data-rm-lang=en] .reading .passage .translation-left,.rm-single[data-rm-lang=fr] .reading .passage .translation-right{display:block!important}.rm-single .review-section{display:block!important;width:min(760px,90vw)!important;margin:0 auto 70px!important;border-top:0!important;padding:35px 0!important}.rm-single .review-section .column{display:none!important;width:100%!important;max-width:100%!important;font-size:1.12rem!important;line-height:2!important;color:#1A1A1A!important;box-shadow:none!important}.rm-single[data-rm-lang=zh] .review-section .column[data-language=zh],.rm-single[data-rm-lang=en] .review-section .column[data-language=en],.rm-single[data-rm-lang=fr] .review-section .column[data-language=fr]{display:block!important}.rm-single .review-section .illustration{display:block!important;width:100%!important}.rm-parallel .review-section .column{display:block}.rm-parallel .review-section .column.main{font-size:1.18rem}.rm-parallel .review-section{display:grid}.rm-lalaland .review-section{border-top:0!important;padding-top:0!important;margin-bottom:48px!important}.rm-lalaland .review-section:first-child{padding-top:0!important}.rm-correspondence.rm-parallel .reading .passage{width:min(1500px,calc(100% - 72px))!important;grid-template-columns:minmax(0,1fr) minmax(0,1.2fr) minmax(0,1fr)!important;column-gap:clamp(24px,3vw,52px)!important}.rm-correspondence.rm-parallel .reading .passage .original{grid-column:2!important}.rm-correspondence.rm-parallel .reading .passage .translation-left{grid-column:1!important}.rm-correspondence.rm-parallel .reading .passage .translation-right{grid-column:3!important}
@media(max-width:600px){#rm-toolbar{justify-content:flex-start;overflow-x:auto;white-space:nowrap;padding-left:24px}#rm-toolbar button{flex:0 0 auto}.rm-parallel .reading .passage{display:flex!important;flex-direction:column!important;width:calc(100% - 40px)!important;gap:14px!important}.rm-parallel .reading .passage .original,.rm-parallel .reading .passage .translation-left,.rm-parallel .reading .passage .translation-right{width:100%!important;min-width:0!important;order:initial!important}.rm-single .reading .passage{width:calc(100% - 40px)!important}.rm-single .review-section{width:calc(100% - 40px)!important}}
`;
  document.head.appendChild(style);
  const toolbar = document.createElement('div'); toolbar.id='rm-toolbar'; toolbar.setAttribute('role','toolbar');
  toolbar.innerHTML='<button type="button" class="rm-toc">目录</button><button type="button" data-rm-mode="parallel" class="active">三语对照</button><button type="button" data-rm-mode="zh">中文</button><button type="button" data-rm-mode="en">EN</button><button type="button" data-rm-mode="fr">FR</button>';
  if (isPoetry || isProse || isReading) toolbar.querySelector('.rm-toc').textContent='目录 / Contents / Sommaire';
  const anchor = document.querySelector('.reading') || document.querySelector('#content');
  if (anchor) anchor.parentNode.insertBefore(toolbar, anchor);
  if (pageTitle === '小说') {
    novelSections.forEach(item => {
      const section=document.getElementById(item.id); if(!section) return;
      if(item.id==='introduction' && !section.querySelector(':scope > .rm-section-heading')) { const h=document.createElement('h2'); h.className='rm-section-heading'; h.textContent=item.zh; h.style.cssText='text-align:center;color:#4A5D4E;font-size:clamp(22px,3vw,34px);font-weight:400;margin:0 auto 30px'; section.insertBefore(h,section.firstElementChild); }
      if(item.id!=='introduction'){ const h=section.querySelector(':scope > h2'); if(h){h.textContent=item.zh; if(!h.nextElementSibling?.classList.contains('rm-title-translations')){const t=document.createElement('div');t.className='rm-title-translations';t.innerHTML='<span class=\"rm-title-en\">'+item.en+'</span><span class=\"rm-title-fr\">'+item.fr+'</span>';h.insertAdjacentElement('afterend',t);}} }
    });
  }
  if (isPoetry) {
    const section = document.getElementById('dream-1');
    const heading = document.getElementById('dream-1-title');
    if (section && heading) {
      heading.textContent = poetryWork.zh;
      let translations = heading.nextElementSibling;
      if (!translations || !translations.classList.contains('rm-title-translations')) {
        translations = document.createElement('div');
        translations.className = 'rm-title-translations';
        heading.insertAdjacentElement('afterend', translations);
      }
      translations.innerHTML = '<span class="rm-title-en">'+poetryWork.en+'</span><span class="rm-title-fr">'+poetryWork.fr+'</span>';
    }
  }
  if (isProse) {
    const heading = document.getElementById('dream-1-title');
    if (heading) {
      heading.textContent = proseWork.zh;
      let translations = heading.nextElementSibling;
      if (!translations || !translations.classList.contains('rm-title-translations')) {
        translations = document.createElement('div');
        translations.className = 'rm-title-translations';
        heading.insertAdjacentElement('afterend', translations);
      }
      translations.innerHTML = '<span class="rm-title-en">'+proseWork.en+'</span><span class="rm-title-fr">'+proseWork.fr+'</span>';
    }
  }
  const articleParam = new URLSearchParams(location.search).get('article');
  const isLaLa = isReview && /(?:^|\/)article-film-review\.html$/i.test(location.pathname) && (!articleParam || articleParam === 'lalaland');
  const lalalandToc = {id:'lalaland-review',zh:'《爱乐之城》：沉醉与祛魅',en:'How (dis)enchanted is La La Land?',fr:'La La Land, entre enchantement et désenchantement'};
  if (isCorrespondence) document.body.classList.add('rm-correspondence'); if (isLaLa) document.body.classList.add('rm-lalaland'); const canToc = isCorrespondence || isNovel || isPoetry || isProse || isReading || isLaLa || passages.length > 1 || isReview;
  const backdrop=document.createElement('div'); backdrop.id='rm-backdrop';
  const drawer=document.createElement('aside'); drawer.id='rm-drawer'; drawer.setAttribute('aria-hidden','true');
  drawer.innerHTML='<button id="rm-drawer-close" type="button" aria-label="关闭目录">×</button><h2>目录 / Contents / Sommaire</h2><nav class="rm-toc-list"></nav>';
  document.body.append(backdrop,drawer);
  const tocButton=toolbar.querySelector('.rm-toc'); if(!canToc) tocButton.remove();
  const list=drawer.querySelector('.rm-toc-list');
  const getLabel=(el,i)=>{const h=el.querySelector(':scope > h2, .section-heading');return h?.textContent?.trim() || el.getAttribute('aria-label')?.split('，')[0] || `文段 ${i+1}`}; const sectionNames=[['文段一','Section One','Première section'],['文段二','Section Two','Deuxième section'],['文段三','Section Three','Troisième section'],['文段四','Section Four','Quatrième section'],['引言','Introduction','Introduction']];
  // La La Land uses an explicit work-level entry. It never scans the review sections.
  const tocItems=isLaLa?[lalalandToc]:(isPoetry?[poetryWork]:(isProse?[proseWork]:(isReading?[readingWork]:(isCorrespondence?passages.slice(0,1):isNovel?novelSections.map(x=>document.getElementById(x.id)).filter(Boolean):passages))));
  tocItems.forEach((item,i)=>{const el=isLaLa?passages[0]:((isPoetry||isProse)?document.getElementById(item.target):(isReading?document.querySelector('.article-heading'):item));if(isCorrespondence&&!el.id)el.id='correspondence-letter';if(isLaLa)el.id='lalaland-review';if(isReading&&!el.id)el.id='reading-article';const a=document.createElement('a');a.href='#'+el.id;const novelItem=isNovel?novelSections[i]:null;const singleWork=isLaLa||isPoetry||isProse||isReading;const label=singleWork?item.zh:isCorrespondence?'感谢信':novelItem?novelItem.zh:getLabel(el,i);const mapped=sectionNames.find(x=>x[0]===label);const t=singleWork?item:(novelItem||titleMap[label]||titleMap[pageTitle]);const en=singleWork?item.en:(mapped?mapped[1]:t?.en);const fr=singleWork?item.fr:(mapped?mapped[2]:t?.fr);a.innerHTML='<span class="rm-toc-zh">'+label+'</span>'+(en&&fr?'<small class="rm-toc-en">'+en+'</small><small class="rm-toc-fr">'+fr+'</small>':'');a.addEventListener('click',e=>{e.preventDefault();el.scrollIntoView({behavior:'smooth',block:'start'});close()});list.append(a)});
  const close=()=>{drawer.classList.remove('open');backdrop.classList.remove('open');drawer.setAttribute('aria-hidden','true')};
  if(canToc){tocButton.addEventListener('click',()=>{drawer.classList.add('open');backdrop.classList.add('open');drawer.setAttribute('aria-hidden','false')});backdrop.addEventListener('click',close);drawer.querySelector('#rm-drawer-close').addEventListener('click',close);document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});}
  const setMode=mode=>{document.body.classList.remove('rm-parallel','rm-single');document.body.removeAttribute('data-rm-lang');if(mode==='parallel')document.body.classList.add('rm-parallel');else{document.body.classList.add('rm-single');document.body.dataset.rmLang=mode}toolbar.querySelectorAll('[data-rm-mode]').forEach(b=>b.classList.toggle('active',b.dataset.rmMode===mode));};
  toolbar.querySelectorAll('[data-rm-mode]').forEach(btn=>btn.addEventListener('click',()=>{const current=passages.find(el=>{const r=el.getBoundingClientRect();return r.top<innerHeight*.45&&r.bottom>innerHeight*.45});setMode(btn.dataset.rmMode);if(current)requestAnimationFrame(()=>current.scrollIntoView({block:'center'}));}));
  setMode(matchMedia('(max-width:600px)').matches?'zh':'parallel');
})();
