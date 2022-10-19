import { PassportStrategy } from '@nestjs/passport';
import { TelegramStrategy as Strategy } from 'passport-telegram-official';
import { Injectable } from '@nestjs/common';
import { VerifiedCallback } from 'passport-jwt';
import { ConstantsService } from '../../utils/constants/constants.service';
import { UserDaoService } from '../../database/daos/users/user.dao.service';
import { AuthProvider } from '../../utils/types';
import { UserProfileModel } from '../../database/models/userProfile.model';

@Injectable()
export class TelegramOauthStrategy extends PassportStrategy(
  Strategy,
  'telegram',
) {
  static NO_USERNAME = 'NO_USERNAME';

  constructor(
    constantsService: ConstantsService,
    private readonly userDaoService: UserDaoService,
  ) {
    super({
      botToken: constantsService.OAUTH_TELEGRAM_BOT_TOKEN,
    });
  }

  async validate(profile: any, done: VerifiedCallback) {
    const { id, name, username } = profile;

    // Do not create account if user has no Telegram username
    if (!username) {
      return done(null, TelegramOauthStrategy.NO_USERNAME);
    }

    const user = await this.userDaoService.findOrCreateOAuthUser({
      authProvider: AuthProvider.TELEGRAM,
      authProviderId: id,
      oauthName: `${name.givenName}${
        name.familyName ? ` ${name.familyName}` : ''
      }`,
      userProfile: {
        telegramHandle: username,
      } as UserProfileModel,
    });

    done(null, user);
  }
}
