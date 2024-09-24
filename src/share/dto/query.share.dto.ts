import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsOptional } from 'class-validator';
import { FindQuery } from 'src/common/types';

export class QueryShareDto extends FindQuery {
  @IsOptional()
  @IsMongoId()
  @ApiPropertyOptional({ description: 'ID of the user' })
  user?: string; // Made optional

  @IsOptional()
  @IsMongoId()
  @ApiPropertyOptional({ description: 'ID of the country' })
  country?: string; // Made optional

  @IsOptional()
  @IsMongoId()
  @ApiPropertyOptional({ description: 'ID of the city' })
  city?: string; // Made optional

  @IsOptional()
  @IsMongoId()
  @ApiPropertyOptional({ description: 'ID of the quarter' })
  quarter?: string; // Made optional
}
