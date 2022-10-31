import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConstantsService } from '../../utils/constants/constants.service';
import { JwtPayload } from '../../utils/types';
import { RefreshTokensDaoService } from '../../database/daos/refreshTokens/refreshTokens.dao.service';

@Injectable()
export class JwtAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly constantsService: ConstantsService,
    private readonly refreshTokensDaoService: RefreshTokensDaoService,
  ) {}

  private generateAccessToken(payload: JwtPayload) {
    return this.jwtService.sign(payload, {
      secret: this.constantsService.ACCESS_TOKEN_SECRET,
      expiresIn: this.constantsService.ACCESS_TOKEN_EXPIRY,
    });
  }

  private generateRefreshToken(payload: JwtPayload) {
    return this.jwtService.sign(payload, {
      secret: this.constantsService.REFRESH_TOKEN_SECRET,
      expiresIn: this.constantsService.REFRESH_TOKEN_EXPIRY,
    });
  }

  private verifyRefreshToken(refreshToken: string): JwtPayload {
    try {
      return this.jwtService.verify(refreshToken, {
        secret: this.constantsService.REFRESH_TOKEN_SECRET,
      });
    } catch (e) {
      throw new HttpException('Invalid refresh token', 401);
    }
  }

  /**
   * When `oldToken` is defined, modify the corresponding existing refresh token entry inplace. (i.e. during refresh token flow)
   * If undefined, create a new database entry (i.e. when signing in)
   */
  async generateJwts(user, oldToken?: string) {
    const payload: JwtPayload = { id: user.id };
    const accessToken: string = this.generateAccessToken(payload);
    const refreshToken: string = this.generateRefreshToken(payload);

    if (oldToken) {
      await this.refreshTokensDaoService.patchByRefreshToken(
        oldToken,
        refreshToken,
      );
    } else {
      await this.refreshTokensDaoService.create(user.id, refreshToken);
    }

    return {
      accessToken,
      refreshToken,
    };
  }

  async generateJwtsFromRefreshToken(refreshToken: string) {
    const user = this.verifyRefreshToken(refreshToken);
    const userRefreshTokens = await this.refreshTokensDaoService.findByUserId(
      user.id,
    );
    const isValidRefreshToken = userRefreshTokens.some(
      (r) => r.refreshToken === refreshToken,
    );

    if (!isValidRefreshToken) {
      throw new HttpException('Invalid refresh token', 401);
    }

    return this.generateJwts(user, refreshToken);
  }
}
