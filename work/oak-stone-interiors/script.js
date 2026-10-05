(function(){
  document.documentElement.classList.add('js');

  var $ = function(sel, ctx){ return (ctx || document).querySelector(sel); };
  var $$ = function(sel, ctx){ return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  var header = $('.site-header');
  var burger = $('#burger');
  var menu = $('#nav-menu');
  var nav = $('.nav-menu');

  function setMenu(open){
    if (!burger || !nav) return;
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    nav.classList.toggle('open', open);
  }

  if (burger) {
    burger.addEventListener('click', function(){
      var isOpen = burger.getAttribute('aria-expanded') === 'true';
      setMenu(!isOpen);
    });
  }

  if (nav) {
    nav.addEventListener('click', function(e){
      if (e.target.tagName === 'A') setMenu(false);
    });
  }

  function onScroll(){
    if (header) header.classList.toggle('scrolled', window.scrollY > 40);
  }
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var rv = $$('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    rv.forEach(function(el){ io.observe(el); });
  } else {
    rv.forEach(function(el){ el.classList.add('in'); });
  }

  var lb = $('#lb');
  var items = $$('.project-card');
  var cur = 0;
  var opener = null;

  function show(i){
    if (!lb || !items.length) return;
    cur = (i + items.length) % items.length;
    var item = items[cur];
    $('#lb-image').src = item.dataset.image || item.querySelector('img').src;
    $('#lb-image').alt = item.dataset.title || '';
    $('#lb-m').textContent = item.dataset.meta;
    $('#lb-t').textContent = item.dataset.title;
    $('#lb-d').textContent = item.dataset.desc;
  }

  function open(i, trigger){
    if (!lb) return;
    opener = trigger;
    show(i);
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    $('.lb-close').focus();
  }

  function close(){
    if (!lb) return;
    lb.hidden = true;
    document.body.style.overflow = '';
    if (opener) opener.focus();
  }

  items.forEach(function(item, i){
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.addEventListener('click', function(){ open(i, item); });
    item.addEventListener('keydown', function(e){
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open(i, item);
      }
    });
  });

  if ($('.lb-close')) $('.lb-close').onclick = close;
  if ($('.lb-prev')) $('.lb-prev').onclick = function(){ show(cur - 1); };
  if ($('.lb-next')) $('.lb-next').onclick = function(){ show(cur + 1); };

  if (lb) {
    lb.addEventListener('click', function(e){
      if (e.target === lb || e.target.classList.contains('lb-panel')) close();
    });
  }

  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') {
      if (!lb || lb.hidden) {
        setMenu(false);
      } else {
        close();
      }
      return;
    }

    if (lb && !lb.hidden) {
      if (e.key === 'ArrowLeft') show(cur - 1);
      if (e.key === 'ArrowRight') show(cur + 1);
    }
  });

  var form = $('#contact-form');
  var ok = $('#form-success');
  if (form && ok) {
    function checkField(field) {
      var value = field.value.trim();
      var message = '';

      if (field.required && !value) {
        message = 'Please fill in this field.';
      } else if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        message = 'Enter an email like name@example.com.';
      }

      var existing = field.parentNode.querySelector('.err');
      if (existing) existing.remove();
      field.removeAttribute('aria-invalid');

      if (message) {
        field.setAttribute('aria-invalid', 'true');
        var elem = document.createElement('span');
        elem.className = 'err';
        elem.textContent = message;
        field.parentNode.appendChild(elem);
      }

      return !message;
    }

    form.addEventListener('submit', function(e){
      e.preventDefault();
      var all = $$('input, select, textarea', form);
      var bad = all.filter(function(field){ return !checkField(field); });

      if (bad.length) {
        bad[0].focus();
        return;
      }

      form.reset();
      ok.classList.add('visible');
      ok.setAttribute('aria-live', 'polite');
      ok.focus();
    });

    $$('input, select, textarea', form).forEach(function(field){
      field.addEventListener('blur', function(){
        if (field.value || field.getAttribute('aria-invalid')) checkField(field);
      });
    });
  }
})();
