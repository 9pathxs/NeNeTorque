/* ---------------------------------------------------------
   NeNeTorque Oficina Auto
   1. Cabecalho que recolhe ao descer, em telemovel
   2. Acordeao dos servicos, em telemovel
   --------------------------------------------------------- */

var MOBILE = 820;

/* ---------- 1. cabecalho ---------- */
(function () {
  var bar = document.querySelector('.bar');
  if (!bar) return;

  var last = window.scrollY;
  var ticking = false;

  function update() {
    ticking = false;
    if (window.innerWidth >= MOBILE) { bar.classList.remove('bar-hidden'); return; }

    var y = window.scrollY;
    if (y < 90) { bar.classList.remove('bar-hidden'); last = y; return; }
    if (Math.abs(y - last) < 8) return;

    if (y > last) bar.classList.add('bar-hidden');
    else bar.classList.remove('bar-hidden');

    last = y;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
  }, { passive: true });

  window.addEventListener('resize', update, { passive: true });
})();

/* ---------- 2. acordeao ---------- */
(function () {
  var blocks = document.querySelectorAll('.svc-block');
  if (!blocks.length) return;

  Array.prototype.forEach.call(blocks, function (block) {
    var h = block.querySelector('h2');
    var body = block.querySelector('.svc-body');
    if (!h || !body) return;

    if (!body.id) body.id = 'body-' + (block.id || Math.random().toString(36).slice(2));

    h.setAttribute('role', 'button');
    h.setAttribute('tabindex', '0');
    h.setAttribute('aria-controls', body.id);
    h.setAttribute('aria-expanded', 'false');

    function toggle() {
      if (window.innerWidth >= MOBILE) return;
      var open = block.classList.toggle('open');
      h.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    h.addEventListener('click', toggle);
    h.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  });

  function abrirDoHash() {
    if (!location.hash) return;
    var alvo = document.querySelector('.svc-block' + location.hash);
    if (!alvo) return;
    alvo.classList.add('open');
    var h = alvo.querySelector('h2');
    if (h) h.setAttribute('aria-expanded', 'true');
    setTimeout(function () {
      alvo.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  }

  abrirDoHash();
  window.addEventListener('hashchange', abrirDoHash);
})();
