import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { VerifiedCallback } from 'passport-jwt';
import { ConstantsService } from 'src/utils/constants/constants.service';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(constantsService: ConstantsService) {
    super({
      clientID: constantsService.OAUTH_GOOGLE_ID,
      clientSecret: constantsService.OAUTH_GOOGLE_SECRET,
      callbackURL: constantsService.OAUTH_GOOGLE_REDIRECT_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifiedCallback,
  ) {
    const { id, name, emails } = profile;

    // TODO: Integrate with database upsert with relevant info
    const user = {
      provider: 'google',
      providerId: id,
      name: name.givenName,
      username: emails[0].value,
    };

    done(null, user);
  }
}
