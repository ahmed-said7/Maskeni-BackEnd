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
  @IsArray() // Ensure that the property is an array
  @ArrayNotEmpty() // Ensure the array is not empty
  @IsNumber({}, { each: true }) // Validate that each element in the array is a number
  @ApiProperty({
    type: [Number],
    description: 'Array of coordinates, where each coordinate is a number.',
  })
  coordinates: [number, number]; // A tuple indicating coordinates (longitude, latitude)
}

export class CreateCountryDto {
  @IsString()
  @ApiProperty({ description: 'arabic Name of the country.' })
  nameAr: string;

  @IsString()
  @ApiProperty({ description: 'english Name of the country.' })
  nameEn: string;

  @IsString()
  @ApiProperty({ description: 'image of the country.' })
  image: string;

  location: object; // Consider specifying a more detailed type if possible

  @IsArray()
  @ValidateNested({ each: true }) // Ensure each inner object is validated
  @Type(() => InnerArrayDto) // Specify the type of the nested objects
  @ApiProperty({
    type: [InnerArrayDto],
    description: 'Array of coordinates for the country.',
  })
  coordinates: InnerArrayDto[]; // An array of InnerArrayDto
}
