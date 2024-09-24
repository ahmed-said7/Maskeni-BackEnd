import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsOptional } from 'class-validator';
import { FindQuery } from 'src/common/types';

export class QueryShareDto extends FindQuery {
  @IsOptional()
  @IsMongoId()
  @ApiPropertyOptional()
  user: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsMongoId()
  country: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsMongoId()
  city: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsMongoId()
  quarter: string;
}
