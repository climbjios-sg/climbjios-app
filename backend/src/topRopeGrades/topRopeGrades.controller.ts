import { Controller, Get } from '@nestjs/common';
import { TopRopeGradesService } from './topRopeGrades.service';

@Controller('topRopeGrades')
export class TopRopeGradesController {
  constructor(private readonly topRopeGradesService: TopRopeGradesService) {}

  @Get()
  getAll() {
    return this.topRopeGradesService.getAll();
  }
}
