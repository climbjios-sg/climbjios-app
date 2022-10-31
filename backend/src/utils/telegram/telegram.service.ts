import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ConstantsService } from '../constants/constants.service';

/**
 * This enum follows the Telegram Bot API specification.
 * https://core.telegram.org/bots/api
 */
export enum TelegramCommand {
  SEND_MESSAGE = 'sendMessage',
  DELETE_MESSAGE = 'deleteMessage',
  EDIT_MESSAGE_TEXT = 'editMessageText',
}

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
    return this.sendMessage(
      message,
      this.constantsService.OAUTH_TELEGRAM_BOT_TOKEN,
      chatId,
    );
  }

  /**
   * Edit a message text sent by OAUTH_TELEGRAM_BOT_TOKEN in the given chat
   */
  editViaOAuthBot(messageId: number, chatId: string, message: string) {
    return this.editMessageText(
      this.constantsService.OAUTH_TELEGRAM_BOT_TOKEN,
      messageId,
      chatId,
      message,
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

  private generateTelegramApiUrl(botToken: string, command: TelegramCommand) {
    return `https://api.telegram.org/bot${botToken}/${command}`;
  }

  private sendMessage(message: string, botToken: string, chatId: string) {
    return firstValueFrom(
      this.httpService.post(
        this.generateTelegramApiUrl(botToken, TelegramCommand.SEND_MESSAGE),
        {
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML',
        },
      ),
    );
  }

  private deleteMessage(botToken: string, messageId: number, chatId: string) {
    return firstValueFrom(
      this.httpService.post(
        this.generateTelegramApiUrl(botToken, TelegramCommand.DELETE_MESSAGE),
        {
          chat_id: chatId,
          message_id: messageId,
        },
      ),
    );
  }

  private editMessageText(
    botToken: string,
    messageId: number,
    chatId: string,
    message: string,
  ) {
    return firstValueFrom(
      this.httpService.post(
        this.generateTelegramApiUrl(
          botToken,
          TelegramCommand.EDIT_MESSAGE_TEXT,
        ),
        {
          chat_id: chatId,
          message_id: messageId,
          text: message,
          parse_mode: 'HTML',
        },
      ),
    );
  }
}
