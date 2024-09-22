'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.UpdateQuarterDto = void 0;
const mapped_types_1 = require('@nestjs/mapped-types');
const quarter_create_dto_1 = require('./quarter.create.dto');
class UpdateQuarterDto extends (0, mapped_types_1.PartialType)(
  quarter_create_dto_1.CreateQuarterDto,
) {}
exports.UpdateQuarterDto = UpdateQuarterDto;
//# sourceMappingURL=quarter.update.dto.js.map
