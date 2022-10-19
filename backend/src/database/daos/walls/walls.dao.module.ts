import { Global, Module } from '@nestjs/common';
import { WallsDaoService } from './walls.dao.service';

@Global()
@Module({
  providers: [WallsDaoService],
  exports: [WallsDaoService],
})
export class WallsDaoModule {}
