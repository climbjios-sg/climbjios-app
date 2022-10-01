import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDaoService } from '../../database/daos/users/user.dao.service';
import { ConstantsService } from '../../utils/constants/constants.service';
import { JwtPayload } from '../../utils/types';

@Injectable()
export class JwtAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly constantsService: ConstantsService,
    private readonly userDaoService: UserDaoService,
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
    return this.jwtService.verify(refreshToken, {
      secret: this.constantsService.REFRESH_TOKEN_SECRET,
    });
  }

  async generateJwts(user) {
    const payload: JwtPayload = { id: user.id };
    const accessToken: string = this.generateAccessToken(payload);
    const refreshToken: string = this.generateRefreshToken(payload);

    await this.userDaoService.updateById(user.id, { refreshToken });

    return {
      accessToken,
      refreshToken,
    };
  }

  async generateJwtsFromRefreshToken(refreshToken: string) {
    const user = this.verifyRefreshToken(refreshToken);
    const dbUser = await this.userDaoService.findById(user.id);
    if (dbUser.refreshToken !== refreshToken) {
      throw new HttpException('Invalid refresh token', 401);
    }

    return this.generateJwts(user);
  }
}
