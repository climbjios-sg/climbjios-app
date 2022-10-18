import { Controller, Get } from '@nestjs/common';
import { BetasService } from './betas.service';

@Controller('betas')
export class BetasController {
  constructor(private readonly betasService: BetasService) {}

  @Get('videoUploadUrl')
  getVideoUploadUrl() {
    return this.betasService.getVideoUploadUrl();
  }
}
