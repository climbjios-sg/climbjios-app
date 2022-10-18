import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { LeadClimbingGradeModel } from '../../../database/models/leadClimbingGrade.model';

@Injectable()
export class LeadClimbingGradesDaoService {
  constructor(
    @Inject('LeadClimbingGradeModel')
    private leadClimbingGradeModel: ModelClass<LeadClimbingGradeModel>,
  ) {}

  getAll() {
    return this.leadClimbingGradeModel.query().select(['id', 'name']);
  }

  findById(id: number) {
    return this.leadClimbingGradeModel.query().findById(id);
  }
}
