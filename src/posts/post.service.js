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
let PostService = class PostService {
    constructor(postsDaoService, gymsDaoService) {
        this.postsDaoService = postsDaoService;
        this.gymsDaoService = gymsDaoService;
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
        return this.postsDaoService.create(Object.assign(Object.assign({ creatorId }, body), { isClosed: false }));
    }
    async getPost(userId, postId) {
        const post = await this.postsDaoService.getById(postId);
        if (post.creatorId !== userId) {
            throw new common_1.HttpException('Forbidden', 403);
        }
        return post;
    }
    async patchPost(userId, postId, body) {
        var _a, _b, _c, _d;
        const post = await this.postsDaoService.getById(postId);
        if (post.creatorId !== userId) {
            throw new common_1.HttpException('Forbidden', 403);
        }
        const postType = (_a = body.type) !== null && _a !== void 0 ? _a : post.type;
        const numPasses = (_b = body.numPasses) !== null && _b !== void 0 ? _b : post.numPasses;
        this.checkPostTypeAndNumPasses(postType, numPasses);
        const startDateTime = new Date((_c = body.startDateTime) !== null && _c !== void 0 ? _c : post.startDateTime);
        const endDateTime = new Date((_d = body.endDateTime) !== null && _d !== void 0 ? _d : post.endDateTime);
        if (startDateTime.toDateString() !== endDateTime.toDateString()) {
            return new common_1.HttpException('startDateTime and endDateTime should fall on the same day!', 400);
        }
        else if (startDateTime > endDateTime) {
            return new common_1.HttpException('startDateTime should be before endDateTime!', 400);
        }
        return this.postsDaoService.patchById(postId, Object.assign({}, body));
    }
    searchPosts(query) {
        return this.postsDaoService.getUpcomingPosts(query);
    }
    checkPostTypeAndNumPasses(type, numPasses) {
        if ([types_1.PostType.BUYER, types_1.PostType.SELLER].includes(type) && numPasses === 0) {
            throw new common_1.HttpException('numPasses should be at least 1!', 400);
        }
        if (types_1.PostType.OTHER === type && numPasses !== 0) {
            throw new common_1.HttpException("'other' type must have numPasses equals 0!", 400);
        }
    }
};
PostService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [posts_dao_service_1.PostsDaoService,
        gyms_dao_service_1.GymsDaoService])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map