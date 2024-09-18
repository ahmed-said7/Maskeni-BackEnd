import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCommentDto {
  @IsNotEmpty()
  @IsString()
  content: string;
  @IsString()
  @IsOptional()
  image?: string;
  user: string;
}
