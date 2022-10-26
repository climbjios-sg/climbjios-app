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
exports.JwtAuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_dao_service_1 = require("../../database/daos/users/user.dao.service");
const constants_service_1 = require("../../utils/constants/constants.service");
let JwtAuthService = class JwtAuthService {
    constructor(jwtService, constantsService, userDaoService) {
        this.jwtService = jwtService;
        this.constantsService = constantsService;
        this.userDaoService = userDaoService;
    }
    generateAccessToken(payload) {
        return this.jwtService.sign(payload, {
            secret: this.constantsService.ACCESS_TOKEN_SECRET,
            expiresIn: this.constantsService.ACCESS_TOKEN_EXPIRY,
        });
    }
    generateRefreshToken(payload) {
        return this.jwtService.sign(payload, {
            secret: this.constantsService.REFRESH_TOKEN_SECRET,
            expiresIn: this.constantsService.REFRESH_TOKEN_EXPIRY,
        });
    }
    verifyRefreshToken(refreshToken) {
        try {
            return this.jwtService.verify(refreshToken, {
                secret: this.constantsService.REFRESH_TOKEN_SECRET,
            });
        }
        catch (e) {
            throw new common_1.HttpException('Invalid refresh token', 401);
        }
    }
    async generateJwts(user) {
        const payload = { id: user.id };
        const accessToken = this.generateAccessToken(payload);
        const refreshToken = this.generateRefreshToken(payload);
        await this.userDaoService.updateById(user.id, { refreshToken });
        return {
            accessToken,
            refreshToken,
        };
    }
    async generateJwtsFromRefreshToken(refreshToken) {
        const user = this.verifyRefreshToken(refreshToken);
        const dbUser = await this.userDaoService.findById(user.id);
        if (dbUser.refreshToken !== refreshToken) {
            throw new common_1.HttpException('Invalid refresh token', 401);
        }
        return this.generateJwts(user);
    }
};
JwtAuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        constants_service_1.ConstantsService,
        user_dao_service_1.UserDaoService])
], JwtAuthService);
exports.JwtAuthService = JwtAuthService;
//# sourceMappingURL=jwtAuth.service.js.map