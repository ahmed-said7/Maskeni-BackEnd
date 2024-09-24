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
exports.CityController = void 0;
const common_1 = require("@nestjs/common");
const city_service_1 = require("./city.service");
const city_create_dto_1 = require("./dto/city.create.dto");
const city_query_dto_1 = require("./dto/city.query.dto");
const authentication_guard_1 = require("../common/guards/authentication.guard");
const authorization_guard_1 = require("../common/guards/authorization.guard");
const roles_1 = require("../common/decorator/roles");
const enum_1 = require("../common/enum");
const swagger_1 = require("@nestjs/swagger");
let CityController = class CityController {
    constructor(cityService) {
        this.cityService = cityService;
    }
    async create(createCityDto) {
        return this.cityService.create(createCityDto);
    }
    async findAll() {
        return this.cityService.findAll();
    }
    async find(query) {
        return this.cityService.getAllCities(query);
    }
    async findOne(id) {
        return this.cityService.findOne(id);
    }
    async remove(id) {
        return this.cityService.remove(id);
    }
};
exports.CityController = CityController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.Admin, enum_1.All_Role.SuperAdmin),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new city' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'City created successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [city_create_dto_1.CreateCityDto]),
    __metadata("design:returntype", Promise)
], CityController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('all'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all cities' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of cities.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CityController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get cities with query filters' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of filtered cities.' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [city_query_dto_1.CityQueryDto]),
    __metadata("design:returntype", Promise)
], CityController.prototype, "find", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a city by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'City found.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'City not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CityController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.Admin, enum_1.All_Role.SuperAdmin),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a city by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'City deleted successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'City not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CityController.prototype, "remove", null);
exports.CityController = CityController = __decorate([
    (0, swagger_1.ApiTags)('City'),
    (0, common_1.Controller)('city'),
    __metadata("design:paramtypes", [city_service_1.CityService])
], CityController);
//# sourceMappingURL=city.controller.js.map