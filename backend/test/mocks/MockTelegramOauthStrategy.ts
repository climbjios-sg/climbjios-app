import { TelegramOauthStrategy } from '../../src/auth/telegramOauth/telegramOauth.strategy';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import TelegramStrategy from 'passport-telegram-official';

type PublicConstructor<T> = new (...any) => T;

export const getMockedTelegramOAuthStrategy = (
  withUsername: boolean,
  alternateUsername?: string,
): PublicConstructor<TelegramStrategy> => {
  return class MockedTelegramOAuthStrategy extends TelegramOauthStrategy {
    authenticate(req: Request<ParamsDictionary>, options?: any) {
      // Mocked Telegram user
      const user = {
        auth_date: 'auth_date',
        first_name: 'first_name',
        hash: 'hash',
        id: 'auth_provider_id',
        username: undefined,
        last_name: 'last_name',
        photo_url: '',
      };
      if (withUsername) {
        user.username = alternateUsername
          ? alternateUsername
          : 'telegramHandle';
      }
      req.query = user;
      return super.authenticate(req, options);
    }
    validateQuery(req: Request) {
      return true;
    }
  };
};
