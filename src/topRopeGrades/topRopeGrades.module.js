"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopRopeGradesModule = void 0;
const common_1 = require("@nestjs/common");
const topRopeGrades_controller_1 = require("./topRopeGrades.controller");
const topRopeGrades_service_1 = require("./topRopeGrades.service");
let TopRopeGradesModule = class TopRopeGradesModule {
};
TopRopeGradesModule = __decorate([
    (0, common_1.Module)({
        controllers: [topRopeGrades_controller_1.TopRopeGradesController],
        providers: [topRopeGrades_service_1.TopRopeGradesService],
    })
], TopRopeGradesModule);
exports.TopRopeGradesModule = TopRopeGradesModule;
//# sourceMappingURL=topRopeGrades.module.js.map