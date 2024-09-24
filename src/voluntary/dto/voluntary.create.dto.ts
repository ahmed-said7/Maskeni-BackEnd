import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  // ValidateNested,
} from 'class-validator';
// import { ValidateLocation } from 'src/common/types';

export class CreateVoluntaryDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  details: string;

  @IsDateString()
  @ApiProperty()
  startedAt: string;

  @IsDateString()
  @IsOptional()
  @ApiPropertyOptional()
  date: string;

  @IsDateString()
  @ApiProperty()
  endedAt: string;

  // @ValidateNested()
  // @ApiProperty()
  // @Type(() => ValidateLocation)
  // location: ValidateLocation;

  @ApiProperty()
  @IsMongoId()
  country: string;
  @ApiProperty()
  @IsMongoId()
  city: string;
  @ApiProperty()
  @IsMongoId()
  quarter: string;

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
}
