import { Injectable } from '@nestjs/common';
import { BoulderingGradesDaoService } from '../database/daos/boulderingGrades/boulderingGrades.dao.service';

@Injectable()
export class BoulderingGradesService {
  constructor(
    private readonly boulderingGradesDaoService: BoulderingGradesDaoService,
  ) {}

  getAll() {
    return this.boulderingGradesDaoService.getAll();
  }
}
