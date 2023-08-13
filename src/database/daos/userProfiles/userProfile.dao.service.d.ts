import { ModelClass } from 'objection';
import { UserProfileFavouriteGymModel } from '../../../database/models/userProfileFavouriteGym.model';
import PatchUserProfileDto from '../../../user/dtos/patchUserProfile.dto';
import { UserProfileModel } from '../../../database/models/userProfile.model';
export declare class UserProfileDaoService {
    private readonly userProfileModel;
    private readonly userProfileFavouriteGymModel;
    static allGraphs: string;
    constructor(userProfileModel: ModelClass<UserProfileModel>, userProfileFavouriteGymModel: ModelClass<UserProfileFavouriteGymModel>);
    findByUserId({ userId, select, withGraphFetched, }: {
        userId: string;
        select?: string | string[];
        withGraphFetched?: boolean;
    }): Promise<{
        userId: string;
        name?: string;
        telegramHandle?: string;
        height?: number;
        reach?: number;
        bio?: string;
        hasProfilePicture: boolean;
        pronounId?: number;
        highestBoulderingGradeId?: number;
        highestTopRopeGradeId?: number;
        highestLeadClimbingGradeId?: number;
        sncsCertificationId?: number;
        pronoun?: import("../../models/pronoun.model").PronounModel;
        highestBoulderingGrade?: import("../../models/boulderingGrade.model").BoulderingGradeModel;
        highestTopRopeGrade?: import("../../models/topRopeGrade.model").TopRopeGradeModel;
        highestLeadClimbingGrade?: import("../../models/leadClimbingGrade.model").LeadClimbingGradeModel;
        sncsCertification?: import("../../models/sncsCertification.model").SncsCertificationModel;
        favouriteGyms?: import("../../models/gym.model").GymModel[];
        profilePictureUrl: string;
        $afterFind: (context: import("objection").QueryContext) => void | Promise<any>;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        $modelClass: ModelClass<UserProfileModel>;
        QueryBuilderType: import("objection").QueryBuilder<UserProfileModel, UserProfileModel[]>;
    }>;
    updateByUserId(userId: string, userProfile: PatchUserProfileDto): Promise<UserProfileModel>;
    updateTelegramHandleIfChanged({ userId, newTelegramHandle, }: {
        userId: string;
        newTelegramHandle: string;
    }): Promise<boolean>;
}
