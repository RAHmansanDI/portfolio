(() => {
  'use strict';
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const header = $('#siteHeader');
  const progress = $('#scrollProgress');
  const nav = $('#mainNav');
  const menu = $('#menuToggle');
  const year = $('#year');
  year.textContent = String(new Date().getFullYear());
  function onScroll(){
    header.classList.toggle('scrolled', window.scrollY > 35);
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = (max > 0 ? Math.max(0, window.scrollY / max * 100) : 0) + '%';
  }
  window.addEventListener('scroll', onScroll,{passive:true});onScroll();
  menu.addEventListener('click',()=>{
    const open = !nav.classList.contains('open');
    nav.classList.toggle('open', open);
    menu.setAttribute('aria-expanded',String(open));
    menu.setAttribute('aria-label',open?'Close menu':'Open menu');
  });
  $$('.main-nav a').forEach(a=>a.addEventListener('click',()=>{
    nav.classList.remove('open');menu.setAttribute('aria-expanded','false');
    menu.setAttribute('aria-label','Open menu');
  }));
  document.addEventListener('click',e=>{
    if(!header.contains(e.target) && nav.classList.contains('open')){
      nav.classList.remove('open');menu.setAttribute('aria-expanded','false');
    }
  });
  if('IntersectionObserver' in window){
    const sections=$$('#about,#work,#journey,#expertise,#contact');
    const watcher=new IntersectionObserver(entries=>{
      entries.forEach(e=>{if(e.isIntersecting){
        $$('.main-nav a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id));
      }});
    },{rootMargin:'-18% 0px -66% 0px'});
    sections.forEach(s=>watcher.observe(s));
  }
  const filters=$$('.filter');
  const cards=$$('.project-card[data-category]');
  filters.forEach(button=>button.addEventListener('click',()=>{
    const category=button.dataset.filter;
    filters.forEach(b=>{
      const active=b===button;b.classList.toggle('is-active',active);b.setAttribute('aria-pressed',String(active));
    });
    cards.forEach(card=>card.hidden=(category!=='all' && card.dataset.category!==category));
    const digital=$('.digital-grid');
    digital.hidden=($$('.digital-grid > .project-card').every(c=>c.hidden));
    $('#emptyFilter').hidden=cards.some(c=>!c.hidden);
  }));
  // Full-resolution, fit-to-screen portfolio viewer with zoom and keyboard controls.
  const lightbox=$('#lightbox'),picture=$('#viewerImage'),caption=$('#viewerCaption');
  const controls=$$('[data-img]');
  const items=[];
  controls.forEach(el=>{
    const item={src:el.dataset.img,caption:el.dataset.caption || 'Portfolio documentation',alt:el.querySelector('img')?.alt||el.dataset.caption};
    // Keep each unique asset once; navigation follows the document order.
    let index=items.findIndex(obj=>obj.src===item.src);
    if(index<0){index=items.length;items.push(item)}
    el.dataset.viewerIndex=String(index);
    el.addEventListener('click',()=>openViewer(index));
  });
  let current=0,zoom=1,previousFocus=null;
  function applyZoom(){picture.style.transform=`scale(${zoom})`;$('#zoomDisplay').textContent=Math.round(zoom*100)+'%'}
  function openViewer(index){
    previousFocus=document.activeElement;
    current=index;zoom=1;
    showItem();
    lightbox.hidden=false;lightbox.setAttribute('aria-hidden','false');
    document.body.classList.add('modal-open');
    $('#viewerClose').focus();
  }
  function showItem(){
    const item=items[current];
    picture.src=item.src;picture.alt=item.alt;
    caption.textContent=item.caption;
    $('#viewerCounter').textContent=String(current+1).padStart(2,'0')+' / '+String(items.length).padStart(2,'0');
    zoom=1;applyZoom();
  }
  function closeViewer(){
    lightbox.hidden=true;lightbox.setAttribute('aria-hidden','true');
    document.body.classList.remove('modal-open');
    picture.removeAttribute('src');
    previousFocus?.focus?.();
  }
  function next(step){current=(current+step+items.length)%items.length;showItem()}
  $('#viewerClose').addEventListener('click',closeViewer);
  $('.lightbox-backdrop').addEventListener('click',closeViewer);
  $('#viewerPrev').addEventListener('click',()=>next(-1));
  $('#viewerNext').addEventListener('click',()=>next(1));
  $('#zoomIn').addEventListener('click',()=>{zoom=Math.min(3,Math.round((zoom+.25)*100)/100);applyZoom()});
  $('#zoomOut').addEventListener('click',()=>{zoom=Math.max(1,Math.round((zoom-.25)*100)/100);applyZoom()});
  $('#zoomReset').addEventListener('click',()=>{zoom=1;applyZoom()});
  lightbox.addEventListener('wheel',e=>{if(lightbox.hidden)return;e.preventDefault();zoom=Math.max(1,Math.min(3,zoom+(e.deltaY<0?.2:-.2)));zoom=Math.round(zoom*100)/100;applyZoom()},{passive:false});
  document.addEventListener('keydown',e=>{
    if(lightbox.hidden)return;
    if(e.key==='Escape')closeViewer();
    if(e.key==='ArrowRight')next(1);
    if(e.key==='ArrowLeft')next(-1);
    if(e.key==='+'||e.key==='='){zoom=Math.min(3,zoom+.25);applyZoom()}
    if(e.key==='-'){zoom=Math.max(1,zoom-.25);applyZoom()}
    if(e.key==='Tab'){
      const focusable=$$('button').filter(b=>lightbox.contains(b));
      if(!focusable.length)return;
      const first=focusable[0],last=focusable[focusable.length-1];
      if(e.shiftKey && document.activeElement===first){last.focus();e.preventDefault()}
      else if(!e.shiftKey && document.activeElement===last){first.focus();e.preventDefault()}
    }
  });
  let touchX=null;
  $('#viewerStage').addEventListener('touchstart',e=>{if(e.touches.length===1)touchX=e.touches[0].clientX},{passive:true});
  $('#viewerStage').addEventListener('touchend',e=>{if(touchX===null||zoom>1)return;const delta=e.changedTouches[0].clientX-touchX;if(Math.abs(delta)>65)next(delta<0?1:-1);touchX=null},{passive:true});
})();
