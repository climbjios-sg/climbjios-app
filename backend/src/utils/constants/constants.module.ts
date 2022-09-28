import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConstantsService } from './constants.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [ConstantsService],
  exports: [ConstantsService],
})
export class ConstantsModule {}
