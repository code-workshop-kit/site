import { LocalizeMixin } from '@lion/localize';
import { CwkInput } from '../../cwk-input/src/CwkInput.js';
import { MinMaxLength, IllegalPattern, Required } from '../../cwk-input/src/validators.js';

export class CwkInputUser extends LocalizeMixin(CwkInput) {
  static get properties() {
    return {
      creating: { attribute: false },
    };
  }

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
    this.creating = false;
    this.validators = [new Required()];
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('creating') && this.creating) {
      this.addUserCreatingValidators();
      this.validate();
    }
  }

  addUserCreatingValidators() {
    this.validators.push(new IllegalPattern(/[^!-~]/), new MinMaxLength({ min: 4, max: 32 }));
  }
}
