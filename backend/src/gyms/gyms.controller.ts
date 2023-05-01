import { Controller, Get, Param } from '@nestjs/common';
import { GymsService } from './gyms.service';

@Controller('gyms')
export class GymsController {
  constructor(private readonly gymsService: GymsService) {}

  @Get(':id/grades')
  getGrades(@Param('id') id: number) {
    return this.gymsService.getGrades(id);
  }

  @Get(':id/passes')
  getPasses(@Param('id') id: number) {
    return this.gymsService.getPasses(id);
  }

  @Get('search/:substring?')
  searchGyms(@Param('substring') substring?: string) {
    return this.gymsService.searchGyms(substring);
  }

  @Get('/:id?')
  getGymDetails(@Param('id') id?: number) {
    if (id) {
      return this.gymsService.getGymDetails(id);
    } else {
      return this.gymsService.getAll();
    }
  }
}
