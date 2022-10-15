import { AuthProvider } from 'src/utils/types';
import { BaseModel } from './base.model';

export class UserModel extends BaseModel {
  static tableName = 'users';

  readonly authProvider: AuthProvider;
  readonly authProviderId: string;
  readonly refreshToken?: string;
  readonly email?: string;
}
