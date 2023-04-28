"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("../auth/auth.module");
const user_dao_module_1 = require("../database/daos/users/user.dao.module");
const database_module_1 = require("../database/database.module");
const user_module_1 = require("../user/user.module");
const posts_module_1 = require("../posts/posts.module");
const posts_dao_module_1 = require("../database/daos/posts/posts.dao.module");
const gyms_module_1 = require("../gyms/gyms.module");
const gyms_dao_module_1 = require("../database/daos/gyms/gyms.dao.module");
const constants_module_1 = require("../utils/constants/constants.module");
const schedule_1 = require("@nestjs/schedule");
const axios_1 = require("@nestjs/axios");
const core_1 = require("@nestjs/core");
const AllExceptions_filter_1 = require("../utils/filters/AllExceptions.filter");
const boulderingGrades_dao_module_1 = require("../database/daos/boulderingGrades/boulderingGrades.dao.module");
const topRopeGrades_dao_module_1 = require("../database/daos/topRopeGrades/topRopeGrades.dao.module");
const leadClimbingGrades_dao_module_1 = require("../database/daos/leadClimbingGrades/leadClimbingGrades.dao.module");
const sncsCertifications_dao_module_1 = require("../database/daos/sncsCertifications/sncsCertifications.dao.module");
const pronouns_dao_module_1 = require("../database/daos/pronouns/pronouns.dao.module");
const userProfile_dao_module_1 = require("../database/daos/userProfiles/userProfile.dao.module");
const boulderingGrades_module_1 = require("../boulderingGrades/boulderingGrades.module");
const leadClimbingGrades_module_1 = require("../leadClimbingGrades/leadClimbingGrades.module");
const topRopeGrades_module_1 = require("../topRopeGrades/topRopeGrades.module");
const pronouns_module_1 = require("../pronouns/pronouns.module");
const sncsCertifications_module_1 = require("../sncsCertifications/sncsCertifications.module");
const betas_module_1 = require("../betas/betas.module");
const colors_module_1 = require("../colors/colors.module");
const betas_dao_module_1 = require("../database/daos/betas/betas.dao.module");
const colors_dao_module_1 = require("../database/daos/colors/colors.dao.module");
const gymGrades_dao_module_1 = require("../database/daos/gymGrades/gymGrades.dao.module");
const gymsSearch_dao_module_1 = require("../database/daos/gymsSearch/gymsSearch.dao.module");
const walls_dao_module_1 = require("../database/daos/walls/walls.dao.module");
const walls_module_1 = require("../walls/walls.module");
const logger_module_1 = require("../utils/logger/logger.module");
const refreshTokens_dao_module_1 = require("../database/daos/refreshTokens/refreshTokens.dao.module");
const passes_dao_module_1 = require("../database/daos/passes/passes.dao.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule,
            schedule_1.ScheduleModule.forRoot(),
            logger_module_1.LoggerModule,
            constants_module_1.ConstantsModule,
            database_module_1.DatabaseModule,
            user_dao_module_1.UserDaoModule,
            posts_dao_module_1.PostDaoModule,
            gyms_dao_module_1.GymsDaoModule,
            boulderingGrades_dao_module_1.BoulderingGradesDaoModule,
            topRopeGrades_dao_module_1.TopRopeGradesDaoModule,
            leadClimbingGrades_dao_module_1.LeadClimbingGradesDaoModule,
            sncsCertifications_dao_module_1.SncsCertificationsDaoModule,
            pronouns_dao_module_1.PronounsDaoModule,
            userProfile_dao_module_1.UserProfileDaoModule,
            gymGrades_dao_module_1.GymGradesDaoModule,
            gymsSearch_dao_module_1.GymsSearchDaoModule,
            passes_dao_module_1.PassesDaoModule,
            colors_dao_module_1.ColorsDaoModule,
            walls_dao_module_1.WallsDaoModule,
            betas_dao_module_1.BetasDaoModule,
            refreshTokens_dao_module_1.RefreshTokensDaoModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            posts_module_1.PostModule,
            gyms_module_1.GymsModule,
            boulderingGrades_module_1.BoulderingGradesModule,
            leadClimbingGrades_module_1.LeadClimbingGradesModule,
            topRopeGrades_module_1.TopRopeGradesModule,
            sncsCertifications_module_1.SncsCertificationsModule,
            pronouns_module_1.PronounsModule,
            colors_module_1.ColorsModule,
            betas_module_1.BetasModule,
            walls_module_1.WallsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_FILTER,
                useClass: AllExceptions_filter_1.AllExceptionsFilter,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map