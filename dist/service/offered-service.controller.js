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
exports.OfferedController = void 0;
const common_1 = require("@nestjs/common");
const validate_mongo_pipe_1 = require("../common/pipe/validate.mongo.pipe");
const types_1 = require("../common/types");
const create_comment_dto_1 = require("../comment/dto/create.comment.dto");
const create_service_dto_1 = require("./dto/create.service.dto");
const query_service_dto_1 = require("./dto/query.service.dto");
const update_service_dto_1 = require("./dto/update.service.dto");
const offered_service_service_1 = require("./offered-service.service");
const authentication_guard_1 = require("../common/guards/authentication.guard");
const authorization_guard_1 = require("../common/guards/authorization.guard");
const roles_1 = require("../common/decorator/roles");
const enum_1 = require("../common/enum");
const swagger_1 = require("@nestjs/swagger");
let OfferedController = class OfferedController {
    constructor(offeredService) {
        this.offeredService = offeredService;
    }
    async getMyDeletedServices(query, req) {
        const userId = req.userId;
        return this.offeredService.getMyDeletedServices(query, userId);
    }
    async getMyArchivedServices(query, req) {
        const userId = req.userId;
        return this.offeredService.getMyArchivedServices(query, userId);
    }
    createService(body, req) {
        return this.offeredService.createService(body, req.userId);
    }
    getAllServices(query) {
        return this.offeredService.getAllservices(query);
    }
    updateService(serviceId, body, req) {
        return this.offeredService.updateService(serviceId, body, req.userId);
    }
    deleteService(serviceId, req) {
        return this.offeredService.deleteService(serviceId, req.userId);
    }
    createServiceComment(serviceId, body, req) {
        return this.offeredService.addComment(body, serviceId, req.userId);
    }
    getServiceComments(serviceId, query) {
        return this.offeredService.getComments(serviceId, query);
    }
    deleteserviceComment(commentId, req) {
        return this.offeredService.removeComment(commentId, req.userId);
    }
    addServiceLike(serviceId, req) {
        return this.offeredService.addLike(serviceId, req.userId);
    }
    removeServiceLike(serviceId, req) {
        return this.offeredService.removeLike(serviceId, req.userId);
    }
    getServiceLikes(serviceId, query) {
        return this.offeredService.getLikes(serviceId, query);
    }
    addSavedService(serviceId, req) {
        return this.offeredService.addSaved(serviceId, req.userId);
    }
    removeSavedService(serviceId, req) {
        return this.offeredService.deleteSaved(serviceId, req.userId);
    }
    getSavedServices(serviceId, query) {
        return this.offeredService.getAllSaved(serviceId, query);
    }
    getServiceById(serviceId) {
        return this.offeredService.getService(serviceId);
    }
    requestService(serviceId, req) {
        return this.offeredService.addRequested(serviceId, req.userId);
    }
    removeRequestService(serviceId, req) {
        return this.offeredService.deleteRequested(serviceId, req.userId);
    }
    getRequestedServices(serviceId, query) {
        return this.offeredService.getAllRequested(serviceId, query);
    }
};
exports.OfferedController = OfferedController;
__decorate([
    (0, common_1.Get)('deleted'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve deleted services' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Successfully retrieved deleted services.' }),
    (0, swagger_1.ApiQuery)({ type: types_1.FindQuery, required: false }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.FindQuery, Object]),
    __metadata("design:returntype", Promise)
], OfferedController.prototype, "getMyDeletedServices", null);
__decorate([
    (0, common_1.Get)('archived'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve archived services' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Successfully retrieved archived services.' }),
    (0, swagger_1.ApiQuery)({ type: types_1.FindQuery, required: false }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.FindQuery, Object]),
    __metadata("design:returntype", Promise)
], OfferedController.prototype, "getMyArchivedServices", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new service' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Successfully created a service.' }),
    (0, swagger_1.ApiBody)({ type: create_service_dto_1.CreateOfferedDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_service_dto_1.CreateOfferedDto, Object]),
    __metadata("design:returntype", void 0)
], OfferedController.prototype, "createService", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all services' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Successfully retrieved all services.' }),
    (0, swagger_1.ApiQuery)({ type: query_service_dto_1.QueryOfferedDto, required: false }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_service_dto_1.QueryOfferedDto]),
    __metadata("design:returntype", void 0)
], OfferedController.prototype, "getAllServices", null);
__decorate([
    (0, common_1.Patch)(':serviceId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Update a service by ID' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Successfully updated the service.' }),
    (0, swagger_1.ApiParam)({ name: 'serviceId', required: true }),
    (0, swagger_1.ApiBody)({ type: update_service_dto_1.UpdateOfferedDto }),
    __param(0, (0, common_1.Param)('serviceId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_service_dto_1.UpdateOfferedDto, Object]),
    __metadata("design:returntype", void 0)
], OfferedController.prototype, "updateService", null);
__decorate([
    (0, common_1.Delete)(':serviceId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a service by ID' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Successfully deleted the service.' }),
    (0, swagger_1.ApiParam)({ name: 'serviceId', required: true }),
    __param(0, (0, common_1.Param)('serviceId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], OfferedController.prototype, "deleteService", null);
__decorate([
    (0, common_1.Post)('comment/:serviceId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Add a comment to a service' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Successfully added a comment.' }),
    (0, swagger_1.ApiParam)({ name: 'serviceId', required: true }),
    (0, swagger_1.ApiBody)({ type: create_comment_dto_1.CreateCommentDto }),
    __param(0, (0, common_1.Param)('serviceId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_comment_dto_1.CreateCommentDto, Object]),
    __metadata("design:returntype", void 0)
], OfferedController.prototype, "createServiceComment", null);
__decorate([
    (0, common_1.Get)('comment/:serviceId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve comments for a service' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully retrieved comments for the service.',
    }),
    (0, swagger_1.ApiParam)({ name: 'serviceId', required: true }),
    (0, swagger_1.ApiQuery)({ type: types_1.FindQuery, required: false }),
    __param(0, (0, common_1.Param)('serviceId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, types_1.FindQuery]),
    __metadata("design:returntype", void 0)
], OfferedController.prototype, "getServiceComments", null);
__decorate([
    (0, common_1.Delete)('comment/:commentId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a comment by ID' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Successfully deleted the comment.' }),
    (0, swagger_1.ApiParam)({ name: 'commentId', required: true }),
    __param(0, (0, common_1.Param)('commentId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], OfferedController.prototype, "deleteserviceComment", null);
__decorate([
    (0, common_1.Post)('likes/:serviceId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Add a like to a service' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Successfully added a like to the service.',
    }),
    (0, swagger_1.ApiParam)({ name: 'serviceId', required: true }),
    __param(0, (0, common_1.Param)('serviceId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], OfferedController.prototype, "addServiceLike", null);
__decorate([
    (0, common_1.Delete)('likes/:serviceId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Remove a like from a service' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully removed a like from the service.',
    }),
    (0, swagger_1.ApiParam)({ name: 'serviceId', required: true }),
    __param(0, (0, common_1.Param)('serviceId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], OfferedController.prototype, "removeServiceLike", null);
__decorate([
    (0, common_1.Get)('likes/:serviceId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve likes for a service' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully retrieved likes for the service.',
    }),
    (0, swagger_1.ApiParam)({ name: 'serviceId', required: true }),
    (0, swagger_1.ApiQuery)({ type: types_1.FindQuery, required: false }),
    __param(0, (0, common_1.Param)('serviceId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, types_1.FindQuery]),
    __metadata("design:returntype", void 0)
], OfferedController.prototype, "getServiceLikes", null);
__decorate([
    (0, common_1.Post)('saved/:serviceId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Save a service' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Successfully saved the service.' }),
    (0, swagger_1.ApiParam)({ name: 'serviceId', required: true }),
    __param(0, (0, common_1.Param)('serviceId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], OfferedController.prototype, "addSavedService", null);
__decorate([
    (0, common_1.Delete)('saved/:serviceId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Remove a saved service' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Successfully removed the saved service.' }),
    (0, swagger_1.ApiParam)({ name: 'serviceId', required: true }),
    __param(0, (0, common_1.Param)('serviceId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], OfferedController.prototype, "removeSavedService", null);
__decorate([
    (0, common_1.Get)('saved/:serviceId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve saved services' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Successfully retrieved saved services.' }),
    (0, swagger_1.ApiParam)({ name: 'serviceId', required: true }),
    (0, swagger_1.ApiQuery)({ type: types_1.FindQuery, required: false }),
    __param(0, (0, common_1.Param)('serviceId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, types_1.FindQuery]),
    __metadata("design:returntype", void 0)
], OfferedController.prototype, "getSavedServices", null);
__decorate([
    (0, common_1.Get)(':serviceId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve a service by ID' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Successfully retrieved the service.' }),
    (0, swagger_1.ApiParam)({ name: 'serviceId', required: true }),
    __param(0, (0, common_1.Param)('serviceId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OfferedController.prototype, "getServiceById", null);
__decorate([
    (0, common_1.Post)('request/:serviceId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Request a service' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Successfully requested the service.' }),
    (0, swagger_1.ApiParam)({ name: 'serviceId', required: true }),
    __param(0, (0, common_1.Param)('serviceId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], OfferedController.prototype, "requestService", null);
__decorate([
    (0, common_1.Delete)('request/:serviceId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Remove a service request' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Successfully removed the service request.' }),
    (0, swagger_1.ApiParam)({ name: 'serviceId', required: true }),
    __param(0, (0, common_1.Param)('serviceId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], OfferedController.prototype, "removeRequestService", null);
__decorate([
    (0, common_1.Get)('request/:serviceId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve requested services' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Successfully retrieved requested services.' }),
    (0, swagger_1.ApiParam)({ name: 'serviceId', required: true }),
    (0, swagger_1.ApiQuery)({ type: types_1.FindQuery, required: false }),
    __param(0, (0, common_1.Param)('serviceId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, types_1.FindQuery]),
    __metadata("design:returntype", void 0)
], OfferedController.prototype, "getRequestedServices", null);
exports.OfferedController = OfferedController = __decorate([
    (0, swagger_1.ApiTags)('Service'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('service'),
    __metadata("design:paramtypes", [offered_service_service_1.OfferedService])
], OfferedController);
//# sourceMappingURL=offered-service.controller.js.map