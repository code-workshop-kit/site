import {
  Pattern,
  MinMaxLength as LionMinMaxLength,
  Required as LionRequired,
} from '@lion/form-core';
import { localize } from '@lion/localize';

export class Required extends LionRequired {
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
