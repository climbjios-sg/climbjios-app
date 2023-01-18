import { Model } from 'objection';
import { BaseModel } from './base.model';
import { GymGroupModel } from './gymGroup.model';

export class GymModel extends BaseModel {
  static tableName = 'gyms';

  readonly name: string;
  readonly shortName: string;
  readonly permanentlyClosed: boolean;
  readonly gymGroupId: number;
  readonly iconUrl: string;
  readonly bannerUrl: string;
  readonly address: string;
  readonly area: string;
  readonly passSharing: string;
  readonly boulder: boolean;
  readonly autoBelay: boolean;
  readonly topRope: boolean;
  readonly lead: boolean;
  readonly mondayOpening: string;
  readonly mondayClosing: string;
  readonly tuedayOpening: string;
  readonly tuedayClosing: string;
  readonly wednesdayOpening: string;
  readonly wednesdayClosing: string;
  readonly thursdayOpening: string;
  readonly thursdayClosing: string;
  readonly fridayOpening: string;
  readonly fridayClosing: string;
  readonly saturdayOpening: string;
  readonly saturdayClosing: string;
  readonly sundayOpening: string;
  readonly sundayClosing: string;

  static relationMappings = () => ({
    gymGroup: {
      relation: Model.BelongsToOneRelation,
      modelClass: GymGroupModel,
      filter: (query) => query.select('*'),
      join: {
        from: 'gym_groups.id',
        to: 'gyms.gymGroupId',
      },
    },
  });
}
