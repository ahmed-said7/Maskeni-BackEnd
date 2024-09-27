import { PartialType } from '@nestjs/swagger';
import { FindQuery } from 'src/common/types';

export class AddressQueryDto extends PartialType(FindQuery) {
  user?: string; // Made optional to align with PartialType
}
