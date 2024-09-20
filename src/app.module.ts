import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UploadModule } from './upload/upload.module';
import { APP_FILTER } from '@nestjs/core';
import { CatchAppExceptionsFilter } from './common/filter/global-filter';
import { RefreshModule } from './refresh/refresh.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EventModule } from './event/event.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: function (config: ConfigService) {
        return {
          uri: config.get<string>('Mongo_Uri'),
        };
      },
    }),
    UploadModule,
    RefreshModule,
    UserModule,
    AdminModule,
    EventModule,
    EventEmitterModule.forRoot({ global: true }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: CatchAppExceptionsFilter },
  ],
})
export class AppModule {}
