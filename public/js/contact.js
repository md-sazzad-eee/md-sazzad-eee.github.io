/* Contact form: inline validation with accessible error messages, honeypot spam
   check, and submission via the Web3Forms API. Without JS the browser's own
   required/type validation still applies and the form falls back to mailto. */
(function () {
  'use strict';

  var form = document.getElementById('contact-form');
  if (!form) return;

  var mode = form.getAttribute('data-mode'); // 'api' | 'mailto'
  var email = form.getAttribute('data-email');
  var status = document.getElementById('form-status');
  var submit = document.getElementById('contact-submit');

  var RULES = {
    name: function (v) {
      if (!v.trim()) return 'Please enter your name.';
      if (v.trim().length < 2) return 'That name looks too short.';
      return '';
    },
    email: function (v) {
      if (!v.trim()) return 'Please enter your email address.';
      // Deliberately permissive. The real check is whether a reply arrives.
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())) return 'Please enter a valid email address.';
      return '';
    },
    subject: function (v) {
      if (!v.trim()) return 'Please add a subject.';
      if (v.trim().length < 3) return 'That subject looks too short.';
      return '';
    },
    message: function (v) {
      if (!v.trim()) return 'Please write a message.';
      if (v.trim().length < 20) return 'Please write at least 20 characters so I can reply usefully.';
      return '';
    },
  };

  function fieldOf(name) {
    return form.querySelector('#' + name);
  }
  function errorOf(name) {
    return document.getElementById(name + '-error');
  }

  function showError(name, message) {
    var input = fieldOf(name);
    var err = errorOf(name);
    if (!input || !err) return;
    if (message) {
      input.setAttribute('aria-invalid', 'true');
      err.textContent = message;
      err.hidden = false;
    } else {
      input.removeAttribute('aria-invalid');
      err.textContent = '';
      err.hidden = true;
    }
  }

  function validate(name) {
    var input = fieldOf(name);
    if (!input) return true;
    var msg = RULES[name](input.value);
    showError(name, msg);
    return !msg;
  }

  Object.keys(RULES).forEach(function (name) {
    var input = fieldOf(name);
    if (!input) return;
    // Validate on blur, then live once the field has been touched.
    input.addEventListener('blur', function () {
      validate(name);
    });
    input.addEventListener('input', function () {
      if (input.getAttribute('aria-invalid') === 'true') validate(name);
    });
  });

  function setStatus(kind, message) {
    if (!status) return;
    status.className = 'form-status form-status--' + kind;
    status.textContent = message;
    status.hidden = false;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Honeypot: a real person never fills a field they cannot see.
    var hp = form.querySelector('#botcheck');
    if (hp && hp.value) return;

    var names = Object.keys(RULES);
    var ok = names.map(validate).every(Boolean);

    if (!ok) {
      setStatus('error', 'Please fix the highlighted fields and try again.');
      var firstBad = form.querySelector('[aria-invalid="true"]');
      if (firstBad) firstBad.focus();
      return;
    }

    var data = {
      name: fieldOf('name').value.trim(),
      email: fieldOf('email').value.trim(),
      subject: fieldOf('subject').value.trim(),
      message: fieldOf('message').value.trim(),
    };

    if (mode !== 'api') {
      // No API key configured, so hand off to the visitor's email client.
      var body = 'From: ' + data.name + ' <' + data.email + '>\n\n' + data.message;
      window.location.href =
        'mailto:' + email + '?subject=' + encodeURIComponent(data.subject) + '&body=' + encodeURIComponent(body);
      setStatus('ok', 'Opening your email app with the message ready to send.');
      return;
    }

    submit.disabled = true;
    var label = submit.querySelector('span');
    var original = label ? label.textContent : '';
    if (label) label.textContent = 'Sending…';
    setStatus('ok', 'Sending your message…');

    var payload = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: payload,
      headers: { Accept: 'application/json' },
    })
      .then(function (r) {
        return r.json().catch(function () {
          return { success: r.ok };
        });
      })
      .then(function (r) {
        if (r.success) {
          form.reset();
          Object.keys(RULES).forEach(function (n) {
            showError(n, '');
          });
          setStatus('ok', 'Thank you, your message has been sent. I will reply to ' + data.email + '.');
        } else {
          throw new Error(r.message || 'Submission failed');
        }
      })
      .catch(function () {
        setStatus(
          'error',
          'Something went wrong sending the message. Please email me directly at ' + email + '.'
        );
      })
      .finally(function () {
        submit.disabled = false;
        if (label) label.textContent = original;
      });
  });
})();
