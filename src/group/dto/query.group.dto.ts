import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsOptional } from 'class-validator';
import { FindQuery } from 'src/common/types';

export class QueryGroupDto extends FindQuery {
  @ApiPropertyOptional({
    description: 'Optional MongoDB ID for filtering by country',
  })
  @IsOptional()
  @IsMongoId()
  country: string;

  @ApiPropertyOptional({
    description: 'Optional MongoDB ID for filtering by city',
  })
  @IsOptional()
  @IsMongoId()
  city: string;

  @ApiPropertyOptional({
    description: 'Optional MongoDB ID for filtering by quarter',
  })
  @IsOptional()
  @IsMongoId()
  quarter: string;
}
