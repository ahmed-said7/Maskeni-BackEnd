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
exports.OfferedController = void 0;
const common_1 = require('@nestjs/common');
const validate_mongo_pipe_1 = require('../common/pipe/validate.mongo.pipe');
const types_1 = require('../common/types');
const create_comment_dto_1 = require('../comment/dto/create.comment.dto');
const create_service_dto_1 = require('./dto/create.service.dto');
const query_service_dto_1 = require('./dto/query.service.dto');
const update_service_dto_1 = require('./dto/update.service.dto');
const offered_service_service_1 = require('./offered-service.service');
const authentication_guard_1 = require('../common/guards/authentication.guard');
const authorization_guard_1 = require('../common/guards/authorization.guard');
const roles_1 = require('../common/decorator/roles');
const enum_1 = require('../common/enum');
let OfferedController = class OfferedController {
  constructor(offeredService) {
    this.offeredService = offeredService;
  }
  createEvent(body, req) {
    return this.offeredService.createService(body, req.userId);
  }
  getAllservices(query) {
    return this.offeredService.getAllservices(query);
  }
  updateservice(serviceId, body, req) {
    return this.offeredService.updateService(serviceId, body, req.userId);
  }
  deleteservice(serviceId, req) {
    return this.offeredService.deleteService(serviceId, req.userId);
  }
  createserviceComment(serviceId, body, req) {
    return this.offeredService.addComment(body, serviceId, req.userId);
  }
  getserviceComment(serviceId, query) {
    return this.offeredService.getComments(serviceId, query);
  }
  deleteserviceComment(commentId, req) {
    return this.offeredService.removeComment(commentId, req.userId);
  }
  addserviceLike(serviceId, req) {
    return this.offeredService.addLike(serviceId, req.userId);
  }
  removeserviceLike(serviceId, req) {
    return this.offeredService.removeLike(serviceId, req.userId);
  }
  getserviceLikes(serviceId, query) {
    return this.offeredService.getLikes(serviceId, query);
  }
  addSavedservice(serviceId, req) {
    return this.offeredService.addSaved(serviceId, req.userId);
  }
  removeSavedservice(serviceId, req) {
    return this.offeredService.deleteSaved(serviceId, req.userId);
  }
  getSavedservices(serviceId, query) {
    return this.offeredService.getAllSaved(serviceId, query);
  }
  getservice(serviceId) {
    return this.offeredService.getService(serviceId);
  }
  requestService(serviceId, req) {
    return this.offeredService.addRequested(serviceId, req.userId);
  }
  removeRequestService(serviceId, req) {
    return this.offeredService.deleteRequested(serviceId, req.userId);
  }
  getSavedRequested(serviceId, query) {
    return this.offeredService.getAllRequested(serviceId, query);
  }
};
exports.OfferedController = OfferedController;
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
      create_service_dto_1.CreateOfferedDto,
      Object,
    ]),
    __metadata('design:returntype', void 0),
  ],
  OfferedController.prototype,
  'createEvent',
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
    __metadata('design:paramtypes', [query_service_dto_1.QueryOfferedDto]),
    __metadata('design:returntype', void 0),
  ],
  OfferedController.prototype,
  'getAllservices',
  null,
);
__decorate(
  [
    (0, common_1.Patch)(':serviceId'),
    (0, common_1.UseGuards)(
      authentication_guard_1.AuthenticationGuard,
      authorization_guard_1.AuthorizationGuard,
    ),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(
      0,
      (0, common_1.Param)(
        'serviceId',
        validate_mongo_pipe_1.ValidateObjectIdPipe,
      ),
    ),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [
      String,
      update_service_dto_1.UpdateOfferedDto,
      Object,
    ]),
    __metadata('design:returntype', void 0),
  ],
  OfferedController.prototype,
  'updateservice',
  null,
);
__decorate(
  [
    (0, common_1.Delete)(':serviceId'),
    (0, common_1.UseGuards)(
      authentication_guard_1.AuthenticationGuard,
      authorization_guard_1.AuthorizationGuard,
    ),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(
      0,
      (0, common_1.Param)(
        'serviceId',
        validate_mongo_pipe_1.ValidateObjectIdPipe,
      ),
    ),
    __param(1, (0, common_1.Req)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String, Object]),
    __metadata('design:returntype', void 0),
  ],
  OfferedController.prototype,
  'deleteservice',
  null,
);
__decorate(
  [
    (0, common_1.Post)('comment/:serviceId'),
    (0, common_1.UseGuards)(
      authentication_guard_1.AuthenticationGuard,
      authorization_guard_1.AuthorizationGuard,
    ),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(
      0,
      (0, common_1.Param)(
        'serviceId',
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
  OfferedController.prototype,
  'createserviceComment',
  null,
);
__decorate(
  [
    (0, common_1.Get)('comment/:serviceId'),
    (0, common_1.UseGuards)(
      authentication_guard_1.AuthenticationGuard,
      authorization_guard_1.AuthorizationGuard,
    ),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(
      0,
      (0, common_1.Param)(
        'serviceId',
        validate_mongo_pipe_1.ValidateObjectIdPipe,
      ),
    ),
    __param(1, (0, common_1.Query)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String, types_1.FindQuery]),
    __metadata('design:returntype', void 0),
  ],
  OfferedController.prototype,
  'getserviceComment',
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
  OfferedController.prototype,
  'deleteserviceComment',
  null,
);
__decorate(
  [
    (0, common_1.Post)('likes/:serviceId'),
    (0, common_1.UseGuards)(
      authentication_guard_1.AuthenticationGuard,
      authorization_guard_1.AuthorizationGuard,
    ),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(
      0,
      (0, common_1.Param)(
        'serviceId',
        validate_mongo_pipe_1.ValidateObjectIdPipe,
      ),
    ),
    __param(1, (0, common_1.Req)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String, Object]),
    __metadata('design:returntype', void 0),
  ],
  OfferedController.prototype,
  'addserviceLike',
  null,
);
__decorate(
  [
    (0, common_1.Delete)('likes/:serviceId'),
    (0, common_1.UseGuards)(
      authentication_guard_1.AuthenticationGuard,
      authorization_guard_1.AuthorizationGuard,
    ),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(
      0,
      (0, common_1.Param)(
        'serviceId',
        validate_mongo_pipe_1.ValidateObjectIdPipe,
      ),
    ),
    __param(1, (0, common_1.Req)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String, Object]),
    __metadata('design:returntype', void 0),
  ],
  OfferedController.prototype,
  'removeserviceLike',
  null,
);
__decorate(
  [
    (0, common_1.Get)('likes/:serviceId'),
    (0, common_1.UseGuards)(
      authentication_guard_1.AuthenticationGuard,
      authorization_guard_1.AuthorizationGuard,
    ),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(
      0,
      (0, common_1.Param)(
        'serviceId',
        validate_mongo_pipe_1.ValidateObjectIdPipe,
      ),
    ),
    __param(1, (0, common_1.Query)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String, types_1.FindQuery]),
    __metadata('design:returntype', void 0),
  ],
  OfferedController.prototype,
  'getserviceLikes',
  null,
);
__decorate(
  [
    (0, common_1.Post)('saved/:serviceId'),
    (0, common_1.UseGuards)(
      authentication_guard_1.AuthenticationGuard,
      authorization_guard_1.AuthorizationGuard,
    ),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(
      0,
      (0, common_1.Param)(
        'serviceId',
        validate_mongo_pipe_1.ValidateObjectIdPipe,
      ),
    ),
    __param(1, (0, common_1.Req)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String, Object]),
    __metadata('design:returntype', void 0),
  ],
  OfferedController.prototype,
  'addSavedservice',
  null,
);
__decorate(
  [
    (0, common_1.Delete)('saved/:serviceId'),
    (0, common_1.UseGuards)(
      authentication_guard_1.AuthenticationGuard,
      authorization_guard_1.AuthorizationGuard,
    ),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(
      0,
      (0, common_1.Param)(
        'serviceId',
        validate_mongo_pipe_1.ValidateObjectIdPipe,
      ),
    ),
    __param(1, (0, common_1.Req)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String, Object]),
    __metadata('design:returntype', void 0),
  ],
  OfferedController.prototype,
  'removeSavedservice',
  null,
);
__decorate(
  [
    (0, common_1.Get)('saved/:serviceId'),
    (0, common_1.UseGuards)(
      authentication_guard_1.AuthenticationGuard,
      authorization_guard_1.AuthorizationGuard,
    ),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(
      0,
      (0, common_1.Param)(
        'serviceId',
        validate_mongo_pipe_1.ValidateObjectIdPipe,
      ),
    ),
    __param(1, (0, common_1.Query)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String, types_1.FindQuery]),
    __metadata('design:returntype', void 0),
  ],
  OfferedController.prototype,
  'getSavedservices',
  null,
);
__decorate(
  [
    (0, common_1.Get)(':serviceId'),
    (0, common_1.UseGuards)(
      authentication_guard_1.AuthenticationGuard,
      authorization_guard_1.AuthorizationGuard,
    ),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(
      0,
      (0, common_1.Param)(
        'serviceId',
        validate_mongo_pipe_1.ValidateObjectIdPipe,
      ),
    ),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String]),
    __metadata('design:returntype', void 0),
  ],
  OfferedController.prototype,
  'getservice',
  null,
);
__decorate(
  [
    (0, common_1.Post)('request/:serviceId'),
    (0, common_1.UseGuards)(
      authentication_guard_1.AuthenticationGuard,
      authorization_guard_1.AuthorizationGuard,
    ),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(
      0,
      (0, common_1.Param)(
        'serviceId',
        validate_mongo_pipe_1.ValidateObjectIdPipe,
      ),
    ),
    __param(1, (0, common_1.Req)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String, Object]),
    __metadata('design:returntype', void 0),
  ],
  OfferedController.prototype,
  'requestService',
  null,
);
__decorate(
  [
    (0, common_1.Delete)('request/:serviceId'),
    (0, common_1.UseGuards)(
      authentication_guard_1.AuthenticationGuard,
      authorization_guard_1.AuthorizationGuard,
    ),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(
      0,
      (0, common_1.Param)(
        'serviceId',
        validate_mongo_pipe_1.ValidateObjectIdPipe,
      ),
    ),
    __param(1, (0, common_1.Req)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String, Object]),
    __metadata('design:returntype', void 0),
  ],
  OfferedController.prototype,
  'removeRequestService',
  null,
);
__decorate(
  [
    (0, common_1.Get)('request/:serviceId'),
    (0, common_1.UseGuards)(
      authentication_guard_1.AuthenticationGuard,
      authorization_guard_1.AuthorizationGuard,
    ),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(
      0,
      (0, common_1.Param)(
        'serviceId',
        validate_mongo_pipe_1.ValidateObjectIdPipe,
      ),
    ),
    __param(1, (0, common_1.Query)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String, types_1.FindQuery]),
    __metadata('design:returntype', void 0),
  ],
  OfferedController.prototype,
  'getSavedRequested',
  null,
);
exports.OfferedController = OfferedController = __decorate(
  [
    (0, common_1.Controller)('service'),
    __metadata('design:paramtypes', [offered_service_service_1.OfferedService]),
  ],
  OfferedController,
);
//# sourceMappingURL=offered-service.controller.js.map
