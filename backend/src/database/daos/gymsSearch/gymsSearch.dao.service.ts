import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { GymGroupModel } from 'src/database/models/gymGroup.model';
import { GymModel } from '../../models/gym.model';

@Injectable()
export class GymsSearchDaoService {
  constructor(
    @Inject('GymGroupModel') private gymGroupModel: ModelClass<GymGroupModel>,
    @Inject('GymModel') private gymModel: ModelClass<GymModel>,
  ) {}

  // getAll() {
  //   return this.gymModel
  //     .query()
  //     .orderBy('name', 'ASC');
  // }

  // findById(id: number) {
  //   return this.gymModel.query().findById(id);
  // }

  async searchGyms(substring?: string) {
    const gymGroups = await this.gymGroupModel
      .query()
      .orderBy('name', 'ASC');
    return await Promise.all(
      gymGroups.map(async (gymGroup) => ({
        ...gymGroup,
        gymOutlets: await this.gymModel
          .query()
          .select('id', 'name', 'permanentlyClosed', 'iconUrl', 'address')
          .where('gymGroupId', '=', gymGroup.id),
      })),
    );
  }
}
