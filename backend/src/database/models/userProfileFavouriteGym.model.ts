import { BaseModel } from './base.model';

export class UserProfileFavouriteGymModel extends BaseModel {
  static tableName = 'userProfileFavouriteGyms';

  readonly userProfileId: string;
  readonly gymId: number;
}
