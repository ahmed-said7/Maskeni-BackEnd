import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Jop_Type } from 'src/common/types';

export class CreateOfferedDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  details: string;

  @IsString()
  @IsOptional()
  @IsEnum(Jop_Type)
  @ApiPropertyOptional({ enum: Jop_Type }) // Specify the enum for Swagger documentation
  type: Jop_Type; // Use Jop_Type directly

  @IsMongoId()
  @ApiProperty()
  country: string;

  @IsMongoId()
  @ApiProperty()
  city: string;

  @IsMongoId()
  @ApiProperty()
  quarter: string;

  @IsArray()
  @IsString({ each: true })
  @ApiProperty({ type: [String] }) // Specify that images is an array of strings
  images: string[];

  user?: string; // Mark as optional with a '?'

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional() // Optional property for price
  price?: number; // Mark as optional with a '?'
}
