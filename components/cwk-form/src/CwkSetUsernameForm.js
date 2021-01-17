import { CwkBaseForm } from './CwkBaseForm.js';

export class CwkSetUsernameForm extends CwkBaseForm {
  async submitHandler(ev) {
    super.submitHandler(ev);
    if (this.hasFeedbackFor.includes('error')) {
      this.focusFirstFieldWithError();
      return;
    }
    const username = this.formElements.username.serializedValue;
    const response = await fetch('/api/users/set-username', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        username,
      }),
    });
    const result = await response.json();
    if (response.status === 200 && result.status === 'success') {
      this.createNotification(result.message, 'success');
      this.disabled = true;
      await new Promise((resolve) => setTimeout(resolve, 1500));
      window.location.href = './dashboard';
      return;
    }
    this.createNotification(
      result.message || 'There was a problem setting your username. Try again later.',
      'error',
    );
  }
}
