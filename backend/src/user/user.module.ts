import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { S3HelperModule } from '../utils/s3Helper/s3Helper.module';

@Module({
  imports: [S3HelperModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
