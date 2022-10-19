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
exports.CronjobService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const posts_dao_service_1 = require("../database/daos/posts/posts.dao.service");
const user_dao_service_1 = require("../database/daos/users/user.dao.service");
const telegramAlerts_service_1 = require("../utils/telegramAlerts/telegramAlerts.service");
let CronjobService = class CronjobService {
    constructor(telegramAlertsService, userDaoService, postsDaoService) {
        this.telegramAlertsService = telegramAlertsService;
        this.userDaoService = userDaoService;
        this.postsDaoService = postsDaoService;
    }
    async telegramAlerts() {
        return this.telegramAlertsService.log({
            num_telegram_users: await this.userDaoService.getTelegramUserCount(),
            num_google_users: await this.userDaoService.getGoogleUserCount(),
            num_posts: await this.postsDaoService.getPostsCount(),
            num_open_posts: await this.postsDaoService.getOpenPostsCount(),
        });
    }
    closeOutdatedPosts() {
        return this.postsDaoService.closePostsWithEndDateBefore(new Date());
    }
};
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_3_HOURS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronjobService.prototype, "telegramAlerts", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_30_MINUTES),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CronjobService.prototype, "closeOutdatedPosts", null);
CronjobService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [telegramAlerts_service_1.TelegramAlertsService,
        user_dao_service_1.UserDaoService,
        posts_dao_service_1.PostsDaoService])
], CronjobService);
exports.CronjobService = CronjobService;
//# sourceMappingURL=cronjob.service.js.map