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
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const userProfile_dao_service_1 = require("../../database/daos/userProfiles/userProfile.dao.service");
const telegramAlerts_service_1 = require("../telegramAlerts/telegramAlerts.service");
let AllExceptionsFilter = class AllExceptionsFilter {
    constructor(httpAdapterHost, telegramAlertsService, userProfileDaoService) {
        this.httpAdapterHost = httpAdapterHost;
        this.telegramAlertsService = telegramAlertsService;
        this.userProfileDaoService = userProfileDaoService;
    }
    async catch(exception, host) {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const httpStatus = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let responseBody;
        if (exception instanceof common_1.HttpException) {
            const res = exception.getResponse();
            if (typeof res === 'string') {
                responseBody = {
                    message: res,
                };
            }
            else {
                responseBody = res;
            }
        }
        else {
            responseBody = {
                message: exception.message,
            };
        }
        this.telegramAlertsService.error(Object.assign(Object.assign({ statusCode: httpStatus }, responseBody), { path: httpAdapter.getRequestUrl(request), timestamp: new Date().toISOString(), user: request.user
                ? await this.userProfileDaoService.findByUserId({
                    userId: request.user.id,
                    select: ['userId', 'name', 'telegramHandle'],
                })
                : undefined }));
        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
};
AllExceptionsFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [core_1.HttpAdapterHost,
        telegramAlerts_service_1.TelegramAlertsService,
        userProfile_dao_service_1.UserProfileDaoService])
], AllExceptionsFilter);
exports.AllExceptionsFilter = AllExceptionsFilter;
//# sourceMappingURL=AllExceptions.filter.js.map