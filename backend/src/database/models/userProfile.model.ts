import { Model } from 'objection';
import { BaseModel } from './base.model';
import { BoulderingGradeModel } from './boulderingGrade.model';
import { PronounModel } from './pronoun.model';
import { GymModel } from './gym.model';
import { LeadClimbingGradeModel } from './leadClimbingGrade.model';
import { SncsCertificationModel } from './sncsCertification.model';
import { TopRopeGradeModel } from './topRopeGrade.model';
import * as AWS from 'aws-sdk';
import { S3UploadType } from '../../utils/types';

AWS.config.update({ region: process.env.AWS_REGION });

export class UserProfileModel extends BaseModel {
  static tableName = 'userProfiles';
  static s3Instance = new AWS.S3();

  readonly userId: string;
  readonly name?: string;
  readonly telegramHandle?: string;
  readonly height?: number;
  readonly reach?: number;
  readonly bio?: string;
  readonly hasProfilePicture: boolean;

  readonly pronounId?: number;
  readonly highestBoulderingGradeId?: number;
  readonly highestTopRopeGradeId?: number;
  readonly highestLeadClimbingGradeId?: number;
  readonly sncsCertificationId?: number;

  readonly pronoun?: PronounModel;
  readonly highestBoulderingGrade?: BoulderingGradeModel;
  readonly highestTopRopeGrade?: TopRopeGradeModel;
  readonly highestLeadClimbingGrade?: LeadClimbingGradeModel;
  readonly sncsCertification?: SncsCertificationModel;
  readonly favouriteGyms?: GymModel[];

  profilePictureUrl: string;

  static readonly relationWhitelist = [
    'userId',
    'name',
    'telegramHandle',
    'bio',
    'height',
    'reach',
    'hasProfilePicture',
  ];

  static relationMappings = () => ({
    pronoun: {
      relation: Model.BelongsToOneRelation,
      modelClass: PronounModel,
      filter: (query) => query.select('id', 'name'),
      join: {
        from: 'userProfiles.pronounId',
        to: 'pronouns.id',
      },
    },
    highestBoulderingGrade: {
      relation: Model.BelongsToOneRelation,
      modelClass: BoulderingGradeModel,
      filter: (query) => query.select('id', 'name'),
      join: {
        from: 'userProfiles.highestBoulderingGradeId',
        to: 'boulderingGrades.id',
      },
    },
    highestTopRopeGrade: {
      relation: Model.BelongsToOneRelation,
      modelClass: TopRopeGradeModel,
      filter: (query) => query.select('id', 'name'),
      join: {
        from: 'userProfiles.highestTopRopeGradeId',
        to: 'topRopeGrades.id',
      },
    },
    highestLeadClimbingGrade: {
      relation: Model.BelongsToOneRelation,
      modelClass: LeadClimbingGradeModel,
      filter: (query) => query.select('id', 'name'),
      join: {
        from: 'userProfiles.highestLeadClimbingGradeId',
        to: 'leadClimbingGrades.id',
      },
    },
    sncsCertification: {
      relation: Model.BelongsToOneRelation,
      modelClass: SncsCertificationModel,
      filter: (query) => query.select('id', 'name'),
      join: {
        from: 'userProfiles.sncsCertificationId',
        to: 'sncsCertifications.id',
      },
    },
    favouriteGyms: {
      relation: Model.ManyToManyRelation,
      modelClass: GymModel,
      filter: (query) =>
        query.select('id', 'name', 'shortName', 'permanentlyClosed'),
      join: {
        from: 'userProfiles.id',
        through: {
          from: 'userProfileFavouriteGyms.userProfileId',
          to: 'userProfileFavouriteGyms.gymId',
        },
        to: 'gyms.id',
      },
    },
  });

  $afterFind = (context) => {
    const result = super.$afterFind(context);

    if (this.hasProfilePicture) {
      this.profilePictureUrl = UserProfileModel.s3Instance.getSignedUrl(
        'getObject',
        {
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: `users/${this.userId}/${S3UploadType.PROFILE_PICTURE}`,
          Expires: 60, // 1 minute
        },
      );
    }

    return result;
  };
}
