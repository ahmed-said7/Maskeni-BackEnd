import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { FindQuery } from 'src/common/types';

export class QueryEventDto extends FindQuery {
  @IsOptional()
  @ApiPropertyOptional()
  date: Date;
  @IsOptional()
  @ApiPropertyOptional()
  startedAt: Date;
  @IsOptional()
  @ApiPropertyOptional()
  endedAt: Date;
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
}
