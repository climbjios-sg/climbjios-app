import { Model } from 'objection';
import { PostStatus, PostType } from '../../utils/types';
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
  readonly status: PostStatus;
  readonly telegramAlertMessageId: number;

  readonly creatorProfile: UserProfileModel;
  readonly gym: GymModel;

  isClosed: boolean;

  static relationMappings = () => ({
    creatorProfile: {
      relation: Model.HasOneRelation,
      modelClass: UserProfileModel,
      filter: (query) => query.select(UserProfileModel.relationWhitelist),
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

  // To maintain compatability with the frontend for now, although backend representation has changed
  $afterFind = (context) => {
    const result = super.$afterFind(context);
    this.isClosed = [PostStatus.CLOSED, PostStatus.EXPIRED].includes(
      this.status,
    );
    return result;
  };
}
