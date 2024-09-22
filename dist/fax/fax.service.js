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
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.FaxService = void 0;
const common_1 = require('@nestjs/common');
const mongoose_1 = require('@nestjs/mongoose');
const mongoose_2 = require('mongoose');
const fax_schema_1 = require('./fax.schema');
const api_service_1 = require('../common/Api/api.service');
let FaxService = class FaxService {
  constructor(faxModel, apiService) {
    this.faxModel = faxModel;
    this.apiService = apiService;
  }
  async createFax(body) {
    const fax = await this.faxModel.create(body);
    return { fax };
  }
  async deleteFax(id) {
    const fax = await this.faxModel.findByIdAndDelete(id);
    if (!fax) {
      throw new common_1.HttpException('fax not found', 400);
    }
    return { status: 'deleted' };
  }
  async getAllFaxs(obj) {
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.faxModel.find(),
      obj,
    );
    const events = await query.populate('user');
    return { events, pagination: paginationObj };
  }
  async updateFax(body, faxId) {
    const fax = await this.faxModel.findByIdAndUpdate(faxId, body, {
      new: true,
    });
    if (!fax) {
      throw new common_1.HttpException('fax not found', 400);
    }
    return { fax };
  }
};
exports.FaxService = FaxService;
exports.FaxService = FaxService = __decorate(
  [
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(fax_schema_1.Fax.name)),
    __metadata('design:paramtypes', [
      mongoose_2.Model,
      api_service_1.ApiService,
    ]),
  ],
  FaxService,
);
//# sourceMappingURL=fax.service.js.map
