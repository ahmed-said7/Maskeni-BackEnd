'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.UpdateCityDto = void 0;
const mapped_types_1 = require('@nestjs/mapped-types');
const city_create_dto_1 = require('./city.create.dto');
class UpdateCityDto extends (0, mapped_types_1.PartialType)(
  city_create_dto_1.CreateCityDto,
) {}
exports.UpdateCityDto = UpdateCityDto;
//# sourceMappingURL=city.update.dto.js.map
