'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AppModule = void 0;
const common_1 = require('@nestjs/common');
const app_controller_1 = require('./app.controller');
const app_service_1 = require('./app.service');
const config_1 = require('@nestjs/config');
const upload_module_1 = require('./upload/upload.module');
const core_1 = require('@nestjs/core');
const global_filter_1 = require('./common/filter/global-filter');
const refresh_module_1 = require('./refresh/refresh.module');
const user_module_1 = require('./user/user.module');
const mongoose_1 = require('@nestjs/mongoose');
const event_module_1 = require('./event/event.module');
const event_emitter_1 = require('@nestjs/event-emitter');
const review_module_1 = require('./reviews/review.module');
const likes_module_1 = require('./likes/likes.module');
const comment_module_1 = require('./comment/comment.module');
const ticket_module_1 = require('./ticket/ticket.module');
const group_module_1 = require('./group/group.module');
const address_module_1 = require('./address/address.module');
let AppModule = class AppModule {};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate(
  [
    (0, common_1.Module)({
      imports: [
        config_1.ConfigModule.forRoot({ isGlobal: true }),
        mongoose_1.MongooseModule.forRootAsync({
          inject: [config_1.ConfigService],
          useFactory: function (config) {
            return {
              uri: config.get('Mongo_Uri'),
            };
          },
        }),
        upload_module_1.UploadModule,
        refresh_module_1.RefreshModule,
        user_module_1.UserModule,
        review_module_1.ReviewModule,
        event_module_1.EventModule,
        likes_module_1.LikesModule,
        comment_module_1.CommentModule,
        ticket_module_1.TicketModule,
        group_module_1.GroupModule,
        event_emitter_1.EventEmitterModule.forRoot({ global: true }),
        address_module_1.AddressModule,
      ],
      controllers: [app_controller_1.AppController],
      providers: [
        app_service_1.AppService,
        {
          provide: core_1.APP_FILTER,
          useClass: global_filter_1.CatchAppExceptionsFilter,
        },
      ],
    }),
  ],
  AppModule,
);
//# sourceMappingURL=app.module.js.map
