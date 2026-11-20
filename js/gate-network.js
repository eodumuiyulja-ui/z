(function(){
'use strict';
const O=window.O,A=O.A,D=window.DIMS,$=s=>document.querySelector(s);
const sleep=ms=>new Promise(r=>setTimeout(r,O.s.anim?ms:0));
const sp={ernes:'2.4s',neon:'.6s',earth:'3s',chrome:'1.1s',stella:'1.8s'};
const msg={STABLE:'STABLE — 연결 안정. 허가된 인원의 이동이 가능합니다.',SEALED:'SEALED — 오르비스가 출입을 금지한 차원입니다. 관문은 폐쇄되어 있습니다.',UNDETECTED:'UNDETECTED — 연결을 확인할 수 없습니다.'};
let s='<circle r="34" fill="#07111e" stroke="#3ee6d8" stroke-width="2"/><text class="mono" y="4" fill="#3ee6d8" font-size="11" text-anchor="middle">CH-0001</text>';
let lines='',nodes='';const gone=O.store.get('orbis_void')==='gone';
D.forEach((d,i)=>{
 const a=i/7*Math.PI*2-Math.PI/2,x=Math.round(Math.cos(a)*270),y=Math.round(Math.sin(a)*180),ty=y+(y<0?-20:30),p='M0 0L'+x+' '+y;
 if(d.id==='astra')lines+='<path class="fl sl" d="'+p+'"/><text x="'+x/2+'" y="'+y/2+'" fill="#ff4d5e" font-size="18" text-anchor="middle" dominant-baseline="middle">✕</text>';
 else if(d.id==='void')lines+='<path id="vl" class="vl" pathLength="1" d="'+p+'"/>';
 else lines+='<path class="fl" style="--s:'+(sp[d.id]||'1.4s')+';stroke:'+(d.id==='stella'?'#f4a8ff':'#3ee6d8')+'" d="'+p+'"/>';
 const nc=d.id==='astra'?'#ff4d5e':d.id==='void'?'#4a2f78':'#3ee6d8';
 if(!(d.id==='void'&&gone))nodes+='<g class="nd" data-id="'+d.id+'" tabindex="0" role="button" aria-label="'+d.n+'"><circle cx="'+x+'" cy="'+y+'" r="15" fill="#07111e" stroke="'+nc+'" stroke-width="2"/><circle cx="'+x+'" cy="'+y+'" r="5" fill="'+d.col+'"/><text x="'+x+'" y="'+ty+'">'+d.n+'</text></g>';
});
$('#gn').innerHTML=lines+s+nodes;
const gi=$('#gi'),sg=$('#sig');
function show(id){const d=D.find(x=>x.id===id);gi.innerHTML='<b>'+d.n+'</b> <span class="mono sm">'+d.e+'</span><p>'+msg[d.st]+'</p>';id==='astra'||id==='void'?A.deny():A.ok()}
$('#gn').addEventListener('click',e=>{const n=e.target.closest('.nd');if(n)show(n.dataset.id)});
$('#gn').addEventListener('keydown',e=>{if(e.key==='Enter'){const n=e.target.closest('.nd');if(n)show(n.dataset.id)}});
let on=false;
async function sig(){
 if(on)return;on=true;
 const vl=$('#vl');vl.classList.remove('on');void vl.getBoundingClientRect();vl.classList.add('on');
 sg.hidden=false;sg.textContent='';O.glitch($('#gnw'),150);
 for(const l of ['UNKNOWN SIGNAL DETECTED.','',(gone?'SOURCE: UNKNOWN':'SOURCE: VOID MORROW'),'','SIGNAL STRENGTH: UNSTABLE','...','CONNECTION LOST.']){sg.textContent+=l+'\n';A.tick();await sleep(380)}
 await new Promise(r=>setTimeout(r,2000));sg.hidden=true;on=false;
}
setTimeout(sig,5000);setInterval(sig,16000);
})();
