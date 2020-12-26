import { html, css, LitElement } from '@lion/core';

export class CwkNotification extends LitElement {
  static get properties() {
    return {
      msg: { attribute: false },
      type: { type: String, reflect: true },
    };
  }

  static get styles() {
    return [
      css`
        :host {
          display: flex;
          align-items: top;
          margin-bottom: 5px;
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

        :host([type='success']) cwk-svg svg {
          fill: var(--cwk-primary-green);
        }
      `,
    ];
  }

  constructor() {
    super();
    this.msg = 'Error.';
    this.type = 'error';
  }

  render() {
    return html`
      <cwk-svg svg-id="${this.type}"></cwk-svg>
      <p>${this.msg}</p>
    `;
  }
}
