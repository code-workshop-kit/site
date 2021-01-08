import { PasswordsMatch } from './validators.js';

export const applyPasswordMatchValidator = (initialEl, confirmEl) => {
  confirmEl.validators.push(new PasswordsMatch({ first: initialEl, second: confirmEl }));
  confirmEl.addEventListener('showsFeedbackForErrorChanged', () => {
    initialEl.validators.push(new PasswordsMatch({ first: confirmEl, second: initialEl }));
    // When user triggers confirm pw validation, we should consider initial as prefilled so that validation
    // and feedback happens on both inputs.
    // eslint-disable-next-line no-param-reassign
    initialEl.prefilled = true;
    initialEl.validate();
  });
};
