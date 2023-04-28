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
exports.PassesDaoService = void 0;
const common_1 = require("@nestjs/common");
let PassesDaoService = class PassesDaoService {
    constructor(gymModel, gymGroupModel, passModel) {
        this.gymModel = gymModel;
        this.gymGroupModel = gymGroupModel;
        this.passModel = passModel;
    }
    async findByGymId(id) {
        const { passGroupId: gymPassGroupId, gymGroupId } = await this.gymModel
            .query()
            .findById(id)
            .select(['passGroupId', 'gymGroupId']);
        const { passGroupId: gymGroupPassGroupId } = await this.gymGroupModel
            .query()
            .findById(gymGroupId)
            .select(['passGroupId']);
        return {
            gymOutletPasses: await this.passModel
                .query()
                .where('passGroupId', '=', gymPassGroupId),
            gymGroupPasses: await this.passModel
                .query()
                .where('passGroupId', '=', gymGroupPassGroupId),
        };
    }
};
PassesDaoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('GymModel')),
    __param(1, (0, common_1.Inject)('GymGroupModel')),
    __param(2, (0, common_1.Inject)('PassModel')),
    __metadata("design:paramtypes", [Object, Object, Object])
], PassesDaoService);
exports.PassesDaoService = PassesDaoService;
//# sourceMappingURL=passes.dao.service.js.map