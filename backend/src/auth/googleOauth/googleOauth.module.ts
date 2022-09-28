import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GoogleOauthStrategy } from './googleOauth.strategy';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [GoogleOauthStrategy],
})
export class GoogleOauthModule {}
