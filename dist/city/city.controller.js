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
exports.CityController = void 0;
const common_1 = require('@nestjs/common');
const city_service_1 = require('./city.service');
const point_dto_1 = require('./dto/point.dto');
const city_create_dto_1 = require('./dto/city.create.dto');
const city_query_dto_1 = require('./dto/city.query.dto');
let CityController = class CityController {
  constructor(cityService) {
    this.cityService = cityService;
  }
  async create(createCityDto) {
    return this.cityService.create(createCityDto);
  }
  async findAll() {
    return this.cityService.findAll();
  }
  async find(query) {
    return this.cityService.getAllCities(query);
  }
  async findQuarterByLocation(body) {
    return this.cityService.findCityContainingPoint(body);
  }
  async findOne(id) {
    return this.cityService.findOne(id);
  }
  async remove(id) {
    return this.cityService.remove(id);
  }
};
exports.CityController = CityController;
__decorate(
  [
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [city_create_dto_1.CreateCityDto]),
    __metadata('design:returntype', Promise),
  ],
  CityController.prototype,
  'create',
  null,
);
__decorate(
  [
    (0, common_1.Get)('all'),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', []),
    __metadata('design:returntype', Promise),
  ],
  CityController.prototype,
  'findAll',
  null,
);
__decorate(
  [
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [city_query_dto_1.CityQueryDto]),
    __metadata('design:returntype', Promise),
  ],
  CityController.prototype,
  'find',
  null,
);
__decorate(
  [
    (0, common_1.Get)('point'),
    __param(0, (0, common_1.Body)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [point_dto_1.PointDto]),
    __metadata('design:returntype', Promise),
  ],
  CityController.prototype,
  'findQuarterByLocation',
  null,
);
__decorate(
  [
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String]),
    __metadata('design:returntype', Promise),
  ],
  CityController.prototype,
  'findOne',
  null,
);
__decorate(
  [
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String]),
    __metadata('design:returntype', Promise),
  ],
  CityController.prototype,
  'remove',
  null,
);
exports.CityController = CityController = __decorate(
  [
    (0, common_1.Controller)('city'),
    __metadata('design:paramtypes', [city_service_1.CityService]),
  ],
  CityController,
);
//# sourceMappingURL=city.controller.js.map
