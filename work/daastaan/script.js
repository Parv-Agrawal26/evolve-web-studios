/* Daastaan concept — content lives in the data arrays below */
(function(){
var $=function(s,c){return(c||document).querySelector(s)},$$=function(s,c){return[].slice.call((c||document).querySelectorAll(s))};
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
document.documentElement.classList.add('js');

/* ---- Food and room photography (Unsplash license; see README) ---- */
var SCENES={
 dish:['photo-1414235077428-338989a2e8c0','photo-1547592180-85f173990554','photo-1540189549336-e6e99c3679fe','photo-1504674900247-0877df9cc836'],
 fire:['photo-1555939594-58d7cb561ad1','photo-1558030006-450675393462','photo-1544025162-d76694265947'],
 spice:['photo-1596040033229-a9821ebd058d','photo-1532336414038-cf19250c5757','photo-1509358271058-acd22cc93898'],
 room:['photo-1517248135467-4c7edcad34c4','photo-1414235077428-338989a2e8c0','photo-1552566626-52f8b828add9'],
 hands:['photo-1556911220-e15b29be8c8f','photo-1551218808-94e220e084d2','photo-1556910103-1c02745aae4d'],
 arch:['photo-1514933651103-005eec06c04b','photo-1414235077428-338989a2e8c0','photo-1517248135467-4c7edcad34c4']
};
function art(t,s){var choices=SCENES[t]||SCENES.dish,id=choices[Math.abs(s)%choices.length],url='https://images.unsplash.com/'+id+'?auto=format&fit=crop&w=1600&q=85';
 return'<img src="'+url+'" alt="" loading="lazy" decoding="async">'}
function paint(el,spec){var s=spec.split(':');el.innerHTML=art(s[0],+s[1])}
$$('[data-art]').forEach(function(e){paint(e,e.dataset.art)});
function mk(spec,cls){var d=document.createElement('div');d.className=cls||'im';d.dataset.art=spec;paint(d,spec);return d}
function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;')}

/* ---- Loader, progress, nav, overlay ---- */
addEventListener('load',function(){setTimeout(function(){var l=$('#loader');if(l)l.style.display='none'},reduce?0:2400)});
var nav=$('#nav'),prog=$('#prog');
function onScroll(){var y=scrollY,h=document.documentElement.scrollHeight-innerHeight;nav.classList.toggle('sc',y>60);prog.style.width=(h>0?y/h*100:0)+'%';
 if(!reduce)$$('.fire .layer').forEach(function(l){var r=l.parentNode.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight)l.style.transform='translateY('+(-r.top*l.dataset.sp)+'px)'})}
addEventListener('scroll',onScroll,{passive:true});onScroll();
var burger=$('#burger'),ov=$('#ov');
function setMenu(o){burger.setAttribute('aria-expanded',o);burger.setAttribute('aria-label',o?'Close menu':'Open menu');ov.classList.toggle('open',o);ov.setAttribute('aria-hidden',!o);document.body.style.overflow=o?'hidden':''}
burger.onclick=function(){setMenu(burger.getAttribute('aria-expanded')!=='true')};
ov.addEventListener('click',function(e){if(e.target.tagName==='A')setMenu(false)});

/* ---- Reveal ---- */
var rv=$$('.rv'),io='IntersectionObserver' in window?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12}):null;
rv.forEach(function(e){io?io.observe(e):e.classList.add('in')});

