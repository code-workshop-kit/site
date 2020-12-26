import { css } from '@lion/core';
import { LionForm } from '@lion/form';

export class CwkForm extends LionForm {
  static get properties() {
    return {
      dashboard: { attribute: false },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          width: 270px;
        }

        .form-field__label {
          font-family: Roboto Slab, sans-serif;
          font-weight: bold;
          font-size: 35px;
          margin-bottom: 20px;
          margin-top: 75px;
          text-align: center;
        }
      `,
    ];
  }

  get loginBtn() {
    return this.querySelector('#login-btn');
  }

  get signupBtn() {
    return this.querySelector('#signup-btn');
  }

  constructor() {
    super();
    this.dashboard = {};
    this.isCreatingAccount = false;
    this.loginBtn.addEventListener('click', this.loginHandler.bind(this));
    this.signupBtn.addEventListener('click', this.signupHandler.bind(this));
    this.addEventListener('submit', (ev) => ev.preventDefault());
  }

  async loginHandler() {
    this.clearNotification();
    if (this.hasFeedbackFor.includes('error')) {
      this.formElements
        .filter((elem) => elem.hasFeedbackFor.includes('error'))[0]
        ._inputNode.focus();
      return;
    }

    const username = this.formElements.username.serializedValue;
    const password = this.formElements.password.serializedValue;

    if (this.isCreatingAccount) {
      const email = this.formElements.email.serializedValue;
      this.createUser(username, password, email);
    } else {
      this.login(username, password);
    }
  }

  signupHandler() {
    this.clearNotification();
    if (this.hasFeedbackFor.includes('error')) {
      this.formElements
        .filter((elem) => elem.hasFeedbackFor.includes('error'))[0]
        ._inputNode.focus();
      return;
    }

    if (!this.isCreatingAccount) {
      this.isCreatingAccount = true;
      this.label = 'Sign up';
      this.signupBtn.remove();
      this.formElements.username.creating = true;
      this.formElements.password.creating = true;
      this.loginBtn.innerText = 'Create Account';
      const emailInput = document.createElement('cwk-input-email');
      emailInput.label = 'E-Mail Address';
      emailInput.name = 'email';
      this.querySelector('cwk-input-password').insertAdjacentElement('afterend', emailInput);
      requestAnimationFrame(() => {
        emailInput._inputNode.focus();
      });
    }
  }

  async createUser(username, password, email) {
    const response = await fetch('/api/users/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        username,
        password,
        email,
      }),
    });
    const result = await response.json();

    if (response.status === 201) {
      this.createNotification(`User created, welcome!`, 'success');
      await new Promise((resolve) => setTimeout(resolve, 1500));
      this.login(username, password);
    } else {
      this.createNotification(`Failed to create new user. ${result.data[0]}`, 'error');
    }
  }

  async login(username, password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (response.status === 200) {
      this.dashboard.checkAuth();
    } else {
      this.createNotification('Wrong username or password.', 'error');
    }
  }

  createNotification(msg, type) {
    const notification = document.createElement('cwk-notification');
    notification.type = type;
    notification.msg = msg;
    this.querySelector('.login-signup-buttons').insertAdjacentElement('beforebegin', notification);
  }

  clearNotification() {
    const notification = this.querySelector('cwk-notification');
    if (notification) {
      notification.remove();
    }
  }
}
