import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
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
    const tokens = this.jwtAuthService.login(req.user);
    return tokens;
  }
}
