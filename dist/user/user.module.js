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
exports.UserModule = void 0;
const common_1 = require('@nestjs/common');
const mongoose_1 = require('@nestjs/mongoose');
const user_service_1 = require('./user.service');
const user_controller_1 = require('./user.controller');
const user_schema_1 = require('./user.schema');
const admin_schema_1 = require('../admin/admin.schema');
const auth_controller_1 = require('./auth.controller');
const api_module_1 = require('../common/Api/api.module');
const profile_controller_1 = require('./profile.controller');
const refresh_module_1 = require('../refresh/refresh.module');
const twilio_module_1 = require('../twilio/twilio.module');
const firebase_module_1 = require('../firebase/firebase.module');
const follow_controller_1 = require('./follow.controller');
let UserModule = class UserModule {};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate(
  [
    (0, common_1.Module)({
      controllers: [
        user_controller_1.UserController,
        auth_controller_1.UserAuthController,
        profile_controller_1.UserProfileController,
        follow_controller_1.UserFollowController,
      ],
      providers: [user_service_1.UserService],
      imports: [
        api_module_1.ApiModule,
        twilio_module_1.TwilioModule,
        refresh_module_1.RefreshModule,
        firebase_module_1.FirebaseModule,
        mongoose_1.MongooseModule.forFeature([
          { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
          {
            name: admin_schema_1.Admin.name,
            schema: admin_schema_1.AdminSchema,
          },
        ]),
      ],
      exports: [user_service_1.UserService],
    }),
  ],
  UserModule,
);
//# sourceMappingURL=user.module.js.map
