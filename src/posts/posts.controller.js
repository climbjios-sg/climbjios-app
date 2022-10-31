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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const patchPost_dto_1 = require("./dtos/patchPost.dto");
const createPost_dto_1 = require("./dtos/createPost.dto");
const post_service_1 = require("./post.service");
const searchPost_dto_1 = require("./dtos/searchPost.dto");
const public_decorator_1 = require("../auth/jwtAuth/public.decorator");
let PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    getOwnPosts(req) {
        return this.postService.getOwnPosts(req.user.id);
    }
    createPost(req, body) {
        return this.postService.createPost(req.user.id, body);
    }
    searchPosts(query) {
        return this.postService.searchPosts(query);
    }
    getPost(params) {
        if (!(0, uuid_1.validate)(params.postId)) {
            throw new common_1.HttpException('Invalid post id!', 400);
        }
        return this.postService.getPost(params.postId);
    }
    patchPost(req, params, body) {
        if (!(0, uuid_1.validate)(params.postId)) {
            throw new common_1.HttpException('Invalid post id!', 400);
        }
        return this.postService.patchPost(req.user.id, params.postId, body);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "getOwnPosts", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, createPost_dto_1.default]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "createPost", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [searchPost_dto_1.default]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "searchPosts", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':postId'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "getPost", null);
__decorate([
    (0, common_1.Patch)(':postId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, patchPost_dto_1.default]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "patchPost", null);
PostController = __decorate([
    (0, common_1.Controller)('posts'),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
exports.PostController = PostController;
//# sourceMappingURL=posts.controller.js.map