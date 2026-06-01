/**
 * ============================================================
 *  navbar-auth.js  —  NTP Cuber
 * ============================================================
 *  Adds a login button / user avatar dropdown to the existing
 *  <my-navbar> component WITHOUT changing any of its styles.
 *
 *  Just add this script AFTER navbar.js in every HTML page:
 *    <script src="js/navbar-auth.js" type="module"></script>
 *
 *  It waits for the navbar custom element to finish rendering,
 *  then injects a single auth button into the right side.
 * ============================================================
 */

import NTPAuth from './auth.js';

async function injectNavbarAuth() {
  /* 1. Wait for <my-navbar> to exist in the DOM */
  const navbar = await waitFor(() => document.querySelector('my-navbar'));

  /* 2. Wait for shadow DOM / inner content to render */
  await new Promise(r => setTimeout(r, 120));

  /* 3. Find the best injection target inside the navbar */
  const root   = navbar.shadowRoot || navbar;
  const target = root.querySelector('nav') || root.querySelector('[class*="flex"]') || root;

  /* 4. Build the auth widget */
  const widget = document.createElement('div');
  widget.id = 'ntp-auth-widget';
  widget.style.cssText = 'display:inline-flex;align-items:center;margin-left:1rem;';
  target.appendChild(widget);

  await renderAuthWidget(widget);

  /* 5. Re-render on any auth change */
  NTPAuth.onAuthChange(() => renderAuthWidget(widget));
}

async function renderAuthWidget(container) {
  const user = await NTPAuth.getUser();

  if (!user) {
    container.innerHTML = `
      <a href="/login.html"
         style="
           display:inline-flex;align-items:center;gap:.4rem;
           font-size:.8rem;font-weight:700;letter-spacing:.05em;
           padding:.5rem 1.1rem;border-radius:9999px;
           background:#4f46e5;color:#fff;text-decoration:none;
           transition:background .15s;
         "
         onmouseover="this.style.background='#6366f1'"
         onmouseout="this.style.background='#4f46e5'">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9A3.75 3.75 0 1 1 8.25 9a3.75 3.75 0 0 1 7.5 0zM4.5 20.118a7.5 7.5 0 0 1 15 0"/>
        </svg>
        Login
      </a>`;
  } else {
    const name    = user.user_metadata?.full_name || user.email || 'Account';
    const initials = name.slice(0,2).toUpperCase();
    const avatar   = user.user_metadata?.avatar_url;

    container.innerHTML = `
      <div style="position:relative;">
        <button id="ntp-avatar-btn"
          style="
            display:inline-flex;align-items:center;gap:.5rem;
            background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);
            border-radius:9999px;padding:.35rem .9rem .35rem .35rem;
            cursor:pointer;transition:border-color .15s;
          "
          onmouseover="this.style.borderColor='rgba(99,102,241,.6)'"
          onmouseout="this.style.borderColor='rgba(255,255,255,.12)'">
          ${avatar
            ? `<img src="${avatar}" style="width:1.75rem;height:1.75rem;border-radius:50%;object-fit:cover;">`
            : `<div style="
                width:1.75rem;height:1.75rem;border-radius:50%;
                background:linear-gradient(135deg,#4f46e5,#7c3aed);
                display:flex;align-items:center;justify-content:center;
                font-size:.65rem;font-weight:800;color:#fff;letter-spacing:.02em;
              ">${initials}</div>`
          }
          <span style="font-size:.78rem;font-weight:600;color:#e5e7eb;max-width:7rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${name.split(' ')[0]}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>

        <div id="ntp-avatar-menu"
          style="
            display:none;position:absolute;right:0;top:calc(100% + .4rem);
            min-width:11rem;background:#111113;border:1px solid #27272a;
            border-radius:1rem;padding:.4rem;z-index:9999;
            box-shadow:0 8px 32px rgba(0,0,0,.5);
          ">
          <div style="padding:.6rem .8rem;border-bottom:1px solid #27272a;margin-bottom:.3rem;">
            <p style="font-size:.7rem;color:#6b7280;margin:0;">Signed in as</p>
            <p style="font-size:.78rem;font-weight:600;color:#e5e7eb;margin:0;overflow:hidden;text-overflow:ellipsis;">${user.email}</p>
          </div>
          <a href="/dashboard.html" style="
            display:flex;align-items:center;gap:.55rem;
            padding:.6rem .8rem;border-radius:.6rem;
            font-size:.8rem;font-weight:600;color:#d1d5db;text-decoration:none;
            transition:background .1s;
          " onmouseover="this.style.background='rgba(79,70,229,.15)'" onmouseout="this.style.background='transparent'">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
            My Dashboard
          </a>
          <button onclick="window.NTPAuth.signOut()" style="
            display:flex;align-items:center;gap:.55rem;width:100%;
            padding:.6rem .8rem;border-radius:.6rem;
            font-size:.8rem;font-weight:600;color:#f87171;
            background:none;border:none;cursor:pointer;text-align:left;
            transition:background .1s;
          " onmouseover="this.style.background='rgba(239,68,68,.1)'" onmouseout="this.style.background='transparent'">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"/>
            </svg>
            Sign Out
          </button>
        </div>
      </div>`;

    /* toggle dropdown */
    const btn  = container.querySelector('#ntp-avatar-btn');
    const menu = container.querySelector('#ntp-avatar-menu');
    btn.addEventListener('click', e => {
      e.stopPropagation();
      menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
    });
    document.addEventListener('click', () => { menu.style.display = 'none'; });
  }
}

/* util: poll until element exists */
function waitFor(fn, ms = 600) {
  return new Promise(resolve => {
    const el = fn();
    if (el) return resolve(el);
    const obs = new MutationObserver(() => {
      const el = fn();
      if (el) { obs.disconnect(); resolve(el); }
    });
    obs.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => { obs.disconnect(); resolve(fn() || document.body); }, ms);
  });
}

injectNavbarAuth();
