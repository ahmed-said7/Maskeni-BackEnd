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
exports.VoluntarySchema = exports.Voluntary = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const city_schema_1 = require("../city/city.schema");
const types_1 = require("../common/types");
const country_schema_1 = require("../country/country.schema");
const likes_schema_1 = require("../likes/likes.schema");
const quarter_schema_1 = require("../quarter/quarter.schema");
let Voluntary = class Voluntary {
};
exports.Voluntary = Voluntary;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, trim: true }),
    __metadata("design:type", String)
], Voluntary.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: 'voluntary' }),
    __metadata("design:type", String)
], Voluntary.prototype, "postType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Voluntary.prototype, "details", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: types_1.Event_Type, default: types_1.Event_Type.community }),
    __metadata("design:type", String)
], Voluntary.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: types_1.Gender_Type.all }),
    __metadata("design:type", String)
], Voluntary.prototype, "gender", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Voluntary.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Voluntary.prototype, "startedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Voluntary.prototype, "endedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], Voluntary.prototype, "startAge", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], Voluntary.prototype, "endAge", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: city_schema_1.City.name }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Voluntary.prototype, "city", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: country_schema_1.Country.name }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Voluntary.prototype, "country", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: quarter_schema_1.Quarter.name }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Voluntary.prototype, "quarter", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Voluntary.prototype, "isDeleted", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Voluntary.prototype, "isAccepted", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Voluntary.prototype, "isArchived", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        _id: mongoose_2.Types.ObjectId,
        user: { type: mongoose_2.Types.ObjectId, ref: 'User' },
        createdAt: { type: Date, default: new Date() },
    }),
    __metadata("design:type", Array)
], Voluntary.prototype, "saved", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose_2.Types.ObjectId], ref: 'Comment', default: [] }),
    __metadata("design:type", Array)
], Voluntary.prototype, "comments", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose_2.Types.ObjectId], ref: likes_schema_1.Likes.name, default: [] }),
    __metadata("design:type", Array)
], Voluntary.prototype, "likes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], Voluntary.prototype, "likeCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], Voluntary.prototype, "commentCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], Voluntary.prototype, "savedCount", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    __metadata("design:type", Array)
], Voluntary.prototype, "images", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Voluntary.prototype, "user", void 0);
exports.Voluntary = Voluntary = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Voluntary);
exports.VoluntarySchema = mongoose_1.SchemaFactory.createForClass(Voluntary);
//# sourceMappingURL=voluntary.schema.js.map