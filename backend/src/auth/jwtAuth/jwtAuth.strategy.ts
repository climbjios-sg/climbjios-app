import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConstantsService } from 'src/utils/constants/constants.service';

export type JwtPayload = { id: number; username: string };

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(constantsService: ConstantsService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: constantsService.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    return { id: payload.id, username: payload.username };
  }
}
