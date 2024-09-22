'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.VoluntaryController = void 0;
const common_1 = require('@nestjs/common');
const validate_mongo_pipe_1 = require('../common/pipe/validate.mongo.pipe');
const types_1 = require('../common/types');
const voluntary_service_1 = require('./voluntary.service');
const voluntary_create_dto_1 = require('./dto/voluntary.create.dto');
const voluntary_query_dto_1 = require('./dto/voluntary.query.dto');
const voluntary_update_dto_1 = require('./dto/voluntary.update.dto');
const create_comment_dto_1 = require('../comment/dto/create.comment.dto');
const authentication_guard_1 = require('../common/guards/authentication.guard');
const authorization_guard_1 = require('../common/guards/authorization.guard');
const roles_1 = require('../common/decorator/roles');
const enum_1 = require('../common/enum');
let VoluntaryController = class VoluntaryController {
  constructor(voluntaryService) {
    this.voluntaryService = voluntaryService;
  }
  createVoluntary(body, req) {
    return this.voluntaryService.createVoluntary(body, req.userId);
  }
  getAllVoluntarys(query) {
    return this.voluntaryService.getAllVoluntary(query);
  }
  updateVoluntary(voluntaryId, body, req) {
    return this.voluntaryService.updateVoluntary(voluntaryId, body, req.userId);
  }
  deleteVoluntary(voluntaryId, req) {
    return this.voluntaryService.deleteVoluntary(voluntaryId, req.userId);
  }
  createVoluntaryComment(voluntaryId, body, req) {
    return this.voluntaryService.addComment(body, voluntaryId, req.userId);
  }
  getVoluntaryComment(voluntaryId, query) {
    return this.voluntaryService.getComments(voluntaryId, query);
  }
  deleteVoluntaryComment(commentId, req) {
    return this.voluntaryService.removeComment(commentId, req.userId);
  }
  addVoluntaryLike(voluntaryId, req) {
    return this.voluntaryService.addLike(voluntaryId, req.userId);
  }
  removeVoluntaryLike(voluntaryId, req) {
    return this.voluntaryService.removeLike(voluntaryId, req.userId);
  }
  getVoluntaryLikes(voluntaryId, query) {
    return this.voluntaryService.getLikes(voluntaryId, query);
  }
  addSavedVoluntary(voluntaryId, req) {
    return this.voluntaryService.addSaved(voluntaryId, req.userId);
  }
  removeSavedVoluntary(voluntaryId, req) {
    return this.voluntaryService.deleteSaved(voluntaryId, req.userId);
  }
  getSavedVoluntarys(voluntaryId, query) {
    return this.voluntaryService.getAllSaved(voluntaryId, query);
  }
  getVoluntary(voluntaryId) {
    return this.voluntaryService.getVoluntary(voluntaryId);
  }
};
exports.VoluntaryController = VoluntaryController;
__decorate(
  [
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(
      authentication_guard_1.AuthenticationGuard,
      authorization_guard_1.AuthorizationGuard,
    ),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [
      voluntary_create_dto_1.CreateVoluntaryDto,
      Object,
    ]),
    __metadata('design:returntype', void 0),
  ],
  VoluntaryController.prototype,
  'createVoluntary',
  null,
);
__decorate(
  [
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(
      authentication_guard_1.AuthenticationGuard,
      authorization_guard_1.AuthorizationGuard,
    ),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(0, (0, common_1.Query)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [voluntary_query_dto_1.QueryVoluntaryDto]),
    __metadata('design:returntype', void 0),
  ],
  VoluntaryController.prototype,
  'getAllVoluntarys',
  null,
);
__decorate(
  [
    (0, common_1.Patch)(':voluntaryId'),
    (0, common_1.UseGuards)(
      authentication_guard_1.AuthenticationGuard,
      authorization_guard_1.AuthorizationGuard,
    ),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(
      0,
      (0, common_1.Param)(
        'voluntaryId',
        validate_mongo_pipe_1.ValidateObjectIdPipe,
      ),
    ),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [
      String,
      voluntary_update_dto_1.UpdateVoluntaryDto,
      Object,
    ]),
    __metadata('design:returntype', void 0),
  ],
  VoluntaryController.prototype,
  'updateVoluntary',
  null,
);
__decorate(
  [
    (0, common_1.Delete)(':voluntaryId'),
    (0, common_1.UseGuards)(
      authentication_guard_1.AuthenticationGuard,
      authorization_guard_1.AuthorizationGuard,
    ),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(
      0,
      (0, common_1.Param)(
        'voluntaryId',
        validate_mongo_pipe_1.ValidateObjectIdPipe,
      ),
    ),
    __param(1, (0, common_1.Req)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String, Object]),
    __metadata('design:returntype', void 0),
  ],
  VoluntaryController.prototype,
  'deleteVoluntary',
  null,
);
__decorate(
  [
    (0, common_1.Post)('comment/:voluntaryId'),
    (0, common_1.UseGuards)(
      authentication_guard_1.AuthenticationGuard,
      authorization_guard_1.AuthorizationGuard,
    ),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(
      0,
      (0, common_1.Param)(
        'voluntaryId',
        validate_mongo_pipe_1.ValidateObjectIdPipe,
      ),
    ),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [
      String,
      create_comment_dto_1.CreateCommentDto,
      Object,
    ]),
    __metadata('design:returntype', void 0),
  ],
  VoluntaryController.prototype,
  'createVoluntaryComment',
  null,
);
__decorate(
  [
    (0, common_1.Get)('comment/:voluntaryId'),
    (0, common_1.UseGuards)(
      authentication_guard_1.AuthenticationGuard,
      authorization_guard_1.AuthorizationGuard,
    ),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(
      0,
      (0, common_1.Param)(
        'voluntaryId',
        validate_mongo_pipe_1.ValidateObjectIdPipe,
      ),
    ),
    __param(1, (0, common_1.Query)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String, types_1.FindQuery]),
    __metadata('design:returntype', void 0),
  ],
  VoluntaryController.prototype,
  'getVoluntaryComment',
  null,
);
__decorate(
  [
    (0, common_1.Delete)('comment/:commentId'),
    (0, common_1.UseGuards)(
      authentication_guard_1.AuthenticationGuard,
      authorization_guard_1.AuthorizationGuard,
    ),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(
      0,
      (0, common_1.Param)(
        'commentId',
        validate_mongo_pipe_1.ValidateObjectIdPipe,
      ),
    ),
    __param(1, (0, common_1.Req)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String, Object]),
    __metadata('design:returntype', void 0),
  ],
  VoluntaryController.prototype,
  'deleteVoluntaryComment',
  null,
);
__decorate(
  [
    (0, common_1.Post)('likes/:voluntaryId'),
    (0, common_1.UseGuards)(
      authentication_guard_1.AuthenticationGuard,
      authorization_guard_1.AuthorizationGuard,
    ),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(
      0,
      (0, common_1.Param)(
        'voluntaryId',
        validate_mongo_pipe_1.ValidateObjectIdPipe,
      ),
    ),
    __param(1, (0, common_1.Req)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String, Object]),
    __metadata('design:returntype', void 0),
  ],
  VoluntaryController.prototype,
  'addVoluntaryLike',
  null,
);
__decorate(
  [
    (0, common_1.Delete)('likes/:voluntaryId'),
    (0, common_1.UseGuards)(
      authentication_guard_1.AuthenticationGuard,
      authorization_guard_1.AuthorizationGuard,
    ),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(
      0,
      (0, common_1.Param)(
        'voluntaryId',
        validate_mongo_pipe_1.ValidateObjectIdPipe,
      ),
    ),
    __param(1, (0, common_1.Req)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String, Object]),
    __metadata('design:returntype', void 0),
  ],
  VoluntaryController.prototype,
  'removeVoluntaryLike',
  null,
);
__decorate(
  [
    (0, common_1.Get)('likes/:voluntaryId'),
    (0, common_1.UseGuards)(
      authentication_guard_1.AuthenticationGuard,
      authorization_guard_1.AuthorizationGuard,
    ),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(
      0,
      (0, common_1.Param)(
        'voluntaryId',
        validate_mongo_pipe_1.ValidateObjectIdPipe,
      ),
    ),
    __param(1, (0, common_1.Query)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String, types_1.FindQuery]),
    __metadata('design:returntype', void 0),
  ],
  VoluntaryController.prototype,
  'getVoluntaryLikes',
  null,
);
__decorate(
  [
    (0, common_1.Post)('saved/:voluntaryId'),
    (0, common_1.UseGuards)(
      authentication_guard_1.AuthenticationGuard,
      authorization_guard_1.AuthorizationGuard,
    ),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(
      0,
      (0, common_1.Param)(
        'voluntaryId',
        validate_mongo_pipe_1.ValidateObjectIdPipe,
      ),
    ),
    __param(1, (0, common_1.Req)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String, Object]),
    __metadata('design:returntype', void 0),
  ],
  VoluntaryController.prototype,
  'addSavedVoluntary',
  null,
);
__decorate(
  [
    (0, common_1.Delete)('saved/:voluntaryId'),
    (0, common_1.UseGuards)(
      authentication_guard_1.AuthenticationGuard,
      authorization_guard_1.AuthorizationGuard,
    ),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(
      0,
      (0, common_1.Param)(
        'voluntaryId',
        validate_mongo_pipe_1.ValidateObjectIdPipe,
      ),
    ),
    __param(1, (0, common_1.Req)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String, Object]),
    __metadata('design:returntype', void 0),
  ],
  VoluntaryController.prototype,
  'removeSavedVoluntary',
  null,
);
__decorate(
  [
    (0, common_1.Get)('saved/:voluntaryId'),
    (0, common_1.UseGuards)(
      authentication_guard_1.AuthenticationGuard,
      authorization_guard_1.AuthorizationGuard,
    ),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(
      0,
      (0, common_1.Param)(
        'voluntaryId',
        validate_mongo_pipe_1.ValidateObjectIdPipe,
      ),
    ),
    __param(1, (0, common_1.Query)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [
      String,
      voluntary_query_dto_1.QueryVoluntaryDto,
    ]),
    __metadata('design:returntype', void 0),
  ],
  VoluntaryController.prototype,
  'getSavedVoluntarys',
  null,
);
__decorate(
  [
    (0, common_1.Get)(':voluntaryId'),
    (0, common_1.UseGuards)(
      authentication_guard_1.AuthenticationGuard,
      authorization_guard_1.AuthorizationGuard,
    ),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(
      0,
      (0, common_1.Param)(
        'voluntaryId',
        validate_mongo_pipe_1.ValidateObjectIdPipe,
      ),
    ),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String]),
    __metadata('design:returntype', void 0),
  ],
  VoluntaryController.prototype,
  'getVoluntary',
  null,
);
exports.VoluntaryController = VoluntaryController = __decorate(
  [
    (0, common_1.Controller)('voluntary'),
    __metadata('design:paramtypes', [voluntary_service_1.VoluntaryService]),
  ],
  VoluntaryController,
);
//# sourceMappingURL=voluntary.controller.js.map
