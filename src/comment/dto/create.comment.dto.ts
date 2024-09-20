import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString } from 'class-validator';
export class CreateCommentDto {
  @ApiProperty()
  @IsString()
  content: string;
  user: string;
  post: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsMongoId()
  parentComment: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  image?: string;
}
