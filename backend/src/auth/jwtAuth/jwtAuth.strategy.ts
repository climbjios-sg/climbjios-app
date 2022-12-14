import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConstantsService } from '../../utils/constants/constants.service';
import { JwtPayload } from '../../utils/types';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(constantsService: ConstantsService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: constantsService.ACCESS_TOKEN_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    return { id: payload.id };
  }
}
