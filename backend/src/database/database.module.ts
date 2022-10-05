import { Global, Module } from '@nestjs/common';
import Knex from 'knex';
import { knexSnakeCaseMappers, Model } from 'objection';
import { ConstantsService } from '../utils/constants/constants.service';
import { GymModel } from './models/gym.model';
import { PostModel } from './models/post.model';
import { UserModel } from './models/user.model';

const models = [GymModel, PostModel, UserModel];
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
