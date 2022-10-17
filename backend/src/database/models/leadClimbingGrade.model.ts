import { BaseModel } from './base.model';

export class LeadClimbingGradeModel extends BaseModel {
  static tableName = 'leadClimbingGrades';

  readonly name: string;
}
