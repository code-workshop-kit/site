import { LocalizeMixin } from '@lion/localize';
import { CwkInput } from '../../cwk-input/src/CwkInput.js';
import { MinMaxLength, IllegalPattern, Required } from '../../cwk-input/src/validators.js';

export class CwkInputPassword extends LocalizeMixin(CwkInput) {
  constructor() {
    super();
    this.type = 'password';
    this.validators = [
      new Required(),
      new MinMaxLength({ min: 8, max: 128 }),
      new IllegalPattern(/[^!-~]/),
    ];
  }
}
