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
import { ConstantsService } from 'src/utils/constants/constants.service';
import RefreshDto from './dtos/refresh.dto';
import { GoogleOauthGuard } from './googleOauth/googleOauth.guard';
import { JwtAuthService } from './jwtAuth/jwtAuth.service';
import { Public } from './jwtAuth/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly jwtAuthService: JwtAuthService,
    private readonly constantsService: ConstantsService,
  ) {}

  @Public()
  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async googleAuth(@Req() _req) {
    // No implementation: Guard redirects
  }

  @Public()
  @Get('google/redirect')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const { accessToken, refreshToken } =
      await this.jwtAuthService.generateJwts(req.user);
    const redirectUrl = `${this.constantsService.CORS_ORIGIN}?accessToken=${accessToken}&refreshToken=${refreshToken}`;

    return res.redirect(redirectUrl);
  }

  @Public()
  @Post('refresh')
  async refreshTokenFlow(@Body() body: RefreshDto) {
    return this.jwtAuthService.generateJwtsFromRefreshToken(body.refreshToken);
  }
}
