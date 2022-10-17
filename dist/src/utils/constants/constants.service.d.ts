import { ConfigService } from '@nestjs/config';
interface IConstantsService {
    OAUTH_GOOGLE_ID: string;
    OAUTH_GOOGLE_SECRET: string;
    OAUTH_GOOGLE_REDIRECT_URL: string;
    OAUTH_TELEGRAM_BOT_TOKEN: string;
    TELEGRAM_ALERTS_BOT_TOKEN: string;
    TELEGRAM_ALERTS_CHAT_ID: string;
    ACCESS_TOKEN_SECRET: string;
    ACCESS_TOKEN_EXPIRY: string;
    REFRESH_TOKEN_SECRET: string;
    REFRESH_TOKEN_EXPIRY: string;
    DATABASE_HOST: string;
    DATABASE_PORT: string;
    DATABASE_USER: string;
    DATABASE_PASSWORD: string;
    DATABASE_NAME: string;
    CORS_ORIGIN: string;
    PORT: number;
}
export declare class ConstantsService implements IConstantsService {
    private readonly configService;
    constructor(configService: ConfigService);
    private getOrThrow;
    private getOrDefaultTo;
    private getBooleanOrThrow;
    OAUTH_GOOGLE_ID: any;
    OAUTH_GOOGLE_SECRET: any;
    OAUTH_GOOGLE_REDIRECT_URL: any;
    OAUTH_TELEGRAM_BOT_TOKEN: any;
    TELEGRAM_ALERTS_BOT_TOKEN: any;
    TELEGRAM_ALERTS_CHAT_ID: any;
    ACCESS_TOKEN_SECRET: any;
    ACCESS_TOKEN_EXPIRY: any;
    REFRESH_TOKEN_SECRET: any;
    REFRESH_TOKEN_EXPIRY: any;
    DATABASE_HOST: any;
    DATABASE_PORT: any;
    DATABASE_USER: any;
    DATABASE_PASSWORD: any;
    DATABASE_NAME: any;
    CORS_ORIGIN: any;
    PORT: any;
}
export {};
