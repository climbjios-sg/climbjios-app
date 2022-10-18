import { Module } from '@nestjs/common';
import { LeadClimbingGradesController } from './leadClimbingGrades.controller';
import { LeadClimbingGradesService } from './leadClimbingGrades.service';

@Module({
  controllers: [LeadClimbingGradesController],
  providers: [LeadClimbingGradesService],
})
export class LeadClimbingGradesModule {}
