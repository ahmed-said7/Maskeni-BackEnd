import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCommentDto {
  @ApiPropertyOptional({
    description: 'Updated content of the comment', // Description for the content property
  })
  @IsOptional()
  @IsString()
  content?: string; // Marked as optional with a question mark

  @ApiPropertyOptional({
    description:
      'Optional URL for an updated image associated with the comment', // Description for the image property
  })
  @IsOptional()
  @IsString()
  image?: string; // Marked as optional with a question mark

  user: string; // Assuming user is required for the update context
}
