import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';

@Module({
  imports: [HttpModule],
  providers: [TelegramService],
  exports: [TelegramService],
})
export class TelegramModule {}
