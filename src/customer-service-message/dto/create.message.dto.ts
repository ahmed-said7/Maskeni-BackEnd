import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsOptional()
  content: string;
  @IsString()
  @IsOptional()
  image: string;
  @IsMongoId()
  chat: string;
  type: string;
  user: string;
}

export class CreateAdminMessageDto {
  @IsString()
  content: string;
  chat: string;
  type: string;
  user: string;
}
