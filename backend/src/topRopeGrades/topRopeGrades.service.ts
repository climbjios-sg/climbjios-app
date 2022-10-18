import { Injectable } from '@nestjs/common';
import { TopRopeGradesDaoService } from '../database/daos/topRopeGrades/topRopeGrades.dao.service';

@Injectable()
export class TopRopeGradesService {
  constructor(
    private readonly topRopeGradesDaoService: TopRopeGradesDaoService,
  ) {}

  getAll() {
    return this.topRopeGradesDaoService.getAll();
  }
}
