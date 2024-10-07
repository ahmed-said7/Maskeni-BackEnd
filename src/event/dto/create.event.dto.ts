import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Event_Type } from 'src/common/types';

export class CreateEventDto {
  @IsString()
  @ApiProperty({
    description: 'The details of the address',
  })
  addressDetails: string;

  @IsString()
  @ApiProperty({ description: 'Name of the event' })
  name: string;

  @IsString()
  @ApiProperty({ description: 'Details about the event' })
  details: string;

  @IsMongoId()
  @ApiProperty({ description: 'ID of the country where the event is held' })
  country: string;

  @IsMongoId()
  @ApiProperty({ description: 'ID of the city where the event is held' })
  city: string;

  @IsMongoId()
  @ApiProperty({ description: 'ID of the quarter where the event is held' })
  quarter: string;

  @IsDateString()
  @ApiProperty({ description: 'Start date and time of the event' })
  startedAt: string;

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional({ description: 'Optional date for the event' })
  date?: string;

  @IsOptional()
  @IsEnum(Event_Type)
  @ApiPropertyOptional({ description: 'Optional date for the event' })
  type?: string;

  @IsDateString()
  @ApiProperty({ description: 'End date and time of the event' })
  endedAt: string;

  @IsArray()
  @IsString({ each: true })
  @ApiProperty({ description: 'Array of image URLs for the event' })
  images: string[];

  @IsNumber()
  @ApiProperty({ description: 'Minimum age to attend the event' })
  startAge: number;

  @IsNumber()
  @ApiProperty({ description: 'Maximum age to attend the event' })
  endAge: number;

  user: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    description: 'Price for attending the event, if applicable',
  })
  price?: number;
}
