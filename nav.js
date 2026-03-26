/* nav.js – Shared teacher navigation for Unterricht.Digital
   Inject as: <script src="nav.js" defer></script>
   Self-contained: inlines its own CSS, no external dependencies. */
(function () {
  const PAGES = [
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
  ];

  const current = location.pathname.split('/').pop() || 'index.html';

  function icon(svg) {
    return `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${svg}</svg>`;
  }

  const links = PAGES.map(p => {
    const active = current === p.href;
    return `<a href="${p.href}" class="snav-link${active ? ' snav-active' : ''}">${icon(p.svg)}${p.label}</a>`;
  }).join('');

  const html = `<nav id="site-nav">
  <a href="landing.html" class="snav-home">
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    Start
  </a>
  <div class="snav-divider"></div>
  ${links}
</nav>`;

  const css = `
#site-nav {
  background: #111827;
  border-bottom: 1px solid rgba(255,255,255,0.07);
  height: 44px;
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 0 16px;
  position: sticky;
  top: 0;
  z-index: 50;
  font-family: 'Inter', system-ui, sans-serif;
}
.snav-home, .snav-link {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #9CA3AF;
  text-decoration: none;
  font-size: 12px;
  font-weight: 500;
  padding: 5px 8px;
  border-radius: 5px;
  transition: background 0.15s, color 0.15s;
  white-space: nowrap;
}
.snav-home:hover, .snav-link:hover {
  background: rgba(255,255,255,0.08);
  color: #F9FAFB;
}
.snav-active {
  background: rgba(255,255,255,0.10);
  color: #F9FAFB;
}
.snav-divider {
  width: 1px;
  height: 16px;
  background: rgba(255,255,255,0.10);
  margin: 0 4px;
  flex-shrink: 0;
}
`;

  // Inject CSS
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // Inject nav as first body child
  document.addEventListener('DOMContentLoaded', function () {
    document.body.insertAdjacentHTML('afterbegin', html);
  });
})();
