import { Global, Module } from '@nestjs/common';
import { BetaLikesDaoService } from './betaLikes.dao.service';

@Global()
@Module({
  providers: [BetaLikesDaoService],
  exports: [BetaLikesDaoService],
})
export class BetaLikesDaoModule {}
