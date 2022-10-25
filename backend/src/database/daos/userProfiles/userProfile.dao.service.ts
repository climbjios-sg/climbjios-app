import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Model, ModelClass } from 'objection';
import { UserProfileFavouriteGymModel } from '../../../database/models/userProfileFavouriteGym.model';
import PatchUserProfileDto from '../../../user/dtos/patchUserProfile.dto';
import { UserProfileModel } from '../../../database/models/userProfile.model';

@Injectable()
export class UserProfileDaoService {
  static allGraphs =
    '[pronoun,highestBoulderingGrade,highestTopRopeGrade,highestLeadClimbingGrade,sncsCertification,favouriteGyms]';

  constructor(
    @Inject('UserProfileModel')
    private readonly userProfileModel: ModelClass<UserProfileModel>,
    @Inject('UserProfileFavouriteGymModel')
    private readonly userProfileFavouriteGymModel: ModelClass<UserProfileFavouriteGymModel>,
  ) {}

  findByUserId({
    userId,
    select,
    withGraphFetched,
  }: {
    userId: string;
    select?: string | string[];
    withGraphFetched?: boolean;
  }) {
    let query = this.userProfileModel.query().where({ userId });

    if (select) {
      query = query.select(select);
    }

    if (withGraphFetched) {
      query = query.withGraphFetched(UserProfileDaoService.allGraphs);
    }

    return query.first().then((profile) => {
      if (!profile) {
        throw new HttpException('User does not exist!', 400);
      }
      /**
       * Favouring this method of removing id instead of selecting columns
       * to prevent accidentally forgetting to update the select query when adding
       * new columns in the future.
       */
      const profileWithoutId = { ...profile };
      delete profileWithoutId.id;
      return profileWithoutId;
    });
  }

  updateByUserId(userId: string, userProfile: PatchUserProfileDto) {
    // Preventing patches to Telegram handle at the DAO level
    // This is because Telegram usernames have all been validated in Tele OAuth flow
    const userProfileWithoutTelegramHandle: any = { ...userProfile };
    delete userProfileWithoutTelegramHandle.telegramHandle;

    // Handle favourite gyms update separately
    delete userProfileWithoutTelegramHandle.favouriteGymIds;

    return Model.transaction(async (trx) => {
      // Handle favourite gyms update
      if (userProfile.favouriteGymIds) {
        const userProfileId = (
          await this.userProfileModel.query().findOne({ userId })
        ).id;
        await this.userProfileFavouriteGymModel
          .query(trx)
          .delete()
          .where({ userProfileId });
        await this.userProfileFavouriteGymModel
          .query(trx)
          .insertGraph(
            userProfile.favouriteGymIds.map((gymId) => ({
              userProfileId,
              gymId,
            })),
          )
          .returning('*');
      }

      // Patch rest of user profile
      return this.userProfileModel
        .query(trx)
        .patch(userProfileWithoutTelegramHandle)
        .where({ userId })
        .returning('*')
        .withGraphFetched(UserProfileDaoService.allGraphs)
        .first();
    });
  }
}
