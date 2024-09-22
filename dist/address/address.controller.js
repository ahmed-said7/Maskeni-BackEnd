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
exports.AddressController = void 0;
const common_1 = require('@nestjs/common');
const address_service_1 = require('./address.service');
const query_address_dto_1 = require('./dto/query.address.dto');
const update_address_dto_1 = require('./dto/update.address.dto');
const create_address_dto_1 = require('./dto/create.address.dto');
const enum_1 = require('../common/enum');
const authentication_guard_1 = require('../common/guards/authentication.guard');
const authorization_guard_1 = require('../common/guards/authorization.guard');
const roles_1 = require('../common/decorator/roles');
let AddressController = class AddressController {
  constructor(addressService) {
    this.addressService = addressService;
  }
  create(createAddressDto, req) {
    createAddressDto.user = req.userId;
    return this.addressService.create(createAddressDto);
  }
  findAll(query, req) {
    return this.addressService.findAll(query, req.userId);
  }
  update(id, updateAddressDto) {
    return this.addressService.update(id, updateAddressDto);
  }
  remove(id) {
    return this.addressService.remove(id);
  }
};
exports.AddressController = AddressController;
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
      create_address_dto_1.CreateAddressDto,
      Object,
    ]),
    __metadata('design:returntype', void 0),
  ],
  AddressController.prototype,
  'create',
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
    __param(1, (0, common_1.Req)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [
      query_address_dto_1.AddressQueryDto,
      Object,
    ]),
    __metadata('design:returntype', void 0),
  ],
  AddressController.prototype,
  'findAll',
  null,
);
__decorate(
  [
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(
      authentication_guard_1.AuthenticationGuard,
      authorization_guard_1.AuthorizationGuard,
    ),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [
      String,
      update_address_dto_1.UpdateAddressDto,
    ]),
    __metadata('design:returntype', void 0),
  ],
  AddressController.prototype,
  'update',
  null,
);
__decorate(
  [
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(
      authentication_guard_1.AuthenticationGuard,
      authorization_guard_1.AuthorizationGuard,
    ),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(0, (0, common_1.Param)('id')),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String]),
    __metadata('design:returntype', void 0),
  ],
  AddressController.prototype,
  'remove',
  null,
);
exports.AddressController = AddressController = __decorate(
  [
    (0, common_1.Controller)('address'),
    __metadata('design:paramtypes', [address_service_1.AddressService]),
  ],
  AddressController,
);
//# sourceMappingURL=address.controller.js.map
