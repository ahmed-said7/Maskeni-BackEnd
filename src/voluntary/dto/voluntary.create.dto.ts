import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateVoluntaryDto {
  @IsString()
  @ApiProperty({ description: 'Name of the voluntary activity' })
  name: string;

  @IsString()
  @ApiProperty({ description: 'Details about the voluntary activity' })
  details: string;

  @IsDateString()
  @ApiProperty({ description: 'Start date of the voluntary activity' })
  startedAt: string;

  @IsDateString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'Optional field for additional date' })
  date?: string;

  @IsDateString()
  @ApiProperty({ description: 'End date of the voluntary activity' })
  endedAt: string;

  @IsMongoId()
  @ApiProperty({
    description: 'MongoDB ID of the country where the activity takes place',
  })
  country: string;

  @IsMongoId()
  @ApiProperty({
    description: 'MongoDB ID of the city where the activity takes place',
  })
  city: string;

  @IsMongoId()
  @ApiProperty({
    description: 'MongoDB ID of the quarter where the activity takes place',
  })
  quarter: string;

  @IsArray()
  @ApiProperty({ type: [String], description: 'List of image URLs' })
  @IsString({ each: true })
  images: string[];

  @IsNumber()
  @ApiProperty({ description: 'Minimum age required to participate' })
  startAge: number;

  @IsNumber()
  @ApiProperty({ description: 'Maximum age limit for participation' })
  endAge: number;
  user: string;
}
