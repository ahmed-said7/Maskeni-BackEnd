import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsOptional()
  @IsString()
  content: string;
  @IsOptional()
  @IsString()
  image: string;
  @IsMongoId()
  chat: string;
  user: string;
}
