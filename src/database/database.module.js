"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const wall_model_1 = require("./models/wall.model");
const color_model_1 = require("./models/color.model");
const gymGrade_model_1 = require("./models/gymGrade.model");
const common_1 = require("@nestjs/common");
const knex_1 = require("knex");
const objection_1 = require("objection");
const constants_service_1 = require("../utils/constants/constants.service");
const boulderingGrade_model_1 = require("./models/boulderingGrade.model");
const pronoun_model_1 = require("./models/pronoun.model");
const gym_model_1 = require("./models/gym.model");
const leadClimbingGrade_model_1 = require("./models/leadClimbingGrade.model");
const post_model_1 = require("./models/post.model");
const sncsCertification_model_1 = require("./models/sncsCertification.model");
const topRopeGrade_model_1 = require("./models/topRopeGrade.model");
const user_model_1 = require("./models/user.model");
const userProfile_model_1 = require("./models/userProfile.model");
const userProfileFavouriteGym_model_1 = require("./models/userProfileFavouriteGym.model");
const beta_model_1 = require("./models/beta.model");
const refreshToken_model_1 = require("./models/refreshToken.model");
const models = [
    gym_model_1.GymModel,
    post_model_1.PostModel,
    user_model_1.UserModel,
    boulderingGrade_model_1.BoulderingGradeModel,
    topRopeGrade_model_1.TopRopeGradeModel,
    leadClimbingGrade_model_1.LeadClimbingGradeModel,
    sncsCertification_model_1.SncsCertificationModel,
    pronoun_model_1.PronounModel,
    userProfile_model_1.UserProfileModel,
    userProfileFavouriteGym_model_1.UserProfileFavouriteGymModel,
    gymGrade_model_1.GymGradeModel,
    color_model_1.ColorModel,
    wall_model_1.WallModel,
    beta_model_1.BetaModel,
    refreshToken_model_1.RefreshTokenModel,
];
const modelProviders = models.map((model) => ({
    provide: model.name,
    useValue: model,
}));
const providers = [
    ...modelProviders,
    {
        provide: 'KnexConnection',
        inject: [constants_service_1.ConstantsService],
        useFactory: async (constantsService) => {
            const knex = (0, knex_1.default)(Object.assign({ client: 'pg', connection: {
                    host: constantsService.DATABASE_HOST,
                    port: constantsService.DATABASE_PORT,
                    user: constantsService.DATABASE_USER,
                    password: constantsService.DATABASE_PASSWORD,
                    database: constantsService.DATABASE_NAME,
                } }, (0, objection_1.knexSnakeCaseMappers)()));
            objection_1.Model.knex(knex);
            return knex;
        },
    },
];
let DatabaseModule = class DatabaseModule {
};
DatabaseModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [...providers],
        exports: [...providers],
    })
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;
//# sourceMappingURL=database.module.js.map