import { PartialType } from '@nestjs/swagger';
import { FindQuery } from 'src/common/types';

export class AddressQueryDto extends PartialType(FindQuery) {
  user: string;
}
