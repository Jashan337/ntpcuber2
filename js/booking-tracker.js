/**
 * ============================================================
 *  booking-tracker.js  —  NTP Cuber
 * ============================================================
 *  Intercepts the coaching form's handleSubmit() AFTER it
 *  fires the existing Google Apps Script call, then also
 *  saves the booking to Supabase so it appears in the user's
 *  dashboard history.
 *
 *  HOW TO ADD TO coaching.html:
 *  In <head>, after the other scripts:
 *
 *    <script src="js/supabase-config.js"></script>
 *    <script src="js/booking-tracker.js" type="module"></script>
 *
 *  That's it — no changes to coaching.js needed.
 * ============================================================
 */

import NTPAuth from './auth.js';

/**
 * Saves a booking row to Supabase.
 * Called by the patched handleSubmit below.
 */
async function saveBookingToSupabase(formData) {
  const sb   = NTPAuth._client;
  const user = await NTPAuth.getUser();   // null if guest

  const { error } = await sb
    .from('coaching_bookings')
    .insert({
      user_id:        user?.id ?? null,
      name:           formData.name,
      email:          formData.email,
      service:        formData.service,
      wca_event:      formData.wca_event   || null,
      video_link:     formData.video_link  || null,
      available_days: formData.available_days.length ? formData.available_days : null,
      preferred_time: formData.preferred_time || null,
      secondary_time: formData.secondary_time || null,
      goal:           formData.goal        || null,
      amount_thb:     formData.amount_thb  || null,
    });

  if (error) {
    // Non-blocking: don't break the booking flow if Supabase fails
    console.warn('[NTPAuth] Could not save booking to Supabase:', error.message);
  }
}

/**
 * Reads the current form state and returns a plain object.
 * Mirrors the fields in coaching.html / coaching.js.
 */
function scrapeFormData() {
  const val  = id => (document.getElementById(id)?.value || '').trim();
  const days = [...document.querySelectorAll('#available-date input[type=checkbox]:checked')]
                 .map(cb => cb.value);

  // Look up the selected service's price from the option's data attribute or text
  const serviceEl  = document.getElementById('service-select');
  const serviceText = serviceEl?.options[serviceEl.selectedIndex]?.text || val('service-select');
  // FIX: Match digits AND commas
  const priceMatch  = serviceText.match(/฿([\d,]+)/); 

  return {
    name:           val('input-name'),
    email:          val('input-email'),
    service:        serviceText,
    wca_event:      val('wca-event'),
    video_link:     val('video-link'),
    available_days: days,
    preferred_time: val('preferred-time'),
    secondary_time: val('secondary-time'),
    goal:           val('input-goal'),
    amount_thb:     priceMatch ? parseInt(priceMatch[1].replace(/,/g, '')) : null,
  };
}

/**
 * Patch window.handleSubmit so we can hook in AFTER the
 * existing Google Apps Script call.
 * We wait for coaching.js to define it, then wrap it.
 */
function patchHandleSubmit() {
  // coaching.js uses `defer`, so it runs before DOMContentLoaded resolves
  // but we use a small poll to be safe
  const MAX_WAIT = 3000;
  const INTERVAL = 50;
  let elapsed = 0;

  const poll = setInterval(() => {
    elapsed += INTERVAL;

    if (typeof window.handleSubmit === 'function') {
      clearInterval(poll);

      const original = window.handleSubmit.bind(window);

      window.handleSubmit = async function (event) {
        // Collect form data BEFORE the original clears the form
        const formData = scrapeFormData();

        // Run the original (sends to Google Apps Script, shows success msg)
        await original(event);

        // Now save to Supabase (fire-and-forget, non-blocking)
        saveBookingToSupabase(formData);
      };

    } else if (elapsed >= MAX_WAIT) {
      clearInterval(poll);
      console.warn('[booking-tracker] handleSubmit not found — booking history will not be saved.');
    }
  }, INTERVAL);
}

/**
 * Pre-fill name & email from the logged-in user so
 * the form feels seamless for authenticated users.
 */
async function prefillFromAuth() {
  const user = await NTPAuth.getUser();
  if (!user) return;

  const name  = user.user_metadata?.full_name || '';
  const email = user.email || '';

  // Polling: the inputs may not exist yet if coaching.js hasn't run
  const waitForInput = (id, value) => {
    if (!value) return;
    const tryFill = () => {
      const el = document.getElementById(id);
      if (el && !el.value) { el.value = value; return; }
      if (!el) setTimeout(tryFill, 100);
    };
    tryFill();
  };

  waitForInput('input-name',  name);
  waitForInput('input-email', email);
}

// ── Init ──────────────────────────────────────────────────────
patchHandleSubmit();
prefillFromAuth();