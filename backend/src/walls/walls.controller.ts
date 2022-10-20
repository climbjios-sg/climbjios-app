import { Controller, Get } from '@nestjs/common';
import { WallsService } from './walls.service';

@Controller('walls')
export class WallsController {
  constructor(private readonly wallsService: WallsService) {}

  @Get()
  getAll() {
    return this.wallsService.getAll();
  }
}
