import { BaseModel } from './base.model';

export class ColorModel extends BaseModel {
  static tableName = 'colors';

  readonly name: string;
  readonly order: number;
}
