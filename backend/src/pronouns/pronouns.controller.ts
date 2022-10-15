import { Controller, Get } from '@nestjs/common';
import { PronounsService } from './pronouns.service';

@Controller('pronouns')
export class PronounsController {
  constructor(private readonly pronounsService: PronounsService) {}

  @Get()
  getAll() {
    return this.pronounsService.getAll();
  }
}
