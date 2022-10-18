import { Module } from '@nestjs/common';
import { PronounsController } from './pronouns.controller';
import { PronounsService } from './pronouns.service';

@Module({
  controllers: [PronounsController],
  providers: [PronounsService],
})
export class PronounsModule {}
