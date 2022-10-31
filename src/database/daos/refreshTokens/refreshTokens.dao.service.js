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
exports.RefreshTokensDaoService = void 0;
const common_1 = require("@nestjs/common");
let RefreshTokensDaoService = class RefreshTokensDaoService {
    constructor(refreshTokenModel) {
        this.refreshTokenModel = refreshTokenModel;
    }
    create(userId, refreshToken) {
        return this.refreshTokenModel.query().insert({ userId, refreshToken });
    }
    patchByRefreshToken(oldRefreshToken, newRefreshToken) {
        return this.refreshTokenModel
            .query()
            .patch({ refreshToken: newRefreshToken })
            .where({ refreshToken: oldRefreshToken });
    }
    findByUserId(userId) {
        return this.refreshTokenModel.query().select().where({ userId });
    }
    deleteExpired() {
        return this.refreshTokenModel
            .query()
            .delete()
            .where('updatedAt', '<', (() => {
            let date = new Date();
            date.setDate(new Date().getDate() - 31);
            return date;
        })());
    }
};
RefreshTokensDaoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('RefreshTokenModel')),
    __metadata("design:paramtypes", [Object])
], RefreshTokensDaoService);
exports.RefreshTokensDaoService = RefreshTokensDaoService;
//# sourceMappingURL=refreshTokens.dao.service.js.map