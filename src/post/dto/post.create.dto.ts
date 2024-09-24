import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Content of the post',
    example: 'This is an example post content.',
  })
  content: string;

  @IsOptional()
  @ApiPropertyOptional({
    description: 'Optional image URL associated with the post',
    example: 'https://example.com/image.jpg',
  })
  @IsString()
  image?: string; // Added optional operator

  user?: string; // Added optional operator

  @IsNotEmpty()
  @ApiProperty({
    description: 'Group ID to which the post belongs',
    example: '60d1b4d11d0c25445c648f51',
  })
  @IsMongoId()
  group: string;
}
