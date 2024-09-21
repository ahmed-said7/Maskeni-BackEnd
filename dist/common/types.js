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
exports.ValidateLocation = exports.Jop_Type = exports.Gender_Type = exports.Event_Type = exports.FindQuery = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class FindQuery {
}
exports.FindQuery = FindQuery;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The page number for pagination',
        example: '1',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FindQuery.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The sort order for the results',
        example: '-age,price',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FindQuery.prototype, "sort", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Comma-separated list of fields to select',
        example: 'name,icon',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FindQuery.prototype, "select", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The number of items to return per page',
        example: '10',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FindQuery.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Keyword for searching results',
        example: 'example',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FindQuery.prototype, "keyword", void 0);
var Event_Type;
(function (Event_Type) {
    Event_Type["community"] = "\u0645\u062C\u062A\u0645\u0639\u064A";
    Event_Type["cultural"] = "\u062B\u0642\u0627\u0641\u064A";
    Event_Type["art"] = "\u0641\u0646";
    Event_Type["youth"] = "\u0644\u0645\u0629 \u0634\u0628\u0627\u0628";
    Event_Type["food"] = "\u0637\u0639\u0627\u0645";
    Event_Type["education"] = "\u062A\u0639\u0644\u064A\u0645";
})(Event_Type || (exports.Event_Type = Event_Type = {}));
var Gender_Type;
(function (Gender_Type) {
    Gender_Type["male"] = "\u0630\u0643\u0631";
    Gender_Type["female"] = "\u0623\u0646\u062B\u0649";
    Gender_Type["all"] = "\u0627\u0644\u0643\u0644";
})(Gender_Type || (exports.Gender_Type = Gender_Type = {}));
var Jop_Type;
(function (Jop_Type) {
    Jop_Type["deliveryService"] = "\u062E\u062F\u0645\u0629 \u062A\u0648\u0635\u064A\u0644";
    Jop_Type["grocery"] = "\u0627\u0644\u0628\u0642\u0627\u0644\u0647";
    Jop_Type["homeServices"] = "\u062E\u062F\u0645\u0627\u062A \u0645\u0646\u0632\u0644\u064A\u0647";
    Jop_Type["education"] = "\u062A\u0639\u0644\u064A\u0645";
    Jop_Type["pharmacyService"] = "\u062E\u062F\u0645\u0629 \u0635\u064A\u062F\u0644\u064A\u0647";
})(Jop_Type || (exports.Jop_Type = Jop_Type = {}));
class ValidateLocation {
}
exports.ValidateLocation = ValidateLocation;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ValidateLocation.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(2),
    (0, class_validator_1.ArrayMaxSize)(2),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], ValidateLocation.prototype, "coordinates", void 0);
//# sourceMappingURL=types.js.map