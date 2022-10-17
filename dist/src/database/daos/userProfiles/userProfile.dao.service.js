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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var UserProfileDaoService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileDaoService = void 0;
const common_1 = require("@nestjs/common");
const objection_1 = require("objection");
let UserProfileDaoService = UserProfileDaoService_1 = class UserProfileDaoService {
    constructor(userProfileModel, userProfileFavouriteGymModel) {
        this.userProfileModel = userProfileModel;
        this.userProfileFavouriteGymModel = userProfileFavouriteGymModel;
    }
    findByUserId({ userId, select, withGraphFetched, }) {
        let query = this.userProfileModel.query().where({ userId });
        if (select) {
            query.select(select);
        }
        if (withGraphFetched) {
            query.withGraphFetched(UserProfileDaoService_1.allGraphs);
        }
        return query.first().then((profile) => {
            const profileWithoutId = Object.assign({}, profile);
            delete profileWithoutId.id;
            return profileWithoutId;
        });
    }
    updateByUserId(userId, userProfile) {
        const userProfileWithoutTelegramHandle = Object.assign({}, userProfile);
        delete userProfileWithoutTelegramHandle.telegramHandle;
        delete userProfileWithoutTelegramHandle.favouriteGymIds;
        return objection_1.Model.transaction(async (trx) => {
            if (userProfile.favouriteGymIds) {
                const userProfileId = (await this.userProfileModel.query().findOne({ userId })).id;
                await this.userProfileFavouriteGymModel
                    .query(trx)
                    .delete()
                    .where({ userProfileId });
                await this.userProfileFavouriteGymModel
                    .query(trx)
                    .insertGraph(userProfile.favouriteGymIds.map((gymId) => ({
                    userProfileId,
                    gymId,
                })))
                    .returning('*');
            }
            return this.userProfileModel
                .query(trx)
                .patch(userProfileWithoutTelegramHandle)
                .where({ userId })
                .returning('*')
                .withGraphFetched(UserProfileDaoService_1.allGraphs)
                .first();
        });
    }
};
UserProfileDaoService.allGraphs = '[pronoun,highestBoulderingGrade,highestTopRopeGrade,highestLeadClimbingGrade,sncsCertification,favouriteGyms]';
UserProfileDaoService = UserProfileDaoService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('UserProfileModel')),
    __param(1, (0, common_1.Inject)('UserProfileFavouriteGymModel')),
    __metadata("design:paramtypes", [Object, Object])
], UserProfileDaoService);
exports.UserProfileDaoService = UserProfileDaoService;
//# sourceMappingURL=userProfile.dao.service.js.map