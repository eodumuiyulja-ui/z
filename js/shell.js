(function(){
'use strict';
const O=window.O,pg=document.body.dataset.page,g=O.store.get('orbis_gender')==='m'?'male':'female';
const L=[['hub','HOME'],['dimensions','DIMENSIONS'],['travelers','TRAVELERS',1],['gate-network','GATE NETWORK'],['bulletin','BULLETIN',1],['archive','ARCHIVE'],['requests','REQUESTS',1],['journal','JOURNAL',1],['monitor','MONITOR',1],['profile','PROFILE',1]];
document.getElementById('top').innerHTML='<a class="brand" href="hub.html" data-go="hub.html">ORBIS</a><span class="sys mono"><i></i>SYSTEM ONLINE</span><nav id="nav" aria-label="메인 메뉴">'+L.map(l=>l[2]?'<a href="#" class="lock">'+l[1]+'</a>':'<a href="'+l[0]+'.html" data-go="'+l[0]+'.html"'+(l[0]===pg?' class="on" aria-current="page"':'')+'>'+l[1]+'</a>').join('')+'</nav><div class="me mono"><img id="me" src="images/user_'+g+'.webp" alt="내 여행자"><span>TRAVELER<br>CLASS 05</span></div>';
})();
