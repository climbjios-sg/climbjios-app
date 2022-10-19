"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const googleOauth_module_1 = require("./googleOauth/googleOauth.module");
const jwtAuth_guard_1 = require("./jwtAuth/jwtAuth.guard");
const jwtAuth_module_1 = require("./jwtAuth/jwtAuth.module");
const telegramOauth_module_1 = require("./telegramOauth/telegramOauth.module");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [jwtAuth_module_1.JwtAuthModule, googleOauth_module_1.GoogleOauthModule, telegramOauth_module_1.TelegramOauthModule],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            {
                provide: core_1.APP_GUARD,
                useClass: jwtAuth_guard_1.JwtAuthGuard,
            },
        ],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map