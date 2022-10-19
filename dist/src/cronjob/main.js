"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const cronjob_module_1 = require("./cronjob.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(cronjob_module_1.CronjobModule);
    await app.listen(process.env.CRONJOB_PORT || 4001);
}
bootstrap();
//# sourceMappingURL=main.js.map