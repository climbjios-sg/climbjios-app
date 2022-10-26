import PatchUserProfileDto from './dtos/patchUserProfile.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUserProfile(req: any): Promise<{
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
        pronoun?: import("../database/models/pronoun.model").PronounModel;
        highestBoulderingGrade?: import("../database/models/boulderingGrade.model").BoulderingGradeModel;
        highestTopRopeGrade?: import("../database/models/topRopeGrade.model").TopRopeGradeModel;
        highestLeadClimbingGrade?: import("../database/models/leadClimbingGrade.model").LeadClimbingGradeModel;
        sncsCertification?: import("../database/models/sncsCertification.model").SncsCertificationModel;
        favouriteGyms?: import("../database/models/gym.model").GymModel[];
        profilePictureUrl: string;
        $afterFind: (context: any) => void | Promise<any>;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        $modelClass: import("objection").ModelClass<import("../database/models/userProfile.model").UserProfileModel>;
        QueryBuilderType: import("objection").QueryBuilder<import("../database/models/userProfile.model").UserProfileModel, import("../database/models/userProfile.model").UserProfileModel[]>;
    }>;
    patchUserProfile(req: any, body: PatchUserProfileDto): Promise<import("../database/models/userProfile.model").UserProfileModel>;
    uploadImageUrl(req: any): string;
}
