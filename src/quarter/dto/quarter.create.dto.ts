import {
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
  IsNumber,
  IsString,
  IsMongoId,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class InnerArrayDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  @ApiProperty({
    description:
      'Coordinates array must contain two numbers [longitude, latitude]',
    type: [Number],
  })
  coordinates: [number, number]; // Array of two numbers
}

export class CreateQuarterDto {
  @IsString()
  @ApiProperty({ description: 'Name of the quarter' })
  name: string;

  location: object;

  @IsMongoId()
  @ApiProperty({ description: 'MongoDB ID of the associated city' })
  city: string;

  @IsMongoId()
  @ApiProperty({ description: 'MongoDB ID of the associated country' })
  country: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => InnerArrayDto)
  @ApiProperty({
    description: 'Array of coordinates for the quarter',
    type: [InnerArrayDto],
  })
  coordinates: InnerArrayDto[];
}
