class Footer extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<footer>My footer</footer>`;
  }
}
cutomElements.define('my-footer', Footer);
