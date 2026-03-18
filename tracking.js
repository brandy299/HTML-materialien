/* ═══════════════════════════════════════
   tracking.js – Schülerfortschritt
   Einbinden: <script src="https://brandy299.github.io/HTML-materialien/tracking.js"></script>
   Für Score:  trackComplete(85)  ← am Ende eines Quiz aufrufen
═══════════════════════════════════════ */
(function () {
  const SUPABASE_URL = 'https://yodanvzkkhlqemlvtvey.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_MnsZVbYHDBQglcv3wPacvg_mkXwOl7R';

  // Material-Name aus URL ableiten
  const material = location.pathname.split('/').filter(Boolean).pop()?.replace('.html', '') || 'unknown';

  function getCode()     { return localStorage.getItem('studentCode') || ''; }
  function saveCode(c)   { localStorage.setItem('studentCode', c.trim()); }

  /* ── Supabase POST ── */
  async function post(score, completed) {
    const code = getCode();
    if (!code) return;
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/progress`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({ code, material, score: score ?? null, completed: !!completed })
      });
    } catch (_) {}
  }

  /* ── Öffentliche API ── */
  window.trackComplete = function (score) { post(score, true); };

  /* ── Banner CSS ── */
  const style = document.createElement('style');
  style.textContent = `
    #tk-banner {
      position: fixed;
      bottom: 0; left: 0; right: 0;
      background: #1E1B4B;
      color: #fff;
      padding: 10px 14px;
      display: flex;
      align-items: center;
      gap: 10px;
      z-index: 99999;
      font-family: -apple-system, 'Inter', sans-serif;
      font-size: 13px;
      box-shadow: 0 -2px 12px rgba(0,0,0,0.25);
      flex-wrap: wrap;
    }
    #tk-banner label {
      font-weight: 600;
      white-space: nowrap;
      opacity: 0.85;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    #tk-code-input {
      flex: 1;
      min-width: 110px;
      max-width: 160px;
      padding: 6px 10px;
      border-radius: 7px;
      border: none;
      font-size: 13px;
      font-family: inherit;
      background: rgba(255,255,255,0.15);
      color: #fff;
      outline: none;
    }
    #tk-code-input::placeholder { color: rgba(255,255,255,0.45); }
    #tk-code-input:focus { background: rgba(255,255,255,0.22); }
    #tk-ok-btn {
      padding: 6px 14px;
      background: #4F46E5;
      color: #fff;
      border: none;
      border-radius: 7px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      font-family: inherit;
      white-space: nowrap;
    }
    #tk-ok-btn:hover { background: #4338CA; }
    #tk-close-btn {
      margin-left: auto;
      background: none;
      border: none;
      color: rgba(255,255,255,0.5);
      font-size: 18px;
      cursor: pointer;
      line-height: 1;
      padding: 0 2px;
    }
    #tk-close-btn:hover { color: #fff; }
    #tk-saved {
      position: fixed;
      bottom: 0; left: 0; right: 0;
      background: #1E1B4B;
      color: rgba(255,255,255,0.7);
      padding: 6px 14px;
      display: flex;
      align-items: center;
      gap: 8px;
      z-index: 99999;
      font-family: -apple-system, 'Inter', sans-serif;
      font-size: 11px;
    }
    #tk-saved span { color: #fff; font-weight: 700; }
    #tk-change-btn {
      background: none;
      border: none;
      color: #818CF8;
      font-size: 11px;
      cursor: pointer;
      font-family: inherit;
      padding: 0;
      text-decoration: underline;
    }
  `;
  document.head.appendChild(style);

  /* ── Banner anzeigen (Code eingeben) ── */
  function showBanner() {
    removeBanner();
    const div = document.createElement('div');
    div.id = 'tk-banner';
    div.innerHTML = `
      <label>Dein Code</label>
      <input id="tk-code-input" type="text" placeholder="z.B. BK24a-07" maxlength="20" autocomplete="off" value="${getCode()}">
      <button id="tk-ok-btn">OK</button>
      <button id="tk-close-btn" title="Schließen">×</button>
    `;
    document.body.appendChild(div);

    div.querySelector('#tk-ok-btn').onclick    = confirmCode;
    div.querySelector('#tk-close-btn').onclick = removeBanner;
    div.querySelector('#tk-code-input').addEventListener('keydown', e => {
      if (e.key === 'Enter') confirmCode();
    });
    setTimeout(() => div.querySelector('#tk-code-input').focus(), 50);
  }

  /* ── Gespeicherter Code anzeigen ── */
  function showSaved() {
    removeBanner();
    const div = document.createElement('div');
    div.id = 'tk-saved';
    div.innerHTML = `Code: <span>${getCode()}</span> <button id="tk-change-btn">ändern</button>`;
    document.body.appendChild(div);
    div.querySelector('#tk-change-btn').onclick = showBanner;
    // Nach 4 Sek. automatisch ausblenden
    setTimeout(removeBanner, 4000);
  }

  function removeBanner() {
    document.getElementById('tk-banner')?.remove();
    document.getElementById('tk-saved')?.remove();
  }

  function confirmCode() {
    const input = document.getElementById('tk-code-input');
    const val   = input?.value.trim();
    if (!val) { input?.focus(); return; }
    saveCode(val);
    removeBanner();
    post(null, false); // "geöffnet" tracken
    showSaved();
  }

  /* ── Init ── */
  function init() {
    if (getCode()) {
      post(null, false); // geöffnet tracken (silent)
    } else {
      showBanner();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
