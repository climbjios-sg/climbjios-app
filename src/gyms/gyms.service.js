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
exports.GymsService = void 0;
const common_1 = require("@nestjs/common");
const gyms_dao_service_1 = require("../database/daos/gyms/gyms.dao.service");
const gymGrades_dao_service_1 = require("../database/daos/gymGrades/gymGrades.dao.service");
let GymsService = class GymsService {
    constructor(gymsDaoService, gymGradesDaoService) {
        this.gymsDaoService = gymsDaoService;
        this.gymGradesDaoService = gymGradesDaoService;
    }
    getAll() {
        return this.gymsDaoService.getAll();
    }
    getGrades(id) {
        try {
            return this.gymGradesDaoService.findByGymId(id);
        }
        catch (err) {
            console.error(`Failed to get gym grades for gym ${id}`, err);
            throw new common_1.HttpException('Failed', 500);
        }
    }
};
GymsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [gyms_dao_service_1.GymsDaoService,
        gymGrades_dao_service_1.GymGradesDaoService])
], GymsService);
exports.GymsService = GymsService;
//# sourceMappingURL=gyms.service.js.map