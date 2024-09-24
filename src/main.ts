import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import * as cookieParser from 'cookie-parser';
// import * as bodyParser from 'body-parser';
// import * as helmet from '@fastify/helmet';
import fastifyMultipart from '@fastify/multipart';
import { AppModule } from './app.module';
import fastifyStatic from '@fastify/static';
import { join } from 'path';
import { WebsocketAdapter } from './websocket/gateway.adpter';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const adapter = new WebsocketAdapter(app);
  app.useWebSocketAdapter(adapter);
  app
    .getHttpAdapter()
    .getInstance()
    .register(fastifyStatic, {
      root: join(__dirname, '..', 'uploads'),
      prefix: '/uploads/', // the URL prefix to serve static files
    });
  app.register(fastifyMultipart);
  app.enableVersioning();
  app.enableCors({
    origin: '*',
    credentials: true,
  });
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
  // app.use(cookieParser());
  // app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  // await app.register(helmet);
  const config = new DocumentBuilder()
    .setTitle('Maskeni')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
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
