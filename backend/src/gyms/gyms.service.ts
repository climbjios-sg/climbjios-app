import { HttpException, Injectable } from '@nestjs/common';
import { GymsDaoService } from '../database/daos/gyms/gyms.dao.service';
import { GymGradesDaoService } from '../database/daos/gymGrades/gymGrades.dao.service';

@Injectable()
export class GymsService {
  constructor(
    private readonly gymsDaoService: GymsDaoService,
    private readonly gymGradesDaoService: GymGradesDaoService,
  ) {}

  getAll() {
    return this.gymsDaoService.getAll();
  }

  async getGrades(gymId: number) {
    const gym = await this.gymsDaoService.findById(gymId);
    if (!gym) {
      throw new HttpException('Invalid gym id!', 400);
    }
    return this.gymGradesDaoService.findByGymId(gymId);
  }
}
