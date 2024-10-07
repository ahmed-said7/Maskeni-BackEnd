import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsMongoId,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateAddressDto {
  user: string;

  @IsMongoId()
  @ApiProperty({
    description: 'The ID of the city',
  })
  city: string;

  @IsMongoId()
  @ApiProperty({
    description: 'The ID of the country',
  })
  country: string;

  @IsMongoId()
  @ApiProperty({
    description: 'The ID of the quarter',
  })
  quarter: string;

  @IsArray()
  @Min(2)
  @Max(2)
  @IsNumber({}, { each: true })
  @ApiProperty({
    description: 'location of user',
  })
  location: number;

  @IsString()
  @ApiProperty({
    description: 'The details of the address',
  })
  addressDetails: string;
}
