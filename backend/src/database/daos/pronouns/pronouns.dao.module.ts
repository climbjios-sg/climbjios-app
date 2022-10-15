import { Global, Module } from '@nestjs/common';
import { PronounsDaoService } from './pronouns.dao.service';

@Global()
@Module({
  providers: [PronounsDaoService],
  exports: [PronounsDaoService],
})
export class PronounsDaoModule {}
