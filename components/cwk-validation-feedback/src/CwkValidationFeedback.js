import { LionValidationFeedback } from '@lion/form-core';
import { html, css } from '@lion/core';

export class CwkValidationFeedback extends LionValidationFeedback {
  static get styles() {
    return [
      css`
        div {
          display: flex;
          align-items: top;
        }

        p {
          margin: 0 0 0 5px;
        }

        cwk-svg {
          margin-top: 1px;
        }

        cwk-svg svg {
          display: block;
          width: 13px;
          fill: var(--error-color);
        }
      `,
    ];
  }

  // eslint-disable-next-line class-methods-use-this
  _messageTemplate({ message }) {
    return html`
      <div>
        <cwk-svg svg-id="error"></cwk-svg>
        <p>${message}</p>
      </div>
    `;
  }
}