/* ---- Regions ---- */
var REG=[['Kashmir','Saffron · Walnut · Morels · Smoke','A postcard in cool air and deep colour. We imagine the patient warmth of a pot on the stove, the earthiness of walnuts and a little fragrance rising from the rice.'],['Punjab','Mustard greens · Tandoor · Lassi · Butter','An invitation to pull up another chair. Smoke from the tandoor, something bright and cooling, and the generous instinct to make sure nobody leaves hungry.'],['Rajasthan','Millets · Chilli · Ghee · Clay','A study in making a little go a long way: grains with character, the glow of chilli and the kind of cooking that knows its landscape by heart.'],['Bengal','Mustard · Fish · Panch phoron · Jaggery','A lively balance of sharp and sweet, aromatic and gentle. We picture a meal that moves between bold mustard, delicate rice and one more spoonful.'],['Goa','Kokum · Coconut · Vinegar · Chilli','Coastal brightness, a little tang, and flavours shaped by many crossings. A daydream of salt air and something delicious waiting at the end of it.'],['Kerala','Coconut · Curry leaf · Black pepper · Tamarind','Green, fragrant and layered. Pepper takes the lead, coconut softens the edges and a spark of tamarind keeps everything awake.'],['Tamil Nadu','Rice · Tamarind · Curry leaf · Pepper','A table built around rice, with sour, spice and crisp aromatics arriving in thoughtful sequence. Grounded, vivid and full of movement.'],['North East','Bamboo · Smoke · Ferment · Herbs','Fresh, fragrant and beautifully complex. We follow the interplay of smoke, herbs and fermentation with curiosity and respect.']];
var rt=$('#rtabs');
REG.forEach(function(r,i){var b=document.createElement('button');b.textContent=r[0];b.setAttribute('role','tab');b.onclick=function(){setReg(i)};rt.appendChild(b)});
function setReg(i){var v=$('.rview');v.classList.add('sw');setTimeout(function(){$('#rname').textContent=REG[i][0];$('#rings').textContent=REG[i][1];$('#rstory').textContent=REG[i][2];paint($('#rimgR'),['spice','fire','arch','dish','room','hands','spice','fire'][i]+':'+i);v.classList.remove('sw')},reduce?0:250);
 $$('button',rt).forEach(function(b,j){b.setAttribute('aria-selected',j===i)})}
setReg(0);

