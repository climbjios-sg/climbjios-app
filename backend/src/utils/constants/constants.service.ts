import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface IConstantsService {
  OAUTH_GOOGLE_ID: string;
  OAUTH_GOOGLE_SECRET: string;
  OAUTH_GOOGLE_REDIRECT_URL: string;
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

@Injectable()
export class ConstantsService implements IConstantsService {
  constructor(private readonly configService: ConfigService) {}

  private getOrThrow(varname: string) {
    return this.configService.getOrThrow(varname);
  }

  private getOrDefaultTo(varname: string, defaultTo?: string | number) {
    return this.configService.get(varname) || defaultTo;
  }

  OAUTH_GOOGLE_ID = this.getOrThrow('OAUTH_GOOGLE_ID');
  OAUTH_GOOGLE_SECRET = this.getOrThrow('OAUTH_GOOGLE_SECRET');
  OAUTH_GOOGLE_REDIRECT_URL = this.getOrThrow('OAUTH_GOOGLE_REDIRECT_URL');
  ACCESS_TOKEN_SECRET = this.getOrThrow('ACCESS_TOKEN_SECRET');
  ACCESS_TOKEN_EXPIRY = this.getOrThrow('ACCESS_TOKEN_EXPIRY');
  REFRESH_TOKEN_SECRET = this.getOrThrow('REFRESH_TOKEN_SECRET');
  REFRESH_TOKEN_EXPIRY = this.getOrThrow('REFRESH_TOKEN_EXPIRY');
  DATABASE_HOST = this.getOrThrow('DATABASE_HOST');
  DATABASE_PORT = this.getOrThrow('DATABASE_PORT');
  DATABASE_USER = this.getOrThrow('DATABASE_USER');
  DATABASE_PASSWORD = this.getOrThrow('DATABASE_PASSWORD');
  DATABASE_NAME = this.getOrThrow('DATABASE_NAME');
  CORS_ORIGIN = this.getOrThrow('CORS_ORIGIN');
  PORT = this.getOrDefaultTo('PORT', 4000);
}
