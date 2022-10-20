import { HttpException, Injectable } from '@nestjs/common';
import { GymsDaoService } from 'src/database/daos/gyms/gyms.dao.service';
import { GymGradesDaoService } from 'src/database/daos/gymGrades/gymGrades.dao.service';

@Injectable()
export class GymsService {
  constructor(
    private readonly gymsDaoService: GymsDaoService,
    private readonly gymGradesDaoService: GymGradesDaoService,
  ) {}

  getAll() {
    return this.gymsDaoService.getAll();
  }

  getGrades(id: number) {
    try {
      return this.gymGradesDaoService.findByGymId(id);
    } catch (err) {
      console.error(`Failed to get gym grades for gym ${id}`, err);
      throw new HttpException('Failed', 500);
    }
  }
}
