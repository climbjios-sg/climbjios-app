import { Injectable } from '@nestjs/common';
import { ConstantsService } from '../constants/constants.service';
import { TelegramService } from '../telegram/telegram.service';

enum LogType {
  LOG = 'Log',
  WARN = 'Warn',
  ERROR = 'Error',
}

@Injectable()
export class LoggerService {
  constructor(
    private readonly telegramService: TelegramService,
    private readonly constantsService: ConstantsService,
  ) {}

  private baseLog(type: LogType, data: string | Object) {
    let message = `${type}:\n`;
    if (typeof data === 'object') {
      message += JSON.stringify(data, null, 2);
    } else {
      message += data;
    }

    this.constantsService.NODE_ENV !== 'test' && console.log(data); // idk why but the JSON.stringified message is missing A LOT of details
    return this.telegramService.sendViaAlertsBot(message);
  }

  log(data: string | Object) {
    return this.baseLog(LogType.LOG, data);
  }

  error(data: string | Object) {
    return this.baseLog(LogType.ERROR, data);
  }

  warn(data: string | Object) {
    return this.baseLog(LogType.WARN, data);
  }
}
