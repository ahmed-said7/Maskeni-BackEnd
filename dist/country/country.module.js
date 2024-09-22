"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const country_schema_1 = require("./country.schema");
const country_controller_1 = require("./country.controller");
const country_service_1 = require("./country.service");
const api_module_1 = require("../common/Api/api.module");
const user_schema_1 = require("../user/user.schema");
const admin_schema_1 = require("../admin/admin.schema");
let CountryModule = class CountryModule {
};
exports.CountryModule = CountryModule;
exports.CountryModule = CountryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            api_module_1.ApiModule,
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: country_schema_1.Country.name,
                    useFactory: () => {
                        const schema = country_schema_1.CountrySchema;
                        schema.index({ location: '2dsphere' });
                        return schema;
                    },
                },
            ]),
            mongoose_1.MongooseModule.forFeature([
                { name: 'User', schema: user_schema_1.UserSchema },
                { name: 'Admin', schema: admin_schema_1.AdminSchema },
            ]),
        ],
        controllers: [country_controller_1.CountryController],
        providers: [country_service_1.CountryService],
        exports: [country_service_1.CountryService],
    })
], CountryModule);
//# sourceMappingURL=country.module.js.map