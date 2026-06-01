/**
 * ============================================================
 *  course-guard.js  —  NTP Cuber
 * ============================================================
 *  Add to the <head> of any paid course/learning page:
 *
 *    <script>const COURSE_SLUG = 'zbll-mastery';</script>
 *    <script src="/js/course-guard.js" type="module"></script>
 *
 *  Behaviour:
 *    • If not logged in  → redirect to /login.html?next=<current page>
 *    • If logged in but no purchase → show "purchase required" overlay
 *    • If purchased → do nothing (page loads normally)
 * ============================================================
 */

import NTPAuth from './auth.js';

(async () => {
  const slug    = window.COURSE_SLUG || 'unknown';
  const current = encodeURIComponent(location.pathname + location.search);

  /* 1. Must be logged in */
  const user = await NTPAuth.getUser();
  if (!user) {
    location.href = `/login.html?next=${current}`;
    return;
  }

  /* 2. Must own the course */
  const owned = await NTPAuth.hasCourse(slug);
  if (!owned) {
    showPaywall(slug);
  }
})();

function showPaywall(slug) {
  /* Blur page content */
  document.documentElement.style.overflow = 'hidden';
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position:fixed;inset:0;z-index:99999;
    background:rgba(0,0,0,.85);backdrop-filter:blur(6px);
    display:flex;align-items:center;justify-content:center;padding:1.5rem;
  `;
  overlay.innerHTML = `
    <div style="
      max-width:24rem;width:100%;
      background:#0f0f11;border:1px solid #27272a;border-radius:1.5rem;
      padding:2rem;text-align:center;color:#fff;font-family:Inter,sans-serif;
    ">
      <div style="font-size:2.5rem;margin-bottom:1rem;">🔒</div>
      <h2 style="font-size:1.4rem;font-weight:800;margin:0 0 .5rem;">This is a paid course</h2>
      <p style="font-size:.875rem;color:#9ca3af;margin:0 0 1.5rem;">
        You need to purchase <strong style="color:#818cf8;">${slug}</strong> before accessing this content.
      </p>
      <a href="/coaching.html" style="
        display:block;background:#4f46e5;color:#fff;font-weight:700;
        padding:.85rem;border-radius:.75rem;text-decoration:none;
        font-size:.875rem;margin-bottom:.75rem;transition:background .15s;
      " onmouseover="this.style.background='#6366f1'" onmouseout="this.style.background='#4f46e5'">
        Get Access →
      </a>
      <a href="/dashboard.html" style="
        display:block;color:#6b7280;font-size:.8rem;text-decoration:none;
      ">My Dashboard</a>
    </div>`;
  document.body.appendChild(overlay);
}
