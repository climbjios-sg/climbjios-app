import { BaseModel } from './base.model';

export class SncsCertificationModel extends BaseModel {
  static tableName = 'sncsCertifications';

  readonly name: string;
}
