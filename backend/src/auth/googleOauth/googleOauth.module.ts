import { Module } from '@nestjs/common';
import { GoogleOauthStrategy } from './googleOauth.strategy';

@Module({
  providers: [GoogleOauthStrategy],
})
export class GoogleOauthModule {}
