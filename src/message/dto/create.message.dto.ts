import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'The content of the message' })
  content?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'URL of the image associated with the message',
  })
  image?: string;

  @IsMongoId()
  @ApiProperty({ description: 'ID of the chat to which the message belongs' })
  chat: string;

  user: string;
}
