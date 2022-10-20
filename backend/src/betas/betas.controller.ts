import { Body, Controller, Get, Post, Req, Query } from '@nestjs/common';
import { BetasService } from './betas.service';
import CreateBetaDto from './dtos/createBeta.dto';
import GetBetasDto from './dtos/getBetas.dto';

@Controller('betas')
export class BetasController {
  constructor(private readonly betasService: BetasService) {}

  @Post()
  createBeta(@Req() req, @Body() body: CreateBetaDto) {
    return this.betasService.createBeta(req.user.id, body);
  }

  @Get()
  getBetas(
    @Query()
    query: GetBetasDto,
  ) {
    return this.betasService.getBetas(query);
  }

  @Get('videoUploadUrl')
  getVideoUploadUrl() {
    return this.betasService.getVideoUploadUrl();
  }
}
