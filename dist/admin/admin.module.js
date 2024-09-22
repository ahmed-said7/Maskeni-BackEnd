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
exports.AdminModule = void 0;
const common_1 = require('@nestjs/common');
const mongoose_1 = require('@nestjs/mongoose');
const api_module_1 = require('../common/Api/api.module');
const admin_service_1 = require('./admin.service');
const admin_schema_1 = require('./admin.schema');
const profile_controller_1 = require('./profile.controller');
const auth_controller_1 = require('./auth.controller');
const refresh_module_1 = require('../refresh/refresh.module');
const user_schema_1 = require('../user/user.schema');
let AdminModule = class AdminModule {};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate(
  [
    (0, common_1.Module)({
      controllers: [
        auth_controller_1.AdminAuthController,
        auth_controller_1.AdminAuthController,
        profile_controller_1.AdminProfileController,
      ],
      providers: [admin_service_1.AdminService],
      imports: [
        api_module_1.ApiModule,
        refresh_module_1.RefreshModule,
        mongoose_1.MongooseModule.forFeature([
          {
            name: admin_schema_1.Admin.name,
            schema: admin_schema_1.AdminSchema,
          },
          { name: 'User', schema: user_schema_1.UserSchema },
        ]),
      ],
      exports: [admin_service_1.AdminService],
    }),
  ],
  AdminModule,
);
//# sourceMappingURL=admin.module.js.map
