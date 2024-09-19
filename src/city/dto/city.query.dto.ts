import { IsOptional } from 'class-validator';
import { FindQuery } from 'src/common/types';

export class CityQueryDto extends FindQuery {
  @IsOptional()
  country: string;
}
