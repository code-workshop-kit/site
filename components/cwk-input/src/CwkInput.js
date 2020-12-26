import { LionInput } from '@lion/input';
import { css } from '@lion/core';

export class CwkInput extends LionInput {
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
