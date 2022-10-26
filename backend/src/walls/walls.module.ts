import { Module } from '@nestjs/common';
import { WallsService } from './walls.service';
import { WallsController } from './walls.controller';

@Module({
  controllers: [WallsController],
  providers: [WallsService],
})
export class WallsModule {}
