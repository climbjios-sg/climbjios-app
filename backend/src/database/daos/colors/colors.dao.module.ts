import { Global, Module } from '@nestjs/common';
import { ColorsDaoService } from './colors.dao.service';

@Global()
@Module({
  providers: [ColorsDaoService],
  exports: [ColorsDaoService],
})
export class ColorsDaoModule {}
