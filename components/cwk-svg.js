class CwkSvg extends HTMLElement {
  connectedCallback() {
    const id = this.getAttribute("svg-id");
    import(new URL(`../assets/svg/${id}.js`, import.meta.url)).then((svg) => {
      this.innerHTML = `
        ${svg.default}
      `;
    });
  }
}
customElements.define("cwk-svg", CwkSvg);
