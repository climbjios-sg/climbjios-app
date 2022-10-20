"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PronounsDaoModule = void 0;
const common_1 = require("@nestjs/common");
const pronouns_dao_service_1 = require("./pronouns.dao.service");
let PronounsDaoModule = class PronounsDaoModule {
};
PronounsDaoModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [pronouns_dao_service_1.PronounsDaoService],
        exports: [pronouns_dao_service_1.PronounsDaoService],
    })
], PronounsDaoModule);
exports.PronounsDaoModule = PronounsDaoModule;
//# sourceMappingURL=pronouns.dao.module.js.map