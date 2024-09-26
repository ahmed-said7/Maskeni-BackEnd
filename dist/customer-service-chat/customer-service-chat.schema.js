"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerServiceChatSchema = exports.CustomerServiceChat = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const admin_schema_1 = require("../admin/admin.schema");
const customer_service_message_schema_1 = require("../customer-service-message/customer-service-message.schema");
let CustomerServiceChat = class CustomerServiceChat {
};
exports.CustomerServiceChat = CustomerServiceChat;
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], CustomerServiceChat.prototype, "isBusy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: customer_service_message_schema_1.CustomerServiceMessage.name }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], CustomerServiceChat.prototype, "lastMessage", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], CustomerServiceChat.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: admin_schema_1.Admin.name }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], CustomerServiceChat.prototype, "customer_service", void 0);
exports.CustomerServiceChat = CustomerServiceChat = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], CustomerServiceChat);
exports.CustomerServiceChatSchema = mongoose_1.SchemaFactory.createForClass(CustomerServiceChat);
//# sourceMappingURL=customer-service-chat.schema.js.map