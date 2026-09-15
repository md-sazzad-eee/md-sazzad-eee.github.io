/* CV page: confirm the embedded viewer actually rendered, and announce downloads.
   iOS Safari reports support for <object type="application/pdf"> but renders a
   blank box, so we check the rendered height and swap in the fallback if needed. */
(function () {
  'use strict';

  var viewer = document.querySelector('object.pdf-frame');

  if (viewer) {
    var isIOS =
      /iP(hone|ad|od)/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    var showFallback = function () {
      var fallback = viewer.querySelector('.pdf-fallback');
      if (!fallback) return;
      var replacement = fallback.cloneNode(true);
      viewer.parentNode.replaceChild(replacement, viewer);
    };

    if (isIOS) {
      showFallback();
    } else {
      // Give the plugin a moment, then sanity-check that something was drawn.
      window.setTimeout(function () {
        if (!document.body.contains(viewer)) return;
        var box = viewer.getBoundingClientRect();
        if (box.height < 80) showFallback();
      }, 1200);
    }
  }

  /* Announce the download for screen reader users, since a file download is otherwise
     a completely silent event. */
  document.addEventListener('click', function (e) {
    var link = e.target.closest('[data-cv-download]');
    if (!link) return;
    if (window.__announce) {
      window.__announce('Downloading ' + link.getAttribute('data-cv-download') + ' as a PDF file.');
    }
  });
})();
