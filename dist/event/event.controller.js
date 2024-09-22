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
let EventController = class EventController {
    constructor(eventService) {
        this.eventService = eventService;
    }
    createEvent(body, req) {
        return this.eventService.createEvent(body, req.userId);
    }
    getAllEvents(query) {
        return this.eventService.getAllEvents(query);
    }
    getFutureEvents(query, req) {
        return this.eventService.getAllFutureEvents(query, req.userId);
    }
    getPreviousEvents(query, req) {
        return this.eventService.getAllPreviousReservedEvents(query, req.userId);
    }
    updateEvent(eventId, body, req) {
        return this.eventService.updateEvent(eventId, body, req.userId);
    }
    deleteEvent(eventId, req) {
        return this.eventService.deleteEvent(eventId, req.userId);
    }
    createEventComment(eventId, body, req) {
        return this.eventService.addComment(body, eventId, req.userId);
    }
    getEventComment(eventId, query) {
        return this.eventService.getComments(eventId, query);
    }
    deleteEventComment(commentId, req) {
        return this.eventService.removeComment(commentId, req.userId);
    }
    addEventLike(eventId, req) {
        return this.eventService.addLike(eventId, req.userId);
    }
    removeEventLike(eventId, req) {
        return this.eventService.removeLike(eventId, req.userId);
    }
    getEventLikes(eventId, query) {
        return this.eventService.getLikes(eventId, query);
    }
    addSavedEvent(eventId, req) {
        return this.eventService.addSaved(eventId, req.userId);
    }
    removeSavedEvent(eventId, req) {
        return this.eventService.deleteSaved(eventId, req.userId);
    }
    getSavedEvents(eventId, query) {
        return this.eventService.getAllSaved(eventId, query);
    }
    getEvent(eventId) {
        return this.eventService.getEvent(eventId);
    }
};
exports.EventController = EventController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_event_dto_1.CreateEventDto, Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "createEvent", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_event_dto_1.QueryEventDto]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "getAllEvents", null);
__decorate([
    (0, common_1.Get)('future'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_event_dto_1.QueryEventDto, Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "getFutureEvents", null);
__decorate([
    (0, common_1.Get)('previous'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_event_dto_1.QueryEventDto, Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "getPreviousEvents", null);
__decorate([
    (0, common_1.Patch)(':eventId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(0, (0, common_1.Param)('eventId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_event_dto_1.UpdateEventDto, Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "updateEvent", null);
__decorate([
    (0, common_1.Delete)(':eventId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(0, (0, common_1.Param)('eventId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "deleteEvent", null);
__decorate([
    (0, common_1.Post)('comment/:eventId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(0, (0, common_1.Param)('eventId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_comment_dto_1.CreateCommentDto, Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "createEventComment", null);
__decorate([
    (0, common_1.Get)('comment/:eventId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    __param(0, (0, common_1.Param)('eventId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, types_1.FindQuery]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "getEventComment", null);
__decorate([
    (0, common_1.Delete)('comment/:commentId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(0, (0, common_1.Param)('commentId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "deleteEventComment", null);
__decorate([
    (0, common_1.Post)('likes/:eventId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(0, (0, common_1.Param)('eventId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "addEventLike", null);
__decorate([
    (0, common_1.Delete)('likes/:eventId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(0, (0, common_1.Param)('eventId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "removeEventLike", null);
__decorate([
    (0, common_1.Get)('likes/:eventId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    __param(0, (0, common_1.Param)('eventId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, types_1.FindQuery]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "getEventLikes", null);
__decorate([
    (0, common_1.Post)('saved/:eventId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    __param(0, (0, common_1.Param)('eventId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "addSavedEvent", null);
__decorate([
    (0, common_1.Delete)('saved/:eventId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(0, (0, common_1.Param)('eventId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "removeSavedEvent", null);
__decorate([
    (0, common_1.Get)('saved/:eventId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    __param(0, (0, common_1.Param)('eventId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, query_event_dto_1.QueryEventDto]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "getSavedEvents", null);
__decorate([
    (0, common_1.Get)(':eventId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    __param(0, (0, common_1.Param)('eventId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "getEvent", null);
exports.EventController = EventController = __decorate([
    (0, common_1.Controller)('event'),
    __metadata("design:paramtypes", [event_service_1.EventService])
], EventController);
//# sourceMappingURL=event.controller.js.map