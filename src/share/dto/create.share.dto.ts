import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CreateShareDto {
  @IsString()
  @ApiProperty()
  content: string;
  user: string;
  @IsArray()
  @ApiProperty()
  @IsString({ each: true })
  images: string;
}
