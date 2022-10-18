import { Controller, Get } from '@nestjs/common';
import { BoulderingGradesService } from './boulderingGrades.service';

@Controller('boulderingGrades')
export class BoulderingGradesController {
  constructor(
    private readonly boulderingGradesService: BoulderingGradesService,
  ) {}

  @Get()
  getAll() {
    return this.boulderingGradesService.getAll();
  }
}
