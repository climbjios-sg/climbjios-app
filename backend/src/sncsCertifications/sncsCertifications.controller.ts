import { Controller, Get } from '@nestjs/common';
import { SncsCertificationsService } from './sncsCertifications.service';

@Controller('sncsCertifications')
export class SncsCertificationsController {
  constructor(
    private readonly sncsCertificationsService: SncsCertificationsService,
  ) {}

  @Get()
  getAll() {
    return this.sncsCertificationsService.getAll();
  }
}
