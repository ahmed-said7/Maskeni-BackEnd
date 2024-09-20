import { IsMongoId } from 'class-validator';

export class CreateAddressDto {
  user: string;

  @IsMongoId()
  city: string;

  @IsMongoId()
  country: string;

  @IsMongoId()
  quarter: string;
}
