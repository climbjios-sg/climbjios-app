import { PassportStrategy } from '@nestjs/passport';
import { TelegramStrategy as Strategy } from 'passport-telegram-official';
import { Injectable } from '@nestjs/common';
import { VerifiedCallback } from 'passport-jwt';
import { ConstantsService } from '../../utils/constants/constants.service';
import { UserDaoService } from '../../database/daos/users/user.dao.service';
import { AuthProvider } from '../../utils/types';

@Injectable()
export class TelegramOauthStrategy extends PassportStrategy(
  Strategy,
  'telegram',
) {
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

    const user = await this.userDaoService.findOrCreateOAuthUser({
      authProvider: AuthProvider.TELEGRAM,
      authProviderId: id,
      name: `${name.givenName}${name.familyName ? ` ${name.familyName}` : ''}`,
      telegramHandle: username,
    });

    done(null, user);
  }
}
