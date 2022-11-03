import { HttpService } from '@nestjs/axios';
import { ConstantsService } from '../constants/constants.service';
export declare enum TelegramCommand {
    SEND_MESSAGE = "sendMessage",
    DELETE_MESSAGE = "deleteMessage",
    EDIT_MESSAGE_TEXT = "editMessageText"
}
export declare class TelegramService {
    private readonly constantsService;
    private readonly httpService;
    constructor(constantsService: ConstantsService, httpService: HttpService);
    sendViaOAuthBot(message: string, chatId: string, replyMarkup?: any): Promise<import("axios").AxiosResponse<any, any>>;
    editViaOAuthBot(messageId: number, chatId: string, message: string, replyMarkup?: any): Promise<import("axios").AxiosResponse<any, any>>;
    sendViaAlertsBot(message: string): void | Promise<import("axios").AxiosResponse<any, any>>;
    private generateTelegramApiUrl;
    private sendMessage;
    private deleteMessage;
    private editMessageText;
}
