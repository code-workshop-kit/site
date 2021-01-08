import { LocalizeMixin } from '@lion/localize';
import { CwkInput } from '../../cwk-input/src/CwkInput.js';
import { Required } from '../../cwk-input/src/validators.js';
import { IsEmail } from './validators.js';

export class CwkInputEmail extends LocalizeMixin(CwkInput) {
  constructor() {
    super();
    this.type = 'email';
    this.validators = [new Required(), new IsEmail()];
  }
}
