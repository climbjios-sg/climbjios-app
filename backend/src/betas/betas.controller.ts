import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Query,
  Param,
  Delete,
} from '@nestjs/common';
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

  @Get('creator/:creatorId')
  getCreatorBetas(@Query() query: GetBetasDto, @Param() params) {
    return this.betasService.getCreatorBetas(params.creatorId, query);
  }

  @Get()
  getBetas(
    @Query()
    query: GetBetasDto,
  ) {
    return this.betasService.getBetas(query);
  }

  @Delete(':betaId')
  deleteBeta(@Req() req, @Param() params) {
    return this.betasService.deleteBeta(req.user.id, params.betaId);
  }

  @Get('videoUploadUrl')
  getVideoUploadUrl() {
    return this.betasService.getVideoUploadUrl();
  }
}
