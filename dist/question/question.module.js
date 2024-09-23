"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const api_module_1 = require("../common/Api/api.module");
const user_schema_1 = require("../user/user.schema");
const reaction_module_1 = require("../reaction/reaction.module");
const question_controller_1 = require("./question.controller");
const question_service_1 = require("./question.service");
const question_schema_1 = require("./question.schema");
const admin_schema_1 = require("../admin/admin.schema");
let QuestionModule = class QuestionModule {
};
exports.QuestionModule = QuestionModule;
exports.QuestionModule = QuestionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            api_module_1.ApiModule,
            reaction_module_1.ReactionModule,
            mongoose_1.MongooseModule.forFeature([
                {
                    name: 'User',
                    schema: user_schema_1.UserSchema,
                },
                {
                    name: admin_schema_1.Admin.name,
                    schema: admin_schema_1.AdminSchema,
                },
                {
                    name: question_schema_1.Question.name,
                    schema: question_schema_1.QuestionSchema,
                },
            ]),
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: question_schema_1.Question.name,
                    useFactory: async () => {
                        const schema = question_schema_1.QuestionSchema;
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
        providers: [question_service_1.QuestionService],
        controllers: [question_controller_1.QuestionController],
    })
], QuestionModule);
//# sourceMappingURL=question.module.js.map