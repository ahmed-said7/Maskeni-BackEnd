import { IsOptional } from 'class-validator';
import { FindQuery } from 'src/common/types';

export class QuarterQueryDto extends FindQuery {
  @IsOptional()
  country: string;
  @IsOptional()
  city: string;
}
