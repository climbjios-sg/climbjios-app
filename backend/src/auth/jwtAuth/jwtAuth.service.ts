import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConstantsService } from 'src/utils/constants/constants.service';
import { JwtPayload } from './jwtAuth.strategy';

@Injectable()
export class JwtAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly constantsService: ConstantsService,
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

  generateJwts(user) {
    const payload: JwtPayload = { username: user.username, id: user.id };
    const accessToken: string = this.generateAccessToken(payload);
    const refreshToken: string = this.generateRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
    };
  }

  generateJwtsFromRefreshToken(refreshToken: string) {
    const user = this.verifyRefreshToken(refreshToken);

    return this.generateJwts(user);
  }
}
