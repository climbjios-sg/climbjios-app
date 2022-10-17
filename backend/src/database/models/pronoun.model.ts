import { BaseModel } from './base.model';

export class PronounModel extends BaseModel {
  static tableName = 'pronouns';

  readonly name: string;
}
