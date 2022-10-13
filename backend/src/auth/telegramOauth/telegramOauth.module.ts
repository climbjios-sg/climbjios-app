import { Module } from '@nestjs/common';
import { TelegramOauthStrategy } from './telegramOauth.strategy';

@Module({
  providers: [TelegramOauthStrategy],
})
export class TelegramOauthModule {}
