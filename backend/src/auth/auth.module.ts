import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleOauthModule } from './googleOauth/googleOauth.module';
import { JwtAuthGuard } from './jwtAuth/jwtAuth.guard';
import { JwtAuthModule } from './jwtAuth/jwtAuth.module';

@Module({
  imports: [JwtAuthModule, GoogleOauthModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      // Global JWT app guard. Lets through endpoints with @Public decorator.
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}
