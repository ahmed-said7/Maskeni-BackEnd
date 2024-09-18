import { IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  content: string;
  @IsString()
  @IsOptional()
  image?: string;
  user: string;
}
