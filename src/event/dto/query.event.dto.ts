import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';
import { FindQuery } from 'src/common/types';

export class QueryEventDto extends FindQuery {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Date of the event in ISO format' })
  date?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Start date of the event in ISO format' })
  startedAt?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'End date of the event in ISO format' })
  endedAt?: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ description: 'Minimum age for attending the event' })
  startAge?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ description: 'Maximum age for attending the event' })
  endAge?: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Type of the event' })
  type?: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ description: 'Price for attending the event' })
  price?: number | object;

  @IsOptional()
  @IsMongoId()
  @ApiPropertyOptional({
    description: 'ID of the country related to the event',
  })
  country?: string;

  @IsOptional()
  @IsMongoId()
  @ApiPropertyOptional({ description: 'ID of the city related to the event' })
  city?: string;

  @IsOptional()
  @IsMongoId()
  @ApiPropertyOptional({
    description: 'ID of the quarter related to the event',
  })
  quarter?: string;
  user?: string;
}
