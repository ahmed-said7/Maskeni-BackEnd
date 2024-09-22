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
exports.LikesSchema = exports.Likes = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Likes = class Likes {
};
exports.Likes = Likes;
__decorate([
    (0, mongoose_1.Prop)({ ref: 'User', type: mongoose_2.Types.ObjectId }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Likes.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Likes.prototype, "post", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Likes.prototype, "comment", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: 'like' }),
    __metadata("design:type", String)
], Likes.prototype, "type", void 0);
exports.Likes = Likes = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
    })
], Likes);
exports.LikesSchema = mongoose_1.SchemaFactory.createForClass(Likes);
//# sourceMappingURL=likes.schema.js.map