import { BaseModel } from './base.model';

export class UserModel extends BaseModel {
  static tableName = 'users';

  readonly name: string;
  readonly username: string;
  readonly telegramHandle: string;
  readonly authProvider: string;
  readonly refreshToken: string;
}
