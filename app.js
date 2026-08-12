/* Esconde o cabeçalho ao descer, mostra ao subir. Só em ecrãs pequenos. */
(function () {
  var bar = document.querySelector('.bar');
  if (!bar) return;

  var last = window.scrollY;
  var ticking = false;

  function update() {
    ticking = false;
    if (window.innerWidth >= 820) { bar.classList.remove('bar-hidden'); return; }

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
