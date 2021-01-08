import { html, LitElement } from '@lion/core';

import './loadDankMonoFont.js';
import '../components/cwk-nav.js';
import '../components/cwk-form/cwk-reset-password-form.js';
import '../components/cwk-input-password/cwk-input-password.js';

class CwkResetPassword extends LitElement {
  render() {
    // eslint-disable-next-line no-nested-ternary
    return html`
      <cwk-reset-password-form label="Reset password">
        <form>
          <cwk-input-password
            autocomplete="new-password"
            label="Password"
            name="password"
          ></cwk-input-password>
          <cwk-input-password
            autocomplete="new-password"
            label="Confirm password"
            name="confirm-password"
          ></cwk-input-password>
          <div class="login-signup-buttons" style="display: flex">
            <button class="form-btn form-btn--primary">Reset password</button>
          </div>
        </form>
      </cwk-reset-password-form>
    `;
  }

  createRenderRoot() {
    // light dom so that password managers can access the signup/in form..
    // if dashboard itself needs style encapsulation just create another WC
    return this;
  }
}
customElements.define('cwk-reset-password', CwkResetPassword);
