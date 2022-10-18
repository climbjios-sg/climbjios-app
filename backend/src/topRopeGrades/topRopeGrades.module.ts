import { Module } from '@nestjs/common';
import { TopRopeGradesController } from './topRopeGrades.controller';
import { TopRopeGradesService } from './topRopeGrades.service';

@Module({
  controllers: [TopRopeGradesController],
  providers: [TopRopeGradesService],
})
export class TopRopeGradesModule {}
