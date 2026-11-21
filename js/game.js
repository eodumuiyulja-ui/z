(function(){
'use strict';
const O=window.O,K='orbis_game';
const S={xp:0,cr:0,req:{},log:[],vis:{},seen:0,tr:0};
try{Object.assign(S,JSON.parse(O.store.get(K))||{})}catch(e){}
const VT={ernes:'새로운 차원에 도착했다. 이곳에는 마나라는 힘이 존재한다고 한다.',neon:'네온 불빛이 가득한 도시다. 이능력과 첨단 기술이 함께 있다고 한다.',earth:'평범한 현대 도시처럼 보인다. 이곳 사람들은 오르비스를 모른다.',chrome:'기계 지성체들이 사는 차원이다. 차원 좌표 연산 기술이 인상적이다.',stella:'별빛과 마법이 공존하는 차원이다. 별의 사자와 계약한 소녀들이 있다고 한다.'};
const pad=n=>String(n).padStart(2,'0'),now=()=>{const d=new Date();return d.getFullYear()+'.'+pad(d.getMonth()+1)+'.'+pad(d.getDate())};
const G=window.G={S,
 save(){O.store.set(K,JSON.stringify(S))},
 lv(){return Math.floor(S.xp/100)+1},
 add(e){e.n=S.log.length+1;e.t=now();S.log.push(e);
  if(S.log.length>=4&&!S.tr){S.tr=1;S.log.push({n:S.log.length+1,t:now(),k:'trace',x:'기록한 적 없는 방문 흔적이 남아 있다.'})}
  G.save()},
 visit(id){if(!VT[id]||S.vis[id])return;S.vis[id]=1;S.xp+=20;G.add({k:'visit',dim:id,x:VT[id]})}
};
if(!S.log.length&&O.store.get('orbis_gender'))G.add({k:'reg',x:'오르비스에 등록되었다. 중앙 허브에서 첫 번째 임무를 기다린다.'});
})();
