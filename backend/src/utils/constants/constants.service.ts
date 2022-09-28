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
}

@Injectable()
export class ConstantsService implements IConstantsService {
  constructor(private readonly configService: ConfigService) {}

  private getOrThrow(varname: string) {
    return this.configService.getOrThrow(varname);
  }

  OAUTH_GOOGLE_ID = this.getOrThrow('OAUTH_GOOGLE_ID');
  OAUTH_GOOGLE_SECRET = this.getOrThrow('OAUTH_GOOGLE_SECRET');
  OAUTH_GOOGLE_REDIRECT_URL = this.getOrThrow('OAUTH_GOOGLE_REDIRECT_URL');
  ACCESS_TOKEN_SECRET = this.getOrThrow('ACCESS_TOKEN_SECRET');
  ACCESS_TOKEN_EXPIRY = this.getOrThrow('ACCESS_TOKEN_EXPIRY');
  REFRESH_TOKEN_SECRET = this.getOrThrow('REFRESH_TOKEN_SECRET');
  REFRESH_TOKEN_EXPIRY = this.getOrThrow('REFRESH_TOKEN_EXPIRY');
}
