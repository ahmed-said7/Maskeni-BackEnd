import { IsArray, IsString } from 'class-validator';

export class CreateShareDto {
  @IsString()
  content: string;
  user: string;
  @IsArray()
  @IsString({ each: true })
  images: string;
}
