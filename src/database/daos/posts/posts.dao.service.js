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
var PostsDaoService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsDaoService = void 0;
const common_1 = require("@nestjs/common");
const types_1 = require("../../../utils/types");
const userProfile_dao_service_1 = require("../userProfiles/userProfile.dao.service");
let PostsDaoService = PostsDaoService_1 = class PostsDaoService {
    constructor(postModel) {
        this.postModel = postModel;
    }
    getUserPosts(userId) {
        return this.postModel
            .query()
            .select()
            .where('creatorId', userId)
            .orderBy('endDateTime', 'DESC')
            .withGraphFetched(PostsDaoService_1.allGraphs);
    }
    getById(postId, trx) {
        return this.postModel
            .query(trx)
            .findById(postId)
            .withGraphFetched(PostsDaoService_1.allGraphs);
    }
    create(post) {
        return this.postModel
            .query()
            .insert(post)
            .returning('*')
            .withGraphFetched('gym');
    }
    patchById(id, data) {
        return this.postModel
            .query()
            .patch(data)
            .findById(id)
            .returning('*')
            .withGraphFetched(PostsDaoService_1.allGraphs);
    }
    async getUpcomingPosts(search) {
        const query = this.postModel
            .query()
            .orderByRaw('end_date_time::date ASC')
            .orderBy('startDateTime', 'ASC')
            .orderBy('gymId', 'ASC')
            .withGraphFetched(PostsDaoService_1.allGraphs);
        query.where('status', types_1.PostStatus.OPEN);
        if (search.type) {
            query.where('type', search.type);
        }
        if (search.numPasses) {
            query.where('numPasses', '>=', search.numPasses);
        }
        if (search.gymId) {
            query.where('gymId', search.gymId);
        }
        if (search.price) {
            if (search.type === types_1.PostType.SELLER) {
                query.where('price', '>=', search.price);
            }
            else if (search.type === types_1.PostType.BUYER) {
                query.where('price', '<=', search.price);
            }
        }
        query.where('endDateTime', '>=', new Date());
        if (search.startDateTime) {
            query.where('endDateTime', '>=', new Date(search.startDateTime));
        }
        if (search.endDateTime) {
            query.where('startDateTime', '<=', new Date(search.endDateTime));
        }
        return await query;
    }
    deleteAllUserPosts(userId, trx) {
        return this.postModel.query(trx).delete().where({ userId });
    }
    getOpenPostsCount() {
        return this.postModel
            .query()
            .count()
            .where({ status: types_1.PostStatus.OPEN })
            .first()
            .then((r) => r.count);
    }
    getExpiredPostsCount() {
        return this.postModel
            .query()
            .count()
            .where({ status: types_1.PostStatus.EXPIRED })
            .first()
            .then((r) => r.count);
    }
    getClosedPostsCount() {
        return this.postModel
            .query()
            .count()
            .where({ status: types_1.PostStatus.CLOSED })
            .first()
            .then((r) => r.count);
    }
    getExpiredOpenPosts() {
        return this.postModel
            .query()
            .select()
            .where('endDateTime', '<', new Date())
            .where('status', types_1.PostStatus.OPEN);
    }
};
PostsDaoService.allGraphs = `[creatorProfile.${userProfile_dao_service_1.UserProfileDaoService.allGraphs},gym]`;
PostsDaoService = PostsDaoService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PostModel')),
    __metadata("design:paramtypes", [Object])
], PostsDaoService);
exports.PostsDaoService = PostsDaoService;
//# sourceMappingURL=posts.dao.service.js.map