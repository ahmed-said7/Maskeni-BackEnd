import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Jop_Type, ValidateLocation } from 'src/common/types';

export class CreateOfferedDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  details: string;

  @IsString()
  @ApiProperty()
  @IsEnum(Jop_Type)
  type: string;

  @ValidateNested()
  @ApiProperty()
  @Type(() => ValidateLocation)
  location: ValidateLocation;

  @IsArray()
  @ApiProperty()
  @IsString({ each: true })
  images: string;

  user: string;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  price: number;
}
