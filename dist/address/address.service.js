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
exports.AddressService = void 0;
const common_1 = require('@nestjs/common');
const mongoose_1 = require('@nestjs/mongoose');
const mongoose_2 = require('mongoose');
const address_schema_1 = require('./address.schema');
const api_service_1 = require('../common/Api/api.service');
let AddressService = class AddressService {
  constructor(addressModel, apiService) {
    this.addressModel = addressModel;
    this.apiService = apiService;
  }
  async create(createAddressDto) {
    const newAddress = new this.addressModel(createAddressDto);
    return newAddress.save();
  }
  async findAll(obj, userId) {
    obj.user = userId;
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.addressModel.find(),
      obj,
    );
    const addresse = await query
      .populate('quarter')
      .populate('country')
      .populate('city');
    return { addresse, pagination: paginationObj };
  }
  async update(id, updateAddressDto) {
    const updatedAddress = await this.addressModel.findByIdAndUpdate(
      id,
      updateAddressDto,
      { new: true },
    );
    if (!updatedAddress) {
      throw new common_1.NotFoundException(`Address with ID ${id} not found`);
    }
    return updatedAddress;
  }
  async remove(id) {
    const result = await this.addressModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new common_1.NotFoundException(`Address with ID ${id} not found`);
    }
  }
};
exports.AddressService = AddressService;
exports.AddressService = AddressService = __decorate(
  [
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(address_schema_1.Address.name)),
    __metadata('design:paramtypes', [
      mongoose_2.Model,
      api_service_1.ApiService,
    ]),
  ],
  AddressService,
);
//# sourceMappingURL=address.service.js.map
