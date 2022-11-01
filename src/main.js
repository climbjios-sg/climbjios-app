"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app/app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableVersioning({
        type: common_1.VersioningType.URI,
        defaultVersion: '1',
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        stopAtFirstError: true,
        whitelist: true,
    }));
    if (process.env.NODE_ENV === 'development') {
        app.enableCors();
    }
    else {
        app.enableCors({
            origin: process.env.CORS_ORIGIN,
            optionsSuccessStatus: 200,
        });
    }
    await app.listen(process.env.PORT || 4000);
}
bootstrap();
//# sourceMappingURL=main.js.map