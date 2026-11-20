(function(){
'use strict';
const O=window.O={hook:[]},mem={},A=O.A={ctx:null,master:null,amb:null};
O.store={get(k){try{return localStorage.getItem(k)}catch(e){return k in mem?mem[k]:null}},set(k,v){try{localStorage.setItem(k,v)}catch(e){mem[k]=v}},del(k){try{localStorage.removeItem(k)}catch(e){delete mem[k]}}};
O.s={anim:1,sound:0,glitch:1,pt:1,br:100,low:0};
let saved=null;try{saved=JSON.parse(O.store.get('orbis_set'))}catch(e){}
if(saved)Object.assign(O.s,saved);else if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)O.s.anim=0;

A.init=()=>{if(!A.ctx){const C=window.AudioContext||window.webkitAudioContext;if(!C)return;A.ctx=new C();A.master=A.ctx.createGain();A.master.gain.value=0;A.master.connect(A.ctx.destination)}if(A.ctx.state==='suspended')A.ctx.resume();A.vol()};
A.vol=()=>{if(!A.ctx)return;A.master.gain.setTargetAtTime(O.s.sound?.55:0,A.ctx.currentTime,.05);A.drone(!!O.s.sound)};
A.tone=(f,d,type,v,t0,f2)=>{if(!A.ctx||!O.s.sound)return;const c=A.ctx,t=c.currentTime+(t0||0),o=c.createOscillator(),g=c.createGain();o.type=type||'sine';o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+d);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v||.1,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(A.master);o.start(t);o.stop(t+d+.05)};
A.noise=(d,v,f1,f2,t0)=>{if(!A.ctx||!O.s.sound)return;const c=A.ctx,t=c.currentTime+(t0||0),n=Math.max(1,c.sampleRate*d|0),b=c.createBuffer(1,n,c.sampleRate),a=b.getChannelData(0);for(let i=0;i<n;i++)a[i]=Math.random()*2-1;const s=c.createBufferSource();s.buffer=b;const f=c.createBiquadFilter();f.type='bandpass';f.Q.value=2;f.frequency.setValueAtTime(f1,t);f.frequency.exponentialRampToValueAtTime(f2,t+d);const g=c.createGain();g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+d*.5);g.gain.exponentialRampToValueAtTime(.0001,t+d);s.connect(f);f.connect(g);g.connect(A.master);s.start(t)};
A.click=()=>A.tone(1100,.07,'triangle',.08,0,620);
A.hover=()=>A.tone(1900,.03,'sine',.03);
A.tick=()=>A.tone(2200+Math.random()*600,.018,'square',.02);
A.ok=()=>{A.tone(660,.25,'sine',.15);A.tone(990,.45,'sine',.12,.12)};
A.deny=()=>{A.tone(190,.22,'sawtooth',.13,0,120);A.tone(190,.22,'sawtooth',.13,.28,120)};
A.glitch=()=>A.noise(.14,.1,2000,6000);
A.open=()=>{A.noise(2.6,.35,200,6000);A.tone(55,2.4,'sawtooth',.16,0,330);A.tone(110,1.6,'sine',.18,.6,660);A.tone(90,.9,'sine',.35,1.6,32)};
A.drone=on=>{const c=A.ctx;if(!c)return;if(on&&!A.amb){const g=c.createGain();g.gain.value=0;const f=c.createBiquadFilter();f.type='lowpass';f.frequency.value=420;const o1=c.createOscillator(),o2=c.createOscillator(),l=c.createOscillator(),lg=c.createGain();o1.type='sawtooth';o1.frequency.value=55;o2.type='sine';o2.frequency.value=82.6;l.frequency.value=.07;lg.gain.value=140;l.connect(lg);lg.connect(f.frequency);o1.connect(f);o2.connect(f);f.connect(g);g.connect(A.master);[o1,o2,l].forEach(o=>o.start());g.gain.setTargetAtTime(.09,c.currentTime,2);A.amb={stop(){g.gain.setTargetAtTime(0,c.currentTime,.4);setTimeout(()=>[o1,o2,l].forEach(o=>{try{o.stop()}catch(e){}}),1800)}}}else if(!on&&A.amb){A.amb.stop();A.amb=null}};

