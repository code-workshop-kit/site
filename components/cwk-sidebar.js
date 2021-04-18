import './cwk-theme-switcher.js';
import './cwk-svg.js';

class CwkSidebar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    const sidebar = document.getElementById('sidebar');
    const hamburgerSidebarEl = this.shadowRoot.querySelector('[svg-id="hamburger"]');
    hamburgerSidebarEl.addEventListener('click', () => {
      sidebar.toggle();
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: none;
          position: relative;
          width: 80%;
          background-color: var(--body-background-color);
          flex-direction: column;
        }

        .sidebar-header {
          background-color: var(--nav-color);
          height: 52px;
        }

        .sidebar-item a {
          padding: 15px 25px;
          text-decoration: none;
          color: var(--text-color);
          display: flex;
          align-items: center;
          font-family: Roboto Slab, sans-serif;
          font-weight: bold;
          font-size: 20px;
        }

        .sidebar-item svg {
          display: block;
          padding-right: 25px;
          width: 22px;
          fill: var(--text-color);
        }

        .theme-switch-wrapper {
          text-align: center;
          padding-top: 50px;
          padding-bottom: 30px;
        }

        .hamburger {
          position: absolute;
          top: 17px;
          left: 25px;
        }

        .hamburger svg {
          display: block;
          width: 25px;
          fill: var(--cwk-lightest);
        }
      </style>
      <div class="sidebar-header">
        <cwk-svg svg-id="hamburger" class="hamburger"></cwk-svg>
      </div>
      <nav>
        <div class="theme-switch-wrapper">
          <cwk-theme-switcher></cwk-theme-switcher>
        </div>
        <div class="sidebar-item">
          <a
            target="_blank"
            rel="noopener"
            href="https://github.com/code-workshop-kit/code-workshop-kit#code-workshop-kit"
          >
            <cwk-svg svg-id="docs"></cwk-svg>
            DOCS
          </a>
        </div>
        <div class="sidebar-item github-nav-logo">
          <a aria-label="GitHub page" href="https://github.com/code-workshop-kit/code-workshop-kit">
            <cwk-svg svg-id="github"></cwk-svg>
            GITHUB
          </a>
        </div>
      </nav>
    `;
  }
}
customElements.define('cwk-sidebar', CwkSidebar);
