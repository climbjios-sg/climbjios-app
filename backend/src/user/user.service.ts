import { HttpException, Injectable } from '@nestjs/common';
import { S3HelperService } from '../utils/s3Helper/s3Helper.service';
import { S3UploadType } from '../utils/types';
import { BoulderingGradesDaoService } from '../database/daos/boulderingGrades/boulderingGrades.dao.service';
import { GymsDaoService } from '../database/daos/gyms/gyms.dao.service';
import { LeadClimbingGradesDaoService } from '../database/daos/leadClimbingGrades/leadClimbingGrades.dao.service';
import { PronounsDaoService } from '../database/daos/pronouns/pronouns.dao.service';
import { SncsCertificationsDaoService } from '../database/daos/sncsCertifications/sncsCertifications.dao.service';
import { TopRopeGradesDaoService } from '../database/daos/topRopeGrades/topRopeGrades.dao.service';
import { UserProfileDaoService } from '../database/daos/userProfiles/userProfile.dao.service';
import PatchUserProfileDto from './dtos/patchUserProfile.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userProfileDaoService: UserProfileDaoService,
    private readonly boulderingGradesDaoService: BoulderingGradesDaoService,
    private readonly topRopeGradesDaoService: TopRopeGradesDaoService,
    private readonly leadClimbingGradesDaoService: LeadClimbingGradesDaoService,
    private readonly sncsCertificationsDaoService: SncsCertificationsDaoService,
    private readonly pronounsDaoService: PronounsDaoService,
    private readonly gymsDaoService: GymsDaoService,
    private readonly s3HelperService: S3HelperService,
  ) {}

  getUserProfile(userId: string) {
    return this.userProfileDaoService.findByUserId({
      userId,
      withGraphFetched: true,
    });
  }

  async patchUserProfile(userId: string, body: PatchUserProfileDto) {
    // Validate all the fkeys before patching to add custom error messages
    const fkeyName = [
      'highest bouldering grade id',
      'highest top rope grade id',
      'highest lead climbing grade id',
      'sncs certification id',
      'pronoun id',
    ];
    const fkeyValues = [
      body.highestBoulderingGradeId,
      body.highestTopRopeGradeId,
      body.highestLeadClimbingGradeId,
      body.sncsCertificationId,
      body.pronounId,
    ];
    const daoServices = [
      this.boulderingGradesDaoService,
      this.topRopeGradesDaoService,
      this.leadClimbingGradesDaoService,
      this.sncsCertificationsDaoService,
      this.pronounsDaoService,
    ];
    await Promise.all(
      fkeyValues.map(async (fkeyValue, idx) => {
        if (fkeyValue && !(await daoServices[idx].findById(fkeyValue))) {
          throw new HttpException(`Invalid ${fkeyName[idx]}`, 400);
        }
      }),
    );

    if (body.favouriteGymIds) {
      await Promise.all(
        body.favouriteGymIds.map(async (gymId) => {
          if (!(await this.gymsDaoService.findByGymId(gymId))) {
            throw new HttpException(`Invalid gym id ${gymId}`, 400);
          }
        }),
      );
    }

    return this.userProfileDaoService.updateByUserId(userId, body);
  }

  getUploadImageUrl(userId: string) {
    return this.s3HelperService.generateUploadUrl(
      userId,
      S3UploadType.PROFILE_PICTURE,
    );
  }
}
