import { Controller, Get } from '@nestjs/common';
import { GymsService } from './gyms.service';

@Controller('gyms')
export class GymsController {
  constructor(private readonly gymsService: GymsService) {}

  @Get()
  getAll() {
    return this.gymsService.getAll();
  }
}
