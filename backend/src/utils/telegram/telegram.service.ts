import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ConstantsService } from '../constants/constants.service';

@Injectable()
export class TelegramService {
  constructor(
    private readonly constantsService: ConstantsService,
    private readonly httpService: HttpService,
  ) {}

  /**
   * Send a message via OAUTH_TELEGRAM_BOT_TOKEN to the given chat id
   */
  sendViaOAuthBot(message: string, chatId: string) {
    // OAUTH_TELEGRAM_BOT_TOKEN is validated to exist in ConstantsService
    if (!chatId) {
      return console.warn('sendViaOAuthBot: chatId is empty!');
    }

    return this.sendMessage(
      message,
      this.constantsService.OAUTH_TELEGRAM_BOT_TOKEN,
      chatId,
    );
  }

  /**
   * Send a message via TELEGRAM_ALERTS_BOT_TOKEN to the TELEGRAM_ALERTS_CHAT_ID group
   */
  sendViaAlertsBot(message: string) {
    if (
      !this.constantsService.TELEGRAM_ALERTS_BOT_TOKEN ||
      !this.constantsService.TELEGRAM_ALERTS_CHAT_ID
    ) {
      return console.warn(
        'Telegram Alert Tokens not configured! Log not sent!',
      );
    }

    return this.sendMessage(
      message,
      this.constantsService.TELEGRAM_ALERTS_BOT_TOKEN,
      this.constantsService.TELEGRAM_ALERTS_CHAT_ID,
    );
  }

  private sendMessage(message: string, botToken: string, chatId: string) {
    return firstValueFrom(
      this.httpService.post(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML',
        },
      ),
    );
  }
}
