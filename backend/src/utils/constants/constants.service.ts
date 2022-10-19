import { Injectable } from '@nestjs/common';
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
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
  AWS_S3_BUCKET_NAME: string;
  AWS_REGION: string;
  CORS_ORIGIN: string;
}

@Injectable()
export class ConstantsService implements IConstantsService {
  constructor(private readonly configService: ConfigService) {}

  private getOrThrow(varname: string) {
    return this.configService.getOrThrow(varname);
  }

  private getOrDefaultTo(varname: string, defaultTo?: string | number) {
    return this.configService.get(varname) || defaultTo;
  }

  private getBooleanOrThrow(varname: string) {
    return this.configService.getOrThrow(varname).toLowerCase() === 'true';
  }

  OAUTH_GOOGLE_ID = this.getOrThrow('OAUTH_GOOGLE_ID');
  OAUTH_GOOGLE_SECRET = this.getOrThrow('OAUTH_GOOGLE_SECRET');
  OAUTH_GOOGLE_REDIRECT_URL = this.getOrThrow('OAUTH_GOOGLE_REDIRECT_URL');
  OAUTH_TELEGRAM_BOT_TOKEN = this.getOrThrow('OAUTH_TELEGRAM_BOT_TOKEN');
  TELEGRAM_ALERTS_BOT_TOKEN = this.getOrThrow('TELEGRAM_ALERTS_BOT_TOKEN');
  TELEGRAM_ALERTS_CHAT_ID = this.getOrThrow('TELEGRAM_ALERTS_CHAT_ID');
  ACCESS_TOKEN_SECRET = this.getOrThrow('ACCESS_TOKEN_SECRET');
  ACCESS_TOKEN_EXPIRY = this.getOrThrow('ACCESS_TOKEN_EXPIRY');
  REFRESH_TOKEN_SECRET = this.getOrThrow('REFRESH_TOKEN_SECRET');
  REFRESH_TOKEN_EXPIRY = this.getOrThrow('REFRESH_TOKEN_EXPIRY');
  DATABASE_HOST = this.getOrThrow('DATABASE_HOST');
  DATABASE_PORT = this.getOrThrow('DATABASE_PORT');
  DATABASE_USER = this.getOrThrow('DATABASE_USER');
  DATABASE_PASSWORD = this.getOrThrow('DATABASE_PASSWORD');
  DATABASE_NAME = this.getOrThrow('DATABASE_NAME');
  AWS_ACCESS_KEY_ID = this.getOrThrow('AWS_ACCESS_KEY_ID');
  AWS_SECRET_ACCESS_KEY = this.getOrThrow('AWS_SECRET_ACCESS_KEY');
  AWS_S3_BUCKET_NAME = this.getOrThrow('AWS_S3_BUCKET_NAME');
  AWS_REGION = this.getOrThrow('AWS_REGION');
  CORS_ORIGIN = this.getOrThrow('CORS_ORIGIN');
}
