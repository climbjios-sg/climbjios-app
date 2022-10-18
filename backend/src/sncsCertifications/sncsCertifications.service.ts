import { Injectable } from '@nestjs/common';
import { SncsCertificationsDaoService } from '../database/daos/sncsCertifications/sncsCertifications.dao.service';

@Injectable()
export class SncsCertificationsService {
  constructor(
    private readonly sncsCertificationsDaoService: SncsCertificationsDaoService,
  ) {}

  getAll() {
    return this.sncsCertificationsDaoService.getAll();
  }
}
