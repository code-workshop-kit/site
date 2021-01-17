import { LionInput } from '@lion/input';
import { LocalizeMixin } from '@lion/localize';
import { css } from '@lion/core';

import '../../cwk-validation-feedback/cwk-validation-feedback.js';

export class CwkInput extends LocalizeMixin(LionInput) {
  static get localizeNamespaces() {
    return [
      ...super.localizeNamespaces,
      {
        'cwk-input': () => {
          return import('../../cwk-input/translations/en.js');
        },
      },
    ];
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          margin-bottom: 12px;
        }

        .form-field__label {
          margin-bottom: 4px;
        }

        .form-field__feedback {
          margin-top: 4px;
          display: block;
          font-size: 14px;
        }

        .input-group__container > .input-group__input ::slotted(.form-control) {
          height: 24px;
          padding: 2px 4px;
          border-radius: 4px;
          outline: none;
          border: 1px solid var(--cwk-dark);
          font-family: Roboto, sans-serif;
        }

        .input-group__container > .input-group__input ::slotted(.form-control:focus) {
          box-shadow: 0 0 0px 2px var(--cwk-primary-blue);
        }

        :host([shows-feedback-for='error'])
          .input-group__container
          > .input-group__input
          ::slotted(.form-control) {
          border: 1px solid var(--error-color);
        }

        :host([shows-feedback-for='error']) .form-field__label {
          color: var(--error-color);
        }
      `,
    ];
  }

  get slots() {
    return {
      ...super.slots,
      feedback: () => {
        return document.createElement('cwk-validation-feedback');
      },
    };
  }
}
