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
Object.defineProperty(exports, '__esModule', { value: true });
exports.ServiceModule = void 0;
const common_1 = require('@nestjs/common');
const mongoose_1 = require('@nestjs/mongoose');
const reaction_module_1 = require('../reaction/reaction.module');
const api_module_1 = require('../common/Api/api.module');
const user_schema_1 = require('../user/user.schema');
const admin_schema_1 = require('../admin/admin.schema');
const offered_service_service_1 = require('./offered-service.service');
const offered_service_controller_1 = require('./offered-service.controller');
const offered_service_schema_1 = require('./offered-service.schema');
let ServiceModule = class ServiceModule {};
exports.ServiceModule = ServiceModule;
exports.ServiceModule = ServiceModule = __decorate(
  [
    (0, common_1.Module)({
      imports: [
        reaction_module_1.ReactionModule,
        api_module_1.ApiModule,
        mongoose_1.MongooseModule.forFeature([
          {
            name: offered_service_schema_1.Offered.name,
            schema: offered_service_schema_1.OfferedSchema,
          },
          {
            name: user_schema_1.User.name,
            schema: user_schema_1.UserSchema,
          },
          {
            name: admin_schema_1.Admin.name,
            schema: admin_schema_1.AdminSchema,
          },
        ]),
      ],
      providers: [offered_service_service_1.OfferedService],
      controllers: [offered_service_controller_1.OfferedController],
    }),
  ],
  ServiceModule,
);
//# sourceMappingURL=offered-service.module.js.map
