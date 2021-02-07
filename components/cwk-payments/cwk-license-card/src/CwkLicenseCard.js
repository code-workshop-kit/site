import { html, LitElement, SlotMixin } from '@lion/core';
import { formatNumber } from '@lion/localize';
import { loadStripe } from '@stripe/stripe-js';
import { checkAuth } from '../../../../scripts/checkAuth.js';
import cardStyles from './styles.js';

export class CwkLicenseCard extends SlotMixin(LitElement) {
  static get styles() {
    return [cardStyles];
  }

  get submitBtn() {
    return this.shadowRoot.querySelector('#submit');
  }

  get paymentForm() {
    return this.shadowRoot.querySelector('#payment-form');
  }

  get spinner() {
    return this.shadowRoot.querySelector('#spinner');
  }

  get buttonText() {
    return this.shadowRoot.querySelector('#button-text');
  }

  get slots() {
    return {
      ...super.slots,
      card: () => {
        const cardEl = document.createElement('div');
        cardEl.classList.add('sr-card-element');
        cardEl.setAttribute('id', 'card-element');
        return cardEl;
      },
    };
  }

  constructor() {
    super();
    checkAuth().then((user) => {
      this.user = user;
    });
    this.orderData = {
      items: [{ id: 'license_premium', amount: 1 }],
      currency: 'eur',
    };
  }

  firstUpdated() {
    // Disable the button until we have Stripe set up on the page
    this.submitBtn.disabled = true;
    this.initiatePayment();
  }

  render() {
    return html`
      <div class="sr-main">
        <div class="product">
          <p class="product_desc">Basic license</p>
          <p class="product_qty">1x</p>
        </div>
        <p class="price">${formatNumber(25.99, { style: 'currency', currency: 'EUR' })}</p>
        <form id="payment-form" class="sr-payment-form">
          <div class="sr-combo-inputs-row">
            <slot name="card"></slot>
          </div>
          <div class="sr-field-error" id="card-errors" role="alert"></div>
          <button id="submit">
            <div class="spinner hidden" id="spinner"></div>
            <span id="button-text">Pay</span><span id="order-amount"></span>
          </button>
        </form>
        <div class="sr-result hidden">
          <p>Payment completed<br /></p>
          <!-- <pre>
            <code></code>
          </pre> -->
        </div>
      </div>
    `;
  }

  /**
   * 1) Fetch a payment intent
   * 2) Setup the credit card payment card with client secret
   * 3) Set the submit event listener for pay()
   */
  initiatePayment() {
    fetch('/api/payments/license', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.orderData),
    })
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        return this.setupElements(data);
      })
      .then(() => {
        this.submitBtn.disabled = false;

        // Handle form submission.
        this.paymentForm.addEventListener('submit', (event) => {
          event.preventDefault();
          // Initiate payment when the submit button is clicked
          this.pay();
        });
      });
  }

  async setupElements(data) {
    this.stripe = await loadStripe(data.publishableKey);
    const elements = this.stripe.elements();
    const style = {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    };

    this.card = elements.create('card', { style });
    this.card.mount(this.querySelector('#card-element'));
    this.clientSecret = data.clientSecret;
  }

  changeLoadingState(isLoading) {
    if (isLoading) {
      this.submitBtn.disabled = true;
      this.spinner.classList.remove('hidden');
      this.buttonText.classList.add('hidden');
    } else {
      this.submitBtn.disabled = false;
      this.spinner.classList.add('hidden');
      this.buttonText.classList.remove('hidden');
    }
  }

  pay() {
    this.changeLoadingState(true);

    // Initiate the payment.
    // If authentication is required, confirmCardPayment will automatically display a modal
    this.stripe
      .confirmCardPayment(this.clientSecret, {
        payment_method: {
          card: this.card,
          billing_details: {
            name: this.user.username,
            email: this.user.email,
          },
        },
      })
      .then((result) => {
        if (result.error) {
          // Show error to your customer
          this.showError(result.error.message);
        } else {
          // The payment has been processed!
          this.orderComplete(this.stripe, this.clientSecret);
        }
      });
  }

  /* Shows a success / error message when the payment is complete */
  orderComplete(stripe, clientSecret) {
    // Just for the purpose of the sample, show the PaymentIntent response object
    stripe.retrievePaymentIntent(clientSecret).then(() => {
      this.paymentForm.classList.add('hidden');
      this.shadowRoot.querySelector('.sr-result').classList.remove('hidden');
      setTimeout(() => {
        this.shadowRoot.querySelector('.sr-result').classList.add('expand');
      }, 200);

      this.changeLoadingState(false);
    });
  }

  showError(errorMsgText) {
    this.changeLoadingState(false);
    const errorMsg = this.shadowRoot.querySelector('.sr-field-error');
    errorMsg.textContent = errorMsgText;
    setTimeout(() => {
      errorMsg.textContent = '';
    }, 4000);
  }
}
