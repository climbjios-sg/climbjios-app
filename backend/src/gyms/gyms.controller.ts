import { Controller, Get, Param } from '@nestjs/common';
import { GymsService } from './gyms.service';

@Controller('gyms')
export class GymsController {
  constructor(private readonly gymsService: GymsService) {}

  @Get()
  getAll() {
    return this.gymsService.getAll();
  }

  @Get(':id/grades')
  getGrades(@Param('id') id: number) {
    return this.gymsService.getGrades(id);
  }

  @Get('search/:substring?')
  searchGyms(@Param('substring') substring?: string) {
    return this.gymsService.searchGyms(substring);
  }
}
