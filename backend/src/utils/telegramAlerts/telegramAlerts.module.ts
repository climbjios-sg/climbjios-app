import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { TelegramAlertsService } from './telegramAlerts.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [TelegramAlertsService],
  exports: [TelegramAlertsService],
})
export class TelegramAlertsModule {}
