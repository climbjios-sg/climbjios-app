import * as AWS from 'aws-sdk';
import { Model, QueryContext } from 'objection';
import { S3UploadType } from 'src/utils/types';
import { BaseModel } from './base.model';
import { GymGroupModel } from './gymGroup.model';

export class GymModel extends BaseModel {
  static tableName = 'gyms';
  static s3Instance = new AWS.S3();

  readonly name: string;
  readonly shortName: string;
  readonly permanentlyClosed: boolean;
  readonly gymGroupId: number;
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

  // readonly mondayOpening: string;
  // readonly mondayClosing: string;
  // readonly tuedayOpening: string;
  // readonly tuedayClosing: string;
  // readonly wednesdayOpening: string;
  // readonly wednesdayClosing: string;
  // readonly thursdayOpening: string;
  // readonly thursdayClosing: string;
  // readonly fridayOpening: string;
  // readonly fridayClosing: string;
  // readonly saturdayOpening: string;
  // readonly saturdayClosing: string;
  // readonly sundayOpening: string;
  // readonly sundayClosing: string;

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

  $afterFind = (context: QueryContext) => {
    const result = super.$afterFind(context);

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
