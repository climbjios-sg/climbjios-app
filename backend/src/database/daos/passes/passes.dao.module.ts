import { Global, Module } from '@nestjs/common';
import { PassesDaoService } from './passes.dao.service';

@Global()
@Module({
  providers: [PassesDaoService],
  exports: [PassesDaoService],
})
export class PassesDaoModule {}
