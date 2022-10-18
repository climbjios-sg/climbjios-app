import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { TopRopeGradeModel } from '../../../database/models/topRopeGrade.model';

@Injectable()
export class TopRopeGradesDaoService {
  constructor(
    @Inject('TopRopeGradeModel')
    private topRopeGradeModel: ModelClass<TopRopeGradeModel>,
  ) {}

  getAll() {
    return this.topRopeGradeModel.query().select(['id', 'name']);
  }

  findById(id: number) {
    return this.topRopeGradeModel.query().findById(id);
  }
}
