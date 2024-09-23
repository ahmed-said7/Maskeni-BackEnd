"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const group_service_1 = require("./group.service");
const group_controller_1 = require("./group.controller");
const group_schema_1 = require("./group.schema");
const user_schema_1 = require("../user/user.schema");
const admin_schema_1 = require("../admin/admin.schema");
const api_module_1 = require("../common/Api/api.module");
let GroupModule = class GroupModule {
};
exports.GroupModule = GroupModule;
exports.GroupModule = GroupModule = __decorate([
    (0, common_1.Module)({
        imports: [
            api_module_1.ApiModule,
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
                    name: group_schema_1.Group.name,
                    useFactory: async () => {
                        const schema = group_schema_1.GroupSchema;
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
        providers: [group_service_1.GroupServices],
        controllers: [group_controller_1.GroupController],
    })
], GroupModule);
//# sourceMappingURL=group.module.js.map