/* ---- Menu ---- */
var CATS=['All','Small Plates','From the Fire','Mains','Rice & Bread','Desserts','Drinks'];
var MENU=[['Charred Paneer',1,'Smoked tomato · Kasundi · Coriander',650,'v','dish'],['Jackfruit Galouti',1,'Young jackfruit · Black cardamom · Crisp bread',750,'n','spice'],['Beetroot Shammi',1,'Beetroot · Hung curd · Mint',600,'v','dish'],['Coastal Prawn Toast',1,'Curry leaf · Black pepper · Lime',850,'','hands'],['Banana Leaf Corn',1,'Sweet corn · Lime leaf · Green chilli butter',580,'v','fire'],
['Tandoori Cauliflower',2,'Fermented chilli · Sesame · Burnt lime',650,'ng','fire'],['Malai Chicken',2,'Saffron cream · Charred lemon · Fenugreek',950,'','fire'],['Lamb Seekh',2,'Kashmiri chilli · Mint · Smoked yoghurt',1050,'','fire'],['Guntur Prawns',2,'Guntur chilli · Garlic butter · Lime',1250,'','fire'],['Achari Broccoli',2,'Pickling spice · Hung curd · Almond',700,'vg','spice'],
['Black Dal',3,'Slow-cooked urad · Garlic · Cultured butter',650,'v','dish'],['Mustard Fish',3,'Mustard · Green chilli · Banana leaf',1150,'g','dish'],['Mushroom Moilee',3,'Coconut milk · Curry leaf · Wild mushroom',800,'ng','dish'],['Slow Lamb Rogan',3,'Kashmiri chilli · Fennel · Saffron',1250,'g','arch'],['Pumpkin & Peanut Kootu',3,'Roasted pumpkin · Toasted peanut · Curry leaf',780,'vg','dish'],
['Saffron Mushroom Biryani',4,'Wild mushroom · Aged basmati · Crisp onion',850,'v','spice'],['Cultured Butter Naan',4,'Cultured butter · Garlic · Sea salt',220,'v','fire'],['Millet Ghee Roti',4,'Millet · Ghee · Ajwain',180,'vg','hands'],
['Gulab Jamun',5,'Brown butter · Pistachio · Vanilla bean',550,'v','dish'],['Mishti Doi',5,'Caramelised yoghurt · Palm sugar · Seasonal fruit',500,'vg','arch'],['Jaggery Kheer',5,'Charred rice · Jaggery · Almond',520,'vg','spice'],['Mango Kulfi Sandwich',5,'Alphonso mango · Saffron · Toasted brioche',590,'v','dish'],
['Smoked Jaljeera',6,'Cumin · Mint · Black salt',420,'ng','fire'],['Saffron Lassi',6,'Saffron · Yoghurt · Pistachio',450,'vg','dish'],['Kokum Spritz',6,'Kokum · Soda · Curry leaf',480,'ng','room'],['Nimbu & Green Chilli Soda',6,'Pressed lime · Green chilli · Rock salt',390,'ng','spice']];
var TAG={v:'VEG',n:'VEGAN',g:'GF'},fm=$('#mf'),ml=$('#ml'),pv=$('#pv'),currentCategory=0,activeMood='';
var moodSets={smoky:[0,4,5,6,9,10,15,22],bright:[2,3,8,11,23,24,25],comfort:[10,12,13,15,16,18,19,20],curious:[1,4,7,8,14,21,24]};
CATS.forEach(function(c,i){var b=document.createElement('button');b.textContent=c;b.setAttribute('aria-pressed',i===0);b.onclick=function(){currentCategory=i;activeMood='';$$('button',fm).forEach(function(x){x.setAttribute('aria-pressed',x===b)});$$('button',$('#moods')).forEach(function(x){x.setAttribute('aria-pressed','false')});$('#mood-status').textContent='Browse the '+(c==='All'?'whole menu':c.toLowerCase())+'.';drawMenu()};fm.appendChild(b)});
$$('button',$('#moods')).forEach(function(b){b.onclick=function(){var next=b.dataset.mood;activeMood=activeMood===next?'':next;currentCategory=0;$$('button',fm).forEach(function(x,j){x.setAttribute('aria-pressed',j===0)});$$('button',$('#moods')).forEach(function(x){x.setAttribute('aria-pressed',x===b&&!!activeMood)});$('#mood-status').textContent=activeMood?'A few '+b.textContent.trim().toLowerCase()+' ideas, picked for you.':'Choose a feeling to find your first few bites.';drawMenu()}});
$$('.meal-chapter').forEach(function(a){a.addEventListener('click',function(){var category=+a.dataset.course;currentCategory=category;activeMood='';$$('button',fm).forEach(function(b,i){b.setAttribute('aria-pressed',i===category)});$$('button',$('#moods')).forEach(function(b){b.setAttribute('aria-pressed','false')});$('#mood-status').textContent='Following the meal, one chapter at a time.';drawMenu()})});
function drawMenu(){ml.innerHTML='';MENU.forEach(function(m,i){if(currentCategory&&m[1]!==currentCategory)return;if(activeMood&&moodSets[activeMood].indexOf(i)===-1)return;var li=document.createElement('li'),tg=m[4].split('').map(function(k){return'<span>'+TAG[k==='n'?'n':k]+'</span>'}).join('');
 li.innerHTML='<div class="mi"><div class="th"></div><div><h3>'+esc(m[0])+'<span class="dt">'+tg+'</span></h3><p>'+esc(m[2])+'</p></div><span class="pr2">₹'+m[3].toLocaleString('en-IN')+'</span></div>';
 $('.th',li).appendChild(mk(m[5]+':'+i));
 if(fine){li.addEventListener('mouseenter',function(){pv.innerHTML=art(m[5],i);pv.classList.add('on')});li.addEventListener('mouseleave',function(){pv.classList.remove('on')});li.addEventListener('mousemove',function(e){pv.style.transform='translate('+Math.min(e.clientX+30,innerWidth-290)+'px,'+Math.max(10,Math.min(e.clientY-150,innerHeight-340))+'px)'})}
 ml.appendChild(li)})}
drawMenu();

