import { BaseModel } from './base.model';

export class TopRopeGradeModel extends BaseModel {
  static tableName = 'topRopeGrades';

  readonly name: string;
}
