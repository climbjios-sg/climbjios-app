import { Global, Module } from '@nestjs/common';
import { TopRopeGradesDaoService } from './topRopeGrades.dao.service';

@Global()
@Module({
  providers: [TopRopeGradesDaoService],
  exports: [TopRopeGradesDaoService],
})
export class TopRopeGradesDaoModule {}
