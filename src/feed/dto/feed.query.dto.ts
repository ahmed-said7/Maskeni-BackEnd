import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsNumber, IsOptional } from 'class-validator';

export class FeedQueryDto {
  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    description: 'The page number for pagination, starting from 1.',
    example: 1,
  })
  page?: number; // Marked as optional

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    description: 'The number of items to retrieve per page (pagination).',
    example: 10,
  })
  limit?: number; // Marked as optional

  @IsOptional()
  @IsMongoId()
  @ApiPropertyOptional({
    description: 'Filter by country ID (MongoDB ObjectId).',
    example: '605c72b8a96e2f39a29d14c9',
  })
  country?: string; // Marked as optional

  @IsOptional()
  @IsMongoId()
  @ApiPropertyOptional({
    description: 'Filter by city ID (MongoDB ObjectId).',
    example: '605c72b8a96e2f39a29d14ca',
  })
  city?: string; // Marked as optional

  @IsOptional()
  @IsMongoId()
  @ApiPropertyOptional({
    description: 'Filter by quarter ID (MongoDB ObjectId).',
    example: '605c72b8a96e2f39a29d14cb',
  })
  quarter?: string; // Marked as optional
}
