import { LitElement, html, css } from '@lion/core';

import './cwk-nav.js';

export class CwkDashboard extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      #logout-btn {
        width: max-content;
      }

      .form-btn {
        display: block;
        box-sizing: border-box;
        font-size: 16px;
        font-family: Roboto Slab, sans-serif;
        font-weight: bold;
        text-transform: uppercase;
        border-radius: 6px;
        color: var(--cwk-lightest);
        border: none;
        cursor: pointer;
        padding: 10px 15px;
      }

      .form-btn--primary {
        transition: width 0.5s ease-in-out;
        background: linear-gradient(0.15turn, var(--cwk-secondary-blue), var(--cwk-primary-blue));
      }

      .form-btn--primary:focus {
        box-shadow: 0 0 0 2px var(--cwk-darkest);
        outline: none;
      }
      .form-btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
        transition: all 0.15s ease;
      }

      .form-btn--primary:focus:hover {
        box-shadow: 0 0 0 2px var(--cwk-darkest), 0 4px 12px rgba(0, 0, 0, 0.5);
      }
    `;
  }

  static get properties() {
    return {
      loading: { attribute: false },
      backendDown: { attribute: false },
    };
  }

  constructor() {
    super();
    this.loading = true;
    this.backendDown = false;
    this.checkAuth();
  }

  async checkAuth() {
    let response;
    try {
      response = await fetch('/api/users/current', {
        credentials: 'include',
      });
      if (response.status === 200) {
        const result = await response.json();
        if (result.status === 'success') {
          this.user = result.data;
        } else {
          window.location.href = './login';
        }
      }
      this.loading = false;
    } catch (e) {
      this.loading = false;
      this.backendDown = true;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async logout() {
    await fetch('/api/users/logout', { credentials: 'include' });
    window.location.href = './login';
  }

  render() {
    // eslint-disable-next-line no-nested-ternary
    return html`${this.loading
      ? ''
      : this.backendDown
      ? html`We are experiencing problems. Please try again later.`
      : html`
          <p>Welcome ${this.user.username}!</p>
          <button class="form-btn form-btn--primary" id="logout-btn" @click=${this.logout}>
            Logout
          </button>
        `} `;
  }
}
customElements.define('cwk-dashboard', CwkDashboard);
