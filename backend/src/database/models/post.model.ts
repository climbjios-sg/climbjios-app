import { Model } from 'objection';
import { BaseModel } from './base.model';
import { GymModel } from './gym.model';
import { UserModel } from './user.model';

export class PostModel extends BaseModel {
  static tableName = 'posts';

  readonly userId: string;
  readonly isBuy: boolean; // false means 'isSell'
  readonly numPasses: number;
  readonly price: number;
  readonly gymId: number;
  readonly startDateTime: Date;
  readonly endDateTime: Date;
  readonly openToClimbTogether: boolean;
  readonly optionalNote: string;
  readonly isClosed: boolean;

  readonly user: UserModel;
  readonly gym: GymModel;

  static relationMappings = () => ({
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: UserModel,
      filter: (query) =>
        query.select('id', 'name', 'username', 'telegramHandle'),
      join: {
        from: 'posts.userId',
        to: 'users.id',
      },
    },
    gym: {
      relation: Model.BelongsToOneRelation,
      modelClass: GymModel,
      filter: (query) => query.select('id', 'name', 'permanentlyClosed'),
      join: {
        from: 'posts.gymId',
        to: 'gyms.id',
      },
    },
  });
}
