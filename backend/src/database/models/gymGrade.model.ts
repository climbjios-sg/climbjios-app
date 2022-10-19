import { BaseModel } from './base.model';

export class GymGradeModel extends BaseModel {
  static tableName = 'gymGrades';

  readonly name: string;
  readonly gymId: number;
  readonly order: number;
}
