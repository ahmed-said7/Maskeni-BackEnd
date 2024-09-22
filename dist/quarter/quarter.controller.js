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
exports.QuarterController = void 0;
const common_1 = require('@nestjs/common');
const quarter_service_1 = require('./quarter.service');
const quarter_create_dto_1 = require('./dto/quarter.create.dto');
const point_dto_1 = require('./dto/point.dto');
const quarter_query_dto_1 = require('./dto/quarter.query.dto');
let QuarterController = class QuarterController {
  constructor(quarterService) {
    this.quarterService = quarterService;
  }
  async create(body) {
    return this.quarterService.create(body);
  }
  async findAll() {
    return this.quarterService.findAll();
  }
  async find(query) {
    return this.quarterService.getAllQuarters(query);
  }
  async findQuarterByLocation(body) {
    return this.quarterService.findQuarterContainingPoint(body);
  }
  async findOne(id) {
    return this.quarterService.findOne(id);
  }
  async remove(id) {
    return this.quarterService.remove(id);
  }
};
exports.QuarterController = QuarterController;
__decorate(
  [
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [quarter_create_dto_1.CreateQuarterDto]),
    __metadata('design:returntype', Promise),
  ],
  QuarterController.prototype,
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
  QuarterController.prototype,
  'findAll',
  null,
);
__decorate(
  [
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [quarter_query_dto_1.QuarterQueryDto]),
    __metadata('design:returntype', Promise),
  ],
  QuarterController.prototype,
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
  QuarterController.prototype,
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
  QuarterController.prototype,
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
  QuarterController.prototype,
  'remove',
  null,
);
exports.QuarterController = QuarterController = __decorate(
  [
    (0, common_1.Controller)('quarter'),
    __metadata('design:paramtypes', [quarter_service_1.QuarterService]),
  ],
  QuarterController,
);
//# sourceMappingURL=quarter.controller.js.map
