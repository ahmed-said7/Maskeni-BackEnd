import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString, IsNotEmpty } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The ID of the user associated with the address',
  })
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
