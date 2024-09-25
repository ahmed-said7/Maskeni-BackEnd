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
exports.QuarterSchema = exports.Quarter = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Quarter = class Quarter {
};
exports.Quarter = Quarter;
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Quarter.prototype, "nameAr", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Quarter.prototype, "nameEn", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Quarter.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            type: String,
            enum: ['Polygon'],
            required: true,
        },
        coordinates: [[[Number]]],
    }),
    __metadata("design:type", Object)
], Quarter.prototype, "location", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Country' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Quarter.prototype, "country", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'City' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Quarter.prototype, "city", void 0);
exports.Quarter = Quarter = __decorate([
    (0, mongoose_1.Schema)()
], Quarter);
exports.QuarterSchema = mongoose_1.SchemaFactory.createForClass(Quarter);
//# sourceMappingURL=quarter.schema.js.map