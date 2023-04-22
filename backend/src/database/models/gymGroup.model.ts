import { Model } from 'objection';
import { BaseModel } from './base.model';
import { GymModel } from './gym.model';
import { PassModel } from './gymPass.model';

export class GymGroupModel extends BaseModel {
  static tableName = 'gymGroups';

  readonly name: string;
  readonly permanentlyClosed: boolean;
  readonly passGroupId: number;

  static relationMappings = () => ({
    gymOutlets: {
      relation: Model.HasManyRelation,
      modelClass: GymModel,
      filter: (query) => query.select('id', 'name', 'address', 'iconURL'),
      join: {
        from: 'gymGroups.id',
        to: 'gyms.gymGroupId',
      },
    },
  });
}
