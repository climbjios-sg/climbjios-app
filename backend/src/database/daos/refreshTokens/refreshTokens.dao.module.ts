import { Global, Module } from '@nestjs/common';
import { RefreshTokensDaoService } from './refreshTokens.dao.service';

@Global()
@Module({
  providers: [RefreshTokensDaoService],
  exports: [RefreshTokensDaoService],
})
export class RefreshTokensDaoModule {}
