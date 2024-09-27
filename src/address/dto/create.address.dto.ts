import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

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
}
