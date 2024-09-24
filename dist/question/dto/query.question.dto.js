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
exports.QueryQuestionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const types_1 = require("../../common/types");
class QueryQuestionDto extends types_1.FindQuery {
}
exports.QueryQuestionDto = QueryQuestionDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The optional ID of the user who created the questions.',
        type: String,
    }),
    __metadata("design:type", String)
], QueryQuestionDto.prototype, "user", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The optional ID of the country to filter questions by.',
        type: String,
    }),
    __metadata("design:type", String)
], QueryQuestionDto.prototype, "country", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The optional ID of the city to filter questions by.',
        type: String,
    }),
    __metadata("design:type", String)
], QueryQuestionDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The optional ID of the quarter to filter questions by.',
        type: String,
    }),
    __metadata("design:type", String)
], QueryQuestionDto.prototype, "quarter", void 0);
//# sourceMappingURL=query.question.dto.js.map