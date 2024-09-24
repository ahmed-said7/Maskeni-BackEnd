import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @ApiProperty()
  content: string;
  @ApiProperty()
  @IsMongoId()
  country: string;
  @ApiProperty()
  @IsMongoId()
  city: string;
  @ApiProperty()
  @IsMongoId()
  quarter: string;
  user: string;
  @IsArray()
  @ApiProperty()
  @IsString({ each: true })
  images: string;
}
