import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// import { Type } from 'class-transformer';
import {
  // ArrayMaxSize,
  // ArrayMinSize,
  IsArray,
  IsDateString,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  // ValidateNested,
} from 'class-validator';
// import { ValidateLocation } from 'src/common/types';

export class CreateEventDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  details: string;

  @ApiProperty()
  @IsMongoId()
  country: string;
  @ApiProperty()
  @IsMongoId()
  city: string;
  @ApiProperty()
  @IsMongoId()
  quarter: string;

  @IsDateString()
  @ApiProperty()
  startedAt: string;

  @IsDateString()
  @ApiPropertyOptional()
  @IsOptional()
  date: string;

  @IsDateString()
  @ApiProperty()
  endedAt: string;

  @IsArray()
  @ApiProperty()
  @IsString({ each: true })
  images: string;

  @IsNumber()
  @ApiProperty()
  startAge: number;

  @IsNumber()
  @ApiProperty()
  endAge: number;

  user: string;

  @IsOptional()
  @ApiPropertyOptional()
  @IsNumber()
  price: number;
}
