import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { GymGroupModel } from 'src/database/models/gymGroup.model';
// import { GymModel } from '../../models/gym.model';

@Injectable()
export class GymsSearchDaoService {
  constructor(@Inject('GymGroupModel') private gymGroupModel: ModelClass<GymGroupModel>) {}

  // getAll() {
  //   return this.gymModel
  //     .query()
  //     .orderBy('name', 'ASC');
  // }

  // findById(id: number) {
  //   return this.gymModel.query().findById(id);
  // }

  searchGyms(substring?: string) {
    const gymGroups = this.gymGroupModel.query().orderBy('name', 'ASC')
    // gymGroups.array.forEach(element => {
      
    // });
    console.log(gymGroups)
  }
}

// const gymGroups = GymGroupModel.query().orderBy('name', 'ASC')
// // gymGroups.array.forEach(element => {
  
// // });
// console.log(gymGroups)