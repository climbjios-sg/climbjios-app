import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserDaoModule } from './database/daos/users/user.dao.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { GymsModule } from './gyms/gyms.module';
import { GymsDaoModule } from './database/daos/gyms/gyms.dao.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    // Database and DAOs
    DatabaseModule,
    UserDaoModule,
    GymsDaoModule,

    // Modules with controllers
    AuthModule,
    UserModule,
    GymsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
