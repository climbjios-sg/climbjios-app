"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronjobModule = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const constants_module_1 = require("../utils/constants/constants.module");
const posts_dao_module_1 = require("../database/daos/posts/posts.dao.module");
const user_dao_module_1 = require("../database/daos/users/user.dao.module");
const database_module_1 = require("../database/database.module");
const telegramAlerts_module_1 = require("../utils/telegramAlerts/telegramAlerts.module");
const cronjob_service_1 = require("./cronjob.service");
let CronjobModule = class CronjobModule {
};
CronjobModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            constants_module_1.ConstantsModule,
            telegramAlerts_module_1.TelegramAlertsModule,
            database_module_1.DatabaseModule,
            user_dao_module_1.UserDaoModule,
            posts_dao_module_1.PostDaoModule,
        ],
        providers: [cronjob_service_1.CronjobService],
    })
], CronjobModule);
exports.CronjobModule = CronjobModule;
//# sourceMappingURL=cronjob.module.js.map