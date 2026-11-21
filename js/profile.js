(function(){
'use strict';
const O=window.O,A=O.A,G=window.G,S=G.S,$=s=>document.querySelector(s);
const P={
f:{img:'user_female',rows:[['나이','20세'],['등급','5급 트래블러'],['헤어','애쉬 그레이 블루 (머리카락 안쪽은 푸른색)'],['눈동자','푸른빛 눈동자'],['복장','다크 차콜과 딥 슬레이트 블루 여행자 코트'],['차원 단말기','귀걸이 형태의 실버 차원 단말기']]},
m:{img:'user_male',rows:[['나이','20세'],['등급','5급 트래블러'],['헤어','블랙 (숨겨진 퍼플 투톤)'],['눈동자','황금색 눈동자'],['복장','다크 차콜과 블랙 여행자 코트'],['차원 단말기','손목의 실버 차원 단말기']]}};
let g=O.store.get('orbis_gender')==='m'?'m':'f';
function view(){
 const p=P[g];$('#pimg').src='images/'+p.img+'.webp';
 $('#rows').innerHTML=p.rows.map(r=>'<div class="ir"><span>'+r[0]+'</span><span>'+r[1]+'</span></div>').join('');
 document.querySelectorAll('#sw button').forEach(b=>b.classList.toggle('on',b.dataset.g===g));
 const me=$('#me');if(me)me.src='images/'+p.img+'.webp';
}
$('#sw').addEventListener('click',e=>{
 const b=e.target.closest('button');if(!b||b.dataset.g===g)return;
 g=b.dataset.g;O.store.set('orbis_gender',g);
 const pc=$('#pc');pc.classList.remove('scn');void pc.offsetWidth;pc.classList.add('scn');A.tone(900,.4,'sine',.06,0,300);
 setTimeout(view,O.s.anim?500:0);
});
view();
const done=Object.values(S.req).filter(v=>v==='done').length,vis=Object.keys(S.vis).length;
$('#pg').innerHTML='<p class="mono sm">HOMEPAGE PROGRESS · 연출용 진행도</p><p style="margin-top:6px">LV <b>'+G.lv()+'</b> &nbsp; XP '+(S.xp%100)+' / 100</p><div class="bar"><i style="width:'+(S.xp%100)+'%"></i></div><p class="mono sm">CREDITS '+S.cr+' · 완료 의뢰 '+done+' · 방문 차원 '+vis+'</p><p class="mono sm" style="margin-top:8px">공식 등급(CLASS 05)은 오르비스의 기록이며, 이 진행도와는 별개입니다.</p>';
setTimeout(()=>{const r=$('#reg');if(!r||!O.s.glitch||!O.s.anim)return;r.textContent='ORB-REG-0000 · 중복 등록 감지';O.glitch(r,150);setTimeout(()=>{r.textContent='기록 없음'},420)},9000);
})();
