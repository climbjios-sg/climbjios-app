import { Global, Module } from '@nestjs/common';
import { LeadClimbingGradesDaoService } from './leadClimbingGrades.dao.service';

@Global()
@Module({
  providers: [LeadClimbingGradesDaoService],
  exports: [LeadClimbingGradesDaoService],
})
export class LeadClimbingGradesDaoModule {}
