import { html, LitElement } from '@lion/core';
import { checkAuth } from './checkAuth.js';
import './loadDankMonoFont.js';
import '../components/cwk-nav.js';
import '../components/cwk-drawer/cwk-drawer.js';
import '../components/cwk-sidebar.js';
import '../components/cwk-svg.js';
import '../components/cwk-form/cwk-auth-form.js';
import '../components/cwk-input-user/cwk-input-user.js';
import '../components/cwk-input-password/cwk-input-password.js';

class CwkLogin extends LitElement {
  constructor() {
    super();
    checkAuth().then((user) => {
      if (user) {
        window.location.href = './dashboard';
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async githubAuth() {
    window.location.href = '/api/auth/github';
  }

  render() {
    // eslint-disable-next-line no-nested-ternary
    return html`
      <cwk-auth-form label="Sign in">
        <form>
          <cwk-input-user autocomplete="username" label="Username" name="username"></cwk-input-user>
          <cwk-input-password
            autocomplete="current-password"
            label="Password"
            name="password"
          ></cwk-input-password>
          <a href="#" class="forgot-password">Forgot credentials?</a>
          <div class="login-signup-buttons" style="display: flex">
            <button class="form-btn form-btn--primary">Login</button>
            <button class="form-btn form-btn--secondary">Sign up</button>
          </div>
        </form>
      </cwk-auth-form>
      <button @click=${this.githubAuth} class="form-btn form-btn--github">
        <cwk-svg svg-id="github"></cwk-svg>
        <div>Sign in with GitHub</div>
      </button>
    `;
  }

  createRenderRoot() {
    // light dom so that password managers can access the signup/in form..
    // if dashboard itself needs style encapsulation just create another WC
    return this;
  }
}
customElements.define('cwk-login', CwkLogin);
