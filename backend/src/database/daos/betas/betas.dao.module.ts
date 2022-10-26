import { Global, Module } from '@nestjs/common';
import { BetasDaoService } from './betas.dao.service';

@Global()
@Module({
  providers: [BetasDaoService],
  exports: [BetasDaoService],
})
export class BetasDaoModule {}
