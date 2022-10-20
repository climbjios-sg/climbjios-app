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
exports.GymsDaoService = void 0;
const common_1 = require("@nestjs/common");
let GymsDaoService = class GymsDaoService {
    constructor(gymModel) {
        this.gymModel = gymModel;
    }
    getAll() {
        return this.gymModel.query().select(['id', 'name', 'permanentlyClosed']);
    }
    findById(id) {
        return this.gymModel.query().findById(id);
    }
};
GymsDaoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('GymModel')),
    __metadata("design:paramtypes", [Object])
], GymsDaoService);
exports.GymsDaoService = GymsDaoService;
//# sourceMappingURL=gyms.dao.service.js.map