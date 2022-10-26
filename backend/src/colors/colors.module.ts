import { Module } from '@nestjs/common';
import { ColorsService } from './colors.service';
import { ColorsController } from './colors.controller';

@Module({
  controllers: [ColorsController],
  providers: [ColorsService],
})
export class ColorsModule {}
