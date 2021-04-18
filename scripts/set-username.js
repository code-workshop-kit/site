import { html, LitElement } from '@lion/core';

import './loadDankMonoFont.js';
import '../components/cwk-nav.js';
import '../components/cwk-drawer/cwk-drawer.js';
import '../components/cwk-sidebar.js';
import '../components/cwk-form/cwk-set-username-form.js';
import '../components/cwk-input-user/cwk-input-user.js';

class CwkSetUsername extends LitElement {
  render() {
    // eslint-disable-next-line no-nested-ternary
    return html`
      <cwk-set-username-form
        label="Set username"
        help-text="You don't have a username yet, please create one."
      >
        <form>
          <cwk-input-user creating label="Username" name="username"></cwk-input-user>
          <div class="login-signup-buttons" style="display: flex">
            <button class="form-btn form-btn--primary">Set username</button>
          </div>
        </form>
      </cwk-set-username-form>
    `;
  }

  createRenderRoot() {
    // light dom so that password managers can access the signup/in form..
    // if dashboard itself needs style encapsulation just create another WC
    return this;
  }
}
customElements.define('cwk-set-username', CwkSetUsername);
