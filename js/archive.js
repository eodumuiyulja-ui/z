(function(){
'use strict';
const O=window.O,A=O.A,$=s=>document.querySelector(s);
const sleep=ms=>new Promise(r=>setTimeout(r,O.s.anim?ms:0));
const U=['발신자: 확인되지 않음\n수신 위치: 중앙 허브\n\n"그 문을 열지 마세요."','발신자: 확인되지 않음\n수신 위치: 중앙 허브\n\n"그 문은 이미 열려 있었어요."','발신자: 확인되지 않음\n수신 위치: 중앙 허브\n\n"아직... 기억해야 할 게 있어요."'];
const DOC=[
{id:'A-001',g:'PUBLIC',t:'오르비스 개요',x:'오르비스는 서로 다른 차원을 연결하고 관리하는 중립적인 초차원 조직이다.\n차원의 균형 유지와 문명 보호를 목적으로 하며, 차원 탐사·관문 관리·무역과 교류·오염 조사 및 대응을 수행한다.'},
{id:'A-002',g:'PUBLIC',t:'차원 분류 체계 안내',x:'A형 현대 문명형 / B형 마법·판타지형 / C형 기계·첨단과학형 / D형 초능력형 / E형 특수환경형 / X형 미확인형.\n\n분류는 차원의 환경과 문명 구조를 나타내며 위험도를 뜻하지 않는다.'},
{id:'A-003',g:'PUBLIC',t:'차원 오염 단계 안내',x:'오염 단계: 1 잠복기 / 2 발현기 / 3 확산기 / 4 붕괴 직전.\n개체 감염: 1 잠식 / 2 동화 시작 / 3 변질 / 4 완전 감염.\n\n초기에는 조사와 확산 방지, 확산기에는 강력한 격리와 출입 통제, 붕괴 직전에는 차원 봉인을 검토한다.'},
{id:'R-014',g:'RESTRICTED',t:'봉인 차원 지정 기록: 아스트라 폴',x:'사유: 대규모 차원 오염 확산.\n조치: 출입 금지, 관문 폐쇄.\n비고: 오염 잔향 및 생존 기록은 별도 열람 대상이다.'},
{id:'R-021',g:'RESTRICTED',t:'관문 이상 대응 지침',x:'관문이 불안정해지면 연결이 끊기거나 붕괴할 수 있다. 관문 붕괴는 주변 공간과 연결된 차원에 영향을 줄 수 있다.\n\n이상을 감지하면 관문 관리부와 안전 관리부에 즉시 보고한다.'},
{id:'C-001',g:'CLASSIFIED',t:'중앙 평의회 기록: 의장',x:'의장: 아르카디아 벨\n출신: [[기원 불명 — 기록 삭제됨]]\n나이: [[기록 삭제됨]]\n비고: [[열람 권한 부족]]'},
{id:'C-002',g:'CLASSIFIED',t:'오르비스 설립 초기 기록',x:'설립 시기: [[기록 누락]]\n설립자: [[기록 누락]]\n설립 목적: [[기록 누락]]\n\n※ 설립 초기 기록의 일부가 존재하지 않습니다.'},
{id:'K-007',g:'CORRUPTED',t:'관측 로그: 보이드 머로우',x:'관측 대상: 보이드 머로우\n상태: 관측 불가\n\n신호가 간헐적으로 포착되었으나 발신원을 특정할 수 없다. 기록이 손상되어 일부 내용을 복구하지 못했다.'},
{id:'K-008',g:'CORRUPTED',t:'인원 기록 복구 실패',x:'SUBJECT ID: EDEN-???\nIMAGE DATA: DAMAGED\nRECORD RECOVERY: FAILED\n\n이 기록은 복구할 수 없습니다.'},
{id:'U-001',g:'UNKNOWN',t:'출처 불명 전송',x:''}
];
const H={id:'???',g:'UNKNOWN',t:'삭제된 문서 (복구 중)',x:'열람 기록: 없음\n삭제자: 확인되지 않음\n\n...이 문서는 목록에 존재하지 않습니다.'};
const dl=$('#dl'),ov=$('#rd'),tabs=$('#tabs');
let flt='ALL',vw={},ui=0,timer=0,tok=0;
try{vw=JSON.parse(O.store.get('orbis_arch'))||{}}catch(e){}
const row=d=>'<button class="doc g-'+d.g+(d===H?' ghostdoc':'')+'" data-id="'+d.id+'"><span class="gd mono">'+d.g+'</span><span>'+d.t+'</span><span class="mono sm">'+d.id+'</span></button>';
function list(){dl.innerHTML=DOC.filter(d=>flt==='ALL'||d.g===flt).map(row).join('')}
tabs.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;flt=b.dataset.f;tabs.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));list()});
list();
if(vw['K-007']&&vw['U-001']&&!O.store.get('orbis_h1')){
 O.store.set('orbis_h1','1');dl.insertAdjacentHTML('afterbegin',row(H));A.glitch();
 setTimeout(()=>{const g=dl.querySelector('.ghostdoc');if(g)g.remove()},6000);
}
dl.addEventListener('click',e=>{const b=e.target.closest('.doc');if(!b)return;const d=b.dataset.id==='???'?H:DOC.find(x=>x.id===b.dataset.id);d.g==='RESTRICTED'?gate(d):read(d)});
function gate(d){
 ov.innerHTML='<div class="rdr" style="--c:#e0c46a"><button class="x" aria-label="닫기">✕</button><p class="mono sm">RESTRICTED</p><h2>'+d.t+'</h2><p class="mono">권한 확인이 필요합니다.<br>현재 권한: CLASS 05 (임시)</p><button class="holo" id="auth" data-ns>REQUEST ACCESS</button></div>';ov.hidden=false;
 $('#auth').onclick=()=>{A.ok();read(d)};
}
async function read(d){
 const my=++tok;clearInterval(timer);
 let x=d.x;if(d.g==='UNKNOWN'&&d!==H){x=U[ui++%U.length]}
 ov.innerHTML='<div class="rdr" style="--c:var(--cy)"><button class="x" aria-label="닫기">✕</button><p class="mono sm">'+d.g+' · '+d.id+'</p><h2>'+d.t+'</h2><pre id="pr"></pre></div>';ov.hidden=false;
 const pr=$('#pr');
 vw[d.id]=1;O.store.set('orbis_arch',JSON.stringify(vw));
 if(d.g==='CORRUPTED'){
  pr.textContent=x;A.glitch();
  timer=setInterval(()=>{pr.textContent=x.replace(/[^\s\n]/g,c=>Math.random()<.09?'▒▓░#%/'[Math.random()*6|0]:c);if(O.s.glitch&&Math.random()<.12)O.glitch(pr,100)},140);return;
 }
 for(const part of x.split(/(\[\[.*?\]\])/g)){
  let el=pr,s=part;if(s.startsWith('[[')){el=document.createElement('span');el.className='rx';pr.appendChild(el);s=s.slice(2,-2)}
  let n=0;for(const ch of s){if(my!==tok)return;el.textContent+=ch;if(++n%3==0)A.tick();await sleep(12)}
 }
}
function close(){tok++;clearInterval(timer);ov.hidden=true}
ov.addEventListener('click',e=>{if(e.target===ov||e.target.closest('.x'))close()});
addEventListener('keydown',e=>{if(e.key==='Escape')close()});
})();
