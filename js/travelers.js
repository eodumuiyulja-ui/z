(function(){
'use strict';
const O=window.O,A=O.A,C=window.CH,$=s=>document.querySelector(s);
const sleep=ms=>new Promise(r=>setTimeout(r,O.s.anim?ms:0)),hold=ms=>new Promise(r=>setTimeout(r,ms));
const tg=$('#tg'),tv=$('#tv'),tf=$('#tf'),qb=$('#qb'),root=document.documentElement;
const DN={astra:'아스트라 폴',ernes:'에르네스 왕국',neon:'네온 베일',earth:'지구-17',chrome:'크롬 유니온',stella:'스텔라 블룸'};
let TF={};try{TF=JSON.parse(O.store.get('orbis_tf'))||{}}catch(e){}
let cur=null,rt=0,et=0,qt=0;
const nm=c=>c.tn&&TF[c.id]?c.tn:c.n;
const im=c=>'images/'+(c.img2&&TF[c.id]?c.img2:c.img)+'.jpg';
const cards=()=>C.map(c=>'<button class="tc'+(c.id==='eden'?' cor':'')+(c.id==='yuri'?' sp1':c.id==='ren'?' sp2':'')+'" style="--c:'+c.col+'" data-id="'+c.id+'"><img src="'+im(c)+'" alt="" loading="lazy"><span class="ti"><b class="nm">'+(c.id==='eden'?'에덴':nm(c))+'</b><span class="dt mono">ORIGIN · '+(c.id==='eden'||!c.dim?'▒▒▒':DN[c.dim])+'</span><span class="dt">'+c.sr+'</span><span class="dt mono st">'+c.st+'</span></span></button>').join('');
tg.innerHTML=cards();
setInterval(()=>{if(!O.s.glitch||!O.s.anim)return;const n=tg.querySelector('.cor .nm');if(!n)return;n.textContent=['▒▒▒','EDEN-???','에▒'][Math.random()*3|0];setTimeout(()=>{n.textContent='에덴'},140)},2600);
tg.addEventListener('click',e=>{const b=e.target.closest('.tc');if(!b)return;const c=C.find(x=>x.id===b.dataset.id);c.id==='eden'?edenRec():rec(c)});

const rx=s=>s.split(/(\[\[.*?\]\])/g).map(p=>p.startsWith('[[')?'<span class="rx">'+p.slice(2,-2)+'</span>':p.replace(/\n/g,'<br>')).join('');
function body(c,k){
 if(k==='look')return rx(c.look);
 if(k==='abl')return rx(c.abl)+(c.id==='lilia'?'<div class="mg" id="mg" tabindex="0" role="button"><span class="mono sm">MAGIC RECORD · RESTRICTED</span><i>ᚠᚢᚦᚨᚱᚲ ᚷᚹᚺᚾᛁᛃ ᛇᛈᛉᛊᛏᛒ</i><i>ᛖᛗᛚᛜᛞᛟ ᚠᚨᚱᚲᚷᚹ ᚺᚾᛁᛃᛇᛈ</i></div>':'');
 return rx(c.past);
}
function rec(c){
 cur=c;const my=++rt;clearInterval(et);
 const row=(a,b)=>'<div class="ir"><span>'+a+'</span><span>'+b+'</span></div>';
 const rows=c.id==='arcadia'?row('소속·직책',c.role)+['출신','나이','종족'].map(k=>'<button class="ir lk"><span>'+k+'</span><span class="rx">▒▒▒▒▒</span></button>').join(''):row('소속·직책',c.role)+row('출신',DN[c.dim]);
 const T=[['look','외형 및 복장'],c.abl?['abl','능력 및 전투방식']:null,['past','과거사']].filter(Boolean);
 tv.innerHTML='<div class="rc" style="--c:'+c.col+'"><button class="x" aria-label="닫기">✕</button><div><div class="pic"><img id="pim" src="'+im(c)+'" alt=""><i class="scan"></i></div>'+(c.img2?'<button class="holo tfb" id="tfb" data-ns>'+(TF[c.id]?'변신 해제':'변신')+'</button>':'')+'</div><div><p class="kicker mono">'+c.st+'</p><h2 id="rn">'+nm(c)+'</h2><div>'+rows+'</div><p class="q">'+c.q+'</p><div id="az" class="az mono" hidden></div><div class="tabs mono">'+T.map((t,i)=>'<button data-t="'+t[0]+'"'+(i?'':' class="on"')+'>'+t[1]+'</button>').join('')+'</div><div id="tb" class="tb"></div><div class="ft">'+(c.dim?'<button class="ghost mono" id="gd">출신 차원으로 이동</button>':'<button class="ghost mono" disabled>ORIGIN: CLASSIFIED</button>')+'<button class="ghost mono" id="cl">기록 닫기</button></div></div></div>';
 tv.hidden=false;tab('look');
 if(c.id==='zeon')analysis(my);
}
function ring(rc,k){rc.classList.remove('mgc','mgg');void rc.offsetWidth;rc.classList.add(k)}
function tab(k){
 const c=cur,tb=$('#tb'),az=$('#az'),rc=tv.querySelector('.rc');
 if(c.id!=='zeon')az.hidden=true;
 if(k==='past'&&c.lock){lockPast(c,rc,tb,az);return}
 tv.querySelectorAll('.tabs button').forEach(b=>b.classList.toggle('on',b.dataset.t===k));
 tb.innerHTML=body(c,k);
 if(c.id==='lilia'&&k==='abl')ring(rc,'mgg');
}
async function lockPast(c,rc,tb,az){
 const show=(cls,t)=>{az.className='az mono '+cls;az.hidden=false;az.textContent=t};
 A.deny();
 if(c.id==='saya'){rc.classList.add('shk');await hold(O.s.anim?550:0);close();bubble(c,'개인적인 기록은 열람할 수 없습니다.');return}
 if(c.id==='kaela'){
  tb.innerHTML='<div class="blr">█████ ████ ███████ ██████<br>████ ██████ █████ ████<br>███ ████████ ████</div>';
  rc.classList.add('frz');await hold(O.s.anim?600:0);rc.classList.remove('frz');
  show('','ACCESS PROHIBITED.\n\nPERSONAL HISTORY: RESTRICTED.\n\n해당 기록은 열람이 금지되어 있습니다.');return;
 }
 rc.classList.remove('clos');void rc.offsetWidth;rc.classList.add('clos');ring(rc,'mgc');
 show('sil','MAGICAL INTERFERENCE DETECTED.\n\n"뭘 보려는 거야?"');
}
async function arc(){
 const rc=tv.querySelector('.rc'),az=$('#az');rc.classList.add('dk');A.deny();await hold(O.s.anim?650:0);rc.classList.remove('dk');
 az.className='az mono';az.hidden=false;az.textContent='ACCESS DENIED.\n\nAUTHORIZATION LEVEL: INSUFFICIENT.\n\nTHIS RECORD IS CLASSIFIED.';
}
function mgc(){
 const rc=tv.querySelector('.rc'),az=$('#az');ring(rc,'mgg');A.ok();
 az.className='az mono gold';az.hidden=false;az.textContent='MAGIC RESTRICTION\n일부 마법 기록은 아직 공개되지 않았습니다.';
}
async function analysis(my){
 const az=$('#az');az.className='az mono cy';az.hidden=false;az.textContent='';
 tv.querySelector('.pic').classList.add('scn');
 for(const l of ['SUBJECT: XEON-7','IDENTIFICATION: COMPLETE','SYSTEM STATUS: NORMAL','MEMORY CORE: VERIFIED','EMOTIONAL RESPONSE: OBSERVING','','ANALYSIS COMPLETE.']){
  if(my!==rt)return;az.textContent+=l+'\n';A.tick();await sleep(380);
 }
}
async function transform(c){
 TF[c.id]=TF[c.id]?0:1;O.store.set('orbis_tf',JSON.stringify(TF));
 const swap=()=>{$('#pim').src=im(c);$('#rn').textContent=nm(c);$('#tfb').textContent=TF[c.id]?'변신 해제':'변신';tg.innerHTML=cards()};
 if(!O.s.anim){swap();return}
 const st=c.id==='yuri';
 tf.className='tf '+(st?'st':'mn');tf.hidden=false;
 A.tone(st?1200:500,.5,st?'sine':'triangle',.1,0,st?2600:1400);A.tone(st?1800:700,.4,'sine',.08,.15,st?3000:300);if(!st)A.noise(.6,.1,3000,800);
 await hold(450);swap();await hold(520);tf.hidden=true;
}
function bubble(c,t){qb.innerHTML='<b>'+nm(c)+'</b> · '+t+'<br>'+c.q;qb.hidden=false;clearTimeout(qt);qt=setTimeout(()=>{qb.hidden=true},4200)}

const eadd=(l,cls)=>{$('#ew').insertAdjacentHTML('beforeend','<div class="ln '+(cls||'')+'">'+(l||'&nbsp;')+'</div>');A.tick()};
async function tail(my){
 for(const l of ['FILE DELETED.','기록이 삭제되었습니다.','','... 이 기록은 누가 삭제한 거지?']){if(my!==rt)return;eadd(l,l==='FILE DELETED.'?'bad':'');await sleep(600)}
 const q='“아… 또 왔네. 후후, 여기는 아무도 없어야 하는데.”';eadd(q);
 const el=$('#ew').lastElementChild;let k=0;clearInterval(et);
 if(O.s.anim)et=setInterval(()=>{el.textContent=q.replace(/\S/g,ch=>Math.random()<.1?'▒':ch);if(++k>20){clearInterval(et);el.textContent=q}},150);
 $('#eb').innerHTML='<button class="ghost" id="cl2">CLOSE</button>';
}
async function edenRec(){
 cur=null;const my=++rt;clearInterval(et);
 root.classList.add('fz');await hold(O.s.anim?800:0);root.classList.remove('fz');
 if(my!==rt)return;
 tv.innerHTML='<div class="wr eg mono"><div id="ew"></div><div id="eb"></div></div>';tv.hidden=false;
 const del=O.store.get('orbis_eden')==='1';
 eadd('ACCESSING PERSONNEL FILE...');await sleep(480);eadd('SUBJECT ID: EDEN-???');await sleep(480);
 if(my!==rt)return;
 if(del){await tail(my);return}
 eadd('');eadd('WARNING: DATA CORRUPTION DETECTED','bad');await sleep(480);eadd('IMAGE DATA: DAMAGED');await sleep(480);eadd('RECORD RECOVERY: FAILED');
 $('#eb').innerHTML='<button class="ghost" id="rty">RETRY RECOVERY</button> <button class="ghost" id="cl2">CLOSE</button>';
}
async function retry(){
 const my=rt;$('#eb').innerHTML='';
 if(O.s.glitch&&O.s.anim){root.classList.add('big');setTimeout(()=>root.classList.remove('big'),650)}
 A.noise(.7,.25,300,7000);A.tone(70,.5,'sawtooth',.2,0,25);
 await hold(O.s.anim?900:0);if(my!==rt)return;
 $('#ew').innerHTML='';O.store.set('orbis_eden','1');await tail(my);
}
function close(){rt++;clearInterval(et);tv.hidden=true;cur=null;root.classList.remove('fz')}
tv.addEventListener('click',e=>{
 if(e.target===tv||e.target.closest('.x,#cl,#cl2')){close();return}
 const t=e.target.closest('.tabs button');if(t&&cur){tab(t.dataset.t);return}
 if(e.target.closest('#tfb')){transform(cur);return}
 if(e.target.closest('#gd')){O.go('dimensions.html#'+cur.dim);return}
 if(e.target.closest('.ir.lk')){arc();return}
 if(e.target.closest('#mg')){mgc();return}
 if(e.target.closest('#rty'))retry();
});
addEventListener('keydown',e=>{if(e.key==='Escape')close()});
})();
