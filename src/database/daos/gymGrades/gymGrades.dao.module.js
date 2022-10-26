"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GymGradesDaoModule = void 0;
const common_1 = require("@nestjs/common");
const gymGrades_dao_service_1 = require("./gymGrades.dao.service");
let GymGradesDaoModule = class GymGradesDaoModule {
};
GymGradesDaoModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [gymGrades_dao_service_1.GymGradesDaoService],
        exports: [gymGrades_dao_service_1.GymGradesDaoService],
    })
], GymGradesDaoModule);
exports.GymGradesDaoModule = GymGradesDaoModule;
//# sourceMappingURL=gymGrades.dao.module.js.map