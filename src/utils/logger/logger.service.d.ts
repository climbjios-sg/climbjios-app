import { ConstantsService } from '../constants/constants.service';
import { TelegramService } from '../telegram/telegram.service';
export declare class LoggerService {
    private readonly telegramService;
    private readonly constantsService;
    constructor(telegramService: TelegramService, constantsService: ConstantsService);
    private baseLog;
    log(data: string | Object): void | Promise<import("axios").AxiosResponse<any, any>>;
    error(data: string | Object): void | Promise<import("axios").AxiosResponse<any, any>>;
    warn(data: string | Object): void | Promise<import("axios").AxiosResponse<any, any>>;
}
