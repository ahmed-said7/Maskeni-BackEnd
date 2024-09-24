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
exports.QuestionController = void 0;
const common_1 = require("@nestjs/common");
const validate_mongo_pipe_1 = require("../common/pipe/validate.mongo.pipe");
const types_1 = require("../common/types");
const question_service_1 = require("./question.service");
const create_question_dto_1 = require("./dto/create.question.dto");
const query_question_dto_1 = require("./dto/query.question.dto");
const update_question_dto_1 = require("./dto/update.question.dto");
const create_comment_dto_1 = require("../comment/dto/create.comment.dto");
const authentication_guard_1 = require("../common/guards/authentication.guard");
const authorization_guard_1 = require("../common/guards/authorization.guard");
const roles_1 = require("../common/decorator/roles");
const enum_1 = require("../common/enum");
const swagger_1 = require("@nestjs/swagger");
let QuestionController = class QuestionController {
    constructor(questionService) {
        this.questionService = questionService;
    }
    async getMyDeletedQuestion(query, req) {
        const userId = req.userId;
        return this.questionService.getMyDeletedQuestion(query, userId);
    }
    async getMyArchivedQuestion(query, req) {
        const userId = req.userId;
        return this.questionService.getMyArchivedQuestion(query, userId);
    }
    createQuestion(body, req) {
        return this.questionService.createQuestion(body, req.userId);
    }
    getAllQuestion(query) {
        return this.questionService.getAllQuestion(query);
    }
    updateQuestion(questionId, body, req) {
        return this.questionService.updateQuestion(questionId, body, req.userId);
    }
    deleteQuestion(questionId, req) {
        return this.questionService.deleteQuestion(questionId, req.userId);
    }
    createQuestionComment(questionId, body, req) {
        return this.questionService.addComment(body, questionId, req.userId);
    }
    getQuestionComment(questionId, query) {
        return this.questionService.getComments(questionId, query);
    }
    deleteQuestionComment(commentId, req) {
        return this.questionService.removeComment(commentId, req.userId);
    }
    addQuestionLike(questionId, req) {
        return this.questionService.addLike(questionId, req.userId);
    }
    removeQuestionLike(questionId, req) {
        return this.questionService.removeLike(questionId, req.userId);
    }
    getQuestionLikes(questionId, query) {
        return this.questionService.getLikes(questionId, query);
    }
    addSavedQuestion(questionId, req) {
        return this.questionService.addSaved(questionId, req.userId);
    }
    removeSavedQuestion(questionId, req) {
        return this.questionService.deleteSaved(questionId, req.userId);
    }
    getSavedQuestion(questionId, query) {
        return this.questionService.getAllSaved(questionId, query);
    }
    getQuestion(questionId) {
        return this.questionService.getQuestion(questionId);
    }
};
exports.QuestionController = QuestionController;
__decorate([
    (0, common_1.Get)('deleted'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Get deleted questions of the user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of deleted questions.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.FindQuery, Object]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "getMyDeletedQuestion", null);
__decorate([
    (0, common_1.Get)('archived'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Get archived questions of the user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of archived questions.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.FindQuery, Object]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "getMyArchivedQuestion", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new question' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The question has been successfully created.',
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_question_dto_1.CreateQuestionDto, Object]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "createQuestion", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Get all questions' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of all questions.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_question_dto_1.QueryQuestionDto]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "getAllQuestion", null);
__decorate([
    (0, common_1.Patch)(':questionId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Update a question by ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The question has been successfully updated.',
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Question not found' }),
    __param(0, (0, common_1.Param)('questionId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_question_dto_1.UpdateQuestionDto, Object]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "updateQuestion", null);
__decorate([
    (0, common_1.Delete)(':questionId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a question by ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The question has been successfully deleted.',
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Question not found' }),
    __param(0, (0, common_1.Param)('questionId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "deleteQuestion", null);
__decorate([
    (0, common_1.Post)('comment/:questionId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Add a comment to a question' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The comment has been successfully added.',
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    __param(0, (0, common_1.Param)('questionId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_comment_dto_1.CreateCommentDto, Object]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "createQuestionComment", null);
__decorate([
    (0, common_1.Get)('comment/:questionId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Get comments of a question' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of comments for the question.',
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    __param(0, (0, common_1.Param)('questionId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, types_1.FindQuery]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "getQuestionComment", null);
__decorate([
    (0, common_1.Delete)('comment/:commentId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a comment by ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The comment has been successfully deleted.',
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Comment not found' }),
    __param(0, (0, common_1.Param)('commentId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "deleteQuestionComment", null);
__decorate([
    (0, common_1.Post)('likes/:questionId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Like a question' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The question has been successfully liked.',
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    __param(0, (0, common_1.Param)('questionId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "addQuestionLike", null);
__decorate([
    (0, common_1.Delete)('likes/:questionId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Remove like from a question' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The like has been removed from the question.',
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    __param(0, (0, common_1.Param)('questionId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "removeQuestionLike", null);
__decorate([
    (0, common_1.Get)('likes/:questionId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Get likes for a question' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of likes for the question.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    __param(0, (0, common_1.Param)('questionId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, types_1.FindQuery]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "getQuestionLikes", null);
__decorate([
    (0, common_1.Post)('saved/:questionId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Save a question' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The question has been saved.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    __param(0, (0, common_1.Param)('questionId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "addSavedQuestion", null);
__decorate([
    (0, common_1.Delete)('saved/:questionId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Remove a saved question' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The saved question has been removed.',
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    __param(0, (0, common_1.Param)('questionId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "removeSavedQuestion", null);
__decorate([
    (0, common_1.Get)('saved/:questionId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Get saved questions' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of saved questions.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    __param(0, (0, common_1.Param)('questionId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, query_question_dto_1.QueryQuestionDto]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "getSavedQuestion", null);
__decorate([
    (0, common_1.Get)(':questionId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Get a question by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The question details.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Question not found' }),
    __param(0, (0, common_1.Param)('questionId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "getQuestion", null);
exports.QuestionController = QuestionController = __decorate([
    (0, swagger_1.ApiTags)('Questions'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('question'),
    __metadata("design:paramtypes", [question_service_1.QuestionService])
], QuestionController);
//# sourceMappingURL=question.controller.js.map