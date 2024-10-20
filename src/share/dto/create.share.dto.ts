import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsString } from 'class-validator';

export class CreateShareDto {
  @IsString()
  @ApiProperty()
  content: string;

  user: string; // Added IsMongoId decorator for consistency with IDs

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
  @IsString({ each: true }) // Ensures each element in the array is a string
  @ApiProperty({ type: [String] }) // Specifies that this is an array of strings
  images: string[];

  @IsString()
  @ApiProperty({
    description: 'The details of the address',
  })
  addressDetails: string;

  @IsString()
  @ApiProperty()
  postType: string;
}
