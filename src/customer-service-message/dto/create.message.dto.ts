import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  content: string;
  @IsString()
  @IsOptional()
  @ApiProperty()
  image: string;
  @IsMongoId()
  @ApiProperty()
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
