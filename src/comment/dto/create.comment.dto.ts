import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Content of the comment', // Description for the content property
  })
  @IsString()
  content: string;

  user: string;
  post: string;

  @ApiPropertyOptional({
    description: 'ID of the parent comment if this comment is a reply', // Description for the parentComment property
  })
  @IsOptional()
  @IsMongoId()
  parentComment?: string; // Made optional to indicate it's not always required

  @ApiPropertyOptional({
    description: 'Optional URL for an image associated with the comment', // Description for the image property
  })
  @IsOptional()
  @IsString()
  image?: string; // Made optional to indicate it's not always required
}
