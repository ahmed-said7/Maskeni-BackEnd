import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsNumber, IsString } from 'class-validator';
import { FindQuery } from 'src/common/types';

export class QueryOfferedDto extends FindQuery {
  @IsOptional()
  @IsString() // Ensure type is a string
  @ApiPropertyOptional()
  type?: string; // Mark as optional with a '?'

  @IsOptional()
  @IsNumber() // Validate that price is a number
  @ApiPropertyOptional()
  price?: number; // Mark as optional with a '?'

  @IsOptional()
  @IsMongoId() // Validate that country is a valid MongoDB ObjectId
  @ApiPropertyOptional()
  country?: string; // Mark as optional with a '?'

  @IsOptional()
  @IsMongoId() // Validate that city is a valid MongoDB ObjectId
  @ApiPropertyOptional()
  city?: string; // Mark as optional with a '?'

  @IsOptional()
  @IsMongoId() // Validate that quarter is a valid MongoDB ObjectId
  @ApiPropertyOptional()
  quarter?: string; // Mark as optional with a '?'
}
