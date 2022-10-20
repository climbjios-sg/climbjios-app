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
exports.BetasDaoService = void 0;
const common_1 = require("@nestjs/common");
let BetasDaoService = class BetasDaoService {
    constructor(betaModel) {
        this.betaModel = betaModel;
    }
    create(beta) {
        return this.betaModel.query().insert(beta).returning('*');
    }
};
BetasDaoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('BetaModel')),
    __metadata("design:paramtypes", [Object])
], BetasDaoService);
exports.BetasDaoService = BetasDaoService;
//# sourceMappingURL=betas.dao.service.js.map