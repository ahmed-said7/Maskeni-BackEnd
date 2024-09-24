import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { FindQuery } from 'src/common/types';

export class AddressQueryDto extends PartialType(FindQuery) {
  @ApiPropertyOptional({
    description: 'The ID of the user associated with the address (optional)',
  })
  user?: string; // Made optional to align with PartialType
}
