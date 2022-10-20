import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { BetasService } from './betas.service';
import CreateBetaDto from './dtos/createBeta.dto';

@Controller('betas')
export class BetasController {
  constructor(private readonly betasService: BetasService) {}

  @Get('videoUploadUrl')
  getVideoUploadUrl() {
    return this.betasService.getVideoUploadUrl();
  }

  @Post()
  createBeta(@Req() req, @Body() body: CreateBetaDto) {
    return this.betasService.createBeta(req.user.id, body);
  }
}
