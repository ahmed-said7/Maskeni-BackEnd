import {
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
  IsNumber,
  IsString,
  IsMongoId,
} from 'class-validator';
import { Type } from 'class-transformer';

class InnerArrayDto {
  @IsArray() // Ensure that each inner element is an array
  @ArrayNotEmpty() // Ensure the array is not empty
  @IsNumber({}, { each: true }) // Validate that each element in the inner array is a number
  coordinates: [number, number];
}

export class CreateCityDto {
  @IsString()
  name: string;
  location: object;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InnerArrayDto)
  coordinates: InnerArrayDto[];

  @IsMongoId()
  country: string;
}
