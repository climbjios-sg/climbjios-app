import { Global, Module } from '@nestjs/common';
import { BoulderingGradesDaoService } from './boulderingGrades.dao.service';

@Global()
@Module({
  providers: [BoulderingGradesDaoService],
  exports: [BoulderingGradesDaoService],
})
export class BoulderingGradesDaoModule {}
