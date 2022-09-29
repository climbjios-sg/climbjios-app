import { Injectable } from '@nestjs/common';
import { GymsDaoService } from 'src/database/daos/gyms/gyms.dao.service';

@Injectable()
export class GymsService {
  constructor(private readonly gymsDaoService: GymsDaoService) {}

  getAll() {
    return this.gymsDaoService.getAll();
  }
}
