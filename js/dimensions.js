(function(){
'use strict';
const O=window.O,A=O.A,D=window.DIMS,$=s=>document.querySelector(s);
const sleep=ms=>new Promise(r=>setTimeout(r,O.s.anim?ms:0)),hold=ms=>new Promise(r=>setTimeout(r,ms));
const grid=$('#grid'),dv=$('#dv'),al=$('#alert'),crt=$('#crt');
let busy=false,hs=[];
grid.innerHTML=(O.store.get('orbis_void')==='gone'?D.filter(x=>x.id!=='void'):D).map(d=>'<button class="dc fx-'+d.id+'" style="--c:'+d.col+'" data-id="'+d.id+'"><span class="art" style="background-image:url(images/dim_'+d.id+'.jpg)"></span><span class="cd mono">'+d.c+'</span><span class="st mono">'+d.st+'</span><b>'+d.n+'</b><span class="nf mono">DIMENSION NOT FOUND</span><span class="sm mono">'+d.e+' · '+d.t+'</span>'+(d.id==='void'?'<i class="hs"></i>':'')+'</button>').join('');
grid.addEventListener('click',e=>{
 const c=e.target.closest('.dc');if(!c||busy)return;
 const d=D.find(x=>x.id===c.dataset.id);
 if(e.target.closest('.hs')){const t=Date.now();hs=hs.filter(x=>t-x<5000);hs.push(t);if(hs.length>=5){hs=[];secret(c)}return}
 d.id==='void'?voidEvt(c):open(d);
});
function secret(c){const b=c.querySelector('b'),o=b.textContent;b.textContent='▒▒▒▒▒▒';O.glitch($('main'),200);setTimeout(()=>{b.textContent=o},260)}
function flick(){if(!O.s.anim||!O.s.glitch)return 0;return setInterval(()=>{al.style.opacity=Math.random()<.4?(.35+Math.random()*.5).toFixed(2):'1';al.style.transform=Math.random()<.25?'translateX('+(Math.random()*12-6).toFixed(1)+'px)':'none'},70)}
function unflick(t){clearInterval(t);al.style.opacity='';al.style.transform=''}
function strong(){if(!O.s.glitch)return;const h=document.documentElement;if(O.s.anim)h.classList.add('big');A.noise(.6,.25,400,7000);A.tone(70,.5,'sawtooth',.2,0,25);setTimeout(()=>h.classList.remove('big'),650)}
function line(wl,l){wl.insertAdjacentHTML('beforeend','<div class="ln">'+(l||'&nbsp;')+'</div>');A.tick()}
async function voidEvt(c){
 if(O.store.get('orbis_void')==='seen')return vanish(c);
 busy=true;c.classList.add('blk');A.deny();
 al.innerHTML='<div class="wr void mono" id="wl"></div>';al.hidden=false;
 const wl=$('#wl'),fl=flick();
 for(const l of ['SEARCHING DIMENSION...','','NO DATA FOUND.','','...','SIGNAL DETECTED.','','CONNECTION LOST.']){
  line(wl,l);if(l==='SIGNAL DETECTED.')strong();
  await sleep(l==='SIGNAL DETECTED.'?800:420);
 }
 O.glitch(wl,150);await hold(1100);
 unflick(fl);al.hidden=true;c.classList.remove('blk');O.store.set('orbis_void','seen');busy=false;
}
async function vanish(c){
 busy=true;c.classList.add('blk');A.deny();
 al.innerHTML='<div class="wr void mono" id="wl"></div>';al.hidden=false;
 const wl=$('#wl'),fl=flick();
 for(const l of ['...','차원을 보지 못합니다.','','FORCED SHUTDOWN...']){line(wl,l);await sleep(560)}
 strong();await hold(900);unflick(fl);
 crt.classList.remove('fo');crt.hidden=false;A.tone(240,.9,'sawtooth',.2,0,30);A.noise(.7,.2,4000,200);
 await hold(1800);
 al.hidden=true;c.remove();O.store.set('orbis_void','gone');
 crt.classList.add('fo');await hold(700);crt.hidden=true;crt.classList.remove('fo');busy=false;
}
function open(d){
 if(window.G)G.visit(d.id);
 dv.innerHTML='<div class="dp" style="--c:'+d.col+'"><button class="x" aria-label="닫기">✕</button><div class="bn" style="background-image:url(images/dim_'+d.id+'.jpg)"></div><p class="kicker mono" style="color:'+d.col+'">'+d.c+' · '+d.t+'</p><h2>'+d.n+'</h2><p class="mono sm">'+d.e+' · '+d.st+'</p><h3>세계의 특징</h3><p>'+d.d+'</p><h3>문명과 사회 구조</h3><p>'+d.s+'</p><h3>주요 지역</h3><p>기록 없음 — 오르비스 조사 대기 중.</p><h3>오르비스 관측 상태</h3><p>'+d.o+'</p><h3>고유 용어</h3><div class="chips">'+d.k.map((k,i)=>'<button data-i="'+i+'">'+k[0]+'</button>').join('')+'</div><div class="tip" hidden></div><h3>관련 인물</h3><p>'+d.p.join(', ')+'</p>'+(d.id==='astra'?'<button class="holo" id="req" data-ns>ENTRY REQUEST</button>':'')+'</div>';
 dv.hidden=false;dv._d=d;
}
dv.addEventListener('click',e=>{
 const d=dv._d;
 if(e.target===dv||e.target.closest('.x')){dv.hidden=true;return}
 const k=e.target.closest('.chips button');
 if(k){const tip=dv.querySelector('.tip'),on=k.classList.contains('on');dv.querySelectorAll('.chips button').forEach(b=>b.classList.remove('on'));if(on){tip.hidden=true;return}k.classList.add('on');tip.hidden=false;tip.innerHTML='<b>'+d.k[+k.dataset.i][0]+'</b>'+d.k[+k.dataset.i][1];return}
 const r=e.target.closest('#req');if(r)denied(r);
});
async function denied(btn){
 btn.disabled=true;btn.textContent='ACCESS LOCKED';
 const dp=dv.querySelector('.dp');document.body.classList.add('shake');dp.classList.add('distort');A.deny();O.glitch(dp,150);
 setTimeout(()=>{document.body.classList.remove('shake');dp.classList.remove('distort')},800);
 await hold(O.s.anim?800:0);
 al.innerHTML='<div class="wr mono">'+['WARNING','DIMENSIONAL ACCESS PROHIBITED.','','DIMENSION: ASTRA FALL','STATUS: SEALED','','ENTRY REQUEST DENIED.'].map(l=>'<div class="ln">'+(l||'&nbsp;')+'</div>').join('')+'<button class="ghost" id="ac">CLOSE</button></div>';
 al.hidden=false;A.deny();
}
al.addEventListener('click',e=>{if(busy)return;if(e.target===al||e.target.closest('#ac'))al.hidden=true});
addEventListener('keydown',e=>{if(e.key==='Escape'&&!busy){al.hidden=true;dv.hidden=true}});
const hh=location.hash.slice(1),hd=D.find(x=>x.id===hh);if(hd&&hh!=='void')open(hd);
})();
