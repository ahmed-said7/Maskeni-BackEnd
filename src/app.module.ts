import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UploadModule } from './upload/upload.module';
import { APP_FILTER } from '@nestjs/core';
import { CatchAppExceptionsFilter } from './common/filter/global-filter';
import { RefreshModule } from './refresh/refresh.module';
import { UserModule } from './user/user.module';
// import { AdminModule } from './admin/admin.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EventModule } from './event/event.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ReviewModule } from './reviews/review.module';
import { LikesModule } from './likes/likes.module';
import { CommentModule } from './comment/comment.module';
import { TicketModule } from './ticket/ticket.module';
import { GroupModule } from './group/group.module';
import { AddressModule } from './address/address.module';
import { VoluntaryModule } from './voluntary/voluntary.module';
import { ServiceModule } from './service/offered-service.module';
import { PostModule } from './post/post.module';
import { FaxModule } from './fax/fax.module';
import { AdminModule } from './admin/admin.module';
import { CountryModule } from './country/country.module';
import { CityModule } from './city/city.module';
import { QuarterModule } from './quarter/quarter.module';
import { MessageModule } from './message/message.module';
import { ChatModule } from './chat/chat.module';
import { CustomerServiceMessageModule } from './customer-service-message/customer-service-message.module';
import { CustomerServiceChatModule } from './customer-service-chat/customer-service-chat.module';
import { GatewayModule } from './websocket/gateway.module';
import { AnalysisModule } from './analysis/analysis.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { FeedModule } from './feed/feed.module';

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
    ReviewModule,
    EventModule,
    LikesModule,
    CommentModule,
    TicketModule,
    GroupModule,
    EventEmitterModule.forRoot({ global: true }),
    AddressModule,
    VoluntaryModule,
    FeedModule,
    ServiceModule,
    PostModule,
    FaxModule,
    AddressModule,
    CountryModule,
    CityModule,
    QuarterModule,
    MessageModule,
    ChatModule,
    CustomerServiceMessageModule,
    CustomerServiceChatModule,
    GatewayModule,
    AnalysisModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: CatchAppExceptionsFilter },
  ],
})
export class AppModule {}
