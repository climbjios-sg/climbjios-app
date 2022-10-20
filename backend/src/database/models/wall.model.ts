import { BaseModel } from './base.model';

export class WallModel extends BaseModel {
  static tableName = 'walls';

  readonly name: string;
}
