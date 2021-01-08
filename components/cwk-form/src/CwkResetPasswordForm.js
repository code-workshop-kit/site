import { CwkBaseForm } from './CwkBaseForm.js';
import { applyPasswordMatchValidator } from '../../cwk-input-password/src/applyPasswordMatchValidator.js';

export class CwkResetPasswordForm extends CwkBaseForm {
  connectedCallback() {
    super.connectedCallback();
    applyPasswordMatchValidator(
      this.querySelector('[name=password]'),
      this.querySelector('[name=confirm-password]'),
    );
  }

  async submitHandler(ev) {
    super.submitHandler(ev);
    if (this.hasFeedbackFor.includes('error')) {
      this.focusFirstFieldWithError();
      return;
    }
    const password = this.formElements.password.serializedValue;
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const response = await fetch('/api/users/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        password,
        token,
      }),
    });
    const result = await response.json();
    if (response.status === 200 && result.status === 'success') {
      this.createNotification(result.message, 'success');
      this.disabled = true;
      await new Promise((resolve) => setTimeout(resolve, 1500));
      window.location.href = './login';
      return;
    }
    this.createNotification(
      result.message || 'There was a problem changing your password. Try again later.',
      'error',
    );
  }
}
