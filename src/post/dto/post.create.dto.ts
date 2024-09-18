import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  content: string;
  @IsOptional()
  @IsString()
  image: string;
  @IsOptional()
  @IsMongoId()
  user: string;
  @IsMongoId()
  group: string;
}
