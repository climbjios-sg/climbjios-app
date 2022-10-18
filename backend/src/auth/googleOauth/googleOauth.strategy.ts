import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { VerifiedCallback } from 'passport-jwt';
import { ConstantsService } from '../../utils/constants/constants.service';
import { UserDaoService } from '../../database/daos/users/user.dao.service';
import { AuthProvider } from '../../utils/types';
import { UserProfileModel } from 'src/database/models/userProfile.model';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    constantsService: ConstantsService,
    private readonly userDaoService: UserDaoService,
  ) {
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

    const user = await this.userDaoService.findOrCreateOAuthUser({
      authProvider: AuthProvider.GOOGLE,
      authProviderId: id,
      email: emails[0].value,
      userProfile: {
        name: `${name.givenName} ${name.familyName}`,
      } as UserProfileModel,
    });

    done(null, user);
  }
}
