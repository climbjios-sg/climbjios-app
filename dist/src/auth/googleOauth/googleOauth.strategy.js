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
exports.GoogleOauthStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const common_1 = require("@nestjs/common");
const constants_service_1 = require("../../utils/constants/constants.service");
const user_dao_service_1 = require("../../database/daos/users/user.dao.service");
const types_1 = require("../../utils/types");
let GoogleOauthStrategy = class GoogleOauthStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy, 'google') {
    constructor(constantsService, userDaoService) {
        super({
            clientID: constantsService.OAUTH_GOOGLE_ID,
            clientSecret: constantsService.OAUTH_GOOGLE_SECRET,
            callbackURL: constantsService.OAUTH_GOOGLE_REDIRECT_URL,
            scope: ['email', 'profile'],
        });
        this.userDaoService = userDaoService;
    }
    async validate(_accessToken, _refreshToken, profile, done) {
        const { id, name, emails } = profile;
        const user = await this.userDaoService.findOrCreateOAuthUser({
            authProvider: types_1.AuthProvider.GOOGLE,
            authProviderId: id,
            email: emails[0].value,
            userProfile: {
                name: `${name.givenName} ${name.familyName}`,
            },
        });
        done(null, user);
    }
};
GoogleOauthStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [constants_service_1.ConstantsService,
        user_dao_service_1.UserDaoService])
], GoogleOauthStrategy);
exports.GoogleOauthStrategy = GoogleOauthStrategy;
//# sourceMappingURL=googleOauth.strategy.js.map