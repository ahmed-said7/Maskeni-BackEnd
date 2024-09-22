import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { FindQuery } from 'src/common/types';

export class QueryOfferedDto extends FindQuery {
  @IsOptional()
  @ApiPropertyOptional()
  type: string;
  @IsOptional()
  @ApiPropertyOptional()
  price: number | object;
}
