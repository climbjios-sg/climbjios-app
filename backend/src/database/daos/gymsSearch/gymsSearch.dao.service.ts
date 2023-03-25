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
        //if a substring is given when searching, modify the query to only match gym groups with outlets
        //that have name, address or area that match the substring
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

    //after finding the gym groups that have outlets that match the above criteria,
    //retrieve all outlets from the found gym groups
    return await Promise.all(
      gymGroups.map(async (gymGroup) => ({
        ...gymGroup,
        gymOutlets: await this.gymModel
          .query()
          .context({ getUrls: true })
          .select(
            'id',
            'name',
            'address',
            'area',
          )
          .where('gymGroupId', '=', gymGroup.id)
          .andWhere('permanentlyClosed', '=', 'false'),
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
