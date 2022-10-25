import { Model } from 'objection';
import { BaseModel } from './base.model';
import { ColorModel } from './color.model';
import { GymModel } from './gym.model';
import { GymGradeModel } from './gymGrade.model';
import { UserProfileModel } from './userProfile.model';
import { WallModel } from './wall.model';

export class BetaModel extends BaseModel {
  static tableName = 'betas';

  readonly creatorId: string;
  readonly gymId: number;
  readonly gymGradeId: number;
  readonly colorId: number;
  readonly wallId: number;
  readonly cloudflareVideoUid: string;

  thumbnailUrl: string;

  static relationMappings = () => ({
    creatorProfile: {
      relation: Model.HasOneRelation,
      modelClass: UserProfileModel,
      filter: (query) => query.select('*'),
      join: {
        from: 'betas.creatorId',
        to: 'userProfiles.userId',
      },
    },
    gym: {
      relation: Model.BelongsToOneRelation,
      modelClass: GymModel,
      filter: (query) => query.select('id', 'name', 'shortName'),
      join: {
        from: 'betas.gymId',
        to: 'gyms.id',
      },
    },
    color: {
      relation: Model.BelongsToOneRelation,
      modelClass: ColorModel,
      filter: (query) => query.select('id', 'name'),
      join: {
        from: 'betas.colorId',
        to: 'colors.id',
      },
    },
    wall: {
      relation: Model.BelongsToOneRelation,
      modelClass: WallModel,
      filter: (query) => query.select('id', 'name'),
      join: {
        from: 'betas.wallId',
        to: 'walls.id',
      },
    },
    gymGrade: {
      relation: Model.BelongsToOneRelation,
      modelClass: GymGradeModel,
      filter: (query) => query.select('id', 'name'),
      join: {
        from: 'betas.gymGradeId',
        to: 'gymGrades.id',
      },
    },
  });

  $afterFind = (context) => {
    const result = super.$afterFind(context);
    this.thumbnailUrl = `https://customer-${process.env.CLOUDFLARE_CUSTOMER_CODE}.cloudflarestream.com/${this.cloudflareVideoUid}/thumbnails/thumbnail.jpg?time=1s&height=640&width=360`;
    return result;
  };
}
