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
var TelegramOauthStrategy_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramOauthStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_telegram_official_1 = require("passport-telegram-official");
const common_1 = require("@nestjs/common");
const constants_service_1 = require("../../utils/constants/constants.service");
const user_dao_service_1 = require("../../database/daos/users/user.dao.service");
const types_1 = require("../../utils/types");
let TelegramOauthStrategy = TelegramOauthStrategy_1 = class TelegramOauthStrategy extends (0, passport_1.PassportStrategy)(passport_telegram_official_1.TelegramStrategy, 'telegram') {
    constructor(constantsService, userDaoService) {
        super({
            botToken: constantsService.OAUTH_TELEGRAM_BOT_TOKEN,
        });
        this.userDaoService = userDaoService;
    }
    async validate(profile, done) {
        const { id, name, username } = profile;
        if (!username) {
            return done(null, TelegramOauthStrategy_1.NO_USERNAME);
        }
        const user = await this.userDaoService.findOrCreateOAuthUser({
            authProvider: types_1.AuthProvider.TELEGRAM,
            authProviderId: id,
            userProfile: {
                name: `${name.givenName}${name.familyName ? ` ${name.familyName}` : ''}`,
                telegramHandle: username,
            },
        });
        done(null, user);
    }
};
TelegramOauthStrategy.NO_USERNAME = 'NO_USERNAME';
TelegramOauthStrategy = TelegramOauthStrategy_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [constants_service_1.ConstantsService,
        user_dao_service_1.UserDaoService])
], TelegramOauthStrategy);
exports.TelegramOauthStrategy = TelegramOauthStrategy;
//# sourceMappingURL=telegramOauth.strategy.js.map