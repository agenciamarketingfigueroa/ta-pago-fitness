const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav');
function closeMenu(){nav?.classList.remove('open');menuButton?.setAttribute('aria-expanded','false');menuButton?.setAttribute('aria-label','Abrir menu');}
menuButton?.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');nav.classList.toggle('open',open);});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav?.classList.contains('open')){closeMenu();menuButton.focus();}});
document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))closeMenu();});
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  const category=button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  let count=0; document.querySelectorAll('[data-category]').forEach(card=>{card.hidden=category!=='all'&&card.dataset.category!==category;if(!card.hidden)count++;});
  document.querySelector('#filter-status').textContent=`${count} ${count===1?'produto encontrado':'produtos encontrados'}.`;
}));
const prompts={trocas:'“Sugira uma alternativa ao cottage desta refeição que combine com as minhas preferências.”',compras:'“Com base nas refeições que organizamos, crie uma lista de compras para 15 dias, incluindo a quantidade de cada ingrediente.”'};
document.querySelectorAll('[data-prompt]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('[data-prompt]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
 document.querySelector('#prompt-text').textContent=prompts[button.dataset.prompt];
 document.querySelector('#copy-prompt').textContent='Copiar ↗';
}));
document.querySelector('#copy-prompt')?.addEventListener('click',async e=>{
 const button=e.currentTarget;
 const value=document.querySelector('#prompt-text').textContent;
 try{await navigator.clipboard.writeText(value);button.textContent='Copiado ✓';document.querySelector('#copy-status').textContent='Exemplo copiado.';}
 catch{document.querySelector('#copy-status').textContent='Não foi possível copiar automaticamente. Selecione o texto do exemplo para copiar.';const range=document.createRange();range.selectNodeContents(document.querySelector('#prompt-text'));window.getSelection().removeAllRanges();window.getSelection().addRange(range);button.textContent='Selecione e copie';}
});
