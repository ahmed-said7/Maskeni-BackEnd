"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaxController = void 0;
const common_1 = require("@nestjs/common");
const fax_service_1 = require("./fax.service");
const create_fax_dto_1 = require("./dto/create.fax.dto");
const types_1 = require("../common/types");
const validate_mongo_pipe_1 = require("../common/pipe/validate.mongo.pipe");
const update_fax_dto_1 = require("./dto/update.fax.dto");
const authentication_guard_1 = require("../common/guards/authentication.guard");
const authorization_guard_1 = require("../common/guards/authorization.guard");
const roles_1 = require("../common/decorator/roles");
const enum_1 = require("../common/enum");
let FaxController = class FaxController {
    constructor(faxService) {
        this.faxService = faxService;
    }
    createContact(body) {
        return this.faxService.createFax(body);
    }
    getAllContact(query) {
        return this.faxService.getAllFaxs(query);
    }
    deleteQuestion(faxId) {
        return this.faxService.deleteFax(faxId);
    }
    updateQuestion(faxId, body) {
        return this.faxService.updateFax(body, faxId);
    }
};
exports.FaxController = FaxController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.SuperAdmin, enum_1.All_Role.Admin),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_fax_dto_1.CreateFaxDto]),
    __metadata("design:returntype", void 0)
], FaxController.prototype, "createContact", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.FindQuery]),
    __metadata("design:returntype", void 0)
], FaxController.prototype, "getAllContact", null);
__decorate([
    (0, common_1.Delete)(':faxId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.SuperAdmin, enum_1.All_Role.Admin),
    __param(0, (0, common_1.Param)('faxId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FaxController.prototype, "deleteQuestion", null);
__decorate([
    (0, common_1.Patch)(':faxId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.SuperAdmin, enum_1.All_Role.Admin),
    __param(0, (0, common_1.Param)('faxId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_fax_dto_1.UpdateFaxDto]),
    __metadata("design:returntype", void 0)
], FaxController.prototype, "updateQuestion", null);
exports.FaxController = FaxController = __decorate([
    (0, common_1.Controller)('fax'),
    __metadata("design:paramtypes", [fax_service_1.FaxService])
], FaxController);
//# sourceMappingURL=fax.controller.js.map