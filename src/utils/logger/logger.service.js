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
exports.LoggerService = void 0;
const common_1 = require("@nestjs/common");
const constants_service_1 = require("../constants/constants.service");
const telegram_service_1 = require("../telegram/telegram.service");
var LogType;
(function (LogType) {
    LogType["LOG"] = "Log";
    LogType["WARN"] = "Warn";
    LogType["ERROR"] = "Error";
})(LogType || (LogType = {}));
let LoggerService = class LoggerService {
    constructor(telegramService, constantsService) {
        this.telegramService = telegramService;
        this.constantsService = constantsService;
    }
    baseLog(type, data) {
        let message = `${type}:\n`;
        if (typeof data === 'object') {
            message += JSON.stringify(data, null, 2);
        }
        else {
            message += data;
        }
        this.constantsService.NODE_ENV !== 'test' && console.log(data);
        return this.telegramService.sendViaAlertsBot(message);
    }
    log(data) {
        return this.baseLog(LogType.LOG, data);
    }
    error(data) {
        return this.baseLog(LogType.ERROR, data);
    }
    warn(data) {
        return this.baseLog(LogType.WARN, data);
    }
};
LoggerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [telegram_service_1.TelegramService,
        constants_service_1.ConstantsService])
], LoggerService);
exports.LoggerService = LoggerService;
//# sourceMappingURL=logger.service.js.map