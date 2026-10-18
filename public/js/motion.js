/* Motion graphics for the system view and site chrome.

   - Scroll progress trace along the top of the viewport.
   - Oscilloscope: three-phase voltages plus a rotating phasor dial, drawn on
     a canvas, with an occasional voltage sag that the twin "detects".
   - Live readouts in the system view (clock, Tj, SOC, coverage, frequency).
   - Pauses everything when the panel is off screen or the tab is hidden, and
     renders a single still frame when the visitor prefers reduced motion. */
(function () {
  'use strict';

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------ scroll progress */
  var bar = document.createElement('div');
  bar.className = 'scroll-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);
  var ticking = false;
  var setProgress = function () {
    ticking = false;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.setProperty('--p', h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)).toFixed(4) : 0);
  };
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(setProgress); }
  }, { passive: true });
  setProgress();

  /* ------------------------------------------------------- system view */
  var view = document.getElementById('sysview');
  var canvas = document.getElementById('scope-canvas');
  if (!view || !canvas || !canvas.getContext) return;

  var svg = view.querySelector('svg');
  var ctx = canvas.getContext('2d');
  var out = {};
  Array.prototype.forEach.call(view.querySelectorAll('[data-readout]'), function (el) {
    out[el.getAttribute('data-readout')] = el;
  });
  var set = function (k, v) { if (out[k] && out[k].textContent !== v) out[k].textContent = v; };

  /* Theme colours, re-read when the theme changes */
  var col = {};
  var readColors = function () {
    var cs = getComputedStyle(document.documentElement);
    var g = function (n) { return cs.getPropertyValue(n).trim(); };
    col.a = g('--accent');
    col.b = g('--accent-2');
    col.c = g('--ph-c');
    col.grid = 'rgb(' + g('--scope-grid') + ' / 0.10)';
    col.axis = 'rgb(' + g('--scope-grid') + ' / 0.22)';
    col.text = g('--text-faint');
    col.warn = g('--warn');
    col.mono = g('--font-mono') || 'monospace';
  };
  readColors();
  var themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) themeBtn.addEventListener('click', function () { setTimeout(function () { readColors(); if (!running) frame(lastT); }, 80); });
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    if (mq.addEventListener) mq.addEventListener('change', function () { setTimeout(readColors, 50); });
  }

  /* Canvas sizing with device pixel ratio */
  var W = 360, H = 220, dpr = Math.min(window.devicePixelRatio || 1, 2);
  var size = function () {
    var r = canvas.getBoundingClientRect();
    if (!r.width) return;
    W = r.width; H = r.width * (220 / 360);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  size();
  if ('ResizeObserver' in window) new ResizeObserver(function () { size(); if (!running) frame(lastT); }).observe(canvas);

  /* Signal model: 50 Hz three-phase set, slowed down for display, with a
     sag event every ~11 s that dips the amplitude and recovers. */
  var TWO_PI = Math.PI * 2;
  var sagLevel = function (t) {
    var cyc = t % 11;
    if (cyc < 7.4 || cyc > 8.6) return 1;
    var x = (cyc - 7.4) / 1.2;           // 0..1 across the event
    return 1 - 0.42 * Math.sin(Math.PI * Math.min(1, x * 1.15));
  };

  var frame = function (t) {
    var w = W, h = H;
    ctx.clearRect(0, 0, w, h);

    var dialR = Math.min(h * 0.32, w * 0.15);
    var dialX = w - dialR - 14, dialY = h / 2;
    var plotR = dialX - dialR - 18;      // right edge of the waveform plot
    var mid = h / 2, amp = h * 0.34;

    /* graticule */
    ctx.lineWidth = 1;
    ctx.strokeStyle = col.grid;
    ctx.beginPath();
    for (var gx = 0; gx <= plotR; gx += plotR / 8) { ctx.moveTo(gx, 6); ctx.lineTo(gx, h - 6); }
    for (var gy = 0; gy <= 6; gy++) { var yy = 6 + (h - 12) * gy / 6; ctx.moveTo(0, yy); ctx.lineTo(plotR, yy); }
    ctx.stroke();
    ctx.strokeStyle = col.axis;
    ctx.beginPath(); ctx.moveTo(0, mid); ctx.lineTo(plotR, mid); ctx.stroke();

    /* three phases, scrolling */
    var speed = 1.6;                      // display cycles per second
    var phases = [[col.a, 0], [col.b, -TWO_PI / 3], [col.c, TWO_PI / 3]];
    var sag = sagLevel(t);
    ctx.lineWidth = 1.8;
    ctx.lineJoin = 'round';
    for (var p = 0; p < 3; p++) {
      ctx.strokeStyle = phases[p][0];
      ctx.shadowColor = phases[p][0];
      ctx.shadowBlur = 6;
      ctx.beginPath();
      for (var x = 0; x <= plotR; x += 2) {
        var tt = t - (plotR - x) / plotR * 1.25;   // last 1.25 s across the screen
        var a = amp * sagLevel(tt) * (1 + 0.012 * Math.sin(tt * 37 + p));
        var y = mid - a * Math.sin(TWO_PI * speed * tt + phases[p][1]);
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    ctx.shadowBlur = 0;

    /* nominal envelope, dashed, so the sag reads at a glance */
    ctx.setLineDash([3, 4]);
    ctx.strokeStyle = col.axis;
    ctx.beginPath();
    ctx.moveTo(0, mid - amp); ctx.lineTo(plotR, mid - amp);
    ctx.moveTo(0, mid + amp); ctx.lineTo(plotR, mid + amp);
    ctx.stroke();
    ctx.setLineDash([]);

    /* phasor dial */
    ctx.strokeStyle = col.axis;
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(dialX, dialY, dialR, 0, TWO_PI); ctx.stroke();
    ctx.beginPath(); ctx.arc(dialX, dialY, dialR * 0.5, 0, TWO_PI); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(dialX - dialR - 4, dialY); ctx.lineTo(dialX + dialR + 4, dialY);
    ctx.moveTo(dialX, dialY - dialR - 4); ctx.lineTo(dialX, dialY + dialR + 4);
    ctx.stroke();
    var th = TWO_PI * speed * t * 0.25;  // phasors rotate slower than the trace
    for (var q = 0; q < 3; q++) {
      var ang = th + phases[q][1];
      var len = dialR * 0.92 * sag;
      var ex = dialX + len * Math.cos(ang), ey = dialY - len * Math.sin(ang);
      ctx.strokeStyle = phases[q][0];
      ctx.fillStyle = phases[q][0];
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(dialX, dialY); ctx.lineTo(ex, ey); ctx.stroke();
      ctx.beginPath(); ctx.arc(ex, ey, 2.6, 0, TWO_PI); ctx.fill();
    }

    /* labels */
    ctx.fillStyle = sag < 0.97 ? col.warn : col.text;
    ctx.font = '600 10px ' + col.mono;
    ctx.fillText(sag < 0.97 ? 'SAG ' + Math.round(sag * 100) + '%' : '1.00 pu', 8, 16);
    ctx.fillStyle = col.text;
    ctx.fillText('PHASORS', dialX - dialR, h - 8);

    /* readouts and alarm state */
    var inSag = sag < 0.97;
    if (inSag !== (view.getAttribute('data-event') === 'sag')) {
      if (inSag) view.setAttribute('data-event', 'sag'); else view.removeAttribute('data-event');
      set('event', inSag ? 'SAG · RIDE-THROUGH' : 'NORMAL');
      set('fdia', inSag ? 'EVENT LOGGED' : 'FDIA OK');
    }
  };

  var start = performance.now();
  var lastT = 0, lastRead = -1, running = false, visible = true, raf = 0;

  var readouts = function (t) {
    var s = Math.floor(t);
    var hh = Math.floor(s / 3600), mm = Math.floor(s / 60) % 60, ss = s % 60;
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };
    set('clock', 't+' + pad(hh) + ':' + pad(mm) + ':' + pad(ss) + '.' + Math.floor((t % 1) * 10));
    var sag = sagLevel(t);
    var n = function (a) { return (Math.random() - 0.5) * a; };
    set('freq', (50 + 0.018 * Math.sin(t * 0.7) + n(0.006) - (1 - sag) * 0.09).toFixed(2) + ' Hz');
    set('vrms', (230.2 * sag + n(0.4)).toFixed(1) + ' V');
    set('p', (84.6 + 3.2 * Math.sin(t * 0.21) + n(0.3)).toFixed(1) + ' kW');
    set('h', (3.92 + 0.03 * Math.sin(t * 0.33) + n(0.01)).toFixed(2) + ' s');
    set('tj', 'Tj ' + (74.2 + 2.4 * Math.sin(t * 0.18) + n(0.15)).toFixed(1) + '°C');
    set('vdc', Math.round(800 + 4 * Math.sin(t * 1.3) + n(1.5)) + ' V');
    set('soc', 'SOC ' + Math.round(72 + 14 * Math.sin(t * TWO_PI / 10)) + '%');
    set('cover', 'cov ' + (95.2 + 0.4 * Math.sin(t * 0.27) + n(0.05)).toFixed(1) + '%');
  };

  var loop = function (now) {
    var t = (now - start) / 1000;
    lastT = t;
    frame(t);
    if (Math.floor(t * 4) !== lastRead) { lastRead = Math.floor(t * 4); readouts(t); }
    raf = requestAnimationFrame(loop);
  };

  var play = function () {
    if (running || reduced || !visible || document.hidden) return;
    running = true;
    if (svg && svg.unpauseAnimations) svg.unpauseAnimations();
    raf = requestAnimationFrame(loop);
  };
  var pause = function () {
    if (!running) return;
    running = false;
    cancelAnimationFrame(raf);
    if (svg && svg.pauseAnimations) svg.pauseAnimations();
  };

  if (reduced) {
    if (svg && svg.pauseAnimations) svg.pauseAnimations();
    var ls = document.querySelector('.loop-feedback svg');
    if (ls && ls.pauseAnimations) ls.pauseAnimations();
    frame(2.2);
    readouts(2.2);
    return;
  }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible) play(); else pause();
    }, { rootMargin: '80px' }).observe(view);
  }
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) pause(); else play();
  });

  /* Also pause the loop animation SVG off screen */
  var loopSvg = document.querySelector('.loop-feedback svg');
  if (loopSvg && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (e) {
      if (e[0].isIntersecting) { if (loopSvg.unpauseAnimations) loopSvg.unpauseAnimations(); }
      else if (loopSvg.pauseAnimations) loopSvg.pauseAnimations();
    }).observe(loopSvg);
  }

  frame(0);
  readouts(0);
  play();
})();
