import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNumber, Max, Min } from 'class-validator';

export class CreateReviewDto {
  user: string;
  @IsMongoId()
  @ApiProperty()
  review: string;
  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;
}
