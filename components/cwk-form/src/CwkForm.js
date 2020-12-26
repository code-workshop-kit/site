import { css } from '@lion/core';
import { LionForm } from '@lion/form';

export class CwkForm extends LionForm {
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
          font-size: 35px; /* 50px */
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
    this.isCreatingAccount = false;
    this.loginBtn.addEventListener('click', this.loginHandler.bind(this));
    this.signupBtn.addEventListener('click', this.signupHandler.bind(this));
  }

  async loginHandler() {
    /**
     * 1) send post request for login
     * 2) render dashboard yayyyyy
     * 3) or render an error notification that login failed
     */
    if (this.isCreatingAccount) {
      // create account
    } else {
      // login
      const username = this.formElements.username.serializedValue;
      const password = this.formElements.password.serializedValue;
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
    }
  }

  signupHandler() {
    if (!this.hasFeedbackFor.includes('error')) {
      if (!this.isCreatingAccount) {
        this.isCreatingAccount = true;
        this.label = 'Sign up';
        this.signupBtn.remove();
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
  }
}
