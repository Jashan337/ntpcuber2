/**
 * ============================================================
 *  auth.js  —  NTP Cuber authentication layer
 * ============================================================
 *  Provides:
 *    NTPAuth.signUp(email, password, name)
 *    NTPAuth.signIn(email, password)
 *    NTPAuth.signInWithGoogle()
 *    NTPAuth.signOut()
 *    NTPAuth.getUser()          → current user object or null
 *    NTPAuth.getSession()       → raw Supabase session
 *    NTPAuth.hasCourse(slug)    → true/false (purchased check)
 *    NTPAuth.onAuthChange(cb)   → subscribe to auth state changes
 *
 *  Depends on: supabase-config.js  (loaded before this file)
 * ============================================================
 */

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

const NTPAuth = {

  /* ── sign up ─────────────────────────────────────────── */
  async signUp(email, password, fullName) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${location.origin}/dashboard.html`,
      },
    });
    if (error) throw error;
    return data;
  },

  /* ── sign in ─────────────────────────────────────────── */
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },

  /* ── Google OAuth ────────────────────────────────────── */
  async signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${location.origin}/dashboard.html` },
    });
    if (error) throw error;
  },

  /* ── sign out ────────────────────────────────────────── */
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    location.href = '/index.html';
  },

  /* ── current user (sync-ish) ─────────────────────────── */
  async getUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;          // null if not logged in
  },

  /* ── raw session ─────────────────────────────────────── */
  async getSession() {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  },

  /* ── check purchased course ──────────────────────────── */
  async hasCourse(courseSlug) {
    const user = await NTPAuth.getUser();
    if (!user) return false;

    const { data, error } = await supabase
      .from('course_purchases')
      .select('id')
      .eq('user_id', user.id)
      .eq('course_slug', courseSlug)
      .maybeSingle();

    return !error && data !== null;
  },

  /* ── subscribe to auth state ─────────────────────────── */
  onAuthChange(callback) {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => callback(event, session)
    );
    return subscription;   // call subscription.unsubscribe() to stop
  },

  /* ── expose raw client (advanced use) ───────────────── */
  _client: supabase,
};

export default NTPAuth;
window.NTPAuth = NTPAuth; // also available globally for non-module scripts
