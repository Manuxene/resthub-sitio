/* ══════════ RestHub-IA · comportamiento ══════════ */
(function () {
  'use strict';

  /* ── nav que se opaca al bajar ── */
  var nav = document.getElementById('nav');
  var alBajar = function () {
    nav.classList.toggle('es-pegado', window.scrollY > 24);
  };
  alBajar();
  window.addEventListener('scroll', alBajar, { passive: true });

  /* ── carrusel de la portada ── */
  var TOTAL = 3;
  var ESPERA = 12000;         // 12s: lo que tarda el celular en contar su historia completa
  var actual = 0;
  var reloj = null;

  var grupos = [
    document.querySelectorAll('.tituloni'),
    document.querySelectorAll('.escena-cel'),
    document.querySelectorAll('.escena-txt'),
    document.querySelectorAll('.escena-precio')
  ];
  var pastillas = document.querySelectorAll('.pastilla');
  var contador = document.querySelector('.contador b');
  var hero = document.getElementById('hero');
  var navComoFunciona = document.getElementById('nav-como-funciona');

  // a qué sección de "cómo funciona" manda el link del nav, según el plan activo
  var DESTINO_COMO_FUNCIONA = ['#agente', '#menutag', '#combinado'];

  // el que se va sale a la derecha, el que entra viene de la izquierda:
  // el tercero cruza la pantalla pero en opacidad 0, así que no se ve.
  function pintar(i) {
    var anterior = (i + TOTAL - 1) % TOTAL;
    grupos.forEach(function (lista) {
      lista.forEach(function (el, k) {
        el.classList.toggle('es-actual', k === i);
        el.classList.toggle('es-anterior', k === anterior);
      });
    });
    pastillas.forEach(function (p, k) {
      p.classList.toggle('es-on', k === i);
      p.setAttribute('aria-selected', k === i ? 'true' : 'false');
    });
    if (contador) contador.textContent = '0' + (i + 1);
    if (navComoFunciona) navComoFunciona.setAttribute('href', DESTINO_COMO_FUNCIONA[i]);
    actual = i;
  }

  function ir(i, manual) {
    pintar((i + TOTAL) % TOTAL);
    if (manual) reiniciar();
  }

  function reiniciar() {
    clearInterval(reloj);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    reloj = setInterval(function () { ir(actual + 1); }, ESPERA);
  }

  document.querySelector('.flecha--next').addEventListener('click', function () { ir(actual + 1, true); });
  document.querySelector('.flecha--prev').addEventListener('click', function () { ir(actual - 1, true); });
  pastillas.forEach(function (p, k) {
    p.addEventListener('click', function () { ir(k, true); });
  });

  // flechas del teclado, solo cuando la portada está a la vista
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    var caja = hero.getBoundingClientRect();
    if (caja.bottom < 120) return;
    ir(actual + (e.key === 'ArrowRight' ? 1 : -1), true);
  });

  // arrastre con el dedo
  var x0 = null;
  hero.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  hero.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 45) ir(actual + (dx < 0 ? 1 : -1), true);
    x0 = null;
  }, { passive: true });

  // no rotar mientras la portada no se ve, ni con el mouse encima
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entradas) {
      entradas[0].isIntersecting ? reiniciar() : clearInterval(reloj);
    }, { threshold: 0.25 }).observe(hero);
  } else {
    reiniciar();
  }
  hero.addEventListener('mouseenter', function () { clearInterval(reloj); });
  hero.addEventListener('mouseleave', reiniciar);

  /* ── cuánto puede desplazarse cada lista de los celulares ──
     Se mide en el navegador porque depende del alto de la pantalla y del
     largo del contenido. Si mañana se agregan platos o líneas de diálogo,
     esto se reajusta solo: no hay números escritos a mano en el CSS. */
  var VENTANAS = [
    ['.ll-trans', '.ll-scroll'],
    ['.rg-lista', '.rg-scroll'],
    ['.wa-chat',  '.wa-scroll'],
    ['.mn-lista', '.mn-scroll']
  ];
  function medirRecorridos() {
    VENTANAS.forEach(function (par) {
      document.querySelectorAll(par[0]).forEach(function (ventana) {
        var lista = ventana.querySelector(par[1]);
        if (!lista) return;
        var sobra = Math.max(0, lista.scrollHeight - ventana.clientHeight);
        lista.style.setProperty('--recorrido', Math.round(sobra) + 'px');
      });
    });
  }
  medirRecorridos();
  // las tipografías cambian el alto del texto: hay que volver a medir cuando cargan
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(medirRecorridos);
  var remedir;
  window.addEventListener('resize', function () {
    clearTimeout(remedir);
    remedir = setTimeout(medirRecorridos, 180);
  });

  pintar(0);

  /* ── las secciones aparecen al llegar ── */
  if ('IntersectionObserver' in window &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var ojo = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.style.opacity = '1';
        en.target.style.transform = 'none';
        ojo.unobserve(en.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.paso, .bloque, .plan, .tira > div').forEach(function (el, k) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      el.style.transition = 'opacity .7s cubic-bezier(.16,1,.3,1) ' + (k % 4) * 0.08 + 's,' +
                            'transform .7s cubic-bezier(.16,1,.3,1) ' + (k % 4) * 0.08 + 's';
      ojo.observe(el);
    });
  }
})();
