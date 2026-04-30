class Footer extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<footer class="py-12 text-center text-neutral-500 text-xs font-medium border-t border-neutral-800 tracking-widest uppercase">
                     © 2026 NTP Cuber Academy
                     </footer>`;
  }
}
cutomElements.define('my-footer', Footer);
