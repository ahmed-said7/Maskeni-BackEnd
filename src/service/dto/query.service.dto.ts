import { IsOptional } from 'class-validator';
import { FindQuery } from 'src/common/types';

export class QueryOfferedDto extends FindQuery {
  @IsOptional()
  type: string;
  @IsOptional()
  price: number | object;
}
