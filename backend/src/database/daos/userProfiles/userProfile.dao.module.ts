import { Global, Module } from '@nestjs/common';
import { UserProfileDaoService } from './userProfile.dao.service';

@Global()
@Module({
  providers: [UserProfileDaoService],
  exports: [UserProfileDaoService],
})
export class UserProfileDaoModule {}
