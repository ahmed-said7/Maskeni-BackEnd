"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaxModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const api_module_1 = require("../common/Api/api.module");
const user_schema_1 = require("../user/user.schema");
const fax_service_1 = require("./fax.service");
const fax_controller_1 = require("./fax.controller");
const fax_schema_1 = require("./fax.schema");
let FaxModule = class FaxModule {
};
exports.FaxModule = FaxModule;
exports.FaxModule = FaxModule = __decorate([
    (0, common_1.Module)({
        imports: [
            api_module_1.ApiModule,
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: fax_schema_1.Fax.name, schema: fax_schema_1.FaxSchema },
            ]),
        ],
        providers: [fax_service_1.FaxService],
        controllers: [fax_controller_1.FaxController],
    })
], FaxModule);
//# sourceMappingURL=fax.module.js.map