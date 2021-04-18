import './cwk-theme-switcher.js';
import './cwk-svg.js';
import './cwk-drawer/cwk-drawer.js';

class CwkNav extends HTMLElement {
  constructor() {
    super();
    this.hamburgerMenuShown = false;
    this.attachShadow({ mode: 'open' });
  }

  get hamburgerEl() {
    return this.shadowRoot.querySelector('[svg-id="hamburger"]');
  }

  connectedCallback() {
    this.setAttribute('role', 'navigation');
    this.setAttribute('aria-label', 'Main');
    this.render();
    const hamburgerToggle = () => {
      document.getElementById('sidebar').toggle();
    };
    this.boundHamburgerToggle = hamburgerToggle.bind(this);
    this.hamburgerEl.addEventListener('click', this.boundHamburgerToggle);
  }

  disconnectedCallback() {
    this.hamburgerEl.removeEventListener('click', this.boundHamburgerToggle);
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          height: 52px;
          background-color: var(--nav-color);
        }

        .hamburger {
          position: absolute;
          top: 50%;
          left: 25px;
          transform: translateY(-50%);
        }

        .hamburger svg {
          display: block;
          width: 25px;
          fill: var(--cwk-lightest);
        }

        .items {
          display: flex;
          position: relative;
          align-items: center;
          max-width: var(--cwk-full-width);
          margin: 0 auto;
          padding: 0 40px;
        }

        .items > div {
          padding: 10px 0;
        }

        .wide-menu {
          display: none;
          align-items: center;
          justify-content: flex-end;
          flex-grow: 1;
        }

        .items a {
          font-family: Roboto Slab, sans-serif;
          font-weight: bold;
          text-decoration: none;
          color: var(--nav-text-color);
        }

        .wide-menu > div:not(:first-child) {
          padding-left: 40px;
        }

        .logo {
          text-align: center;
          font-size: 24px;
          flex-grow: 1;
        }

        .github-nav-logo {
          width: 25px;
        }

        .github-nav-logo svg {
          vertical-align: middle;
        }

        .mobile-menu {
          transform: translateX(-100%);
          transition: transform 0.2s ease-in-out;
          width: 70%;
          height: 100vh;
          z-index: 1;
          position: absolute;
          background-color: #ddd;
        }

        @media (min-width: 600px) {
          .logo {
            text-align: left;
          }

          .wide-menu {
            display: flex;
          }

          .hamburger {
            display: none;
          }
        }
      </style>
      <nav class="items">
        <cwk-svg svg-id="hamburger" class="hamburger"></cwk-svg>
        <div class="logo"><a href="./">cwk</a></div>
        <div class="wide-menu">
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
      </nav>
    `;
  }
}
customElements.define('cwk-nav', CwkNav);
