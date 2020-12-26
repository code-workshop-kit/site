class CwkSvg extends HTMLElement {
  connectedCallback() {
    const id = this.getAttribute('svg-id');
    this.setAttribute('aria-hidden', 'true');
    this.setAttribute('role', 'img');
    import(`../assets/svg/${id}.js`).then((svg) => {
      this.innerHTML = `
        ${svg.default}
      `;
      const _svg = this.querySelector('svg');
      _svg.setAttribute('focusable', 'false');
      _svg.setAttribute('aria-hidden', 'true');
    });
  }
}
customElements.define('cwk-svg', CwkSvg);
