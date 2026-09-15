/* Decorative motion: cursor circuit trail, magnetic buttons, card tilt and edge
   lighting, counting metrics, rotating focus line, scroll reveal.

   Everything here is optional. It is skipped entirely when there is no real
   pointer, when the visitor prefers reduced motion, or when JS does not run at
   all. Nothing changes layout, so none of it can cause layout shift. */
(function () {
  'use strict';

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
  var enhance = finePointer && !reduced;

  /* ==================================================== cursor circuit trail */

  if (enhance) {
    var canvas = document.createElement('canvas');
    canvas.className = 'cursor-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.appendChild(canvas);

    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2); // cap: 3x costs 2.25x the fill
    var W = 0, H = 0;

    var resize = function () {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    });

    /* Read the accent colour from the theme so the trail recolours when the
       visitor switches between light and dark. */
    var trailColor = [58, 212, 239];
    var readColor = function () {
      var raw = getComputedStyle(document.documentElement).getPropertyValue('--glow').trim();
      var parts = raw.split(/[\s,]+/).map(Number);
      if (parts.length === 3 && parts.every(function (n) { return !isNaN(n); })) trailColor = parts;
    };
    readColor();

    var themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) themeBtn.addEventListener('click', function () { setTimeout(readColor, 60); });

    var MAX = 16;       // trail length: enough to read as a circuit, cheap to draw
    var pts = [];       // cursor history, newest last
    var nodes = [];     // junction dots that pulse and fade
    var mx = 0, my = 0, hasPointer = false;
    var running = false, idleFrames = 0;

    var rgba = function (a) {
      return 'rgba(' + trailColor[0] + ',' + trailColor[1] + ',' + trailColor[2] + ',' + a + ')';
    };

    /* Route between two points with a single 45 degree bend, the way a PCB
       trace turns, rather than a straight diagonal. */
    var traceTo = function (from, to) {
      var dx = to.x - from.x;
      var dy = to.y - from.y;
      var adx = Math.abs(dx), ady = Math.abs(dy);
      ctx.moveTo(from.x, from.y);
      if (adx > ady) {
        ctx.lineTo(to.x - Math.sign(dx) * ady, from.y);
      } else {
        ctx.lineTo(from.x, to.y - Math.sign(dy) * adx);
      }
      ctx.lineTo(to.x, to.y);
    };

    var draw = function () {
      ctx.clearRect(0, 0, W, H);

      // Conductors: older segments thinner and fainter.
      for (var i = 1; i < pts.length; i++) {
        var t = i / pts.length;
        ctx.beginPath();
        ctx.strokeStyle = rgba(0.5 * t * pts[i].life);
        ctx.lineWidth = 0.6 + 1.5 * t;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        traceTo(pts[i - 1], pts[i]);
        ctx.stroke();
      }

      // Junction nodes.
      for (var j = nodes.length - 1; j >= 0; j--) {
        var n = nodes[j];
        n.life -= 0.016;
        if (n.life <= 0) { nodes.splice(j, 1); continue; }
        var r = n.r * (1 + (1 - n.life) * 1.6);
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.strokeStyle = rgba(0.6 * n.life);
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // Leading dot with a soft halo.
      if (pts.length) {
        var head = pts[pts.length - 1];
        var g = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 26);
        g.addColorStop(0, rgba(0.32));
        g.addColorStop(1, rgba(0));
        ctx.fillStyle = g;
        ctx.fillRect(head.x - 26, head.y - 26, 52, 52);

        ctx.beginPath();
        ctx.arc(head.x, head.y, 2.6, 0, Math.PI * 2);
        ctx.fillStyle = rgba(0.95);
        ctx.fill();
      }
    };

    var tick = function () {
      // Fade the tail when the cursor stops, then stop the loop entirely so an
      // idle page costs nothing.
      for (var i = 0; i < pts.length; i++) pts[i].life *= 0.955;
      while (pts.length && pts[0].life < 0.05) pts.shift();

      draw();

      idleFrames++;
      if (idleFrames > 90 && !pts.length && !nodes.length) {
        running = false;
        ctx.clearRect(0, 0, W, H);
        return;
      }
      requestAnimationFrame(tick);
    };

    var start = function () {
      if (running) return;
      running = true;
      requestAnimationFrame(tick);
    };

    window.addEventListener(
      'pointermove',
      function (e) {
        if (e.pointerType !== 'mouse') return;
        mx = e.clientX;
        my = e.clientY;
        idleFrames = 0;

        var last = pts[pts.length - 1];
        var moved = !last || Math.abs(mx - last.x) + Math.abs(my - last.y) > 6;
        if (moved) {
          pts.push({ x: mx, y: my, life: 1 });
          if (pts.length > MAX) pts.shift();
          // Occasional junction node, capped so the array cannot grow.
          if (Math.random() < 0.09 && nodes.length < 8) {
            nodes.push({ x: mx, y: my, r: 3 + Math.random() * 3, life: 1 });
          }
        }

        if (!hasPointer) {
          hasPointer = true;
          canvas.setAttribute('data-active', 'true');
        }
        start();
      },
      { passive: true }
    );

    var hide = function () {
      canvas.setAttribute('data-active', 'false');
      hasPointer = false;
      pts.length = 0;
      nodes.length = 0;
    };
    document.addEventListener('pointerleave', hide);
    window.addEventListener('blur', hide);

    /* ------------------------------------------- card tilt and edge lighting */

    var activeCard = null, cx = 0, cy = 0, cardPending = false;

    var paintCard = function () {
      cardPending = false;
      if (!activeCard) return;
      activeCard.style.setProperty('--px', cx + '%');
      activeCard.style.setProperty('--py', cy + '%');
      if (activeCard.classList.contains('card')) {
        // Max 5 degrees: enough to read as depth, not enough to distort text.
        activeCard.style.setProperty('--tx', ((cx - 50) / 50) * 5 + 'deg');
        activeCard.style.setProperty('--ty', ((50 - cy) / 50) * 5 + 'deg');
        activeCard.setAttribute('data-tilt', 'true');
      }
    };

    var clearCard = function (el) {
      if (!el) return;
      el.style.removeProperty('--px');
      el.style.removeProperty('--py');
      el.style.removeProperty('--tx');
      el.style.removeProperty('--ty');
      el.removeAttribute('data-tilt');
    };

    document.addEventListener(
      'pointermove',
      function (e) {
        if (e.pointerType !== 'mouse') return;
        var card = e.target.closest('.card, .pub');
        if (card !== activeCard) {
          clearCard(activeCard);
          activeCard = card;
        }
        if (!card) return;
        var r = card.getBoundingClientRect();
        cx = ((e.clientX - r.left) / r.width) * 100;
        cy = ((e.clientY - r.top) / r.height) * 100;
        if (!cardPending) {
          cardPending = true;
          requestAnimationFrame(paintCard);
        }
      },
      { passive: true }
    );

    /* ---------------------------------------------------- magnetic buttons */

    var magnets = document.querySelectorAll('.btn, .theme-toggle, .nav-toggle');
    Array.prototype.forEach.call(magnets, function (el) {
      var raf = null, tx = 0, ty = 0;

      var apply = function () {
        raf = null;
        el.style.transform = 'translate(' + tx + 'px,' + ty + 'px)';
      };

      el.addEventListener(
        'pointermove',
        function (e) {
          if (e.pointerType !== 'mouse') return;
          var r = el.getBoundingClientRect();
          // Pull is a fraction of the offset from centre, capped by the element.
          tx = ((e.clientX - (r.left + r.width / 2)) / r.width) * 12;
          ty = ((e.clientY - (r.top + r.height / 2)) / r.height) * 12;
          if (!raf) raf = requestAnimationFrame(apply);
        },
        { passive: true }
      );

      var release = function () {
        if (raf) { cancelAnimationFrame(raf); raf = null; }
        el.style.transform = '';
      };
      el.addEventListener('pointerleave', release);
      el.addEventListener('blur', release);
    });
  }

  /* ============================================== rotating research focus */

  var rotator = document.getElementById('focus-rotator');
  if (rotator && !reduced) {
    var items = (rotator.getAttribute('data-items') || '').split('|').filter(Boolean);
    if (items.length > 1) {
      var idx = 0;
      setInterval(function () {
        if (document.hidden) return; // do not animate in a background tab
        rotator.setAttribute('data-swapping', 'true');
        setTimeout(function () {
          idx = (idx + 1) % items.length;
          rotator.textContent = items[idx];
          rotator.setAttribute('data-swapping', 'false');
        }, 300);
      }, 3200);
    }
  }

  /* ====================================== counting metrics and scroll reveal */

  if ('IntersectionObserver' in window) {
    /* Metrics count up once, when they first scroll into view. */
    var counters = document.querySelectorAll('[data-count-to]');
    if (counters.length && !reduced) {
      var countObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var el = entry.target;
            countObserver.unobserve(el);

            var target = parseFloat(el.getAttribute('data-count-to'));
            var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
            var duration = 900;
            var t0 = performance.now();

            var step = function (now) {
              var p = Math.min((now - t0) / duration, 1);
              // Ease out cubic, so it decelerates into the final value.
              var eased = 1 - Math.pow(1 - p, 3);
              el.textContent = (target * eased).toFixed(decimals);
              if (p < 1) requestAnimationFrame(step);
              else el.textContent = target.toFixed(decimals);
            };
            requestAnimationFrame(step);
          });
        },
        { threshold: 0.5 }
      );
      Array.prototype.forEach.call(counters, function (el) { countObserver.observe(el); });
    }

    /* Reveal on scroll. Deferred one frame: a page script that runs after this one
       (for example the publications list's initial sort) can still reorder the DOM
       first, so the "already on screen" check below sees final layout, not a
       position that is about to move. Without this, an element judged off-screen
       pre-sort could get animated in at its old spot and never actually reveal
       once moved, or vice versa. */
    if (!reduced) {
      requestAnimationFrame(function () {
        var io = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (!entry.isIntersecting) return;
              entry.target.setAttribute('data-shown', 'true');
              io.unobserve(entry.target);
            });
          },
          { rootMargin: '0px 0px -8% 0px', threshold: 0.06 }
        );

        var targets = document.querySelectorAll(
          '.section-head, .card, .pub, .timeline > li, .metric, .hero-visual'
        );
        var pending = [];
        Array.prototype.forEach.call(targets, function (el, i) {
          // Anything already on screen at load skips the animation entirely.
          if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
          el.classList.add('reveal');
          el.style.transitionDelay = Math.min(i % 6, 5) * 55 + 'ms';
          io.observe(el);
          pending.push(el);
        });

        // Safety net: a fast programmatic scroll (or a browser quirk) can in rare
        // cases skip the intersection check for a given frame. Content must never
        // stay permanently invisible over an animation nicety, so anything still
        // unrevealed a few seconds after load is shown unconditionally.
        if (pending.length) {
          setTimeout(function () {
            pending.forEach(function (el) {
              if (el.getAttribute('data-shown') !== 'true') el.setAttribute('data-shown', 'true');
            });
          }, 2500);
        }
      });
    }
  }
})();
