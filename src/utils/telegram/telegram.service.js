"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramService = exports.TelegramCommand = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const constants_service_1 = require("../constants/constants.service");
var TelegramCommand;
(function (TelegramCommand) {
    TelegramCommand["SEND_MESSAGE"] = "sendMessage";
    TelegramCommand["DELETE_MESSAGE"] = "deleteMessage";
    TelegramCommand["EDIT_MESSAGE_TEXT"] = "editMessageText";
})(TelegramCommand = exports.TelegramCommand || (exports.TelegramCommand = {}));
let TelegramService = class TelegramService {
    constructor(constantsService, httpService) {
        this.constantsService = constantsService;
        this.httpService = httpService;
    }
    sendViaOAuthBot(message, chatId, replyMarkup) {
        return this.sendMessage({
            message,
            botToken: this.constantsService.OAUTH_TELEGRAM_BOT_TOKEN,
            chatId,
            replyMarkup,
        });
    }
    editViaOAuthBot(messageId, chatId, message) {
        return this.editMessageText(this.constantsService.OAUTH_TELEGRAM_BOT_TOKEN, messageId, chatId, message);
    }
    sendViaAlertsBot(message) {
        if (!this.constantsService.TELEGRAM_ALERTS_BOT_TOKEN ||
            !this.constantsService.TELEGRAM_ALERTS_CHAT_ID) {
            return console.warn('Telegram Alert Tokens not configured! Log not sent!');
        }
        return this.sendMessage({
            message,
            botToken: this.constantsService.TELEGRAM_ALERTS_BOT_TOKEN,
            chatId: this.constantsService.TELEGRAM_ALERTS_CHAT_ID,
        });
    }
    generateTelegramApiUrl(botToken, command) {
        return `https://api.telegram.org/bot${botToken}/${command}`;
    }
    sendMessage({ message, botToken, chatId, replyMarkup, }) {
        return (0, rxjs_1.firstValueFrom)(this.httpService.post(this.generateTelegramApiUrl(botToken, TelegramCommand.SEND_MESSAGE), {
            chat_id: chatId,
            text: message,
            parse_mode: 'HTML',
            reply_markup: replyMarkup,
        }));
    }
    deleteMessage(botToken, messageId, chatId) {
        return (0, rxjs_1.firstValueFrom)(this.httpService.post(this.generateTelegramApiUrl(botToken, TelegramCommand.DELETE_MESSAGE), {
            chat_id: chatId,
            message_id: messageId,
        }));
    }
    editMessageText(botToken, messageId, chatId, message) {
        return (0, rxjs_1.firstValueFrom)(this.httpService.post(this.generateTelegramApiUrl(botToken, TelegramCommand.EDIT_MESSAGE_TEXT), {
            chat_id: chatId,
            message_id: messageId,
            text: message,
            parse_mode: 'HTML',
        }));
    }
};
TelegramService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [constants_service_1.ConstantsService,
        axios_1.HttpService])
], TelegramService);
exports.TelegramService = TelegramService;
//# sourceMappingURL=telegram.service.js.map