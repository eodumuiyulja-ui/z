(function(){
'use strict';
const O=window.O,A=O.A,G=window.G,S=G.S,$=s=>document.querySelector(s);
const hold=ms=>new Promise(r=>setTimeout(r,ms));
const R=[
{id:'REQ-001',t:'마도원 주변 지형 기록',en:'ARCANE SURVEY',dim:'에르네스 왕국',rk:'LOW',cr:80,d:'왕립 마도원 주변의 지형과 마나석 분포를 기록해 허브에 전달한다.'},
{id:'REQ-002',t:'차원 구조 측량',en:'DIMENSIONAL SURVEY',dim:'크롬 유니온',rk:'MODERATE',cr:120,d:'차원 연구 시설과 협력해 차원의 좌표와 이동 가능성을 측량한다.'},
{id:'REQ-003',t:'픽서 연락망 전달',en:'INFORMATION RELAY',dim:'네온 베일',rk:'LOW',cr:60,d:'픽서 네트워크에 정보를 전달하고 수령 확인을 받아온다.'},
{id:'REQ-004',t:'미확인 현상 보도 조사',en:'ANOMALY REPORT CHECK',dim:'지구-17',rk:'MODERATE',cr:100,d:'차원 은폐 원칙에 따라, 설명하기 어려운 사건 보도의 출처를 눈에 띄지 않게 확인한다.'},
{id:'REQ-005',t:'별의 조각 발생지 확인',en:'STAR SHARD SURVEY',dim:'스텔라 블룸',rk:'HIGH',cr:200,d:'오염된 별의 힘으로 별의 조각이 나타난 장소를 확인하고 상태를 기록한다.'},
{id:'REQ-006',t:'관문 이상 점검',en:'GATE ANOMALY CHECK',dim:'중앙 허브',rk:'HIGH',cr:240,d:'불안정한 관문의 연결 상태를 점검하고 관문 관리부에 보고한다.'}
];
const st=id=>S.req[id]||'open',ST={open:'OPEN',acc:'ACCEPTED',done:'COMPLETED'};
const rb=$('#rb'),cf=$('#cf'),rw=$('#rw');
function draw(first){
 $('#sm').innerHTML='CREDITS <b>'+S.cr+'</b> · LV <b>'+G.lv()+'</b> · COMPLETED <b>'+R.filter(r=>st(r.id)==='done').length+'/'+R.length+'</b>';
 rb.innerHTML=R.map((r,i)=>'<article class="rq r-'+r.rk+' s-'+st(r.id)+(first?' rise':'')+'" style="animation-delay:'+(i*.08)+'s"><div class="rh mono"><span>'+r.id+'</span><span class="rk">RISK · '+r.rk+'</span></div><h3>'+r.t+'</h3><p class="mono sm">DIMENSION · '+r.dim+' &nbsp; REWARD · '+r.cr+' CR</p><p>'+r.d+'</p><div class="rf"><span class="stt mono">'+ST[st(r.id)]+'</span>'+(st(r.id)==='open'?'<button class="holo" data-a="acc" data-id="'+r.id+'" data-ns>수락</button>':st(r.id)==='acc'?'<button class="holo" data-a="done" data-id="'+r.id+'" data-ns>완료 보고</button>':'')+'</div></article>').join('');
}
draw(true);
let pend=null;
rb.addEventListener('click',e=>{
 const b=e.target.closest('button[data-a]');if(!b||b.disabled)return;
 const r=R.find(x=>x.id===b.dataset.id);
 if(b.dataset.a==='acc'){pend=r;cf.innerHTML='<div class="wr cf mono"><div class="ln">REQUEST CONFIRMATION</div><div class="ln">&nbsp;</div><div class="ln">MISSION: '+r.en+'</div><div class="ln">RISK LEVEL: '+r.rk+'</div><div class="ln">REWARD: '+r.cr+' CREDITS</div><div class="ln">&nbsp;</div><div class="ln">ACCEPT THIS REQUEST?</div><div class="cb"><button class="ghost" id="ok">ACCEPT</button><button class="ghost" id="no">CANCEL</button></div></div>';cf.hidden=false}
 else complete(r,b);
});
cf.addEventListener('click',e=>{
 if(e.target===cf||e.target.closest('#no')){cf.hidden=true;return}
 if(e.target.closest('#ok')){S.req[pend.id]='acc';G.save();A.ok();cf.hidden=true;draw()}
});
async function complete(r,b){
 b.disabled=true;b.textContent='REPORTING...';A.tone(600,.6,'triangle',.08,0,900);
 await hold(O.s.anim?1500:0);
 const xp=r.cr/2,lv0=G.lv();S.req[r.id]='done';S.cr+=r.cr;S.xp+=xp;
 G.add({k:'req',dest:r.dim,x:'['+r.id+'] '+r.t+' 완료. 보상 '+r.cr+' CR.'});
 draw();reward(r.cr,xp,G.lv()>lv0);
}
function reward(cr,xp,up){
 rw.innerHTML='<div class="rwb mono"><div class="ln">REQUEST COMPLETED</div><div class="big1">+<span data-n="'+cr+'">0</span> CREDITS</div><div class="big1">+<span data-n="'+xp+'">0</span> XP</div>'+(up?'<div class="lvup">LEVEL UP · LV '+G.lv()+'</div>':'')+'</div>';rw.hidden=false;A.ok();
 rw.querySelectorAll('[data-n]').forEach(el=>{const v=+el.dataset.n;if(!O.s.anim){el.textContent=v;return}const t0=performance.now(),step=t=>{const p=Math.min(1,(t-t0)/900);el.textContent=Math.round(v*p);if(p<1){requestAnimationFrame(step);if(Math.random()<.2)A.tick()}};requestAnimationFrame(step)});
 setTimeout(()=>{rw.hidden=true},O.s.anim?2600:1600);
}
rw.addEventListener('click',()=>{rw.hidden=true});
})();
