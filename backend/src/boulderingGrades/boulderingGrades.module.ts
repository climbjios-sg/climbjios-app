import { Module } from '@nestjs/common';
import { BoulderingGradesController } from './boulderingGrades.controller';
import { BoulderingGradesService } from './boulderingGrades.service';

@Module({
  controllers: [BoulderingGradesController],
  providers: [BoulderingGradesService],
})
export class BoulderingGradesModule {}
