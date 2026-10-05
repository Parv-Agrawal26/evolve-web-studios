/* Summit Roofing concept — interactions */
(function(){
  document.documentElement.classList.add('js');
  var nav=document.getElementById('nav'),burger=document.getElementById('burger'),menu=document.getElementById('menu');

  // Navbar state on scroll
  function onScroll(){nav.classList.toggle('scrolled',window.scrollY>40)}
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();

  // Mobile menu
  function setMenu(open){burger.setAttribute('aria-expanded',open);burger.setAttribute('aria-label',open?'Close menu':'Open menu');menu.classList.toggle('open',open)}
  burger.addEventListener('click',function(){setMenu(burger.getAttribute('aria-expanded')!=='true')});
  menu.addEventListener('click',function(e){if(e.target.tagName==='A')setMenu(false)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')setMenu(false)});

  // Scroll reveal
  var items=document.querySelectorAll('.rv');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
    items.forEach(function(el){io.observe(el)});
  }else items.forEach(function(el){el.classList.add('in')});

  // FAQ accordion
  document.querySelectorAll('.faq button').forEach(function(b){
    b.addEventListener('click',function(){
      var open=b.getAttribute('aria-expanded')==='true';
      b.setAttribute('aria-expanded',!open);b.classList.toggle('open',!open);
    });
  });

  // Pre-select project type from CTA
  document.querySelectorAll('[data-type]').forEach(function(a){
    a.addEventListener('click',function(){document.getElementById('type').value=a.dataset.type});
  });

  // Form validation (demo only: nothing is sent)
  var form=document.getElementById('form'),ok=document.getElementById('ok');
  function check(f){
    var v=f.value.trim(),msg='';
    if(f.required&&!v)msg='Please fill in this field.';
    else if(f.type==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))msg='Enter an email like name@example.com.';
    else if(f.type==='tel'&&v.replace(/\D/g,'').length<10)msg='Enter a 10-digit phone number.';
    var old=f.parentNode.querySelector('.err');if(old)old.remove();
    f.removeAttribute('aria-invalid');
    if(msg){f.setAttribute('aria-invalid','true');var s=document.createElement('span');s.className='err';s.textContent=msg;f.parentNode.appendChild(s)}
    return !msg;
  }
  form.addEventListener('submit',function(e){
    e.preventDefault();ok.hidden=true;
    var bad=[].filter.call(form.querySelectorAll('input,select'),function(f){return !check(f)});
    if(bad.length){bad[0].focus();return}
    form.reset();ok.hidden=false;ok.focus&&ok.setAttribute('tabindex','-1');ok.focus();
  });
  form.querySelectorAll('input,select').forEach(function(f){f.addEventListener('blur',function(){if(f.value||f.getAttribute('aria-invalid'))check(f)})});
})();
