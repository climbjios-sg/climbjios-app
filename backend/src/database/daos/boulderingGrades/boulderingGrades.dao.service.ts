import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { BoulderingGradeModel } from '../../../database/models/boulderingGrade.model';

@Injectable()
export class BoulderingGradesDaoService {
  constructor(
    @Inject('BoulderingGradeModel')
    private boulderingGradeModel: ModelClass<BoulderingGradeModel>,
  ) {}

  getAll() {
    return this.boulderingGradeModel.query().select(['id', 'name']);
  }

  findById(id: number) {
    return this.boulderingGradeModel.query().findById(id);
  }
}
