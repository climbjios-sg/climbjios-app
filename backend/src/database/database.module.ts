import { WallModel } from './models/wall.model';
import { ColorModel } from './models/color.model';
import { GymGradeModel } from './models/gymGrade.model';
import { Global, Module } from '@nestjs/common';
import Knex from 'knex';
import { knexSnakeCaseMappers, Model } from 'objection';
import { ConstantsService } from '../utils/constants/constants.service';
import { BoulderingGradeModel } from './models/boulderingGrade.model';
import { PronounModel } from './models/pronoun.model';
import { GymModel } from './models/gym.model';
import { LeadClimbingGradeModel } from './models/leadClimbingGrade.model';
import { PostModel } from './models/post.model';
import { SncsCertificationModel } from './models/sncsCertification.model';
import { TopRopeGradeModel } from './models/topRopeGrade.model';
import { UserModel } from './models/user.model';
import { UserProfileModel } from './models/userProfile.model';
import { UserProfileFavouriteGymModel } from './models/userProfileFavouriteGym.model';
import { BetaModel } from './models/beta.model';
import { RefreshTokenModel } from './models/refreshToken.model';

const models = [
  GymModel,
  PostModel,
  UserModel,
  BoulderingGradeModel,
  TopRopeGradeModel,
  LeadClimbingGradeModel,
  SncsCertificationModel,
  PronounModel,
  UserProfileModel,
  UserProfileFavouriteGymModel,
  GymGradeModel,
  ColorModel,
  WallModel,
  BetaModel,
  RefreshTokenModel,
];
const modelProviders = models.map((model) => ({
  provide: model.name,
  useValue: model,
}));

const providers = [
  ...modelProviders,
  {
    provide: 'KnexConnection',
    inject: [ConstantsService],
    useFactory: async (constantsService: ConstantsService) => {
      const knex = Knex({
        client: 'pg',
        connection: {
          host: constantsService.DATABASE_HOST,
          port: constantsService.DATABASE_PORT,
          user: constantsService.DATABASE_USER,
          password: constantsService.DATABASE_PASSWORD,
          database: constantsService.DATABASE_NAME,
        },
        ...knexSnakeCaseMappers(),
      });

      Model.knex(knex);
      return knex;
    },
  },
];

@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
})
export class DatabaseModule {}
