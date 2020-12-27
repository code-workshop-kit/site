import {
  Pattern,
  Validator,
  MinMaxLength as LionMinMaxLength,
  Required as LionRequired,
  IsEmail as LionIsEmail,
} from '@lion/form-core';
import { localize } from '@lion/localize';

export class Required extends LionRequired {
  static async getMessage(data) {
    return localize.msg(`cwk-input:${data.type}.${data.name}`, data);
  }
}

export class IsEmail extends LionIsEmail {
  static async getMessage(data) {
    return localize.msg(`cwk-input:${data.type}.${data.name}`, data);
  }
}

export class MinMaxLength extends LionMinMaxLength {
  static async getMessage(data) {
    return localize.msg(`cwk-input:${data.type}.${data.name}`, data);
  }
}

export class IllegalPattern extends Pattern {
  static async getMessage(data) {
    return localize.msg(`cwk-input:${data.type}.${data.name}`, data);
  }

  static get validatorName() {
    return 'IllegalPattern';
  }

  execute(value, pattern = this.param) {
    return !super.execute(value, pattern);
  }
}

export class PasswordsMatch extends Validator {
  static async getMessage(data) {
    return localize.msg(`cwk-input:${data.type}.${data.name}`, data);
  }

  static get validatorName() {
    return 'PasswordsMatch';
  }

  constructor(param, cfg) {
    super(param, cfg);
    // Re-validate second field when the first field changes, so that both fields validations stay synced
    param.first.addEventListener('model-value-changed', () => param.second.validate());
  }

  execute(value, { first, second } = this.param) {
    let hasError = true;
    if (first.modelValue === second.modelValue) {
      hasError = false;
    }
    return hasError;
  }
}
