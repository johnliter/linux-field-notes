(() => {
  'use strict';
  const guides = window.FIELD_GUIDES || [];
  const $ = id => document.getElementById(id);
  const esc = input => String(input ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let currentCategory = 'All guides';
  let lastFocus = null;
  const fmtDate = date => new Date(`${date}T12:00:00`).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
  const categories = ['All guides',...new Set(guides.map(g=>g.category))];
  $('guide-count').textContent = String(guides.length).padStart(2,'0');
  $('confirmed-count').textContent = String(guides.filter(g=>g.status==='Recovery confirmed').length).padStart(2,'0');
  function drawFilters() {
    $('filters').innerHTML = categories.map(c=>`<button type="button" class="filter ${c===currentCategory?'active':''}" data-category="${esc(c)}" aria-pressed="${c===currentCategory}">${esc(c)}</button>`).join('');
    $('filters').querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{currentCategory=b.dataset.category;drawFilters();drawGuides();}));
  }
  function drawGuides(){
    const q=$('search').value.trim().toLowerCase();
    const filtered=guides.filter(g=>(currentCategory==='All guides'||g.category===currentCategory)&&[g.title,g.summary,g.category,g.platform,...g.tags,...g.symptoms].join(' ').toLowerCase().includes(q));
    $('guide-list').innerHTML=filtered.map(g=>`<article class="guide-card"><div class="card-top"><span class="case-label">CASE ${esc(g.number)}</span><span class="card-status"><span class="status-dot"></span>${esc(g.status)}</span></div><span class="card-category">${esc(g.category)} / ${esc(g.platform)}</span><h3>${esc(g.title)}</h3><p>${esc(g.summary)}</p><div class="tag-row">${g.tags.slice(0,4).map(t=>`<span>${esc(t)}</span>`).join('')}</div><div class="card-bottom"><span>${esc(fmtDate(g.date))}</span><button type="button" class="text-link" data-open="${esc(g.id)}">Read guide <span aria-hidden="true">↗</span></button></div></article>`).join('');
    $('no-results').hidden=filtered.length>0;
    $('guide-list').querySelectorAll('[data-open]').forEach(b=>b.addEventListener('click',()=>{lastFocus=b;openGuide(b.dataset.open);}));
  }
  const codeBlock=command=>`<div class="code-line"><code>${esc(command)}</code><button type="button" class="copy-btn" data-command="${esc(command)}" aria-label="Copy command">Copy</button></div>`;
  function openGuide(id){
    const g=guides.find(g=>g.id===id);if(!g)return;
    $('guide-detail').innerHTML=`<div class="detail-top"><div><span class="case-label">FIELD REPORT / CASE ${esc(g.number)}</span><h2>${esc(g.title)}</h2><p>${esc(g.summary)}</p></div><button type="button" class="close-detail" id="close-detail" aria-label="Close guide">×</button></div><div class="detail-layout"><div><div class="detail-section"><h3>Symptoms</h3><ul>${g.symptoms.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div><div class="detail-section"><h3>Recovery procedure</h3>${g.steps.map((s,i)=>`<div class="step"><div class="step-label">STEP ${String(i+1).padStart(2,'0')}</div><h4>${esc(s.title)}</h4><p>${esc(s.explanation)}</p>${codeBlock(s.command)}</div>`).join('')}</div><div class="detail-section"><h3>Observed evidence</h3><ul>${g.evidence.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div></div><aside><div class="side-note"><span class="aside-title">VERIFICATION STATUS</span><strong>${esc(g.status)}</strong><p>${esc(g.caveat)}</p></div><div class="side-note"><span class="aside-title">SAFETY NOTE</span><p>${esc(g.safety)}</p></div><div class="side-note"><span class="aside-title">ENVIRONMENT</span><p>${esc(g.platform)}<br>${esc(fmtDate(g.date))}</p></div></aside></div>`;
    $('guide-detail').hidden=false;
    $('guide-detail').querySelector('#close-detail').addEventListener('click',closeGuide);
    $('guide-detail').querySelectorAll('.copy-btn').forEach(b=>b.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(b.dataset.command);b.textContent='Copied';setTimeout(()=>b.textContent='Copy',1800);}catch(e){const selection=window.getSelection();const range=document.createRange();range.selectNodeContents(b.previousElementSibling);selection.removeAllRanges();selection.addRange(range);b.textContent='Select & copy';}}));
    $('guide-detail').scrollIntoView({behavior:'smooth',block:'start'});
    $('guide-detail').focus({preventScroll:true});
  }
  function closeGuide(){ $('guide-detail').hidden=true; $('guide-detail').innerHTML='';lastFocus?.focus(); }
  $('search').addEventListener('input',drawGuides);
  document.addEventListener('keydown',e=>{if(e.key==='/'&&!['INPUT','TEXTAREA'].includes(document.activeElement?.tagName)){e.preventDefault();$('search').focus();}if(e.key==='Escape'&&!$('guide-detail').hidden)closeGuide();});
  drawFilters();drawGuides();
})();
