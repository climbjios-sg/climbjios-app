import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ConstantsService } from '../constants/constants.service';

@Injectable()
export class TelegramAlertsService {
  constructor(
    private readonly constantsService: ConstantsService,
    private readonly httpService: HttpService,
  ) {}

  private send(type: string, data: Object) {
    if (
      !this.constantsService.TELEGRAM_ALERTS_BOT_TOKEN ||
      !this.constantsService.TELEGRAM_ALERTS_CHAT_ID
    ) {
      return console.warn(
        'Telegram Alert Tokens not configured! Log not sent!',
      );
    }

    return firstValueFrom(
      this.httpService.post(
        `https://api.telegram.org/bot${this.constantsService.TELEGRAM_ALERTS_BOT_TOKEN}/sendMessage`,
        {
          chat_id: this.constantsService.TELEGRAM_ALERTS_CHAT_ID,
          text: `${type}:\n${JSON.stringify(data, null, 2)}`,
        },
      ),
    );
  }

  log(data: Object) {
    this.send('Log', data);
  }

  error(data: Object) {
    this.send('Error', data);
  }
}
