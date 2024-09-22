import {
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
  IsNumber,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class InnerArrayDto {
  @IsArray() // Ensure that each inner element is an array
  @ArrayNotEmpty() // Ensure the array is not empty
  @IsNumber({}, { each: true }) // Validate that each element in the inner array is a number
  @ApiProperty()
  coordinates: [number, number];
}

export class CreateCountryDto {
  @IsString()
  @ApiProperty()
  name: string;
  location: object;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InnerArrayDto)
  @ApiProperty()
  coordinates: InnerArrayDto[];
}
