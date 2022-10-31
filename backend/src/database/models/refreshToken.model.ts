import { BaseModel } from './base.model';

export class RefreshTokenModel extends BaseModel {
  static tableName = 'refreshTokens';

  readonly userId: string;
  readonly refreshToken: string;
}
