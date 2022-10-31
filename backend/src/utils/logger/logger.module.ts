import { Global, Module } from '@nestjs/common';
import { TelegramModule } from '../telegram/telegram.module';
import { LoggerService } from './logger.service';

@Global()
@Module({
  imports: [TelegramModule],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
