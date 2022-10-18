import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserDaoModule } from './database/daos/users/user.dao.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { PostModule } from './posts/posts.module';
import { PostDaoModule } from './database/daos/posts/posts.dao.module';
import { GymsModule } from './gyms/gyms.module';
import { GymsDaoModule } from './database/daos/gyms/gyms.dao.module';
import { ConstantsModule } from './utils/constants/constants.module';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { TelegramAlertsModule } from './utils/telegramAlerts/telegramAlerts.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './utils/filters/AllExceptions.filter';
import { BoulderingGradesDaoModule } from './database/daos/boulderingGrades/boulderingGrades.dao.module';
import { TopRopeGradesDaoModule } from './database/daos/topRopeGrades/topRopeGrades.dao.module';
import { LeadClimbingGradesDaoModule } from './database/daos/leadClimbingGrades/leadClimbingGrades.dao.module';
import { SncsCertificationsDaoModule } from './database/daos/sncsCertifications/sncsCertifications.dao.module';
import { PronounsDaoModule } from './database/daos/pronouns/pronouns.dao.module';
import { UserProfileDaoModule } from './database/daos/userProfiles/userProfile.dao.module';
import { BoulderingGradesModule } from './boulderingGrades/boulderingGrades.module';
import { LeadClimbingGradesModule } from './leadClimbingGrades/leadClimbingGrades.module';
import { TopRopeGradesModule } from './topRopeGrades/topRopeGrades.module';
import { PronounsModule } from './pronouns/pronouns.module';
import { SncsCertificationsModule } from './sncsCertifications/sncsCertifications.module';

@Module({
  imports: [
    HttpModule,
    ScheduleModule.forRoot(),
    TelegramAlertsModule,
    ConstantsModule,

    // Database and DAOs
    DatabaseModule,
    UserDaoModule,
    PostDaoModule,
    GymsDaoModule,
    BoulderingGradesDaoModule,
    TopRopeGradesDaoModule,
    LeadClimbingGradesDaoModule,
    SncsCertificationsDaoModule,
    PronounsDaoModule,
    UserProfileDaoModule,

    // Modules with controllers
    AuthModule,
    UserModule,
    PostModule,
    GymsModule,
    BoulderingGradesModule,
    LeadClimbingGradesModule,
    TopRopeGradesModule,
    SncsCertificationsModule,
    PronounsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
