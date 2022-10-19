import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConstantsModule } from '../utils/constants/constants.module';
import { PostDaoModule } from '../database/daos/posts/posts.dao.module';
import { UserDaoModule } from '../database/daos/users/user.dao.module';
import { DatabaseModule } from '../database/database.module';
import { TelegramAlertsModule } from '../utils/telegramAlerts/telegramAlerts.module';
import { CronjobService } from './cronjob.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConstantsModule,
    TelegramAlertsModule,

    DatabaseModule,
    UserDaoModule,
    PostDaoModule,
  ],
  providers: [CronjobService],
})
export class CronjobModule {}
