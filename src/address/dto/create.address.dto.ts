import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class CreateAddressDto {
  user: string;

  @IsMongoId()
  @ApiProperty()
  city: string;

  @IsMongoId()
  @ApiProperty()
  country: string;

  @IsMongoId()
  @ApiProperty()
  quarter: string;
}
