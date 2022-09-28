import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import RefreshDto from './dtos/refresh.dto';
import { GoogleOauthGuard } from './googleOauth/googleOauth.guard';
import { JwtAuthService } from './jwtAuth/jwtAuth.service';
import { Public } from './jwtAuth/public.decorator';

@Controller()
export class AuthController {
  constructor(private readonly jwtAuthService: JwtAuthService) {}

  @Public()
  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async googleAuth(@Req() _req) {
    // No implementation: Guard redirects
  }

  @Public()
  @Get('google/redirect')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Req() req: Request) {
    return this.jwtAuthService.generateJwts(req.user);
  }

  @Public()
  @Post('refresh')
  async refreshTokenFlow(@Body() body: RefreshDto) {
    return this.jwtAuthService.generateJwtsFromRefreshToken(body.refreshToken);
  }
}
