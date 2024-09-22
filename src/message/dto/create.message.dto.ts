import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  content: string;
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  image: string;
  @IsMongoId()
  @ApiProperty()
  chat: string;
  user: string;
}
