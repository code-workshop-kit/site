import { html, LitElement } from '@lion/core';

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
  static get properties() {
    return {
      authed: { reflect: true },
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
      const result = await response.json();
      if (result.status === 'success') {
        this.user = result.data;
        this.authed = true;
      } else {
        this.user = {};
        this.authed = false;
      }
    }
    this.loading = false;
  }

  async logout() {
    const response = await fetch('/api/users/logout', {
      credentials: 'include',
    });

    if (response.status === 200) {
      this.checkAuth();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  signinTemplate() {
    return html`
      <cwk-form .dashboard=${this} label="Sign in">
        <form>
          <cwk-input-user autocomplete="username" label="Username" name="username"></cwk-input-user>
          <cwk-input-password
            autocomplete="current-password"
            label="Password"
            name="password"
          ></cwk-input-password>
          <div class="login-signup-buttons">
            <button id="login-btn">Login</button>
            <button type="button" id="signup-btn">Sign up</button>
          </div>
        </form>
      </cwk-form>
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  dashboardTemplate() {
    return html`
      <p>Welcome ${this.user.username}!</p>
      <button id="logout-btn" @click=${this.logout}>Logout</button>
    `;
  }

  render() {
    return html`${this.loading
      ? ''
      : html`${this.authed ? this.dashboardTemplate() : this.signinTemplate()}`} `;
  }

  createRenderRoot() {
    // light dom so that password managers can access the signup/in form..
    // if dashboard itself needs style encapsulation just create another WC
    return this;
  }
}
customElements.define('cwk-dashboard', CwkDashboard);