/* ---- Ingredients (mouse-drag; touch uses native swipe) ---- */
var ING=[['Saffron','Delicate threads. Steep them slowly and let the colour arrive.'],['Black cardamom','Woodsmoke, dried fruit and the deep end of the spice tin.'],['Kashmiri chilli','A brilliant red; a gentler warmth than the colour lets on.'],['Mustard seed','Sharp and nutty. Listen for the little pop in hot oil.'],['Curry leaf','Bright, green and fragrant when it meets warm fat.'],['Tamarind','A dark, fruity sourness that brings the edges into focus.'],['Coconut','Soft sweetness, silky richness, a little sunshine.'],['Aged basmati','Long grains rested until they remember how to perfume a room.'],['Mango','Sun-ripe and honeyed, or green and gloriously tart.'],['Guntur chilli','A clear, confident heat with a long finish.'],['Kokum','A ruby-coloured sour note from the western coast.'],['Fennel seed','Sweet anise, especially lovely after a slow toast.'],['Jaggery','Deep, mineral sweetness, still carrying a hint of cane.'],['Sesame','Tiny seeds with an enormous appetite for heat.']],tr=$('#ing');
ING.forEach(function(g,i){var d=document.createElement('div');d.className='ig';d.appendChild(mk(['spice','dish','fire','spice','hands','arch'][i%6]+':'+(i+1)));d.insertAdjacentHTML('beforeend','<h3>'+g[0]+'</h3><p>'+g[1]+'</p>');tr.appendChild(d)});
var dn=false,sx=0,sl=0;tr.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;dn=true;sx=e.clientX;sl=tr.scrollLeft;tr.classList.add('dr');tr.setPointerCapture(e.pointerId)});
tr.addEventListener('pointermove',function(e){if(dn)tr.scrollLeft=sl-(e.clientX-sx)});['pointerup','pointercancel'].forEach(function(n){tr.addEventListener(n,function(){dn=false;tr.classList.remove('dr')})});

/* ---- Room tabs, materials, experiences, events, journal ---- */
var ROOMS=[['The long table','A little clatter, a passing platter, another glass of something bright. Pull up a chair and let the conversation find its own pace.','room:0'],['The bar','A front-row seat for the last light, the first pour and a small menu of drinks that begin with ingredients from closer to home.','room:2'],['The side room','A tucked-away table for milestones, reunions or a Tuesday that deserves to feel like a small occasion.','arch:3'],['The courtyard','An open-sky corner for warm evenings, slow dinners and the gentle pleasure of losing track of time.','arch:1']];
var rtb=$('#rt');ROOMS.forEach(function(r,i){var b=document.createElement('button');b.textContent=r[0];b.setAttribute('role','tab');b.onclick=function(){setRoom(i)};rtb.appendChild(b)});
function setRoom(i){var im=$('#rimg');im.classList.add('sw');setTimeout(function(){paint(im,ROOMS[i][2]);$('#rtxt').textContent=ROOMS[i][1];im.classList.remove('sw')},reduce?0:220);$$('button',rtb).forEach(function(b,j){b.setAttribute('aria-selected',j===i)})}setRoom(0);
['Black stone','Walnut','Brass','Linen','Terracotta','Hand-finished plaster'].forEach(function(n,i){$('#mat').insertAdjacentHTML('beforeend','<li class="rv in"><i class="m'+i+'"></i><span>'+n+'</span></li>')});
[['Private dining','An unhurried meal for the people you keep close. Tell us the feeling you’re after; we’ll help set the scene.','room:5'],['A seat near the pass','A more intimate look at the hands, heat and happy accidents behind a dinner worth remembering.','hands:1'],['A reason to gather','Birthdays, anniversaries, reunions, or simply a date everyone can finally make.','dish:2'],['The long-table sessions','Small, seasonal evenings for tasting, learning and meeting the people beside you.','spice:4']].forEach(function(x){var d=document.createElement('div');d.className='ex rv';d.innerHTML='<div><h3>'+x[0]+'</h3><p>'+x[1]+'</p></div>';d.appendChild(mk(x[2]));$('#exp').appendChild(d);io?io.observe(d):d.classList.add('in')});
[['A table under the open sky','An imagined supper for the last warm evenings of the season. Four courses, one very long sunset.'],['The spice drawer, opened','A curious little tasting of the seeds, pods and leaves that make a kitchen smell like home.'],['Notes from the tandoor','Flatbread, ember-kissed vegetables and a closer look at cooking with clay and fire.'],['Sunday, stretched out','A slow lunch made for second helpings, shared plates and no immediate plans.']].forEach(function(x){$('#ev').insertAdjacentHTML('beforeend','<li class="rv"><h3>'+x[0]+'</h3><p>'+x[1]+'</p><span class="lab">A gathering, imagined</span></li>')});$$('#ev .rv').forEach(function(e){io?io.observe(e):e.classList.add('in')});
var ART=[['The small, beautiful logic of a tadka',['There is a moment when the whole kitchen changes: mustard seeds begin to jump, curry leaves hit hot oil and their fragrance opens like a door.','A tadka is not decoration. It is aroma arriving at the table at exactly the right time. The same ingredients can tell a different story depending on what meets the pan first, how hot the oil is and how long you wait.','We like that kind of precision: a few seconds of attention that make the whole bowl feel more alive.']],['A tandoor asks you to pay attention',['Clay holds heat in a way that makes every inch of the oven matter. Bread meets the wall; a skewer turns near the coals; a cook learns to read the colour before reaching for a clock.','It is less about spectacle than listening. How close is the food? How fast is the surface taking colour? Is this the moment to turn, baste or wait?','The best tool in the room is still the person watching.']],['What the pickle jar knows',['A pickle is a small lesson in patience. Fruit or vegetables, salt, spice, oil, time—and the confidence to leave the lid closed until everything has found its balance.','Across kitchens, a jar on a shelf can hold a season in reserve. It brightens something rich, wakes up something mild and makes a familiar plate feel new again.','We like to keep a little tang within reach.']],['The last spoonful is a kind of map',['Rice carries a meal differently from bread. A sour note changes a rich one. A little crunch makes a soft bite feel more complete.','When flavours meet on one plate, geography becomes something you can taste without pretending one dish can speak for an entire place. It is a beginning, not a summary.','That is the sort of map we want to keep drawing: curious, unfinished and made to be shared.']],['A note on eating together',['Passing plates is a small act of trust. You offer someone the crisp edge, ask if they have tried the chutney, and leave just enough for the person who has not sat down yet.','Some of our favourite food memories begin with no recipe at all. Just a table, a bit of noise and somebody saying, “Try this.”','Make room. Dinner has a way of getting better when it travels.']]],jr=$('#jr');
ART.forEach(function(a,i){var b=document.createElement('button');b.className='ja';b.innerHTML=a[0]+'<small>Concept article · Read</small>';b.onclick=function(){$('#at').textContent=a[0];$('#ab').innerHTML=a[1].map(function(p){return'<p>'+p+'</p>'}).join('');openM('m-art',b)};jr.appendChild(b)});

