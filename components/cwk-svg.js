class CwkSvg extends HTMLElement {
  connectedCallback() {
    const id = this.getAttribute("id");
    import(`../assets/svg/${id}.js`).then((svg) => {
      this.innerHTML = `
        ${svg.default}
      `;
    });
  }
}
customElements.define("cwk-svg", CwkSvg);
