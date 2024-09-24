import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The content of the message',
    example: 'Hello, how can I help you?',
  })
  content?: string; // Made optional

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'URL of the image associated with the message',
    example: 'http://example.com/image.png',
  })
  image?: string; // Made optional

  @IsMongoId()
  @ApiProperty({
    description: 'The ID of the chat this message belongs to',
    example: '60c72b2f9b1e8e3b4c123456',
  })
  chat: string;
  type: string;
  user: string;
}

export class CreateAdminMessageDto {
  @IsString()
  @ApiProperty({
    description: 'The content of the admin message',
    example: 'Please check your email for the latest update.',
  })
  content: string;
  chat: string;
  type: string;
  user: string;
}
