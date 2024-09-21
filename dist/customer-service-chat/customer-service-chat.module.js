"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../user/user.schema");
const api_module_1 = require("../common/Api/api.module");
const customer_service_chat_schema_1 = require("./customer-service-chat.schema");
const customer_service_chat_controller_1 = require("./customer-service-chat.controller");
const customer_service_chat_service_1 = require("./customer-service-chat.service");
const admin_schema_1 = require("../admin/admin.schema");
let ChatModule = class ChatModule {
};
exports.ChatModule = ChatModule;
exports.ChatModule = ChatModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: customer_service_chat_schema_1.CustomerServiceChat.name,
                    schema: customer_service_chat_schema_1.CustomerServiceChatSchema,
                },
                {
                    name: user_schema_1.User.name,
                    schema: user_schema_1.UserSchema,
                },
                {
                    name: admin_schema_1.Admin.name,
                    schema: admin_schema_1.AdminSchema,
                },
            ]),
            api_module_1.ApiModule,
        ],
        controllers: [customer_service_chat_controller_1.CustomerServiceChatController],
        providers: [customer_service_chat_service_1.CustomerServiceChatService],
    })
], ChatModule);
//# sourceMappingURL=customer-service-chat.module.js.map