/* ---- Gallery + lightbox ---- */
var GC=['All','Food','Space','Details','People','Moments'],GAL=[['Charred paneer, plated',1,'dish'],['The communal table',2,'room'],['Whole spices',3,'spice'],['Hands at the pass',4,'hands'],['Late service',5,'fire'],['Saffron rice',1,'dish'],['Brass and stone',3,'arch'],['Tandoor at full heat',5,'fire'],['Booth, low light',2,'room'],['Mustard seed',3,'spice'],['Preparing the thali',4,'hands'],['Evening in the courtyard',5,'arch'],['Gulab jamun, warm',1,'dish'],['Curry leaf in oil',3,'fire'],['A table, set',2,'room']],gg=$('#gg'),gf=$('#gf');
GAL.forEach(function(g,i){var b=document.createElement('button');b.className='g s'+(i%5);b.dataset.c=g[1];b.setAttribute('aria-label',g[0]+' – '+GC[g[1]]);b.appendChild(mk(g[2]+':'+(i+1)));b.onclick=function(){openLB(b)};gg.appendChild(b)});
GC.forEach(function(c,i){var b=document.createElement('button');b.textContent=c;b.setAttribute('aria-pressed',i===0);b.onclick=function(){$$('button',gf).forEach(function(x){x.setAttribute('aria-pressed',x===b)});$$('.g',gg).forEach(function(g){g.hidden=i>0&&+g.dataset.c!==i})};gf.appendChild(b)});
var lb=$('#lb'),vis=[],cur=0,lbOpener;
function showLB(i){cur=(i+vis.length)%vis.length;var b=vis[cur],k=$$('.g',gg).indexOf(b);$('#lbi').innerHTML=$('.im',b).innerHTML;$('#lbc').textContent=GAL[k][0];$('#lbk').textContent=GC[GAL[k][1]]}
function openLB(b){vis=$$('.g',gg).filter(function(g){return !g.hidden});lbOpener=b;showLB(vis.indexOf(b));lb.classList.add('open');lb.hidden=false;document.body.style.overflow='hidden';$('.x',lb).focus()}
function closeLB(){lb.classList.remove('open');document.body.style.overflow='';if(lbOpener)lbOpener.focus()}
$('.lbp').onclick=function(){showLB(cur-1)};$('.lbn').onclick=function(){showLB(cur+1)};$('.x',lb).onclick=closeLB;

