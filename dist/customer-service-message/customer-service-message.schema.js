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
exports.CustomerServiceMessageSchema = exports.CustomerServiceMessage = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const customer_service_chat_schema_1 = require("../customer-service-chat/customer-service-chat.schema");
let CustomerServiceMessage = class CustomerServiceMessage {
};
exports.CustomerServiceMessage = CustomerServiceMessage;
__decorate([
    (0, mongoose_1.Prop)({ type: String, trim: true }),
    __metadata("design:type", String)
], CustomerServiceMessage.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: customer_service_chat_schema_1.CustomerServiceChat.name }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], CustomerServiceMessage.prototype, "chat", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, refPath: 'type' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], CustomerServiceMessage.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], CustomerServiceMessage.prototype, "type", void 0);
exports.CustomerServiceMessage = CustomerServiceMessage = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], CustomerServiceMessage);
exports.CustomerServiceMessageSchema = mongoose_1.SchemaFactory.createForClass(CustomerServiceMessage);
//# sourceMappingURL=customer-service-message.schema.js.map