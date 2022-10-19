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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const constants_service_1 = require("../utils/constants/constants.service");
const refresh_dto_1 = require("./dtos/refresh.dto");
const jwtAuth_service_1 = require("./jwtAuth/jwtAuth.service");
const public_decorator_1 = require("./jwtAuth/public.decorator");
const telegramOauth_guard_1 = require("./telegramOauth/telegramOauth.guard");
const telegramOauth_strategy_1 = require("./telegramOauth/telegramOauth.strategy");
let AuthController = class AuthController {
    constructor(jwtAuthService, constantsService) {
        this.jwtAuthService = jwtAuthService;
        this.constantsService = constantsService;
    }
    async telegramAuthRedirect(req, res) {
        if (req.user === telegramOauth_strategy_1.TelegramOauthStrategy.NO_USERNAME) {
            return res.redirect(`${this.constantsService.CORS_ORIGIN}/updateTelegramUsername`);
        }
        const { accessToken, refreshToken } = await this.jwtAuthService.generateJwts(req.user);
        const redirectUrl = `${this.constantsService.CORS_ORIGIN}?accessToken=${accessToken}&refreshToken=${refreshToken}`;
        return res.redirect(redirectUrl);
    }
    async refreshTokenFlow(body) {
        return this.jwtAuthService.generateJwtsFromRefreshToken(body.refreshToken);
    }
};
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('telegram/redirect'),
    (0, common_1.UseGuards)(telegramOauth_guard_1.TelegramOauthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "telegramAuthRedirect", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('refresh'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refresh_dto_1.default]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshTokenFlow", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [jwtAuth_service_1.JwtAuthService,
        constants_service_1.ConstantsService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map