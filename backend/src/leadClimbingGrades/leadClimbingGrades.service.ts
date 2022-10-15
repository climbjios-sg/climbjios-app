import { Injectable } from '@nestjs/common';
import { LeadClimbingGradesDaoService } from '../database/daos/leadClimbingGrades/leadClimbingGrades.dao.service';

@Injectable()
export class LeadClimbingGradesService {
  constructor(
    private readonly leadClimbingGradesDaoService: LeadClimbingGradesDaoService,
  ) {}

  getAll() {
    return this.leadClimbingGradesDaoService.getAll();
  }
}
