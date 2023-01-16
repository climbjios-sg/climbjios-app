import { Model } from 'objection';
import { BaseModel } from './base.model';
import { GymModel } from './gym.model';

export class GymGroupModel extends BaseModel {
  static tableName = 'gym_groups';

  readonly name: string;
  readonly permanentlyClosed: boolean;

  static relationMappings = () => ({
    gymOutlets: {
      relation: Model.HasManyRelation,
      modelClass: GymModel,
      filter: (query) => query.select('id', 'name', 'address', 'iconURL'),
      join: {
        from: 'gym_groups.id',
        to: 'gyms.gymGroupId',
      },
    },
  });
}
