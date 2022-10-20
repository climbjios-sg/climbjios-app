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
exports.GymsController = void 0;
const common_1 = require("@nestjs/common");
const gyms_service_1 = require("./gyms.service");
let GymsController = class GymsController {
    constructor(gymsService) {
        this.gymsService = gymsService;
    }
    getAll() {
        return this.gymsService.getAll();
    }
    getGrades(id) {
        return this.gymsService.getGrades(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GymsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id/grades'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], GymsController.prototype, "getGrades", null);
GymsController = __decorate([
    (0, common_1.Controller)('gyms'),
    __metadata("design:paramtypes", [gyms_service_1.GymsService])
], GymsController);
exports.GymsController = GymsController;
//# sourceMappingURL=gyms.controller.js.map