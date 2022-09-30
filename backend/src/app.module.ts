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
import { TimingsDaoModule } from './database/daos/timings/timings.dao.module';
import { TimingPostDaoModule } from './database/daos/timing_post/timing_post.dao.module';
import { ConstantsModule } from './utils/constants/constants.module';

@Module({
  imports: [
    ConstantsModule,

    // Database and DAOs
    DatabaseModule,
    UserDaoModule,
    PostDaoModule,
    GymsDaoModule,
    TimingsDaoModule,
    TimingPostDaoModule,

    // Modules with controllers
    AuthModule,
    UserModule,
    PostModule,
    GymsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
