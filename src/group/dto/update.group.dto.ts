import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateGroupDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The new name for the group, if updating.',
  })
  name?: string; // Marked as optional

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The URL of the new image for the group, if updating.',
  })
  image?: string; // Marked as optional
}
