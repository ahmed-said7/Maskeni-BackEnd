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
  @IsArray() // Ensure that each inner element is an array
  @ArrayNotEmpty() // Ensure the array is not empty
  @IsNumber({}, { each: true }) // Validate that each element in the inner array is a number
  @ApiProperty({
    type: [Number],
    description:
      'Coordinates represented as an array of numbers [longitude, latitude]',
  })
  coordinates: [number, number];
}

export class CreateCityDto {
  @IsString()
  @ApiProperty({ description: 'arabic Name of the city.' })
  nameAr: string;

  @IsString()
  @ApiProperty({ description: 'english Name of the city.' })
  nameEn: string;

  @IsString()
  @ApiProperty({ description: 'image of the city.' })
  image: string;

  location: object;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InnerArrayDto)
  @ApiProperty({
    type: [InnerArrayDto],
    description: 'Array of coordinates for the city',
  })
  coordinates: InnerArrayDto[];

  @IsMongoId()
  @ApiProperty({ description: 'MongoDB ID of the associated country' })
  country: string;
}
