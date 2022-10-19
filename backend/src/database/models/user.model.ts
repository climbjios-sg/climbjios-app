import { Model } from 'objection';
import { AuthProvider } from 'src/utils/types';
import { BaseModel } from './base.model';
import { UserProfileModel } from './userProfile.model';

export class UserModel extends BaseModel {
  static tableName = 'users';

  readonly authProvider: AuthProvider;
  readonly authProviderId: string;
  readonly oauthName: string;
  readonly refreshToken?: string;
  readonly email?: string;

  readonly userProfile: UserProfileModel;

  static relationMappings = () => ({
    userProfile: {
      relation: Model.HasOneRelation,
      modelClass: UserProfileModel,
      join: {
        from: 'users.id',
        to: 'userProfiles.userId',
      },
    },
  });
}
