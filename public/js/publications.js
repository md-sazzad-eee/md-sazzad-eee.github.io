/* Publication filtering, search, and sorting.
   Without JS the form does nothing and every publication stays visible, which is
   the correct fallback, so the filter controls are only activated here. */
(function () {
  'use strict';

  var form = document.getElementById('pub-filters');
  var list = document.getElementById('pub-list');
  if (!form || !list) return;

  var search = document.getElementById('pub-search');
  var year = document.getElementById('pub-year');
  var type = document.getElementById('pub-type');
  var area = document.getElementById('pub-area');
  var sort = document.getElementById('pub-sort');
  var count = document.getElementById('pub-count');
  var empty = document.getElementById('pub-empty');
  var clear = document.getElementById('pub-clear');

  var items = Array.prototype.slice.call(list.querySelectorAll('.pub'));
  var total = items.length;

  // Remember the original order so "newest first" is stable for equal dates.
  items.forEach(function (el, i) {
    el.dataset.index = String(i);
  });

  function announce(msg) {
    if (window.__announce) window.__announce(msg);
  }

  function apply(quiet) {
    var q = (search.value || '').trim().toLowerCase();
    var fy = year.value;
    var ft = type.value;
    var fa = area.value;

    var shown = 0;
    items.forEach(function (el) {
      var ok =
        (!fy || el.dataset.year === fy) &&
        (!ft || el.dataset.type === ft) &&
        (!fa || el.dataset.area === fa) &&
        (!q || el.dataset.search.indexOf(q) !== -1);
      el.hidden = !ok;
      if (ok) shown++;
    });

    // Sort by reordering the DOM: cheap at this scale and keeps markup honest.
    var mode = sort.value;
    var sorted = items.slice().sort(function (a, b) {
      switch (mode) {
        case 'date-asc':
          return a.dataset.date.localeCompare(b.dataset.date);
        case 'title-asc':
          return a.dataset.title.localeCompare(b.dataset.title);
        case 'title-desc':
          return b.dataset.title.localeCompare(a.dataset.title);
        default:
          return (
            b.dataset.date.localeCompare(a.dataset.date) ||
            Number(a.dataset.index) - Number(b.dataset.index)
          );
      }
    });
    var frag = document.createDocumentFragment();
    sorted.forEach(function (el) {
      frag.appendChild(el);
    });
    list.appendChild(frag);

    var filtered = q || fy || ft || fa;
    count.textContent = filtered
      ? 'Showing ' + shown + ' of ' + total + ' publications.'
      : 'Showing all ' + total + ' publications.';

    empty.hidden = shown !== 0;
    if (!quiet) announce(count.textContent);
  }

  /* debounce the text input so we are not filtering on every keystroke */
  var timer;
  search.addEventListener('input', function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      apply();
      syncUrl();
    }, 220);
  });

  [year, type, area, sort].forEach(function (el) {
    el.addEventListener('change', function () {
      apply();
      syncUrl();
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // filtering is live; nothing to submit
    apply();
  });

  form.addEventListener('reset', function () {
    setTimeout(function () {
      apply();
      syncUrl();
      search.focus();
    }, 0);
  });

  if (clear) {
    clear.addEventListener('click', function () {
      form.reset();
      setTimeout(function () {
        apply();
        syncUrl();
        search.focus();
      }, 0);
    });
  }

  /* Keep filters in the URL so a filtered view can be linked or bookmarked. */
  function syncUrl() {
    if (!window.history || !window.history.replaceState) return;
    var p = new URLSearchParams();
    if (search.value.trim()) p.set('q', search.value.trim());
    if (year.value) p.set('year', year.value);
    if (type.value) p.set('type', type.value);
    if (area.value) p.set('area', area.value);
    if (sort.value !== 'date-desc') p.set('sort', sort.value);
    var qs = p.toString();
    history.replaceState(null, '', qs ? '?' + qs : location.pathname);
  }

  function readUrl() {
    var p = new URLSearchParams(location.search);
    if (p.get('q')) search.value = p.get('q');
    if (p.get('year')) year.value = p.get('year');
    if (p.get('type')) type.value = p.get('type');
    if (p.get('area')) area.value = p.get('area');
    if (p.get('sort')) sort.value = p.get('sort');
  }

  // The submit button only exists for the no-JS case.
  var submit = form.querySelector('button[type="submit"]');
  if (submit) submit.hidden = true;

  readUrl();
  apply(true);

  /* If we arrived with a #hash for a specific paper, make sure it is visible
     and open its abstract. */
  if (location.hash) {
    var target = document.getElementById(location.hash.slice(1));
    if (target && target.classList.contains('pub')) {
      target.hidden = false;
      var absBtn = target.querySelector('[data-disclosure^="abs-"]');
      if (absBtn && absBtn.getAttribute('aria-expanded') !== 'true') absBtn.click();
      target.scrollIntoView({ block: 'start' });
    }
  }
})();
