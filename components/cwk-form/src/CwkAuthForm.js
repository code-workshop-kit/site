import { CwkBaseForm } from './CwkBaseForm.js';
import { applyPasswordMatchValidator } from '../../cwk-input-password/src/applyPasswordMatchValidator.js';

import '../../cwk-input-email/cwk-input-email.js';
import '../../cwk-input-password/cwk-input-password.js';

export class CwkAuthForm extends CwkBaseForm {
  get signupBtn() {
    return this.querySelector('.form-btn--secondary');
  }

  get forgotPasswordEl() {
    return this.querySelector('.forgot-password');
  }

  constructor() {
    super();
    this.mode = 'login';
    this.signupBtn.addEventListener('click', this.signupHandler.bind(this));
    this.forgotPasswordEl.addEventListener('click', this.forgotPasswordHandler.bind(this));
  }

  async submitHandler(ev) {
    super.submitHandler(ev);
    if (this.hasFeedbackFor.includes('error')) {
      this.focusFirstFieldWithError();
      return;
    }

    switch (this.mode) {
      case 'signup': {
        const username = this.formElements.username.serializedValue;
        const password = this.formElements.password.serializedValue;
        const email = this.formElements.email.serializedValue;
        this.createUser(username, password, email);
        break;
      }
      case 'login': {
        const username = this.formElements.username.serializedValue;
        const password = this.formElements.password.serializedValue;
        this.login(username, password);
        break;
      }
      case 'forgot-password': {
        const email = this.formElements.email.serializedValue;
        this.forgotPassword(email);
        break;
      }
      // no default
    }
  }

  signupHandler() {
    this.clearNotification();
    if (this.hasFeedbackFor.includes('error')) {
      this.focusFirstFieldWithError();
      return;
    }

    if (this.mode === 'login') {
      this.transformFormToSignup();
    }
  }

  forgotPasswordHandler() {
    this.clearNotification();
    this.transformFormToForgotPassword();
  }

  async createUser(username, password, email) {
    // eslint-disable-next-line
    const token = await grecaptcha.execute('6Lcn7R4aAAAAAGUmKh5QZRtdSZpdcTgNdKtnJ4pd', {
      action: 'submit',
    });

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
        token,
      }),
    });
    const result = await response.json();

    if (response.status === 201 && result.status !== 'error') {
      this.createNotification(`Created. We sent an email to verify your account.`, 'success');
      this.disabled = true;
      await new Promise((resolve) => setTimeout(resolve, 1500));
      window.location.reload();
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

    if (response.status === 401) {
      const result = await response.json();
      this.createNotification(result.message, 'error');
    } else if (response.status === 200) {
      window.location.href = './dashboard';
    }
  }

  async forgotPassword(email) {
    const response = await fetch('/api/users/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
      }),
    });
    const result = await response.json();
    if (response.status === 200) {
      this.createNotification(result.message, 'success');
      this.disabled = true;
      return;
    }
    this.createNotification(
      'There was a problem sending you a password reset link. Try again later.',
      'error',
    );
  }

  transformFormToForgotPassword() {
    this.mode = 'forgot-password';
    this.label = 'Forgot Credentials';
    this.helpText =
      "We'll send you an email with your username and a link to change your password.";
    this.signupBtn.remove();
    this.submitBtn.innerText = 'Request password reset';
    this.formElements.username.remove();
    this.formElements.password.remove();
    const emailField = document.createElement('cwk-input-email');
    emailField.name = 'email';
    emailField.label = 'E-Mail Address';
    this._formNode.prepend(emailField);
    this.forgotPasswordEl.remove();
  }

  transformFormToSignup() {
    // Change current form
    this.mode = 'signup';
    this.label = 'Sign up';
    this.signupBtn.remove();
    this.forgotPasswordEl.remove();
    this.formElements.username.creating = true;
    this.formElements.password.creating = true;
    this.submitBtn.innerText = 'Create Account';

    // Add confirm password with match validation
    const initialPasswordInput = this.querySelector('[name=password]');
    initialPasswordInput.autocomplete = 'new-password';
    const confirmPasswordInput = document.createElement('cwk-input-password');
    confirmPasswordInput.creating = true;
    confirmPasswordInput.label = 'Confirm Password';
    confirmPasswordInput.name = 'password-confirm';
    confirmPasswordInput.autocomplete = 'new-password';
    applyPasswordMatchValidator(initialPasswordInput, confirmPasswordInput);
    this.querySelector('.login-signup-buttons').insertAdjacentElement(
      'beforebegin',
      confirmPasswordInput,
    );

    // Add email input
    const emailInput = document.createElement('cwk-input-email');
    emailInput.label = 'E-Mail Address';
    emailInput.name = 'email';
    emailInput.autocomplete = 'email';
    this.querySelector('.login-signup-buttons').insertAdjacentElement('beforebegin', emailInput);

    // Focus the first field with error, or else focus the confirm password which is the next field
    requestAnimationFrame(() => {
      if (this.hasFeedbackFor.includes('error')) {
        this.focusFirstFieldWithError();
        return;
      }
      confirmPasswordInput._inputNode.focus();
    });
  }
}
