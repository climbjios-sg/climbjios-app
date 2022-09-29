import { Global, Module } from '@nestjs/common';
import { GymsDaoService } from './gyms.dao.service';

@Global()
@Module({
  providers: [GymsDaoService],
  exports: [GymsDaoService],
})
export class GymsDaoModule {}
