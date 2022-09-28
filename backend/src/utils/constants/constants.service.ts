import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface IConstantsService {
  OAUTH_GOOGLE_ID: string;
  OAUTH_GOOGLE_SECRET: string;
  OAUTH_GOOGLE_REDIRECT_URL: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
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
  JWT_SECRET = this.getOrThrow('JWT_SECRET');
  JWT_EXPIRES_IN = this.getOrThrow('JWT_EXPIRES_IN');
}
