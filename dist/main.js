"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const swagger_1 = require("@nestjs/swagger");
const multipart_1 = __importDefault(require("@fastify/multipart"));
const app_module_1 = require("./app.module");
const static_1 = __importDefault(require("@fastify/static"));
const path_1 = require("path");
const gateway_adpter_1 = require("./websocket/gateway.adpter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter());
    const adapter = new gateway_adpter_1.WebsocketAdapter(app);
    app.useWebSocketAdapter(adapter);
    app
        .getHttpAdapter()
        .getInstance()
        .register(static_1.default, {
        root: (0, path_1.join)(__dirname, '..', 'uploads'),
        prefix: '/uploads/',
    });
    app.register(multipart_1.default);
    app.enableVersioning();
    app.enableCors({
        origin: '*',
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.setGlobalPrefix('api/v1');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Maskeni')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
    })
        .build();
    if (process.env.NODE_ENV !== 'production') {
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('swagger', app, document, {
            swaggerOptions: {},
        });
    }
    await app.listen(3000, '0.0.0.0');
}
bootstrap();
//# sourceMappingURL=main.js.map