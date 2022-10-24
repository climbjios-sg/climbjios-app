import { BaseModel } from './base.model';

export class GymModel extends BaseModel {
  static tableName = 'gyms';

  readonly name: string;
  readonly shortName: string;
  readonly permanentlyClosed: boolean;
}
