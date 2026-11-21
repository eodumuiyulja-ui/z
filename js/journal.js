(function(){
'use strict';
const O=window.O,A=O.A,G=window.G,S=G.S,$=s=>document.querySelector(s);
const sleep=ms=>new Promise(r=>setTimeout(r,O.s.anim?ms:0));
const D=window.DIMS.filter(d=>d.id!=='void');
$('#jg').innerHTML=D.map(d=>{const v=S.vis[d.id];return '<div class="jd'+(v?' vis':'')+'"><span class="im" style="background-image:url(images/dim_'+d.id+'.jpg)"></span><b>'+(v?d.n:d.id==='astra'?d.e:'???')+'</b><span class="mono sm">'+(v?'VISITED':d.id==='astra'?'SEALED':'UNVISITED')+'</span></div>'}).join('');
const dest=e=>e.k==='visit'?window.DIMS.find(d=>d.id===e.dim).e:e.k==='req'?e.dest:e.k==='reg'?'CENTRAL HUB':'▒▒▒▒';
const stt=e=>({visit:'VISITED',req:'COMPLETED',reg:'REGISTERED',trace:'VISITED'})[e.k];
const pad=n=>String(n).padStart(3,'0');
$('#lg').innerHTML=S.log.map((e,i)=>'<article class="lg'+(e.k==='trace'?' tr':'')+'"><p class="mono sm">TRAVEL LOG / '+pad(e.n)+' · '+e.t+'</p><p class="mono">TRAVELER: USER<br>RANK: CLASS 05<br>DESTINATION: '+dest(e)+'<br>STATUS: '+stt(e)+'</p><p class="en"></p></article>').join('');
const els=[...document.querySelectorAll('.lg .en')];
(async function(){
 for(let i=0;i<els.length;i++){
  const t=S.log[i].x;
  if(i<S.seen||!O.s.anim){els[i].textContent=t;continue}
  for(const ch of t){els[i].textContent+=ch;if(Math.random()<.3)A.tick();await sleep(22)}
 }
 S.seen=S.log.length;G.save();
})();
})();
