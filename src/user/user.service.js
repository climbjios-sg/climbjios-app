"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const s3Helper_service_1 = require("../utils/s3Helper/s3Helper.service");
const types_1 = require("../utils/types");
const boulderingGrades_dao_service_1 = require("../database/daos/boulderingGrades/boulderingGrades.dao.service");
const gyms_dao_service_1 = require("../database/daos/gyms/gyms.dao.service");
const leadClimbingGrades_dao_service_1 = require("../database/daos/leadClimbingGrades/leadClimbingGrades.dao.service");
const pronouns_dao_service_1 = require("../database/daos/pronouns/pronouns.dao.service");
const sncsCertifications_dao_service_1 = require("../database/daos/sncsCertifications/sncsCertifications.dao.service");
const topRopeGrades_dao_service_1 = require("../database/daos/topRopeGrades/topRopeGrades.dao.service");
const userProfile_dao_service_1 = require("../database/daos/userProfiles/userProfile.dao.service");
let UserService = class UserService {
    constructor(userProfileDaoService, boulderingGradesDaoService, topRopeGradesDaoService, leadClimbingGradesDaoService, sncsCertificationsDaoService, pronounsDaoService, gymsDaoService, s3HelperService) {
        this.userProfileDaoService = userProfileDaoService;
        this.boulderingGradesDaoService = boulderingGradesDaoService;
        this.topRopeGradesDaoService = topRopeGradesDaoService;
        this.leadClimbingGradesDaoService = leadClimbingGradesDaoService;
        this.sncsCertificationsDaoService = sncsCertificationsDaoService;
        this.pronounsDaoService = pronounsDaoService;
        this.gymsDaoService = gymsDaoService;
        this.s3HelperService = s3HelperService;
    }
    getUserProfile(userId) {
        return this.userProfileDaoService.findByUserId({
            userId,
            withGraphFetched: true,
        });
    }
    async patchUserProfile(userId, body) {
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
        await Promise.all(fkeyValues.map(async (fkeyValue, idx) => {
            if (fkeyValue && !(await daoServices[idx].findById(fkeyValue))) {
                throw new common_1.HttpException(`Invalid ${fkeyName[idx]}`, 400);
            }
        }));
        if (body.favouriteGymIds) {
            await Promise.all(body.favouriteGymIds.map(async (gymId) => {
                if (!(await this.gymsDaoService.findByGymId(gymId))) {
                    throw new common_1.HttpException(`Invalid gym id ${gymId}`, 400);
                }
            }));
        }
        return this.userProfileDaoService.updateByUserId(userId, body);
    }
    getUploadImageUrl(userId) {
        return this.s3HelperService.generateUploadUrl(userId, types_1.S3UploadType.PROFILE_PICTURE);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [userProfile_dao_service_1.UserProfileDaoService,
        boulderingGrades_dao_service_1.BoulderingGradesDaoService,
        topRopeGrades_dao_service_1.TopRopeGradesDaoService,
        leadClimbingGrades_dao_service_1.LeadClimbingGradesDaoService,
        sncsCertifications_dao_service_1.SncsCertificationsDaoService,
        pronouns_dao_service_1.PronounsDaoService,
        gyms_dao_service_1.GymsDaoService,
        s3Helper_service_1.S3HelperService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map