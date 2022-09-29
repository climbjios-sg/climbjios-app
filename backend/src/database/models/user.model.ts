import { AuthProvider } from 'src/utils/types';
import { BaseModel } from './base.model';

export class UserModel extends BaseModel {
  static tableName = 'users';

  readonly name: string;
  readonly email: string;
  readonly username?: string;
  readonly telegramHandle?: string;
  readonly authProvider: AuthProvider;
  readonly authProviderId: string;
  readonly refreshToken?: string;
}
