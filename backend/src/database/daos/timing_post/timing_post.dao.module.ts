import { Global, Module } from '@nestjs/common';
import { TimingPostDaoService } from './timing_post.dao.service';

@Global()
@Module({
  providers: [TimingPostDaoService],
  exports: [TimingPostDaoService],
})
export class TimingPostDaoModule {}
