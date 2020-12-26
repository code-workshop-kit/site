import { LocalizeMixin } from '@lion/localize';
import { CwkInput } from '../../cwk-input/src/CwkInput.js';
import { MinMaxLength, IllegalPattern, Required } from '../../cwk-input/src/validators.js';

export class CwkInputUser extends LocalizeMixin(CwkInput) {
  static get localizeNamespaces() {
    return [
      {
        'cwk-input': () => {
          return import('../../cwk-input/translations/en.js');
        },
      },
    ];
  }

  constructor() {
    super();
    this.validators = [
      new Required(),
      new IllegalPattern(/[^!-~]/),
      new MinMaxLength({ min: 4, max: 32 }),
    ];
  }
}
