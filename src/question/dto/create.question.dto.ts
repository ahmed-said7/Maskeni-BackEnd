import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @ApiProperty({ description: 'The content of the question.' })
  content: string;

  @IsMongoId()
  @ApiProperty({
    description: 'The ID of the country associated with the question.',
  })
  country: string;

  @IsMongoId()
  @ApiProperty({
    description: 'The ID of the city associated with the question.',
  })
  city: string;

  @IsMongoId()
  @ApiProperty({
    description: 'The ID of the quarter associated with the question.',
  })
  quarter: string;

  user: string;

  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    description: 'An array of image URLs associated with the question.',
    type: [String],
  })
  images: string[];

  @IsString()
  @ApiProperty({
    description: 'The details of the address',
  })
  addressDetails: string;
}
