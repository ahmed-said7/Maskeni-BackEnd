import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { WebsocketAdapter } from './websocket/gateway.adpter';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const adapter = new WebsocketAdapter(app);
  app.useWebSocketAdapter(adapter);
  app.enableVersioning();
  app.enableCors({
    origin: '*',
    credentials: true,
  });
  app.useStaticAssets('uploads');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.setGlobalPrefix('api/v1');
  const config = new DocumentBuilder()
    .setTitle('Maskeni')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'authorization',
        description: 'Enter JWT Token',
        in: 'header',
      },
      'JWT',
    )
    .addSecurityRequirements('JWT')
    .build();
  if (process.env.NODE_ENV !== 'production') {
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document, {
      swaggerOptions: {},
    });
  }
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
