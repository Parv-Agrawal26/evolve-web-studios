/* Vrinda Guest House concept — interactions */
(function(){
  document.documentElement.classList.add('js');
  var $=function(s,c){return (c||document).querySelector(s)},$$=function(s,c){return [].slice.call((c||document).querySelectorAll(s))};
  var nav=$('#nav'),burger=$('#burger'),menu=$('#menu');

  function onScroll(){nav.classList.toggle('scrolled',scrollY>40)}
  addEventListener('scroll',onScroll,{passive:true});onScroll();

  // Mobile menu
  function setMenu(o){burger.setAttribute('aria-expanded',o);burger.setAttribute('aria-label',o?'Close menu':'Open menu');menu.classList.toggle('open',o)}
  burger.addEventListener('click',function(){setMenu(burger.getAttribute('aria-expanded')!=='true')});
  menu.addEventListener('click',function(e){if(e.target.tagName==='A')setMenu(false)});

  // Reveal on scroll
  var rv=$$('.rv');
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});rv.forEach(function(el){io.observe(el)})}
  else rv.forEach(function(el){el.classList.add('in')});

  // FAQ
  $$('.faq button').forEach(function(b){b.addEventListener('click',function(){var o=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',!o);b.classList.toggle('open',!o)})});

  // Room CTA pre-selects preference
  $$('[data-room]').forEach(function(a){a.addEventListener('click',function(){$('#room').value=a.dataset.room})});

  // Lightbox
  var lb=$('#lb'),stage=$('#stage'),cap=$('#cap'),tiles=$$('.g'),cur=0,opener=null;
  function show(i){cur=(i+tiles.length)%tiles.length;var t=tiles[cur];stage.className='lb-stage '+t.className.split(' ').filter(function(c){return /^t\d$/.test(c)}).join(' ');stage.innerHTML=$('svg',t).outerHTML;cap.textContent=t.dataset.cap+' ('+(cur+1)+' of '+tiles.length+')'}
  function open(i,btn){opener=btn;show(i);lb.hidden=false;document.body.style.overflow='hidden';$('.lb-x').focus()}
  function close(){lb.hidden=true;document.body.style.overflow='';if(opener)opener.focus()}
  tiles.forEach(function(t,i){t.addEventListener('click',function(){open(i,t)})});
  $('.lb-x').onclick=close;$('.lb-p').onclick=function(){show(cur-1)};$('.lb-n').onclick=function(){show(cur+1)};
  lb.addEventListener('click',function(e){if(e.target===lb)close()});
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape')setMenu(false);
    if(lb.hidden)return;
    if(e.key==='Escape')close();else if(e.key==='ArrowLeft')show(cur-1);else if(e.key==='ArrowRight')show(cur+1);
    else if(e.key==='Tab'){var f=$$('button',lb),a=document.activeElement;if(e.shiftKey&&a===f[0]){e.preventDefault();f[f.length-1].focus()}else if(!e.shiftKey&&a===f[f.length-1]){e.preventDefault();f[0].focus()}}
  });

  // Form validation (demo only)
  var form=$('#form'),ok=$('#ok'),inp=$('#in'),out=$('#out'),today=new Date().toISOString().slice(0,10);
  inp.min=today;out.min=today;
  inp.addEventListener('change',function(){out.min=inp.value||today});
  function check(f){
    var v=f.value.trim(),m='';
    if(f.required&&!v)m='Please fill in this field.';
    else if(f.type==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))m='Enter an email like name@example.com.';
    else if(f.type==='tel'&&v.replace(/\D/g,'').length<10)m='Enter a phone number with at least 10 digits.';
    else if(f===out&&inp.value&&v<=inp.value)m='Check-out must be after check-in.';
    var o=f.parentNode.querySelector('.err');if(o)o.remove();f.removeAttribute('aria-invalid');
    if(m){f.setAttribute('aria-invalid','true');var s=document.createElement('span');s.className='err';s.textContent=m;f.parentNode.appendChild(s)}
    return !m;
  }
  form.addEventListener('submit',function(e){
    e.preventDefault();ok.hidden=true;
    var bad=$$('input,select',form).filter(function(f){return !check(f)});
    if(bad.length){bad[0].focus();return}
    form.reset();ok.hidden=false;ok.tabIndex=-1;ok.focus();
  });
  $$('input,select',form).forEach(function(f){f.addEventListener('blur',function(){if(f.value||f.getAttribute('aria-invalid'))check(f)})});
})();
