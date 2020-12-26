import { html, css, LitElement } from '@lion/core';

import '../components/cwk-nav.js';
import '../components/cwk-form/cwk-form.js';
import '../components/cwk-input-user/cwk-input-user.js';
import '../components/cwk-input-password/cwk-input-password.js';
import '../components/cwk-input-email/cwk-input-email.js';
import '../components/cwk-validation-feedback/cwk-validation-feedback.js';
import '../components/cwk-notification/cwk-notification.js';
import '../components/cwk-svg.js';
import './loadDankMonoFont.js';

class CwkDashboard extends LitElement {
  static get styles() {
    return css`
      h1 {
        font-family: Roboto Slab, sans-serif;
        font-weight: bold;
        font-size: 35px; /* 50px */
        margin-bottom: 20px;
        margin-top: 75px;
        text-align: center;
      }

      .login-signup-buttons {
        display: flex;
      }

      .login-signup-buttons button {
        width: 100%;
        display: block;
        box-sizing: border-box;
        text-decoration: none;
        font-weight: normal;
        margin-top: 5px;
      }

      #login-btn,
      #signup-btn {
        font-size: 14px;
        font-family: Roboto Slab, sans-serif;
        font-weight: bold;
        text-transform: uppercase;
        border-radius: 6px;
        color: var(--cwk-lightest);
        border: none;
        cursor: pointer;
        padding: 10px 15px;
      }

      #login-btn {
        transition: width 0.5s ease-in-out;
        background: linear-gradient(0.15turn, var(--cwk-secondary-blue), var(--cwk-primary-blue));
      }

      #signup-btn {
        margin-left: 15px;
        background: linear-gradient(0.15turn, var(--cwk-darkest), var(--cwk-dark));
      }

      #login-btn:focus {
        box-shadow: 0 0 0 2px var(--cwk-darkest);
        outline: none;
      }

      #signup-btn:focus {
        box-shadow: 0 0 0 2px var(--cwk-primary-blue);
        outline: none;
      }

      #login-btn:hover,
      #signup-btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
        transition: all 0.15s ease;
      }

      #login-btn:focus:hover {
        box-shadow: 0 0 0 2px var(--cwk-darkest), 0 4px 12px rgba(0, 0, 0, 0.5);
      }

      #signup-btn:focus:hover {
        box-shadow: 0 0 0 2px var(--cwk-primary-blue), 0 4px 12px rgba(0, 0, 0, 0.5);
      }
    `;
  }

  static get properties() {
    return {
      authed: { attribute: false },
      user: { attribute: false },
      loading: { attribute: false },
    };
  }

  constructor() {
    super();
    this.authed = false;
    this.user = {};
    this.loading = true;
  }

  connectedCallback() {
    super.connectedCallback();
    this.checkAuth();
  }

  async checkAuth() {
    const response = await fetch('/api/users/current', {
      credentials: 'include',
    });

    if (response.status === 200) {
      this.authed = true;
      this.user = (await response.json()).data.username;
    } else {
      this.authed = false;
    }
    this.loading = false;
  }

  // eslint-disable-next-line class-methods-use-this
  signinTemplate() {
    return html`
      <cwk-form .dashboard=${this} label="Sign in">
        <form>
          <cwk-input-user label="Username" name="username"></cwk-input-user>
          <cwk-input-password label="Password" name="password"></cwk-input-password>
          <div class="login-signup-buttons">
            <button id="login-btn">Login</button>
            <button id="signup-btn">Sign up</button>
          </div>
        </form>
      </cwk-form>
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  dashboardTemplate() {
    return html`<p>Welcome ${this.user}!</p>`;
  }

  render() {
    return html`${this.loading
      ? ''
      : html`${this.authed ? this.dashboardTemplate() : this.signinTemplate()}`} `;
  }
}
customElements.define('cwk-dashboard', CwkDashboard);
