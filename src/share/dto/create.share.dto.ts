import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsString } from 'class-validator';

export class CreateShareDto {
  @IsString()
  @ApiProperty()
  content: string;
  user: string;
  @ApiProperty()
  @IsMongoId()
  country: string;
  @ApiProperty()
  @IsMongoId()
  city: string;
  @ApiProperty()
  @IsMongoId()
  quarter: string;
  @IsArray()
  @ApiProperty()
  @IsString({ each: true })
  images: string;
}
