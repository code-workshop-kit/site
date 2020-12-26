import { LocalizeMixin } from '@lion/localize';
import { CwkInput } from '../../cwk-input/src/CwkInput.js';
import { MinMaxLength, IllegalPattern, Required } from '../../cwk-input/src/validators.js';

export class CwkInputPassword extends LocalizeMixin(CwkInput) {
  static get properties() {
    return {
      creating: { attribute: false },
    };
  }

  constructor() {
    super();
    this.creating = false;
    this.type = 'password';
    this.validators = [new Required()];
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('creating') && this.creating) {
      this.addPasswordCreatingValidators();
      this.validate();
    }
  }

  addPasswordCreatingValidators() {
    this.validators.push(new MinMaxLength({ min: 8, max: 128 }), new IllegalPattern(/[^!-~]/));
  }
}
