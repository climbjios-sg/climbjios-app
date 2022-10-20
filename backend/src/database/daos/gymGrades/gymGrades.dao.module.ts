import { Global, Module } from '@nestjs/common';
import { GymGradesDaoService } from './gymGrades.dao.service';

@Global()
@Module({
  providers: [GymGradesDaoService],
  exports: [GymGradesDaoService],
})
export class GymGradesDaoModule {}
