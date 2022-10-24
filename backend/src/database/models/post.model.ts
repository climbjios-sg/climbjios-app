import { Model } from 'objection';
import { PostType } from '../../utils/types';
import { BaseModel } from './base.model';
import { GymModel } from './gym.model';
import { UserProfileModel } from './userProfile.model';

export class PostModel extends BaseModel {
  static tableName = 'posts';

  readonly creatorId: string;
  readonly type: PostType;
  readonly numPasses: number;
  readonly price: number;
  readonly gymId: number;
  readonly startDateTime: Date;
  readonly endDateTime: Date;
  readonly openToClimbTogether: boolean;
  readonly optionalNote: string;
  readonly isClosed: boolean;

  readonly creatorProfile: UserProfileModel;
  readonly gym: GymModel;

  static relationMappings = () => ({
    creatorProfile: {
      relation: Model.HasOneRelation,
      modelClass: UserProfileModel,
      filter: (query) => query.select('*'),
      join: {
        from: 'posts.creatorId',
        to: 'userProfiles.userId',
      },
    },
    gym: {
      relation: Model.BelongsToOneRelation,
      modelClass: GymModel,
      filter: (query) =>
        query.select('id', 'name', 'shortName', 'permanentlyClosed'),
      join: {
        from: 'posts.gymId',
        to: 'gyms.id',
      },
    },
  });
}
