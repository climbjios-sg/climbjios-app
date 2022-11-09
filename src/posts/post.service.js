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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const gyms_dao_service_1 = require("../database/daos/gyms/gyms.dao.service");
const posts_dao_service_1 = require("../database/daos/posts/posts.dao.service");
const types_1 = require("../utils/types");
const telegram_service_1 = require("../utils/telegram/telegram.service");
const constants_service_1 = require("../utils/constants/constants.service");
const logger_service_1 = require("../utils/logger/logger.service");
const date_fns_1 = require("date-fns");
let PostService = class PostService {
    constructor(postsDaoService, gymsDaoService, telegramService, constantsService, loggerService) {
        this.postsDaoService = postsDaoService;
        this.gymsDaoService = gymsDaoService;
        this.telegramService = telegramService;
        this.constantsService = constantsService;
        this.loggerService = loggerService;
    }
    getOwnPosts(userId) {
        return this.postsDaoService.getUserPosts(userId);
    }
    async createPost(creatorId, body) {
        this.checkPostTypeAndNumPasses(body.type, body.numPasses);
        const gym = await this.gymsDaoService.findById(body.gymId);
        if (!gym) {
            throw new common_1.HttpException('Invalid gym id!', 400);
        }
        if (!body.startDateTime || !body.endDateTime) {
            body.startDateTime = new Date();
            body.endDateTime = (0, date_fns_1.addMonths)(body.startDateTime, 2);
        }
        return this.postsDaoService
            .create(Object.assign(Object.assign({ creatorId }, body), { status: types_1.PostStatus.OPEN }))
            .then((created) => {
            this.notifyMainGroupOnSuccessfulPost(created);
            return created;
        });
    }
    async getPost(postId) {
        const post = await this.postsDaoService.getById(postId);
        if (!post) {
            throw new common_1.HttpException('No such jio', 404);
        }
        return post;
    }
    async patchPost(userId, postId, body) {
        var _a, _b, _c, _d, _e;
        const post = await this.postsDaoService.getById(postId);
        if ((post === null || post === void 0 ? void 0 : post.creatorId) !== userId) {
            throw new common_1.HttpException('Forbidden', 403);
        }
        if ([types_1.PostStatus.CLOSED, types_1.PostStatus.EXPIRED].includes(post.status)) {
            throw new common_1.HttpException('Cannot patch closed or expired posts!', 400);
        }
        const postType = (_a = body.type) !== null && _a !== void 0 ? _a : post.type;
        const numPasses = (_b = body.numPasses) !== null && _b !== void 0 ? _b : post.numPasses;
        this.checkPostTypeAndNumPasses(postType, numPasses);
        const startDateTime = new Date((_c = body.startDateTime) !== null && _c !== void 0 ? _c : post.startDateTime);
        const endDateTime = new Date((_d = body.endDateTime) !== null && _d !== void 0 ? _d : post.endDateTime);
        if (startDateTime > endDateTime) {
            return new common_1.HttpException('startDateTime should be before endDateTime!', 400);
        }
        const isClosed = (_e = body.isClosed) !== null && _e !== void 0 ? _e : post.isClosed;
        const data = Object.assign(Object.assign({}, body), { status: isClosed ? types_1.PostStatus.CLOSED : types_1.PostStatus.OPEN });
        delete data.isClosed;
        return this.postsDaoService
            .patchById(postId, Object.assign({}, data))
            .then((obj) => {
            this.editTelegramMessage(obj);
            return obj;
        });
    }
    searchPosts(query) {
        return this.postsDaoService.getUpcomingPosts(query);
    }
    updateExpiredOpenPosts() {
        return this.postsDaoService
            .getExpiredOpenPosts()
            .then((expiredPosts) => Promise.all(expiredPosts.map((p) => this.postsDaoService
            .patchById(p.id, { status: types_1.PostStatus.EXPIRED })
            .then((updated) => this.editTelegramMessage(updated)))));
    }
    checkPostTypeAndNumPasses(type, numPasses) {
        if ([types_1.PostType.BUYER, types_1.PostType.SELLER].includes(type) && numPasses === 0) {
            throw new common_1.HttpException('numPasses should be at least 1!', 400);
        }
        if (types_1.PostType.OTHER === type && numPasses !== 0) {
            throw new common_1.HttpException("'other' type must have numPasses equals 0!", 400);
        }
    }
    notifyMainGroupOnSuccessfulPost(createdObj) {
        return this.telegramService
            .sendViaOAuthBot(this.formatAlertMessage(createdObj), this.constantsService.TELEGRAM_MAIN_CHAT_GROUP_ID, this.formatAlertMessageInlineButton(createdObj.id))
            .then((res) => {
            var _a, _b;
            return this.postsDaoService.patchById(createdObj.id, {
                telegramAlertMessageId: (_b = (_a = res.data) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b.message_id,
            });
        })
            .catch((e) => {
            this.loggerService.log(e);
        });
    }
    editTelegramMessage(obj) {
        return this.telegramService
            .editViaOAuthBot(obj.telegramAlertMessageId, this.constantsService.TELEGRAM_MAIN_CHAT_GROUP_ID, this.formatAlertMessage(obj), obj.status === types_1.PostStatus.OPEN
            ? this.formatAlertMessageInlineButton(obj.id)
            : undefined)
            .catch((e) => {
            this.loggerService.log(e);
        });
    }
    formatDate(date) {
        return (0, date_fns_1.format)(date, 'E, d MMM yyyy');
    }
    formatTime(dateTime) {
        return (0, date_fns_1.format)(dateTime, 'h:mmaaa');
    }
    isJioAutofilledDateTime({ startDateTime, endDateTime, }) {
        return (0, date_fns_1.differenceInDays)(endDateTime, startDateTime) > 0;
    }
    formatAlertMessage(obj) {
        let header;
        switch (obj.type) {
            case types_1.PostType.BUYER:
                header = `Buying ${obj.numPasses} 🎟`;
                break;
            case types_1.PostType.SELLER:
                header = `Selling ${obj.numPasses} 🎟`;
                break;
            case types_1.PostType.OTHER:
                header = 'Looking to climb together\n(No need 🎟️)';
                break;
            default:
                break;
        }
        header = `<b>${header}</b>\n\n`;
        const gym = `📍 ${obj.gym.name}\n`;
        let dateTime = '';
        if (this.isJioAutofilledDateTime({
            startDateTime: obj.startDateTime,
            endDateTime: obj.endDateTime,
        })) {
            dateTime = `🗓 Anytime until ${this.formatDate(obj.endDateTime)}\n`;
        }
        else {
            dateTime = `🗓 ${this.formatDate(obj.startDateTime)}, ${this.formatTime(obj.startDateTime)}-${this.formatTime(obj.endDateTime)}\n`;
        }
        const price = obj.type !== types_1.PostType.OTHER ? `💵 $${obj.price}/pass\n` : '';
        const openToClimbTogether = obj.openToClimbTogether
            ? `👋 Open to climb together\n`
            : '';
        const optionalNote = obj.optionalNote ? `💬 ${obj.optionalNote}\n` : '';
        let message = header + gym + dateTime + price + openToClimbTogether + optionalNote;
        if (obj.status === types_1.PostStatus.CLOSED) {
            message = `❌ <b>CLOSED</b>\n\n<s>${message}</s>`;
        }
        else if (obj.status === types_1.PostStatus.EXPIRED) {
            message = `❌ <b>EXPIRED</b>\n\n<s>${message}</s>`;
        }
        return message;
    }
    formatAlertMessageInlineButton(postId) {
        const redirectLink = `${this.constantsService.CORS_ORIGIN}/jios/${postId}`;
        return {
            inline_keyboard: [
                [
                    {
                        text: 'Message Climber 👈',
                        url: redirectLink,
                    },
                ],
            ],
        };
    }
};
PostService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [posts_dao_service_1.PostsDaoService,
        gyms_dao_service_1.GymsDaoService,
        telegram_service_1.TelegramService,
        constants_service_1.ConstantsService,
        logger_service_1.LoggerService])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map