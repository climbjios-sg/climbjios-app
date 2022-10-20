import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BetasService } from './betas.service';
import { BetasController } from './betas.controller';

@Module({
  imports: [HttpModule],
  controllers: [BetasController],
  providers: [BetasService],
})
export class BetasModule {}
