class CwkThemeSwitcher extends HTMLElement {
  get theme() {
    return this.getAttribute('theme');
  }

  // We do not set localStorage here, because we only want
  // to set it for explicit user actions on the toggler
  // but not when the user changes their OS/browser settings
  set theme(value) {
    this.setAttribute('theme', value);
  }

  toggle() {
    if (document.documentElement.getAttribute('theme') === 'light') {
      this.setTheme('dark', true);
    } else {
      this.setTheme('light', true);
    }
  }

  setTheme(theme, store = false) {
    this.theme = theme;
    document.documentElement.setAttribute('theme', theme);
    if (store) {
      localStorage.setItem('cwk-theme', theme);
    }
  }

  constructor() {
    super();
    this.boundKeyDown = this.keyDown.bind(this);
    this.boundToggle = this.toggle.bind(this);

    const themeObserver = new MutationObserver((list) => {
      for (const mutation of list) {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'theme' &&
          document.documentElement.getAttribute('theme') !== this.theme &&
          document.documentElement.getAttribute('theme') !== undefined &&
          this.theme !== undefined
        ) {
          // update internal theme prop based on another theme toggler changing the theme
          this.theme = document.documentElement.getAttribute('theme');
        }
      }
    });
    themeObserver.observe(document.documentElement, { attributes: true });

    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setup();
  }

  disconnectedCallback() {
    this.removeEventListener('keydown', this.boundKeyDown);
    this.removeEventListener('click', this.boundToggle);
  }

  setup() {
    this.setupInitialTheme();

    this.setAttribute('tabindex', 0);
    this.setAttribute('aria-label', 'Site theme toggler, dark and light');

    this.addEventListener('keydown', this.boundKeyDown);
    this.addEventListener('click', this.boundToggle);
  }

  setupInitialTheme() {
    const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Prio is: 1) saved preference 2) browser/os preference 3) default 'light'
    this.theme = localStorage.getItem('cwk-theme') || (userPrefersDark ? 'dark' : 'light');

    // Respond to user preference changes on OS and Browser
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (ev) => {
      if (ev.matches) {
        this.setTheme('dark');
      } else {
        this.setTheme('light');
      }
    });

    // Delay this by animation frame so it is not transitioning things on initial render
    requestAnimationFrame(() => {
      document.body.style.setProperty(
        '--cwk-background-transition',
        'background 0.3s ease-in-out, color 0.6s ease-in-out',
      );
      document.body.style.setProperty('--cwk-fill-transition', 'fill 0.3s ease-in-out');
    });
  }

  keyDown(ev) {
    switch (ev.key) {
      case 'Enter':
      case ' ':
        ev.preventDefault();
        this.toggle();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        ev.preventDefault();
        this.setTheme('dark', true);
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        ev.preventDefault();
        this.setTheme('light', true);
        break;
      /* no default */
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          cursor: pointer;
        }

        :host(:focus) {
          outline: none;

          border-radius: 12px;
        }

        :host(:focus) .container {
          border: 2px solid var(--cwk-lighter-blue);
        }

        .container {
          display: inline-flex;
          position: relative;
          overflow: hidden;
          border-radius: 12.5px;
          padding: 4px;
          border: 2px solid var(--cwk-darker);
          background-color: var(--cwk-lightest);
        }

        .sun,
        .moon,
        .thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          overflow: hidden;
        }

        .moon::selection,
        .sun::selection {
          color: var(--cwk-lightest);
        }

        .sun,
        .moon {
          font-size: 16px;
          line-height: 19px;
          width: 20px;
          transition: all 0.2s ease-in-out;
          transform: rotate(0deg);
        }

        .sun {
          margin-right: 5px;
          margin-left: -3px;
        }

        :host([theme="dark"]) .sun {
          opacity: 0;
          transform: rotate(40deg);
        }

        :host([theme="light"]) .moon {
          opacity: 0;
          transform: rotate(-40deg);
        }

        :host([theme="light"]) .thumb {
          right: 5px;
          background-color: var(--cwk-primary-yellow);
          box-shadow: 0 0 0 2px var(--cwk-secondary-yellow);
        }

        .thumb {
          right: calc(100% - 18px - 3px);
          transition: all 0.1s ease-in-out;
          background-color: var(--cwk-dark);
          box-shadow: 0 0 0 2px var(--cwk-darkest);
          position: absolute;
        }

        .thumb {
          width: 16px;
          height: 16px;
          margin-top: 1px;
        }
      </style>
      <div class="container">
        <div class="sun">☀️</div>
        <div class="moon">🌚</div>
        <div class="thumb"></div>
      </div>
    `;
  }
}
customElements.define('cwk-theme-switcher', CwkThemeSwitcher);
