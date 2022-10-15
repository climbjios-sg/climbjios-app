import { Model } from 'objection';
import { BaseModel } from './base.model';
import { BoulderingGradeModel } from './boulderingGrade.model';
import { PronounModel } from './pronoun.model';
import { GymModel } from './gym.model';
import { LeadClimbingGradeModel } from './leadClimbingGrade.model';
import { SncsCertificationModel } from './sncsCertification.model';
import { TopRopeGradeModel } from './topRopeGrade.model';

export class UserProfileModel extends BaseModel {
  static tableName = 'userProfiles';

  readonly userId: string;
  readonly name?: string;
  readonly telegramHandle?: string;
  readonly height?: number;
  readonly reach?: number;
  readonly pronounId?: number;
  readonly highestBoulderingGradeId?: number;
  readonly highestTopRopeGradeId?: number;
  readonly highestLeadClimbingGradeId?: number;
  readonly sncsCertificationId?: number;
  readonly profilePictureUrl?: string;

  readonly pronoun?: PronounModel;
  readonly highestBoulderingGrade?: BoulderingGradeModel;
  readonly highestTopRopeGrade?: TopRopeGradeModel;
  readonly highestLeadClimbingGrade?: LeadClimbingGradeModel;
  readonly sncsCertification?: SncsCertificationModel;
  readonly favouriteGyms?: GymModel[];

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
      filter: (query) => query.select('id', 'name', 'permanentlyClosed'),
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
}
