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
exports.QuarterController = void 0;
const common_1 = require("@nestjs/common");
const quarter_service_1 = require("./quarter.service");
const quarter_create_dto_1 = require("./dto/quarter.create.dto");
const quarter_query_dto_1 = require("./dto/quarter.query.dto");
const authentication_guard_1 = require("../common/guards/authentication.guard");
const authorization_guard_1 = require("../common/guards/authorization.guard");
const roles_1 = require("../common/decorator/roles");
const enum_1 = require("../common/enum");
const swagger_1 = require("@nestjs/swagger");
let QuarterController = class QuarterController {
    constructor(quarterService) {
        this.quarterService = quarterService;
    }
    async create(body) {
        return this.quarterService.create(body);
    }
    async findAll() {
        return this.quarterService.findAll();
    }
    async find(query) {
        return this.quarterService.getAllQuarters(query);
    }
    async findOne(id) {
        return this.quarterService.findOne(id);
    }
    async remove(id) {
        return this.quarterService.remove(id);
    }
    async getLocation(location) {
        const [lat, lng] = location.split(':');
        return this.quarterService.findQuarterContainingPoint([
            parseInt(lng),
            parseInt(lat),
        ]);
    }
};
exports.QuarterController = QuarterController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.Admin, enum_1.All_Role.SuperAdmin),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new quarter' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Quarter created successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [quarter_create_dto_1.CreateQuarterDto]),
    __metadata("design:returntype", Promise)
], QuarterController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('all'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all quarters' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of all quarters.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QuarterController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Find quarters with optional query parameters' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of quarters matching query.' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [quarter_query_dto_1.QuarterQueryDto]),
    __metadata("design:returntype", Promise)
], QuarterController.prototype, "find", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve a specific quarter by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Quarter details.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Quarter not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuarterController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.Admin, enum_1.All_Role.SuperAdmin),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a specific quarter by ID' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Quarter deleted successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Quarter not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuarterController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('point/:location'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({
        summary: 'Find quarters containing a specific geographical point',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Quarter(s) containing the point.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid location format.' }),
    __param(0, (0, common_1.Param)('location')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuarterController.prototype, "getLocation", null);
exports.QuarterController = QuarterController = __decorate([
    (0, swagger_1.ApiTags)('quarters'),
    (0, common_1.Controller)('quarter'),
    __metadata("design:paramtypes", [quarter_service_1.QuarterService])
], QuarterController);
//# sourceMappingURL=quarter.controller.js.map