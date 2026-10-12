(function () {
  var q = document.getElementById('q');
  if (q) {
    var items = [].slice.call(document.querySelectorAll('.jobs li'));
    var out = document.getElementById('qn'), none = document.getElementById('qnone');
    var run = function () {
      var v = q.value.trim().toLowerCase(), shown = 0;
      items.forEach(function (li) {
        var ok = !v || li.textContent.toLowerCase().indexOf(v) > -1;
        li.hidden = !ok;
        if (ok) shown++;
      });
      [].forEach.call(document.querySelectorAll('.jobs'), function (ul) {
        var any = !!ul.querySelector('li:not([hidden])'), h = ul.previousElementSibling, r = ul.nextElementSibling;
        ul.hidden = !any;
        if (h && h.tagName === 'H3') h.hidden = !any;
        if (r && r.classList.contains('rest')) r.hidden = !!v;
      });
      [].forEach.call(document.querySelectorAll('.part[data-part]'), function (s) {
        s.hidden = !s.querySelector('.jobs li:not([hidden])');
      });
      out.textContent = v ? shown + ' of ' + items.length : '';
      none.hidden = !(v && !shown);
    };
    q.addEventListener('input', run);
    q.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') { q.value = ''; run(); } });
  }
  var links = [].slice.call(document.querySelectorAll('.toc a:not(.in)'));
  if (links.length && 'IntersectionObserver' in window) {
    var bar = document.querySelector('.toc');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) {
          var on = a.getAttribute('href') === '#' + en.target.id;
          a.classList.toggle('on', on);
          if (on && bar.scrollWidth > bar.clientWidth) bar.scrollTo({ left: a.offsetLeft - 24, behavior: 'smooth' });
        });
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    links.forEach(function (a) {
      var el = document.getElementById(a.getAttribute('href').slice(1));
      if (el) io.observe(el);
    });
  }
})();
