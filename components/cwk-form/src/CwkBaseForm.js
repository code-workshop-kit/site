import { css } from '@lion/core';
import { LionForm } from '@lion/form';

import '../../cwk-notification/cwk-notification.js';

export class CwkBaseForm extends LionForm {
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
          text-align: center;
        }

        .form-field__help-text {
          display: block;
          text-align: center;
          margin-bottom: 15px;
          margin-top: -12px;
        }
      `,
    ];
  }

  get submitBtn() {
    return this.querySelector('.form-btn--primary');
  }

  constructor() {
    super();
    this.submitBtn.addEventListener('click', this.submitHandler.bind(this));
  }

  async submitHandler() {
    this.clearNotification();
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

  focusFirstFieldWithError() {
    this.formElements.filter((elem) => elem.hasFeedbackFor.includes('error'))[0]._inputNode.focus();
  }
}
