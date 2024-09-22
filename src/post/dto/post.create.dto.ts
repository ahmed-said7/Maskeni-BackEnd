import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  content: string;
  @IsOptional()
  @ApiProperty()
  @IsString()
  image: string;
  @IsOptional()
  @ApiProperty()
  @IsMongoId()
  user: string;
  @ApiProperty()
  @IsMongoId()
  group: string;
}
