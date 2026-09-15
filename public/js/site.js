/* Site-wide behaviour: theme toggle, mobile nav, disclosures, copy-to-clipboard.
   Everything here is progressive enhancement: the site is fully usable without it. */
(function () {
  'use strict';

  var root = document.documentElement;

  /* ---------------------------------------------------------------- theme */

  var themeBtn = document.getElementById('theme-toggle');

  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function currentTheme() {
    return root.getAttribute('data-theme') || (systemPrefersDark() ? 'dark' : 'light');
  }

  function syncThemeButton() {
    if (!themeBtn) return;
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    themeBtn.setAttribute('aria-label', 'Switch to ' + next + ' theme');
    themeBtn.setAttribute('title', 'Switch to ' + next + ' theme');
  }

  if (themeBtn) {
    syncThemeButton();
    themeBtn.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try {
        localStorage.setItem('theme', next);
      } catch (e) {
        /* private browsing, so the choice just won't persist */
      }
      syncThemeButton();
      announce('Switched to ' + next + ' theme');
    });
  }

  // Follow the OS if the visitor has never picked a theme themselves.
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var onChange = function () {
      var stored = null;
      try {
        stored = localStorage.getItem('theme');
      } catch (e) {}
      if (!stored) {
        root.removeAttribute('data-theme');
        syncThemeButton();
      }
    };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else if (mq.addListener) mq.addListener(onChange); // Safari < 14
  }

  /* ------------------------------------------------------------------ nav */

  var navBtn = document.getElementById('nav-toggle');
  var nav = document.getElementById('site-nav');

  function setNav(open) {
    if (!navBtn || !nav) return;
    navBtn.setAttribute('aria-expanded', String(open));
    navBtn.setAttribute('aria-label', (open ? 'Close' : 'Open') + ' main menu');
    nav.setAttribute('data-open', String(open));
  }

  if (navBtn && nav) {
    setNav(false);

    navBtn.addEventListener('click', function () {
      setNav(navBtn.getAttribute('aria-expanded') !== 'true');
    });

    // Close on Escape and return focus to the button.
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navBtn.getAttribute('aria-expanded') === 'true') {
        setNav(false);
        navBtn.focus();
      }
    });

    // Close when clicking outside the open panel.
    document.addEventListener('click', function (e) {
      if (navBtn.getAttribute('aria-expanded') !== 'true') return;
      if (nav.contains(e.target) || navBtn.contains(e.target)) return;
      setNav(false);
    });

    // Reset when crossing into the desktop layout.
    var desktop = window.matchMedia('(min-width: 62rem)');
    var onDesktop = function (e) {
      if (e.matches) setNav(false);
    };
    if (desktop.addEventListener) desktop.addEventListener('change', onDesktop);
    else if (desktop.addListener) desktop.addListener(onDesktop);
  }

  /* ---------------------------------------------------- disclosure widgets */

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-disclosure]');
    if (!btn) return;

    var panel = document.getElementById(btn.getAttribute('data-disclosure'));
    if (!panel) return;

    var open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    panel.hidden = open;

    var label = btn.querySelector('[data-label-closed]');
    if (label) {
      label.textContent = open
        ? label.getAttribute('data-label-closed')
        : label.getAttribute('data-label-open');
    }
  });

  /* ------------------------------------------------------ copy to clipboard */

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-copy]');
    if (!btn) return;

    var source = document.getElementById(btn.getAttribute('data-copy'));
    if (!source) return;

    var code = source.querySelector('code') || source;
    var text = code.textContent;
    var label = btn.querySelector('span');
    var original = label ? label.textContent : '';

    var done = function (ok) {
      if (!label) return;
      label.textContent = ok ? 'Copied' : 'Press Ctrl+C';
      announce(ok ? 'Citation copied to clipboard' : 'Copy failed, the text is selected instead');
      setTimeout(function () {
        label.textContent = original;
      }, 2000);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        function () { done(true); },
        function () { selectText(code); done(false); }
      );
    } else {
      selectText(code);
      done(false);
    }
  });

  function selectText(el) {
    try {
      var range = document.createRange();
      range.selectNodeContents(el);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    } catch (e) {}
  }

  /* ----------------------------------------------- screen reader announcer */

  var liveRegion;
  function announce(message) {
    if (!liveRegion) {
      liveRegion = document.createElement('p');
      liveRegion.className = 'visually-hidden';
      liveRegion.setAttribute('role', 'status');
      liveRegion.setAttribute('aria-live', 'polite');
      document.body.appendChild(liveRegion);
    }
    liveRegion.textContent = '';
    setTimeout(function () {
      liveRegion.textContent = message;
    }, 60);
  }

  window.__announce = announce;
})();
