import { css } from '@lion/core';

export default css`
  /* Variables */
  :host {
    --body-color: rgb(247, 250, 252);
    --button-color: rgb(30, 166, 114);
    --accent-color: var(--cwk-secondary-green);
    --link-color: var(--cwk-lightest);
    --font-color: var(--cwk-dark);
    --body-font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    --radius: 6px;
    --form-width: 400px;
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
  }

  /* Base */
  * {
    box-sizing: border-box;
  }

  body {
    font-family: var(--body-font-family);
    font-size: 16px;
    color: var(--font-color);
    -webkit-font-smoothing: antialiased;
  }

  cwk-license-card {
    transform: translateY(50%);
    display: block;
  }

  .sr-main {
    height: 100%;
    margin: 0 auto;
    padding: 75px 50px;
    background: var(--body-color);
    width: var(--form-width);
    border-radius: var(--radius);
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1), 0px 2px 5px 0px rgba(50, 50, 93, 0.1),
      0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
  }

  .product {
    font-family: Roboto;
    display: flex;
    justify-content: space-between;
    color: var(--font-color);
  }

  .product p {
    margin-top: 0;
    margin-bottom: 5px;
  }

  .price {
    margin-top: 0;
    font-size: 28px;
    font-weight: 700;
    font-family: Roboto;
    color: var(--font-color);
  }

  .sr-field-error {
    color: var(--font-color);
    text-align: left;
    font-size: 13px;
    line-height: 17px;
    margin-top: 12px;
  }

  /* Inputs */
  :host ::slotted(.sr-card-element) {
    padding: 12px;
  }

  button:focus,
  .focused {
    box-shadow: 0 0 0 1px var(--cwk-primary-blue), 0 1px 1px 0 rgba(0, 0, 0, 0.07),
      0 0 0 2px var(--cwk-primary-blue) !important;
    outline: none;
    z-index: 9;
  }

  .sr-result {
    height: 44px;
    -webkit-transition: height 1s ease;
    -moz-transition: height 1s ease;
    -o-transition: height 1s ease;
    transition: height 1s ease;
    color: var(--font-color);
  }
  .sr-result code {
    overflow: scroll;
  }

  .sr-combo-inputs-row {
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1), 0px 2px 5px 0px rgba(50, 50, 93, 0.1),
      0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
    border-radius: 7px;
  }

  /* Buttons and links */
  button {
    background: var(--accent-color);
    border-radius: var(--radius);
    color: white;
    border: 0;
    padding: 12px 16px;
    margin-top: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    display: block;
    box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
    width: 100%;
  }
  button:hover {
    filter: contrast(115%);
  }
  button:active {
    transform: translateY(0px) scale(0.98);
    filter: brightness(0.9);
  }
  button:disabled {
    opacity: 0.5;
    cursor: none;
  }

  a {
    color: var(--link-color);
    text-decoration: none;
    transition: all 0.2s ease;
  }

  a:hover {
    filter: brightness(0.8);
  }

  a:active {
    filter: brightness(0.5);
  }

  /* Code block */
  code,
  pre {
    font-family: 'SF Mono', 'IBM Plex Mono', 'Menlo', monospace;
    font-size: 12px;
  }

  /* Responsiveness */
  @media (max-width: 720px) {
    .sr-main {
      width: 100%;
      background: rgb(247, 250, 252);
      box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1), 0px 2px 5px 0px rgba(50, 50, 93, 0.1),
        0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
      border-radius: 6px;
    }
  }

  /* todo: spinner/processing state, errors, animations */

  .spinner,
  .spinner:before,
  .spinner:after {
    border-radius: 50%;
  }
  .spinner {
    color: var(--cwk-lightest);
    font-size: 22px;
    text-indent: -99999px;
    margin: 0px auto;
    position: relative;
    width: 20px;
    height: 20px;
    box-shadow: inset 0 0 0 2px;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }
  .spinner:before,
  .spinner:after {
    position: absolute;
    content: '';
  }
  .spinner:before {
    width: 10.4px;
    height: 20.4px;
    background: var(--accent-color);
    border-radius: 20.4px 0 0 20.4px;
    top: -0.2px;
    left: -0.2px;
    -webkit-transform-origin: 10.4px 10.2px;
    transform-origin: 10.4px 10.2px;
    -webkit-animation: loading 2s infinite ease 1.5s;
    animation: loading 2s infinite ease 1.5s;
  }
  .spinner:after {
    width: 10.4px;
    height: 10.2px;
    background: var(--accent-color);
    border-radius: 0 10.2px 10.2px 0;
    top: -0.1px;
    left: 10.2px;
    -webkit-transform-origin: 0px 10.2px;
    transform-origin: 0px 10.2px;
    -webkit-animation: loading 2s infinite ease;
    animation: loading 2s infinite ease;
  }

  @-webkit-keyframes loading {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes loading {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  /* Animated form */
  .hidden {
    display: none;
  }

  @keyframes field-in {
    0% {
      opacity: 0;
      transform: translateY(8px) scale(0.95);
    }
    100% {
      opacity: 1;
      transform: translateY(0px) scale(1);
    }
  }

  @keyframes form-in {
    0% {
      opacity: 0;
      transform: scale(0.98);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;
