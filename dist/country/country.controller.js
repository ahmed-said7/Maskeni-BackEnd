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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryController = void 0;
const common_1 = require("@nestjs/common");
const types_1 = require("../common/types");
const country_service_1 = require("./country.service");
const create_country_dto_1 = require("./dto/create.country.dto");
const authentication_guard_1 = require("../common/guards/authentication.guard");
const authorization_guard_1 = require("../common/guards/authorization.guard");
const roles_1 = require("../common/decorator/roles");
const enum_1 = require("../common/enum");
const swagger_1 = require("@nestjs/swagger");
let CountryController = class CountryController {
    constructor(countryService) {
        this.countryService = countryService;
    }
    async create(body) {
        return this.countryService.create(body);
    }
    async findAll() {
        return this.countryService.findAll();
    }
    async find(query) {
        return this.countryService.getAllCountries(query);
    }
    async findOne(id) {
        return this.countryService.findOne(id);
    }
    async remove(id) {
        return this.countryService.remove(id);
    }
};
exports.CountryController = CountryController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.Admin, enum_1.All_Role.SuperAdmin),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new country' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Country created successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_country_dto_1.CreateCountryDto]),
    __metadata("design:returntype", Promise)
], CountryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('all'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all countries' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of all countries.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CountryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get countries with pagination and filters' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of countries with pagination.',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.FindQuery]),
    __metadata("design:returntype", Promise)
], CountryController.prototype, "find", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a country by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Country found.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Country not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CountryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.Admin, enum_1.All_Role.SuperAdmin),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a country by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Country deleted successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Country not found.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CountryController.prototype, "remove", null);
exports.CountryController = CountryController = __decorate([
    (0, swagger_1.ApiTags)('Country'),
    (0, common_1.Controller)('country'),
    __metadata("design:paramtypes", [country_service_1.CountryService])
], CountryController);
//# sourceMappingURL=country.controller.js.map