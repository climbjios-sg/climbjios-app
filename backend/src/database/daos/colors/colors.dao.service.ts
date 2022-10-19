import { ColorModel } from './../../models/color.model';
import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';

@Injectable()
export class ColorsDaoService {
  constructor(
    @Inject('ColorModel') private colorModel: ModelClass<ColorModel>,
  ) {}

  getAll() {
    return this.colorModel
      .query()
      .select(['id', 'name'])
      .orderBy('order', 'ASC');
  }
}
