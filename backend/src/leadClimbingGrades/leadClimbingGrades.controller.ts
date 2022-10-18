import { Controller, Get } from '@nestjs/common';
import { LeadClimbingGradesService } from './leadClimbingGrades.service';

@Controller('leadClimbingGrades')
export class LeadClimbingGradesController {
  constructor(
    private readonly leadClimbingGradesService: LeadClimbingGradesService,
  ) {}

  @Get()
  getAll() {
    return this.leadClimbingGradesService.getAll();
  }
}
