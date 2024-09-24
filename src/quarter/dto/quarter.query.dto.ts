import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { FindQuery } from 'src/common/types';

export class QuarterQueryDto extends FindQuery {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'The ID of the country' })
  country: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'The ID of the city' })
  city: string;
}
