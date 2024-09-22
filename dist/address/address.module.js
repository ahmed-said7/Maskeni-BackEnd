"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const address_service_1 = require("./address.service");
const address_controller_1 = require("./address.controller");
const address_schema_1 = require("./address.schema");
const user_schema_1 = require("../user/user.schema");
const admin_schema_1 = require("../admin/admin.schema");
const api_module_1 = require("../common/Api/api.module");
let AddressModule = class AddressModule {
};
exports.AddressModule = AddressModule;
exports.AddressModule = AddressModule = __decorate([
    (0, common_1.Module)({
        imports: [
            api_module_1.ApiModule,
            mongoose_1.MongooseModule.forFeature([
                { name: address_schema_1.Address.name, schema: address_schema_1.AddressSchema },
                { name: 'User', schema: user_schema_1.UserSchema },
                { name: admin_schema_1.Admin.name, schema: admin_schema_1.AdminSchema },
            ]),
        ],
        controllers: [address_controller_1.AddressController],
        providers: [address_service_1.AddressService],
    })
], AddressModule);
//# sourceMappingURL=address.module.js.map