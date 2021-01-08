import { IsEmail as LionIsEmail } from '@lion/form-core';
import { localize } from '@lion/localize';

export class IsEmail extends LionIsEmail {
  static async getMessage(data) {
    return localize.msg(`cwk-input:${data.type}.${data.name}`, data);
  }
}
