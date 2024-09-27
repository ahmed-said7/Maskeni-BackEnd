import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsOptional } from 'class-validator';
import { Event_Type, FindQuery } from 'src/common/types';

export class QueryVoluntaryDto extends FindQuery {
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Filter by specific date of the voluntary event',
  })
  date?: string;

  @IsOptional()
  @IsMongoId()
  @ApiPropertyOptional({ description: 'Filter by the MongoDB ID of the user' })
  user?: string;

  @IsOptional()
  @ApiPropertyOptional({
    description: 'Filter by start date of the voluntary activity',
  })
  startedAt?: string;

  @IsOptional()
  @ApiPropertyOptional({
    description: 'Filter by end date of the voluntary activity',
  })
  endedAt?: string;

  @IsOptional()
  @ApiPropertyOptional({
    description: 'Filter by the minimum age for participation',
  })
  startAge?: number;

  @IsOptional()
  @ApiPropertyOptional({
    description: 'Filter by the maximum age for participation',
  })
  endAge?: number;

  @IsOptional()
  @IsEnum(Event_Type)
  @ApiPropertyOptional({
    description: 'Filter by type of the voluntary activity',
  })
  type?: string;

  @IsOptional()
  @IsMongoId()
  @ApiPropertyOptional({
    description:
      'Filter by MongoDB ID of the country where the activity takes place',
  })
  country?: string;

  @IsOptional()
  @IsMongoId()
  @ApiPropertyOptional({
    description:
      'Filter by MongoDB ID of the city where the activity takes place',
  })
  city?: string;

  @IsOptional()
  @IsMongoId()
  @ApiPropertyOptional({
    description:
      'Filter by MongoDB ID of the quarter where the activity takes place',
  })
  quarter?: string;
}
