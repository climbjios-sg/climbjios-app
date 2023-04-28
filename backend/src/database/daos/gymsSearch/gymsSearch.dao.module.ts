import { Global, Module } from '@nestjs/common';
import { GymsSearchDaoService } from './gymsSearch.dao.service';

@Global()
@Module({
  providers: [GymsSearchDaoService],
  exports: [GymsSearchDaoService],
})
export class GymsSearchDaoModule {}
