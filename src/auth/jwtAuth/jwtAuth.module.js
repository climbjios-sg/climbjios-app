"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const jwtAuth_service_1 = require("./jwtAuth.service");
const jwtAuth_strategy_1 = require("./jwtAuth.strategy");
let JwtAuthModule = class JwtAuthModule {
};
JwtAuthModule = __decorate([
    (0, common_1.Module)({
        imports: [jwt_1.JwtModule],
        providers: [jwtAuth_strategy_1.JwtAuthStrategy, jwtAuth_service_1.JwtAuthService],
        exports: [jwtAuth_service_1.JwtAuthService],
    })
], JwtAuthModule);
exports.JwtAuthModule = JwtAuthModule;
//# sourceMappingURL=jwtAuth.module.js.map