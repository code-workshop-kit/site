import './cwk-theme-switcher.js';

class CwkNav extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.setAttribute('role', 'navigation');
    this.setAttribute('aria-label', 'Main');
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          height: 52px;
          background-color: var(--nav-color);
        }

        .items {
          display: flex;
          align-items: center;
          max-width: var(--cwk-full-width);
          margin: 0 auto;
          padding: 0 40px;
        }

        .items > div {
          padding: 10px 0;
        }

        .items a {
          font-family: Roboto Slab, sans-serif;
          font-weight: bold;
          text-decoration: none;
          color: var(--nav-text-color);
        }

        .items > div:not(:first-child) {
          padding-left: 40px;
        }

        .logo {
          font-size: 24px;
          flex-grow: 1;
        }

        .github-nav-logo {
          width: 25px;
        }

        .github-nav-logo svg {
          vertical-align: middle;
        }
      </style>
      <div class="items">
        <div class="logo"><a href="./">cwk</a></div>
        <cwk-theme-switcher></cwk-theme-switcher>
        <div>
          <a
            target="_blank"
            rel="noopener"
            href="https://github.com/code-workshop-kit/code-workshop-kit#code-workshop-kit"
            >DOCS</a
          >
        </div>
        <div class="github-nav-logo">
          <a aria-label="GitHub page" href="https://github.com/code-workshop-kit/code-workshop-kit"
            ><cwk-svg svg-id="github"></cwk-svg>
          </a>
        </div>
      </div>
    `;
  }
}
customElements.define('cwk-nav', CwkNav);
