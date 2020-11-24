class CwkThemeSwitcher extends HTMLElement {
  get theme() {
    return this.getAttribute("theme");
  }

  // We do not set localStorage here, because we only want
  // to set it for explicit user actions on the toggler
  // but not when the user changes their OS/browser settings
  set theme(value) {
    if (value === "light") {
      document.body.classList.replace("dark", "light");
    } else {
      document.body.classList.replace("light", "dark");
    }
    this.setAttribute("theme", value);
  }

  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.render();
    this.setup();
  }

  setupInitialTheme() {
    const userPrefersDark = window.matchMedia("(prefers-color-scheme: dark)")
      .matches;
    const userPrefersLight = window.matchMedia("(prefers-color-scheme: light)")
      .matches;

    // Prio is: 1) saved preference 2) browser/os preference 3) default 'light'
    this.theme =
      localStorage.getItem("cwk-theme") || userPrefersDark
        ? "dark"
        : null || userPrefersLight
        ? "light"
        : null || "light";

    document.body.classList.add(this.theme);

    // Respond to user preference changes on OS and Browser
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (ev) => {
        console.log("change", ev.matches);
        if (ev.matches) {
          this.theme = "dark";
        } else {
          this.theme = "light";
        }
      });
  }

  setup() {
    this.setupInitialTheme();

    this.setAttribute("tabindex", 0);

    const boundKeyDown = this.keyDown.bind(this);
    this.addEventListener("keydown", boundKeyDown);

    const boundToggle = this.toggle.bind(this);
    this.addEventListener("click", boundToggle);
  }

  keyDown(ev) {
    switch (ev.key) {
      case "Enter":
      case " ":
        ev.preventDefault();
        this.toggle();
        break;
      case "ArrowLeft":
      case "ArrowUp":
        ev.preventDefault();
        this.theme = "dark";
        localStorage.setItem("cwk-theme", "dark");
        break;
      case "ArrowRight":
      case "ArrowDown":
        ev.preventDefault();
        this.theme = "light";
        localStorage.setItem("cwk-theme", "light");
        break;
      /* no default */
    }
  }

  toggle() {
    const newVal = this.theme === "light" ? "dark" : "light";
    localStorage.setItem("cwk-theme", newVal);
    this.theme = newVal;
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          cursor: pointer;
        }

        .container {
          display: inline-flex;
          position: relative;
          overflow: hidden;
          border-radius: 12.5px;
          padding: 4px;
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
customElements.define("cwk-theme-switcher", CwkThemeSwitcher);
