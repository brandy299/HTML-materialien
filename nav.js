/* nav.js – Unterricht.Digital · Immer-sichtbare Seitenleiste
   Inject as: <script src="nav.js" defer></script>
   Selbst-enthaltend: kein externes Stylesheet, keine Abhängigkeiten.

   Verhalten:
   - Schmaler Icon-Strip (52px) immer sichtbar auf der linken Seite
   - Klick auf ☰ oben → breitet sich zu einem benannten Drawer (220px) aus
   - Klick außen / ESC / Klick auf Link → zurück zum Strip
   - body bekommt padding-left: 52px damit Inhalte nicht verdeckt werden
   - Admin-Link nur für banksharoo@googlemail.com sichtbar                */

(function () {
  'use strict';

  /* ─── Seiten-Links ─────────────────────────────────────────────────── */
  const PAGES = [
    { href: 'index.html',              label: 'Materialien',       svg: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>' },
    { href: 'dashboard.html',          label: 'Tracking',          svg: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>' },
    { href: 'pruefung-erstellen.html', label: 'Prüfung erstellen', svg: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/>' },
    { href: 'pruefungs-dashboard.html',label: 'Live-Monitoring',   svg: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>' },
    { href: 'codegenerator.html',      label: 'Codes',             svg: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>' },
    { href: 'timer.html',              label: 'Timer',             svg: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>' },
    { href: 'skills.html',             label: 'Skills',            svg: '<path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>' },
    { href: 'account.html',            label: 'Konto',             svg: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>' },
  ];

  const ADMIN_EMAIL = 'banksharoo@googlemail.com';
  const ADMIN_PAGE  = { href: 'admin.html', label: 'Admin', svg: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>' };

  const STRIP_W    = 52;   // px — schmaler Icon-Modus
  const DRAWER_W   = 220;  // px — breiter Label-Modus

  const current = location.pathname.split('/').pop() || 'index.html';
  let expanded = false;

  /* ─── SVG-Helfer ────────────────────────────────────────────────────── */
  function icon(svg, size) {
    size = size || 18;
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${svg}</svg>`;
  }

  /* ─── CSS ───────────────────────────────────────────────────────────── */
  const css = `
/* Sidebar strip (always visible) */
#snav {
  position: fixed;
  left: 0; top: 0; bottom: 0;
  width: ${STRIP_W}px;
  background: #111827;
  border-right: 1px solid rgba(255,255,255,0.07);
  z-index: 300;
  display: flex;
  flex-direction: column;
  transition: width 0.2s cubic-bezier(0.4,0,0.2,1);
  overflow: hidden;
}

#snav.snav-open {
  width: ${DRAWER_W}px;
  box-shadow: 4px 0 24px rgba(0,0,0,0.4);
}

/* Push body content so nothing is hidden behind strip */
body {
  padding-left: ${STRIP_W}px !important;
}

/* Overlay behind expanded drawer */
#snav-overlay {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 299;
  background: rgba(0,0,0,0.35);
}
#snav-overlay.snav-open { display: block; }

/* ─ Top section: logo + toggle ─ */
#snav-top {
  display: flex;
  align-items: center;
  height: 52px;
  flex-shrink: 0;
  padding: 0 8px;
  border-bottom: 1px solid rgba(255,255,255,0.07);
  gap: 0;
  overflow: hidden;
}

#snav-toggle {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  border-radius: 8px;
  background: none;
  border: none;
  color: #6B7280;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.12s, color 0.12s;
}
#snav-toggle:hover { background: rgba(255,255,255,0.08); color: #F9FAFB; }

#snav-logo-text {
  font-size: 12px;
  font-weight: 700;
  color: #F9FAFB;
  white-space: nowrap;
  margin-left: 10px;
  opacity: 0;
  transition: opacity 0.15s;
  pointer-events: none;
}
#snav.snav-open #snav-logo-text { opacity: 1; }

/* ─ Links ─ */
#snav-links {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 8px 8px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  scrollbar-width: none;
}
#snav-links::-webkit-scrollbar { display: none; }

.snav-link {
  display: flex;
  align-items: center;
  width: 100%;
  height: 36px;
  flex-shrink: 0;
  border-radius: 8px;
  color: #9CA3AF;
  text-decoration: none;
  font-size: 12.5px;
  font-weight: 500;
  transition: background 0.12s, color 0.12s;
  white-space: nowrap;
  overflow: hidden;
  position: relative;
  padding: 0;
}
.snav-link:hover  { background: rgba(255,255,255,0.07); color: #F9FAFB; }
.snav-active      { background: rgba(59,130,246,0.18) !important; color: #93C5FD !important; }
.snav-active:hover{ background: rgba(59,130,246,0.25) !important; color: #BFDBFE !important; }

.snav-link-icon {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.snav-link-label {
  font-size: 12.5px;
  font-weight: 500;
  opacity: 0;
  transition: opacity 0.15s;
  white-space: nowrap;
}
#snav.snav-open .snav-link-label { opacity: 1; }

/* Tooltip in collapsed mode */
.snav-link::before {
  content: attr(data-label);
  position: absolute;
  left: calc(${STRIP_W}px + 8px);
  top: 50%;
  transform: translateY(-50%);
  background: #1F2937;
  color: #F9FAFB;
  font-size: 11.5px;
  font-weight: 500;
  padding: 4px 9px;
  border-radius: 6px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  z-index: 400;
  box-shadow: 0 2px 8px rgba(0,0,0,0.35);
  transition: opacity 0.1s;
}
/* Only show tooltip when strip is collapsed */
#snav:not(.snav-open) .snav-link:hover::before { opacity: 1; }

.snav-divider {
  height: 1px;
  background: rgba(255,255,255,0.07);
  margin: 6px 4px;
  flex-shrink: 0;
}

/* ─ Footer: user email ─ */
#snav-footer {
  padding: 8px;
  border-top: 1px solid rgba(255,255,255,0.07);
  flex-shrink: 0;
  overflow: hidden;
}
#snav-user {
  display: flex;
  align-items: center;
  height: 36px;
  border-radius: 8px;
  overflow: hidden;
}
#snav-user-icon {
  width: 36px; height: 36px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4B5563;
}
#snav-user-email {
  font-size: 11px;
  color: #4B5563;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: 0;
  transition: opacity 0.15s;
}
#snav.snav-open #snav-user-email { opacity: 1; }
`;

  /* ─── HTML ──────────────────────────────────────────────────────────── */
  function makeLink(p) {
    const active = current === p.href;
    return `<a href="${p.href}" class="snav-link${active ? ' snav-active' : ''}" data-label="${p.label}">
      <span class="snav-link-icon">${icon(p.svg)}</span>
      <span class="snav-link-label">${p.label}</span>
    </a>`;
  }

  const linksHtml = PAGES.map(makeLink).join('');

  const adminHtml = `<div id="snav-admin-entry" style="display:none">
    <div class="snav-divider"></div>
    ${makeLink(ADMIN_PAGE)}
  </div>`;

  const html = `
<div id="snav-overlay"></div>
<nav id="snav" aria-label="Navigation">
  <div id="snav-top">
    <button id="snav-toggle" onclick="snavToggle()" title="Navigation">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
        <line x1="3" y1="6"  x2="21" y2="6"/>
        <line x1="3" y1="12" x2="21" y2="12"/>
        <line x1="3" y1="18" x2="21" y2="18"/>
      </svg>
    </button>
    <span id="snav-logo-text">Unterricht.Digital</span>
  </div>
  <div id="snav-links">
    ${linksHtml}
    ${adminHtml}
  </div>
  <div id="snav-footer">
    <div id="snav-user">
      <div id="snav-user-icon">${icon('<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>', 16)}</div>
      <span id="snav-user-email"></span>
    </div>
  </div>
</nav>`;

  /* ─── Inject CSS ─────────────────────────────────────────────────────── */
  const style = document.createElement('style');
  style.id = 'snav-style';
  style.textContent = css;
  document.head.appendChild(style);

  /* ─── Open / Close / Toggle  (defined FIRST so inject() can use them) ── */
  function snavOpen() {
    expanded = true;
    var nav = document.getElementById('snav');
    var ov  = document.getElementById('snav-overlay');
    if (nav) nav.classList.add('snav-open');
    if (ov)  ov.classList.add('snav-open');
  }

  function snavClose() {
    expanded = false;
    var nav = document.getElementById('snav');
    var ov  = document.getElementById('snav-overlay');
    if (nav) nav.classList.remove('snav-open');
    if (ov)  ov.classList.remove('snav-open');
  }

  function snavToggle() {
    expanded ? snavClose() : snavOpen();
  }

  /* Export to window so inline onclick="snavToggle()" works */
  window.snavToggle = snavToggle;
  window.snavOpen   = snavOpen;
  window.snavClose  = snavClose;

  /* ─── Inject HTML ────────────────────────────────────────────────────── */
  function inject() {
    document.body.insertAdjacentHTML('afterbegin', html);

    document.getElementById('snav-overlay').addEventListener('click', snavClose);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && expanded) snavClose();
    });

    document.querySelectorAll('#snav-links .snav-link').forEach(function (el) {
      el.addEventListener('click', snavClose);
    });

    loadAuthInfo();
  }

  async function loadAuthInfo() {
    try {
      const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
      const sb = window.__sb || createClient(
        'https://yodanvzkkhlqemlvtvey.supabase.co',
        'sb_publishable_MnsZVbYHDBQglcv3wPacvg_mkXwOl7R'
      );
      const { data: { session } } = await sb.auth.getSession();
      if (!session) return;
      const email = session.user.email || '';
      const emailEl = document.getElementById('snav-user-email');
      if (emailEl) emailEl.textContent = email;
      if (email === ADMIN_EMAIL) {
        const adminEl = document.getElementById('snav-admin-entry');
        if (adminEl) adminEl.style.display = '';
      }
    } catch (e) { /* silent */ }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
