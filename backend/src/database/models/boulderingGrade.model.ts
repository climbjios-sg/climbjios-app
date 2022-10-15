import { BaseModel } from './base.model';

export class BoulderingGradeModel extends BaseModel {
  static tableName = 'boulderingGrades';

  readonly name: string;
}
