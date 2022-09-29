import { Global, Module } from '@nestjs/common';
import { UserDaoService } from './user.dao.service';

@Global()
@Module({
  providers: [UserDaoService],
  exports: [UserDaoService],
})
export class UserDaoModule {}
