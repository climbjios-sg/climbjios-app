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
exports.TelegramAlertsService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const constants_service_1 = require("../constants/constants.service");
let TelegramAlertsService = class TelegramAlertsService {
    constructor(constantsService, httpService) {
        this.constantsService = constantsService;
        this.httpService = httpService;
    }
    send(type, data) {
        if (!this.constantsService.TELEGRAM_ALERTS_BOT_TOKEN ||
            !this.constantsService.TELEGRAM_ALERTS_CHAT_ID) {
            return console.warn('Telegram Alert Tokens not configured! Log not sent!');
        }
        return (0, rxjs_1.firstValueFrom)(this.httpService.post(`https://api.telegram.org/bot${this.constantsService.TELEGRAM_ALERTS_BOT_TOKEN}/sendMessage`, {
            chat_id: this.constantsService.TELEGRAM_ALERTS_CHAT_ID,
            text: `${type}:\n${JSON.stringify(data, null, 2)}`,
        }));
    }
    log(data) {
        this.send('Log', data);
    }
    error(data) {
        this.send('Error', data);
    }
};
TelegramAlertsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [constants_service_1.ConstantsService,
        axios_1.HttpService])
], TelegramAlertsService);
exports.TelegramAlertsService = TelegramAlertsService;
//# sourceMappingURL=telegramAlerts.service.js.map