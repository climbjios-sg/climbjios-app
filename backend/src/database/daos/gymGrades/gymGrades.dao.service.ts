import { GymGradeModel } from './../../models/gymGrade.model';
import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';

@Injectable()
export class GymGradesDaoService {
  constructor(
    @Inject('GymGradeModel') private gymGradeModel: ModelClass<GymGradeModel>,
  ) {}

  findByGymId(gymId: number) {
    return this.gymGradeModel
      .query()
      .select(['id', 'name'])
      .where('gymId', gymId)
      .orderBy('order', 'ASC');
  }
}
