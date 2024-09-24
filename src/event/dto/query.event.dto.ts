import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsOptional } from 'class-validator';
import { FindQuery } from 'src/common/types';

export class QueryEventDto extends FindQuery {
  @IsOptional()
  @ApiPropertyOptional()
  date: string;
  @IsOptional()
  @ApiPropertyOptional()
  startedAt: string;
  @IsOptional()
  @ApiPropertyOptional()
  endedAt: string;
  @IsOptional()
  @ApiPropertyOptional()
  startAge: number;
  @IsOptional()
  @ApiPropertyOptional()
  endAge: number;
  @IsOptional()
  @ApiPropertyOptional()
  type: string;
  @IsOptional()
  @ApiPropertyOptional()
  price: number | object;
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
