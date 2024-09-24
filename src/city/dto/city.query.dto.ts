import { IsOptional } from 'class-validator';
import { FindQuery } from 'src/common/types';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CityQueryDto extends FindQuery {
  @IsOptional()
  @ApiPropertyOptional({ description: 'Filter cities by country ID' })
  country?: string; // Add '?' to denote that this property is optional
}
