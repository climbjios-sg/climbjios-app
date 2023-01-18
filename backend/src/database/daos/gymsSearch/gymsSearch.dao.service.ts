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
    // const tmp = await this.gymModel
    //   .query()
    //   .where('address', 'ilike', `%${substring}%`)
    //   .orWhere('name', 'ilike', `%${substring}%`);
    // console.log(tmp.length);

    const gymGroups = await this.gymGroupModel
      .query()
      .modify((qb) => {
        if (substring) {
          qb.whereExists(
            this.gymGroupModel
              .relatedQuery('gymOutlets')
              .where('name', 'ilike', `%${substring}%`),
          )
            .orWhereExists(
              this.gymGroupModel
                .relatedQuery('gymOutlets')
                .where('address', 'ilike', `%${substring}%`),
            )
            .orWhereExists(
              this.gymGroupModel
                .relatedQuery('gymOutlets')
                .where('area', 'ilike', `%${substring}%`),
            );
          // qb.whereExists(
          //   this.gymModel
          //     .relatedQuery('gymOutlets')
          //     .where('address', 'ilike', `%${substring}%`)
          //     .orWhere('name', 'ilike', `%${substring}%`),
          // );
        }
      })
      .orderBy('name', 'ASC');

    // await this.gymGroupModel
    //   .query()
    //   .whereExists(
    //     this.gymGroupModel
    //       .relatedQuery('gymOutlets')
    //       .where('name', 'ilike', `%${substring}%`),
    //   )
    //   .orWhereExists(
    //     this.gymGroupModel
    //       .relatedQuery('gymOutlets')
    //       .where('address', 'ilike', `%${substring}%`),
    //   )
    //   .orderBy('name', 'ASC');

    // await this.gymGroupModel
    //   .query()
    //   .whereExists(
    //     this.gymGroupModel
    //       .relatedQuery('gymOutlets')
    //       .where('address', 'ilike', `%${substring}%`)
    //       .orWhere('name', 'ilike', `%${substring}%`),
    //   )
    //   .orderBy('name', 'ASC');

    // console.log(gymGroups);

    return await Promise.all(
      gymGroups.map(async (gymGroup) => ({
        ...gymGroup,
        gymOutlets: await this.gymModel
          .query()
          .select(
            'id',
            'name',
            'permanentlyClosed',
            'iconUrl',
            'address',
            'area',
          )
          .where('gymGroupId', '=', gymGroup.id),
        // .modify((qb) => {
        //   if (substring) {
        //     qb.where((builder) => {
        //       builder
        //         .where('name', 'ilike', `%${substring}%`)
        //         .orWhere('address', 'ilike', `%${substring}%`)
        //         .orWhere('area', 'ilike', `%${substring}%`);
        //     });
        //   }
        // }),
      })),
    );
  }
}
