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
var BetasDaoService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BetasDaoService = void 0;
const common_1 = require("@nestjs/common");
let BetasDaoService = BetasDaoService_1 = class BetasDaoService {
    constructor(betaModel) {
        this.betaModel = betaModel;
    }
    create(beta) {
        return this.betaModel.query().insert(beta).returning('*');
    }
    buildGetQuery(args) {
        let query = this.betaModel.query();
        if (args.gymId !== undefined) {
            query = query.where('gymId', args.gymId);
        }
        if (args.colorId !== undefined) {
            query = query.where('colorId', args.colorId);
        }
        if (args.gymGradeId !== undefined) {
            query = query.where('gymGradeId', args.gymGradeId);
        }
        if (args.wallId !== undefined) {
            query = query.where('wallId', args.wallId);
        }
        if (args.creatorId !== undefined) {
            query = query.where('creatorId', args.creatorId);
        }
        return query;
    }
    getAll(args) {
        let query = this.buildGetQuery(args);
        if (args.limit !== undefined) {
            query = query.limit(args.limit);
        }
        return query
            .withGraphFetched(BetasDaoService_1.allGraphs)
            .orderBy('createdAt', 'DESC')
            .page(args.page, args.pageSize);
    }
    deleteById(betaId) {
        return this.betaModel.query().delete().findById(betaId);
    }
    getById(betaId) {
        return this.betaModel.query().findById(betaId);
    }
    async getCount(args) {
        const countArr = await this.buildGetQuery(args).count({ count: '*' });
        return countArr['count'];
    }
};
BetasDaoService.allGraphs = '[gym,color,wall,gymGrade,creatorProfile]';
BetasDaoService = BetasDaoService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('BetaModel')),
    __metadata("design:paramtypes", [Object])
], BetasDaoService);
exports.BetasDaoService = BetasDaoService;
//# sourceMappingURL=betas.dao.service.js.map