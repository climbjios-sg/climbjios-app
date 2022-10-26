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
exports.ConstantsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let ConstantsService = class ConstantsService {
    constructor(configService) {
        this.configService = configService;
        this.OAUTH_GOOGLE_ID = this.getOrThrow('OAUTH_GOOGLE_ID');
        this.OAUTH_GOOGLE_SECRET = this.getOrThrow('OAUTH_GOOGLE_SECRET');
        this.OAUTH_GOOGLE_REDIRECT_URL = this.getOrThrow('OAUTH_GOOGLE_REDIRECT_URL');
        this.OAUTH_TELEGRAM_BOT_TOKEN = this.getOrThrow('OAUTH_TELEGRAM_BOT_TOKEN');
        this.TELEGRAM_ALERTS_BOT_TOKEN = this.get('TELEGRAM_ALERTS_BOT_TOKEN');
        this.TELEGRAM_ALERTS_CHAT_ID = this.get('TELEGRAM_ALERTS_CHAT_ID');
        this.ACCESS_TOKEN_SECRET = this.getOrThrow('ACCESS_TOKEN_SECRET');
        this.ACCESS_TOKEN_EXPIRY = this.getOrThrow('ACCESS_TOKEN_EXPIRY');
        this.REFRESH_TOKEN_SECRET = this.getOrThrow('REFRESH_TOKEN_SECRET');
        this.REFRESH_TOKEN_EXPIRY = this.getOrThrow('REFRESH_TOKEN_EXPIRY');
        this.DATABASE_HOST = this.getOrThrow('DATABASE_HOST');
        this.DATABASE_PORT = this.getOrThrow('DATABASE_PORT');
        this.DATABASE_USER = this.getOrThrow('DATABASE_USER');
        this.DATABASE_PASSWORD = this.getOrThrow('DATABASE_PASSWORD');
        this.DATABASE_NAME = this.getOrThrow('DATABASE_NAME');
        this.AWS_ACCESS_KEY_ID = this.getOrThrow('AWS_ACCESS_KEY_ID');
        this.AWS_SECRET_ACCESS_KEY = this.getOrThrow('AWS_SECRET_ACCESS_KEY');
        this.AWS_S3_BUCKET_NAME = this.getOrThrow('AWS_S3_BUCKET_NAME');
        this.AWS_REGION = this.getOrThrow('AWS_REGION');
        this.CORS_ORIGIN = this.getOrThrow('CORS_ORIGIN');
        this.PORT = this.getOrDefaultTo('PORT', 4000);
        this.CLOUDFLARE_ACCOUNT_ID = this.getOrDefaultTo('CLOUDFLARE_ACCOUNT_ID');
        this.CLOUDFLARE_STREAM_API_TOKEN = this.getOrDefaultTo('CLOUDFLARE_STREAM_API_TOKEN');
    }
    get(varname) {
        return this.configService.get(varname);
    }
    getOrThrow(varname) {
        return this.configService.getOrThrow(varname);
    }
    getOrDefaultTo(varname, defaultTo) {
        return this.configService.get(varname) || defaultTo;
    }
    getBooleanOrThrow(varname) {
        return this.configService.getOrThrow(varname).toLowerCase() === 'true';
    }
};
ConstantsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ConstantsService);
exports.ConstantsService = ConstantsService;
//# sourceMappingURL=constants.service.js.map