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
Object.defineProperty(exports, '__esModule', { value: true });
exports.QuarterModule = void 0;
const common_1 = require('@nestjs/common');
const mongoose_1 = require('@nestjs/mongoose');
const quarter_service_1 = require('./quarter.service');
const quarter_controller_1 = require('./quarter.controller');
const quarter_schema_1 = require('./quarter.schema');
const country_module_1 = require('../country/country.module');
const city_module_1 = require('../city/city.module');
let QuarterModule = class QuarterModule {};
exports.QuarterModule = QuarterModule;
exports.QuarterModule = QuarterModule = __decorate(
  [
    (0, common_1.Module)({
      imports: [
        country_module_1.CountryModule,
        city_module_1.CityModule,
        mongoose_1.MongooseModule.forFeatureAsync([
          {
            name: quarter_schema_1.Quarter.name,
            useFactory: () => {
              const schema = quarter_schema_1.QuarterSchema;
              schema.index({ location: '2dsphere' });
              return schema;
            },
          },
        ]),
      ],
      controllers: [quarter_controller_1.QuarterController],
      providers: [quarter_service_1.QuarterService],
    }),
  ],
  QuarterModule,
);
//# sourceMappingURL=quarter.module.js.map
