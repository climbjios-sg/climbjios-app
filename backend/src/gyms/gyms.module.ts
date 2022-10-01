import { Module } from '@nestjs/common';
import { GymsController } from './gyms.controller';
import { GymsService } from './gyms.service';

@Module({
  controllers: [GymsController],
  providers: [GymsService],
})
export class GymsModule {}
