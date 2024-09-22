"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const upload_module_1 = require("./upload/upload.module");
const core_1 = require("@nestjs/core");
const global_filter_1 = require("./common/filter/global-filter");
const refresh_module_1 = require("./refresh/refresh.module");
const user_module_1 = require("./user/user.module");
const mongoose_1 = require("@nestjs/mongoose");
const event_module_1 = require("./event/event.module");
const event_emitter_1 = require("@nestjs/event-emitter");
const review_module_1 = require("./reviews/review.module");
const likes_module_1 = require("./likes/likes.module");
const comment_module_1 = require("./comment/comment.module");
const ticket_module_1 = require("./ticket/ticket.module");
const group_module_1 = require("./group/group.module");
const address_module_1 = require("./address/address.module");
const voluntary_module_1 = require("./voluntary/voluntary.module");
const share_module_1 = require("./share/share.module");
const offered_service_module_1 = require("./service/offered-service.module");
const question_module_1 = require("./question/question.module");
const post_module_1 = require("./post/post.module");
const fax_module_1 = require("./fax/fax.module");
const admin_module_1 = require("./admin/admin.module");
const country_module_1 = require("./country/country.module");
const city_module_1 = require("./city/city.module");
const quarter_module_1 = require("./quarter/quarter.module");
const message_module_1 = require("./message/message.module");
const chat_module_1 = require("./chat/chat.module");
const customer_service_message_module_1 = require("./customer-service-message/customer-service-message.module");
const customer_service_chat_module_1 = require("./customer-service-chat/customer-service-chat.module");
const gateway_module_1 = require("./websocket/gateway.module");
const analysis_module_1 = require("./analysis/analysis.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
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
            admin_module_1.AdminModule,
            review_module_1.ReviewModule,
            event_module_1.EventModule,
            likes_module_1.LikesModule,
            comment_module_1.CommentModule,
            ticket_module_1.TicketModule,
            group_module_1.GroupModule,
            event_emitter_1.EventEmitterModule.forRoot({ global: true }),
            address_module_1.AddressModule,
            voluntary_module_1.VoluntaryModule,
            share_module_1.ShareModule,
            offered_service_module_1.ServiceModule,
            question_module_1.QuestionModule,
            post_module_1.PostModule,
            fax_module_1.FaxModule,
            address_module_1.AddressModule,
            country_module_1.CountryModule,
            city_module_1.CityModule,
            quarter_module_1.QuarterModule,
            message_module_1.MessageModule,
            chat_module_1.ChatModule,
            customer_service_message_module_1.CustomerServiceMessageModule,
            customer_service_chat_module_1.CustomerServiceChatModule,
            gateway_module_1.GatewayModule,
            analysis_module_1.AnalysisModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            { provide: core_1.APP_FILTER, useClass: global_filter_1.CatchAppExceptionsFilter },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map