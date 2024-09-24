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
exports.GroupSchema = exports.Group = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const city_schema_1 = require("../city/city.schema");
const enum_1 = require("../common/enum");
const country_schema_1 = require("../country/country.schema");
const quarter_schema_1 = require("../quarter/quarter.schema");
let Group = class Group {
};
exports.Group = Group;
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, minlength: 3, maxlength: 100 }),
    __metadata("design:type", String)
], Group.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", String)
], Group.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: enum_1.Group_Privacy, default: enum_1.Group_Privacy.Public }),
    __metadata("design:type", String)
], Group.prototype, "privacy", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        ref: 'User',
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Group.prototype, "admin", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: city_schema_1.City.name }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Group.prototype, "city", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: country_schema_1.Country.name }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Group.prototype, "country", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: quarter_schema_1.Quarter.name }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Group.prototype, "quarter", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'User' }] }),
    __metadata("design:type", Array)
], Group.prototype, "users", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Group.prototype, "isDeleted", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Group.prototype, "isAccepted", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Group.prototype, "isArchived", void 0);
exports.Group = Group = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Group);
exports.GroupSchema = mongoose_1.SchemaFactory.createForClass(Group);
//# sourceMappingURL=group.schema.js.map