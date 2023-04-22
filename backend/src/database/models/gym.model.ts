import * as AWS from 'aws-sdk';
import { Model, QueryContext } from 'objection';
import { S3UploadType } from '../../utils/types';
import { BaseModel } from './base.model';
import { GymGroupModel } from './gymGroup.model';
import { PassModel } from './gymPass.model';

export class GymModel extends BaseModel {
  static tableName = 'gyms';
  static s3Instance = new AWS.S3();

  readonly name: string;
  readonly shortName: string;
  readonly permanentlyClosed: boolean;
  readonly gymGroupId: number;
  readonly passGroupId: number;
  iconUrl: string;
  bannerUrl: string;
  readonly address: string;
  readonly area: string;
  readonly passSharing: string;
  readonly boulder: boolean;
  readonly autoBelay: boolean;
  readonly topRope: boolean;
  readonly lead: boolean;
  readonly socialUrl: string;
  openNow: string;
  operatingHours: string[];

  static relationMappings = () => ({
    gymGroup: {
      relation: Model.BelongsToOneRelation,
      modelClass: GymGroupModel,
      filter: (query) => query.select('*'),
      join: {
        from: 'gymGroups.id',
        to: 'gyms.gymGroupId',
      },
    },
    passGroup: {
      relation: Model.HasManyRelation,
      modelClass: PassModel,
      filter: (query) => query.select('*'),
      join: {
        from: 'pass_groups.passGroupId',
        to: 'gyms.passGroupId',
      },
    },
  });

  $afterFind = (context: QueryContext) => {
    const result = super.$afterFind(context);

    if (!context.getUrls) {
      return;
    }

    this.bannerUrl = GymModel.s3Instance.getSignedUrl('getObject', {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `gyms/${this.id}/banner/${S3UploadType.BANNER_PICTURE}`,
      Expires: 60, // 1 minute
    });
    this.iconUrl = GymModel.s3Instance.getSignedUrl('getObject', {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `gyms/${this.id}/icon/${S3UploadType.ICON_PICTURE}`,
      Expires: 60, // 1 minute
    });

    return result;
  };
}
