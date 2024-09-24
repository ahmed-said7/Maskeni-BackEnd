import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateChatDto {
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({ description: 'The ID of the user participating in the chat.' })
  user: string;

  admin?: string; // Add '?' to denote that this property is optional
}
