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
exports.BetasService = void 0;
const betas_dao_service_1 = require("./../database/daos/betas/betas.dao.service");
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const constants_service_1 = require("../utils/constants/constants.service");
let BetasService = class BetasService {
    constructor(constantsService, httpService, betaDaoService) {
        this.constantsService = constantsService;
        this.httpService = httpService;
        this.betaDaoService = betaDaoService;
    }
    async createBeta(creatorId, body) {
        try {
            return await this.betaDaoService.create(Object.assign({ creatorId }, body));
        }
        catch (err) {
            console.error('Create beta failed', err);
            throw new common_1.HttpException('Failed', 500);
        }
    }
    async getVideoUploadUrl() {
        try {
            const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`https://api.cloudflare.com/client/v4/accounts/${this.constantsService.CLOUDFLARE_ACCOUNT_ID}/stream/direct_upload`, {
                maxDurationSeconds: 60,
            }, {
                headers: {
                    Authorization: `Bearer ${this.constantsService.CLOUDFLARE_STREAM_API_TOKEN}`,
                },
            }));
            if (!data.success) {
                console.error('Get video upload URL failed', JSON.stringify(data));
                throw new common_1.HttpException('Failed', 500);
            }
            return {
                cloudflareUploadUrl: data.result.uploadURL,
                cloudflareVideoUid: data.result.uid,
            };
        }
        catch (error) {
            console.error('Get video upload URL failed', JSON.stringify(error));
            throw new common_1.HttpException('Failed', 500);
        }
    }
};
BetasService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [constants_service_1.ConstantsService,
        axios_1.HttpService,
        betas_dao_service_1.BetasDaoService])
], BetasService);
exports.BetasService = BetasService;
//# sourceMappingURL=betas.service.js.map