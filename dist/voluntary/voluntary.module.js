"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoluntaryModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const api_module_1 = require("../common/Api/api.module");
const user_schema_1 = require("../user/user.schema");
const reaction_module_1 = require("../reaction/reaction.module");
const voluntary_service_1 = require("./voluntary.service");
const voluntary_controller_1 = require("./voluntary.controller");
const voluntary_schema_1 = require("./voluntary.schema");
const admin_schema_1 = require("../admin/admin.schema");
let VoluntaryModule = class VoluntaryModule {
};
exports.VoluntaryModule = VoluntaryModule;
exports.VoluntaryModule = VoluntaryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            api_module_1.ApiModule,
            reaction_module_1.ReactionModule,
            mongoose_1.MongooseModule.forFeature([
                {
                    name: user_schema_1.User.name,
                    schema: user_schema_1.UserSchema,
                },
                {
                    name: admin_schema_1.Admin.name,
                    schema: admin_schema_1.AdminSchema,
                },
            ]),
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: voluntary_schema_1.Voluntary.name,
                    useFactory: async () => {
                        const schema = voluntary_schema_1.VoluntarySchema;
                        schema.pre(/^find/, function () {
                            if (!this.skipFilter) {
                                this.find({
                                    isDeleted: false,
                                    isArchived: false,
                                });
                            }
                        });
                        return schema;
                    },
                },
            ]),
        ],
        providers: [voluntary_service_1.VoluntaryService],
        controllers: [voluntary_controller_1.VoluntaryController],
    })
], VoluntaryModule);
//# sourceMappingURL=voluntary.module.js.map