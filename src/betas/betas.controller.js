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
exports.BetasController = void 0;
const common_1 = require("@nestjs/common");
const betas_service_1 = require("./betas.service");
const createBeta_dto_1 = require("./dtos/createBeta.dto");
const getBetas_dto_1 = require("./dtos/getBetas.dto");
let BetasController = class BetasController {
    constructor(betasService) {
        this.betasService = betasService;
    }
    createBeta(req, body) {
        return this.betasService.createBeta(req.user.id, body);
    }
    getCreatorBetas(query, params) {
        return this.betasService.getCreatorBetas(params.creatorId, query);
    }
    getBetas(query) {
        return this.betasService.getBetas(query);
    }
    deleteBeta(req, params) {
        return this.betasService.deleteBeta(req.user.id, params.betaId);
    }
    getVideoUploadUrl() {
        return this.betasService.getVideoUploadUrl();
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, createBeta_dto_1.default]),
    __metadata("design:returntype", void 0)
], BetasController.prototype, "createBeta", null);
__decorate([
    (0, common_1.Get)('creator/:creatorId'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getBetas_dto_1.default, Object]),
    __metadata("design:returntype", void 0)
], BetasController.prototype, "getCreatorBetas", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getBetas_dto_1.default]),
    __metadata("design:returntype", void 0)
], BetasController.prototype, "getBetas", null);
__decorate([
    (0, common_1.Delete)(':betaId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], BetasController.prototype, "deleteBeta", null);
__decorate([
    (0, common_1.Get)('videoUploadUrl'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BetasController.prototype, "getVideoUploadUrl", null);
BetasController = __decorate([
    (0, common_1.Controller)('betas'),
    __metadata("design:paramtypes", [betas_service_1.BetasService])
], BetasController);
exports.BetasController = BetasController;
//# sourceMappingURL=betas.controller.js.map