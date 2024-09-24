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
exports.EventController = void 0;
const common_1 = require("@nestjs/common");
const update_event_dto_1 = require("./dto/update.event.dto");
const event_service_1 = require("./event.service");
const create_event_dto_1 = require("./dto/create.event.dto");
const query_event_dto_1 = require("./dto/query.event.dto");
const validate_mongo_pipe_1 = require("../common/pipe/validate.mongo.pipe");
const types_1 = require("../common/types");
const create_comment_dto_1 = require("../comment/dto/create.comment.dto");
const authentication_guard_1 = require("../common/guards/authentication.guard");
const authorization_guard_1 = require("../common/guards/authorization.guard");
const roles_1 = require("../common/decorator/roles");
const enum_1 = require("../common/enum");
const swagger_1 = require("@nestjs/swagger");
let EventController = class EventController {
    constructor(eventService) {
        this.eventService = eventService;
    }
    async getMyDeletedEvents(query, req) {
        const userId = req.userId;
        return this.eventService.getMyDeletedEvents(query, userId);
    }
    async getMyArchivedEvents(query, req) {
        const userId = req.userId;
        return this.eventService.getMyArchivedEvents(query, userId);
    }
    async createEvent(body, req) {
        return this.eventService.createEvent(body, req.userId);
    }
    async getAllEvents(query) {
        return this.eventService.getAllEvents(query);
    }
    async getFutureEvents(query, req) {
        return this.eventService.getAllFutureEvents(query, req.userId);
    }
    async getPreviousEvents(query, req) {
        return this.eventService.getAllPreviousReservedEvents(query, req.userId);
    }
    async updateEvent(eventId, body, req) {
        return this.eventService.updateEvent(eventId, body, req.userId);
    }
    async deleteEvent(eventId, req) {
        return this.eventService.deleteEvent(eventId, req.userId);
    }
    async createEventComment(eventId, body, req) {
        return this.eventService.addComment(body, eventId, req.userId);
    }
    async getEventComment(eventId, query) {
        return this.eventService.getComments(eventId, query);
    }
    async deleteEventComment(commentId, req) {
        return this.eventService.removeComment(commentId, req.userId);
    }
    async addEventLike(eventId, req) {
        return this.eventService.addLike(eventId, req.userId);
    }
    async removeEventLike(eventId, req) {
        return this.eventService.removeLike(eventId, req.userId);
    }
    async getEventLikes(eventId, query) {
        return this.eventService.getLikes(eventId, query);
    }
    async addSavedEvent(eventId, req) {
        return this.eventService.addSaved(eventId, req.userId);
    }
    async removeSavedEvent(eventId, req) {
        return this.eventService.deleteSaved(eventId, req.userId);
    }
    async getSavedEvents(eventId, query) {
        return this.eventService.getAllSaved(eventId, query);
    }
    async getEvent(eventId) {
        return this.eventService.getEvent(eventId);
    }
};
exports.EventController = EventController;
__decorate([
    (0, common_1.Get)('deleted'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Get deleted events for the authenticated user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of deleted events.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.FindQuery, Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "getMyDeletedEvents", null);
__decorate([
    (0, common_1.Get)('archived'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Get archived events for the authenticated user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of archived events.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.FindQuery, Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "getMyArchivedEvents", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new event' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Event created successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_event_dto_1.CreateEventDto, Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "createEvent", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get all events' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of all events.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_event_dto_1.QueryEventDto]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "getAllEvents", null);
__decorate([
    (0, common_1.Get)('future'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Get future events for the authenticated user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of future events.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_event_dto_1.QueryEventDto, Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "getFutureEvents", null);
__decorate([
    (0, common_1.Get)('previous'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({
        summary: 'Get previous reserved events for the authenticated user',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of previous reserved events.',
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_event_dto_1.QueryEventDto, Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "getPreviousEvents", null);
__decorate([
    (0, common_1.Patch)(':eventId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Update an event by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Event updated successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Event not found.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    __param(0, (0, common_1.Param)('eventId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_event_dto_1.UpdateEventDto, Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "updateEvent", null);
__decorate([
    (0, common_1.Delete)(':eventId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an event by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Event deleted successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Event not found.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    __param(0, (0, common_1.Param)('eventId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "deleteEvent", null);
__decorate([
    (0, common_1.Post)('comment/:eventId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Add a comment to an event' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Comment added successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Event not found.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    __param(0, (0, common_1.Param)('eventId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_comment_dto_1.CreateCommentDto, Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "createEventComment", null);
__decorate([
    (0, common_1.Get)('comment/:eventId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get comments for an event' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of comments for the event.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Event not found.' }),
    __param(0, (0, common_1.Param)('eventId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, types_1.FindQuery]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "getEventComment", null);
__decorate([
    (0, common_1.Delete)('comment/:commentId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a comment by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Comment deleted successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Comment not found.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    __param(0, (0, common_1.Param)('commentId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "deleteEventComment", null);
__decorate([
    (0, common_1.Post)('likes/:eventId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Like an event' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Event liked successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Event not found.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    __param(0, (0, common_1.Param)('eventId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "addEventLike", null);
__decorate([
    (0, common_1.Delete)('likes/:eventId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Remove like from an event' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Like removed successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Event not found.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    __param(0, (0, common_1.Param)('eventId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "removeEventLike", null);
__decorate([
    (0, common_1.Get)('likes/:eventId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get likes for an event' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of likes for the event.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Event not found.' }),
    __param(0, (0, common_1.Param)('eventId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, types_1.FindQuery]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "getEventLikes", null);
__decorate([
    (0, common_1.Post)('saved/:eventId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Save an event' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Event saved successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Event not found.' }),
    __param(0, (0, common_1.Param)('eventId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "addSavedEvent", null);
__decorate([
    (0, common_1.Delete)('saved/:eventId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Remove saved event' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Saved event removed successfully.',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Event not found.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    __param(0, (0, common_1.Param)('eventId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "removeSavedEvent", null);
__decorate([
    (0, common_1.Get)('saved/:eventId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get saved events' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of saved events.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Event not found.' }),
    __param(0, (0, common_1.Param)('eventId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, query_event_dto_1.QueryEventDto]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "getSavedEvents", null);
__decorate([
    (0, common_1.Get)(':eventId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get an event by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Event details.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Event not found.' }),
    __param(0, (0, common_1.Param)('eventId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "getEvent", null);
exports.EventController = EventController = __decorate([
    (0, swagger_1.ApiTags)('Event'),
    (0, common_1.Controller)('event'),
    __metadata("design:paramtypes", [event_service_1.EventService])
], EventController);
//# sourceMappingURL=event.controller.js.map