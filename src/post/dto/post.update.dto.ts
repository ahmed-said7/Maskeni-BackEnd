import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Optional content of the post to be updated',
    example: 'This is the updated post content.',
  })
  content?: string; // Added optional operator

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Optional image URL associated with the post',
    example: 'https://example.com/new-image.jpg',
  })
  image?: string; // Added optional operator
}
