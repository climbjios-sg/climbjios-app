import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ConstantsService } from '../utils/constants/constants.service';
import RefreshDto from './dtos/refresh.dto';
import { JwtAuthService } from './jwtAuth/jwtAuth.service';
import { Public } from './jwtAuth/public.decorator';
import { TelegramOauthGuard } from './telegramOauth/telegramOauth.guard';
import { TelegramOauthStrategy } from './telegramOauth/telegramOauth.strategy';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly jwtAuthService: JwtAuthService,
    private readonly constantsService: ConstantsService,
  ) {}

  /**
   * Note: Google OAuth flow is currently disabled in favour of the benefits of Telegram OAuth flow
   * https://github.com/climbjios-sg/climbjios-app/issues/86
   */

  // @Public()
  // @Get('google')
  // @UseGuards(GoogleOauthGuard)
  // async googleAuth(@Req() _req) {
  //   // No implementation: Guard redirects
  // }

  // @Public()
  // @Get('google/redirect')
  // @UseGuards(GoogleOauthGuard)
  // async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
  //   const { accessToken, refreshToken } =
  //     await this.jwtAuthService.generateJwts(req.user);
  //   const redirectUrl = `${this.constantsService.CORS_ORIGIN}?accessToken=${accessToken}&refreshToken=${refreshToken}`;

  //   return res.redirect(redirectUrl);
  // }

  @Public()
  @Get('telegram/redirect')
  @UseGuards(TelegramOauthGuard)
  async telegramAuthRedirect(@Req() req: Request, @Res() res: Response) {
    // If user has no Telegram username, redirect them to frontend instructions to create one
    if (req.user === TelegramOauthStrategy.NO_USERNAME) {
      return res.redirect(
        `${this.constantsService.CORS_ORIGIN}/updateTelegramUsername`,
      );
    }

    const { accessToken, refreshToken } =
      await this.jwtAuthService.generateJwts(req.user);
    const redirectUrl = `${this.constantsService.CORS_ORIGIN}/authRedirect?accessToken=${accessToken}&refreshToken=${refreshToken}`;

    return res.redirect(redirectUrl);
  }

  @Public()
  @Post('refresh')
  async refreshTokenFlow(@Body() body: RefreshDto) {
    return this.jwtAuthService.generateJwtsFromRefreshToken(body.refreshToken);
  }
}
