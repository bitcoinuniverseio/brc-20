/* BRC-20 docs: theme toggle and local search. No network calls except the
   same-origin search index. Nothing typed here leaves the page. */
(function () {
  'use strict';

  document.documentElement.classList.remove('no-js');

  /* ---- Theme toggle ---- */
  var root = document.documentElement;
  var toggle = document.getElementById('theme-toggle');

  function storedTheme() {
    try { return localStorage.getItem('brc20-theme'); } catch (e) { return null; }
  }
  function currentTheme() {
    var explicit = root.getAttribute('data-theme');
    if (explicit) return explicit;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark' : 'light';
  }
  function paintToggle() {
    if (!toggle) return;
    var dark = currentTheme() === 'dark';
    toggle.textContent = dark ? 'Light' : 'Dark';
    toggle.setAttribute('aria-pressed', dark ? 'true' : 'false');
  }
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('brc20-theme', next); } catch (e) { /* private mode */ }
      paintToggle();
    });
    paintToggle();
  }

  /* ---- Search ---- */
  var input = document.getElementById('site-search');
  var results = document.getElementById('search-results');
  if (!input || !results) return;

  var index = null;
  var loading = false;

  function loadIndex(then) {
    if (index) { then(); return; }
    if (loading) return;
    loading = true;
    fetch('search-index.json')
      .then(function (r) { return r.json(); })
      .then(function (data) { index = data.entries || []; then(); })
      .catch(function () {
        loading = false;
        results.innerHTML = '<li><span class="search-empty">Search index failed to load.</span></li>';
      });
  }

  function score(entry, terms) {
    var hay = (entry.title + ' ' + entry.text + ' ' + (entry.aliases || []).join(' ')).toLowerCase();
    var total = 0;
    for (var i = 0; i < terms.length; i++) {
      var t = terms[i];
      if (!t) continue;
      if (hay.indexOf(t) === -1) return 0;
      total += entry.title.toLowerCase().indexOf(t) !== -1 ? 3 : 1;
      if ((entry.aliases || []).some(function (a) { return a.toLowerCase() === t; })) total += 4;
    }
    return total;
  }

  function render(query) {
    var q = query.trim().toLowerCase();
    if (!q) { results.innerHTML = ''; input.setAttribute('aria-expanded', 'false'); return; }
    var terms = q.split(/\s+/);
    var hits = index
      .map(function (e) { return { e: e, s: score(e, terms) }; })
      .filter(function (h) { return h.s > 0; })
      .sort(function (a, b) { return b.s - a.s; })
      .slice(0, 10);
    if (hits.length === 0) {
      results.innerHTML = '<li><span class="search-empty">No matches. Try a field name like tick, amt, lim, dec, or a topic like reorg or transfer.</span></li>';
    } else {
      results.innerHTML = hits.map(function (h) {
        var e = h.e;
        return '<li><a href="' + e.href + '">' +
          '<span class="result-page">' + e.page + '</span>' +
          e.title +
          '<span class="result-snippet">' + e.text + '</span></a></li>';
      }).join('');
    }
    input.setAttribute('aria-expanded', 'true');
  }

  input.addEventListener('input', function () {
    loadIndex(function () { render(input.value); });
  });
  input.addEventListener('focus', function () { loadIndex(function () {}); });

  /* "/" focuses search unless typing elsewhere */
  document.addEventListener('keydown', function (ev) {
    if (ev.key !== '/' || ev.ctrlKey || ev.metaKey || ev.altKey) return;
    var el = document.activeElement;
    if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)) return;
    ev.preventDefault();
    input.focus();
  });
  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape' && results.innerHTML !== '') {
      results.innerHTML = '';
      input.setAttribute('aria-expanded', 'false');
    }
  });
  document.addEventListener('click', function (ev) {
    if (!results.contains(ev.target) && ev.target !== input) {
      results.innerHTML = '';
      input.setAttribute('aria-expanded', 'false');
    }
  });
})();
