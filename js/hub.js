(function(){
'use strict';
const O=window.O,A=O.A,$=s=>document.querySelector(s);
$('#me').src='images/user_'+(O.store.get('orbis_gender')==='m'?'male':'female')+'.webp';
const gone=O.store.get('orbis_void')==='gone';
if(gone){const a=$('[data-n="7"]');a.dataset.n=6;a.textContent=6;const gb=$('.card.warn b');gb.lastChild.textContent='/6';gb.nextElementSibling.textContent='STABLE · SEALED 1';$('.news').querySelectorAll('.bd')[2].textContent='6개 차원 중 5개는 안정적으로 연결되어 있습니다. 1개는 봉인 상태입니다.'}
const cols=['#c46b6b','#e0c46a','#ff4fd8','#8ea4c4','#a9ecff','#f4a8ff','#5a2f82'];let n='';
cols.forEach((c,i)=>{if(i==6&&gone)return;const a=i/7*Math.PI*2-Math.PI/2,x=(Math.cos(a)*78).toFixed(1),y=(Math.sin(a)*78).toFixed(1);n+='<line x1="0" y1="0" x2="'+x+'" y2="'+y+'" stroke="'+c+'" stroke-opacity=".35"/><circle'+(i==6?' class="nv"':'')+' cx="'+x+'" cy="'+y+'" r="5" fill="'+c+'" stroke="none"/>'});
$('#nodes').innerHTML=n;
const h=$('#h1');let k=0;
'BEYOND EVERY DIMENSION.'.split(' ').forEach((w,wi,arr)=>{const s=document.createElement('span');s.className='w';s.setAttribute('aria-hidden','true');[...w].forEach(c=>{const e=document.createElement('span');e.className='ch';e.style.setProperty('--d',(.3+k++*.045).toFixed(2)+'s');e.textContent=c;s.appendChild(e)});h.appendChild(s);if(wi<arr.length-1)h.appendChild(document.createTextNode(' '))});
document.querySelectorAll('[data-n]').forEach(el=>{const v=+el.dataset.n;if(!O.s.anim){el.textContent=v;return}const t0=performance.now()+300,step=t=>{const p=Math.min(1,Math.max(0,(t-t0)/1200));el.textContent=Math.round(v*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(step)};requestAnimationFrame(step)});
document.addEventListener('click',e=>{if(e.target.closest('[data-lock],a.lock')){e.preventDefault();O.toast('SECTION OFFLINE — 준비 중인 구역입니다.');A.deny()}});
document.querySelectorAll('.hd').forEach(b=>b.addEventListener('click',()=>{const bd=b.nextElementSibling,open=bd.hidden;bd.hidden=!open;b.setAttribute('aria-expanded',String(open));const nw=b.querySelector('.new');if(open&&nw)nw.remove()}));
document.querySelectorAll('[data-href]').forEach(b=>b.addEventListener('click',()=>O.go(b.dataset.href)));
const hero=$('#hero');
hero.addEventListener('pointermove',e=>{if(!O.s.anim)return;const r=hero.getBoundingClientRect();hero.style.setProperty('--mx',(e.clientX-r.left)+'px');hero.style.setProperty('--my',(e.clientY-r.top)+'px')});
setInterval(()=>O.glitch($('.brand'),150),18000);
})();