document.body.insertAdjacentHTML('beforeend','<canvas id="pt"></canvas><div id="fx"></div><div id="dim"></div><div id="toast" class="mono" role="status"></div><button id="gear" class="gear" aria-label="시스템 설정" aria-expanded="false">⚙</button><div id="set" class="panel" hidden role="dialog" aria-label="시스템 설정"><h2>SYSTEM SETTINGS</h2><label><span>애니메이션</span><input type="checkbox" data-k="anim"></label><label><span>사운드 (효과음·배경음)</span><input type="checkbox" data-k="sound"></label><label><span>배경 입자</span><input type="checkbox" data-k="pt"></label><label><span>저사양 모드</span><input type="checkbox" data-k="low"></label><label><span>글리치 강도</span><select data-k="glitch"><option value="0">끔</option><option value="1">약함</option><option value="2">강함</option></select></label><label><span>화면 밝기</span><input type="range" min="50" max="100" data-k="br"></label><div class="row"><button id="reset">등록 초기화</button><button id="close">닫기</button></div></div>');
const $=s=>document.getElementById(s),P=$('set'),cv=$('pt'),cx=cv.getContext('2d');
let parts=[],raf=0;
const size=()=>{cv.width=innerWidth;cv.height=innerHeight};
const loop=()=>{cx.clearRect(0,0,cv.width,cv.height);for(const p of parts){p.y-=p.v;if(p.y<-5){p.y=cv.height+5;p.x=Math.random()*cv.width}cx.fillStyle='rgba(120,240,230,'+p.a+')';cx.beginPath();cx.arc(p.x,p.y,p.r,0,6.3);cx.fill()}raf=requestAnimationFrame(loop)};
O.parts=()=>{cancelAnimationFrame(raf);parts=[];size();cx.clearRect(0,0,cv.width,cv.height);if(!O.s.pt||!O.s.anim)return;const n=Math.round(Math.min(70,innerWidth/18)*(O.s.low?.35:1));for(let i=0;i<n;i++)parts.push({x:Math.random()*cv.width,y:Math.random()*cv.height,r:Math.random()*1.4+.3,v:Math.random()*.25+.05,a:Math.random()*.5+.2});loop()};
O.apply=first=>{const h=document.documentElement,s=O.s;h.dataset.anim=s.anim?'on':'off';h.dataset.low=s.low?'1':'0';$('dim').style.opacity=((100-s.br)/100*.8).toFixed(2);if(!first)O.store.set('orbis_set',JSON.stringify(s));A.vol();O.parts();O.hook.forEach(f=>f())};
let tt=0;O.toast=m=>{const t=$('toast');t.textContent=m;t.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('on'),2200)};
O.go=u=>{$('fade').classList.add('on');setTimeout(()=>{location.href=u},O.s.anim?330:0)};
O.glitch=(el,ms)=>{const g=O.s.glitch;if(!g||!el||!O.s.anim)return;el.classList.add('gl');A.glitch();setTimeout(()=>el.classList.remove('gl'),(ms||150)*(g==2?1.6:1)*3)};
const sync=()=>P.querySelectorAll('[data-k]').forEach(el=>{const v=O.s[el.dataset.k];if(el.type==='checkbox')el.checked=!!v;else el.value=v});
$('gear').onclick=()=>{P.hidden=!P.hidden;$('gear').setAttribute('aria-expanded',String(!P.hidden));sync()};
$('close').onclick=()=>{P.hidden=true;$('gear').setAttribute('aria-expanded','false')};
$('reset').onclick=()=>{['orbis_gender','orbis_seen','orbis_void'].forEach(k=>O.store.del(k));O.go('index.html')};
P.addEventListener('input',e=>{const el=e.target,k=el.dataset.k;if(!k)return;O.s[k]=el.type==='checkbox'?+el.checked:+el.value;if(k==='sound'&&O.s.sound)A.init();O.apply();if(k==='sound'||k==='glitch')A.click()});
addEventListener('keydown',e=>{if(e.key==='Escape')$('close').onclick()});
addEventListener('resize',()=>{if(parts.length)O.parts()});
addEventListener('pageshow',e=>{if(e.persisted)$('fade').classList.remove('on')});
let last=null;
document.addEventListener('pointerover',e=>{const el=e.target.closest('a,button,.pc');if(el&&el!==last&&!el.disabled){last=el;A.hover()}else if(!el)last=null});
document.addEventListener('click',e=>{const el=e.target.closest('a,button');if(!el)return;if(!el.closest('[data-lock]')&&!el.matches('.lock,[data-ns]'))A.click();const a=el.closest('a[data-go]');if(a&&!e.metaKey&&!e.ctrlKey&&!e.shiftKey){e.preventDefault();O.go(a.dataset.go)}});
['pointerdown','keydown'].forEach(ev=>addEventListener(ev,()=>{if(O.s.sound)A.init()}));
if(O.s.sound)A.init();
O.apply(true);
})();
