(function(){
'use strict';
const O=window.O,A=O.A,$=s=>document.querySelector(s);
const gate=$('#gate'),term=$('#term'),log=$('#tlog'),pick=$('#pick'),enter=$('#enter'),skip=$('#skip'),snd=$('#snd'),toHub=$('#toHub'),coord=$('#coord'),ghost=$('#ghost');
const returning=O.store.get('orbis_seen')==='1'&&!!O.store.get('orbis_gender');
let fast=false,busy=false;
const sleep=ms=>new Promise(r=>setTimeout(r,O.s.anim&&!fast?ms:0));
const ready=()=>{enter.disabled=false};
const lab=()=>{snd.textContent='SOUND: '+(O.s.sound?'ON':'OFF')};
O.hook.push(lab);lab();
snd.onclick=()=>{O.s.sound=+!O.s.sound;if(O.s.sound)A.init();O.apply();A.click()};
enter.disabled=true;
if(returning||!O.s.anim){gate.classList.add('skip');ready()}else setTimeout(ready,4300);
skip.onclick=()=>{if(!busy){gate.classList.add('skip');ready()}else fast=true};
setTimeout(()=>{if(!busy&&O.s.glitch&&O.s.anim){coord.textContent='GATE COORD · CH-▒▒▒▒';O.glitch(coord,150);setTimeout(()=>{coord.textContent='GATE COORD · CH-0001'},450)}},returning?3000:7500);

async function type(txt,cls){
 const d=document.createElement('div');d.className='ln '+(cls||'');log.appendChild(d);
 if(fast||!O.s.anim||!txt){d.textContent=txt;return}
 for(const ch of txt){d.textContent+=ch;if(Math.random()<.5)A.tick();await sleep(16)}
 await sleep(240);
}
function flash(txt,ms){
 if(!O.s.glitch||!O.s.anim||fast)return;
 const d=document.createElement('div');d.className='ln bad';d.textContent=txt;log.appendChild(d);A.deny();setTimeout(()=>d.remove(),ms);
}
function ghostId(){
 if(!O.s.glitch||!O.s.anim||fast)return;
 ghost.textContent='TRAVELER ID: TRV-0000-??';ghost.classList.add('on');setTimeout(()=>ghost.classList.remove('on'),70);
}
function choose(){
 return new Promise(res=>{
  pick.hidden=false;pick.querySelector('button').focus();
  pick.onclick=e=>{const b=e.target.closest('[data-g]');if(!b)return;O.store.set('orbis_gender',b.dataset.g);A.ok();pick.hidden=true;res()};
 });
}
function done(auto){
 skip.hidden=true;
 if(auto){setTimeout(()=>O.go('hub.html'),900);return}
 toHub.hidden=false;toHub.focus();
}
async function run(){
 await type('ORBIS CENTRAL HUB');await type('CONNECTION ESTABLISHED.');
 if(returning){await type('WELCOME BACK, TRAVELER.');A.ok();await type('ACCESS GRANTED.','ok');return done(true)}
 await type('');await type('VISITOR DETECTED.');
 flash('UNKNOWN SIGNAL DETECTED.',200);ghostId();
 await type('IDENTITY: UNREGISTERED');
 await type('SELECT TRAVELER TYPE.');
 await choose();
 await type('TRAVELER REGISTRATION...');await sleep(500);
 await type('ASSIGNED RANK: 05');await type('');
 A.ok();await type('ACCESS GRANTED.','ok');await type('WELCOME TO ORBIS.','ok');
 O.store.set('orbis_seen','1');
 await sleep(500);O.glitch(term,150);
 done(false);
}
enter.onclick=async()=>{
 if(busy)return;busy=true;enter.disabled=true;
 if(O.s.sound)A.init();
 gate.classList.add('go');A.open();
 await sleep(2100);$('#wash').classList.add('on');await sleep(700);
 gate.hidden=true;term.hidden=false;
 await run();
};
toHub.onclick=()=>{A.ok();O.go('hub.html')};
})();
