/* nav.js – Shared teacher navigation for Unterricht.Digital
   Inject as: <script src="nav.js" defer></script>
   Self-contained burger menu — no external deps, no top bar. */
(function () {
  const PAGES = [
    {
      href: 'index.html',
      label: 'Materialien',
      svg: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    },
    {
      href: 'dashboard.html',
      label: 'Tracking',
      svg: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
    },
    {
      href: 'pruefung-erstellen.html',
      label: 'Prüfung erstellen',
      svg: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/>',
    },
    {
      href: 'pruefungs-dashboard.html',
      label: 'Live-Monitoring',
      svg: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
    },
    {
      href: 'codegenerator.html',
      label: 'Codes',
      svg: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    },
    {
      href: 'timer.html',
      label: 'Timer',
      svg: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    },
    {
      href: 'skills.html',
      label: 'Skills',
      svg: '<path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>',
    },
    {
      href: 'account.html',
      label: 'Konto',
      svg: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    },
  ];

  const ADMIN_EMAIL = 'banksharoo@googlemail.com';
  const ADMIN_PAGE  = { href: 'admin.html', label: 'Admin', svg: '<circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/><line x1="12" y1="8" x2="12" y2="13"/><line x1="10" y1="11" x2="14" y2="11"/>' };

  const current = location.pathname.split('/').pop() || 'index.html';

  function icon(svg) {
    return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${svg}</svg>`;
  }

  /* ── CSS ── */
  const css = `
#snav-trigger {
  position: fixed;
  top: 12px;
  left: 12px;
  z-index: 200;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.12);
  background: #111827;
  color: #9CA3AF;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s, color 0.15s;
  box-shadow: 0 1px 4px rgba(0,0,0,0.25);
}
#snav-trigger:hover { background: #1f2937; color: #F9FAFB; }

#snav-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  z-index: 210;
}
#snav-overlay.open { display: block; }

#snav-drawer {
  position: fixed;
  top: 0; left: 0; bottom: 0;
  width: 230px;
  background: #111827;
  z-index: 220;
  display: flex;
  flex-direction: column;
  transform: translateX(-100%);
  transition: transform 0.22s cubic-bezier(0.4,0,0.2,1);
  box-shadow: 4px 0 24px rgba(0,0,0,0.35);
}
#snav-drawer.open { transform: translateX(0); }

#snav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 14px 12px;
  border-bottom: 1px solid rgba(255,255,255,0.07);
}
#snav-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
}
#snav-logo-icon {
  width: 26px; height: 26px;
  background: #3B82F6;
  border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
}
#snav-logo-text {
  font-size: 12px;
  font-weight: 700;
  color: #F9FAFB;
  white-space: nowrap;
}
#snav-close {
  background: none;
  border: none;
  color: #6B7280;
  cursor: pointer;
  font-size: 20px;
  line-height: 1;
  padding: 2px;
  transition: color 0.15s;
}
#snav-close:hover { color: #F9FAFB; }

#snav-links {
  flex: 1;
  overflow-y: auto;
  padding: 8px 8px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.snav-link {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #9CA3AF;
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
  padding: 8px 10px;
  border-radius: 7px;
  transition: background 0.12s, color 0.12s;
  white-space: nowrap;
}
.snav-link:hover {
  background: rgba(255,255,255,0.07);
  color: #F9FAFB;
}
.snav-active {
  background: rgba(59,130,246,0.15);
  color: #93C5FD;
}
.snav-active:hover {
  background: rgba(59,130,246,0.22);
  color: #BFDBFE;
}

.snav-divider {
  height: 1px;
  background: rgba(255,255,255,0.07);
  margin: 6px 8px;
}

#snav-footer {
  padding: 10px 8px 14px;
  border-top: 1px solid rgba(255,255,255,0.07);
}
#snav-user-email {
  font-size: 11px;
  color: #4B5563;
  padding: 4px 10px 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
`;

  /* ── HTML ── */
  const links = PAGES.map(p => {
    const active = current === p.href;
    return `<a href="${p.href}" class="snav-link${active ? ' snav-active' : ''}" onclick="snavClose()">${icon(p.svg)}${p.label}</a>`;
  }).join('');

  const html = `
<button id="snav-trigger" onclick="snavOpen()" aria-label="Menü öffnen" title="Navigation">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
</button>
<div id="snav-overlay" onclick="snavClose()"></div>
<nav id="snav-drawer" aria-label="Hauptnavigation">
  <div id="snav-header">
    <a href="landing.html" id="snav-logo" onclick="snavClose()">
      <div id="snav-logo-icon">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
        </svg>
      </div>
      <span id="snav-logo-text">Unterricht.Digital</span>
    </a>
    <button id="snav-close" onclick="snavClose()" aria-label="Menü schließen">×</button>
  </div>
  <div id="snav-links">
    ${links}
    <div class="snav-divider"></div>
    <div id="snav-admin-link" style="display:none">
      <a href="admin.html" class="snav-link${current === 'admin.html' ? ' snav-active' : ''}" onclick="snavClose()">
        ${icon(ADMIN_PAGE.svg)} ${ADMIN_PAGE.label}
      </a>
      <div class="snav-divider"></div>
    </div>
  </div>
  <div id="snav-footer">
    <div id="snav-user-email"></div>
  </div>
</nav>`;

  /* ── Inject CSS ── */
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  /* ── Inject HTML ── */
  function inject() {
    document.body.insertAdjacentHTML('afterbegin', html);

    /* ESC closes drawer */
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') snavClose();
    });

    /* Show admin link + email if logged in */
    (async function() {
      try {
        const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
        const sb = window.__sb || createClient(
          'https://yodanvzkkhlqemlvtvey.supabase.co',
          'sb_publishable_MnsZVbYHDBQglcv3wPacvg_mkXwOl7R'
        );
        const { data: { session } } = await sb.auth.getSession();
        if (session) {
          const email = session.user.email || '';
          const el = document.getElementById('snav-user-email');
          if (el) el.textContent = email;
          if (email === ADMIN_EMAIL) {
            const adminEl = document.getElementById('snav-admin-link');
            if (adminEl) adminEl.style.display = '';
          }
        }
      } catch (e) { /* silent — nav still works */ }
    })();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }

  /* ── Open / close ── */
  window.snavOpen  = function() {
    document.getElementById('snav-overlay').classList.add('open');
    document.getElementById('snav-drawer').classList.add('open');
  };
  window.snavClose = function() {
    document.getElementById('snav-overlay').classList.remove('open');
    document.getElementById('snav-drawer').classList.remove('open');
  };
})();
