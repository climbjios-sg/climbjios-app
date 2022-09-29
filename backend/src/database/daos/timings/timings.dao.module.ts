import { Global, Module } from '@nestjs/common';
import { TimingsDaoService } from './timings.dao.service';

@Global()
@Module({
  providers: [TimingsDaoService],
  exports: [TimingsDaoService],
})
export class TimingsDaoModule {}