/* ---- Generic modals ---- */
var curM=null,mOp=null;
function openM(id,op){curM=$('#'+id);mOp=op;curM.hidden=false;requestAnimationFrame(function(){curM.classList.add('open')});document.body.style.overflow='hidden';$('[data-close]',curM).focus()}
function closeM(){if(!curM)return;curM.classList.remove('open');curM=null;document.body.style.overflow='';if(mOp)mOp.focus()}
$$('[data-open]').forEach(function(b){b.onclick=function(){openM(b.dataset.open,b)}});
$$('.modal [data-close]').forEach(function(b){b.onclick=closeM});$$('.modal').forEach(function(m){m.addEventListener('click',function(e){if(e.target===m)closeM()})});
lb.addEventListener('click',function(e){if(e.target===lb||e.target.tagName==='FIGURE')closeLB()});
document.addEventListener('keydown',function(e){
 if(e.key==='Escape'){if(lb.classList.contains('open'))closeLB();else if(curM)closeM();else setMenu(false)}
 if(lb.classList.contains('open')){if(e.key==='ArrowLeft')showLB(cur-1);if(e.key==='ArrowRight')showLB(cur+1)}
 if(e.key==='Tab'){var c=lb.classList.contains('open')?lb:curM;if(!c)return;var f=$$('button,input,select,textarea,a[href]',c).filter(function(x){return !x.disabled});if(!f.length)return;var a=document.activeElement;if(e.shiftKey&&a===f[0]){e.preventDefault();f[f.length-1].focus()}else if(!e.shiftKey&&a===f[f.length-1]){e.preventDefault();f[0].focus()}}
});

/* ---- Forms (demo only: nothing is sent) ---- */
var today=new Date().toISOString().slice(0,10);$$('input[type=date]').forEach(function(d){d.min=today});
function chk(f){var v=f.value.trim(),m='';if(f.required&&!v)m='Please complete this field.';else if(f.type==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))m='Enter an email like name@example.com.';else if(f.type==='tel'&&v.replace(/\D/g,'').length<10)m='Enter at least 10 digits.';
 var o=f.parentNode.querySelector('.err');if(o)o.remove();f.removeAttribute('aria-invalid');if(m){f.setAttribute('aria-invalid','true');var s=document.createElement('span');s.className='err';s.textContent=m;f.parentNode.appendChild(s)}return !m}
$$('form').forEach(function(fm){var ok=$('.ok',fm);fm.addEventListener('submit',function(e){e.preventDefault();ok.hidden=true;var bad=$$('input,select',fm).filter(function(f){return !chk(f)});if(bad.length){bad[0].focus();return}
 ok.innerHTML=fm.dataset.msg+(fm.dataset.sub?'<small>'+fm.dataset.sub+'</small>':'');fm.reset();ok.hidden=false;ok.tabIndex=-1;ok.focus()});
 $$('input,select',fm).forEach(function(f){f.addEventListener('blur',function(){if(f.value||f.getAttribute('aria-invalid'))chk(f)})})});

/* ---- Cursor ---- */
if(fine&&!reduce){var c=$('#cur'),x=0,y=0,tx=0,ty=0;c.classList.add('on');addEventListener('mousemove',function(e){tx=e.clientX;ty=e.clientY},{passive:true});
 (function loop(){x+=(tx-x)*.2;y+=(ty-y)*.2;c.style.transform='translate('+x+'px,'+y+'px)';requestAnimationFrame(loop)})();
 document.addEventListener('mouseover',function(e){c.classList.toggle('big',!!e.target.closest('a,button,.mlist li,.g,.ja'))})}

/* ---- Easter egg: five logo clicks ---- */
var n=0,t;$('#logo').addEventListener('click',function(){n++;clearTimeout(t);t=setTimeout(function(){n=0},2500);if(n>=5){n=0;var g=$('#egg');g.hidden=false;requestAnimationFrame(function(){g.classList.add('on')});setTimeout(function(){g.classList.remove('on')},4500)}});
})();
