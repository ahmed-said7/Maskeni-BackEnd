import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Max, Min } from 'class-validator';

export class UpdateReviewDto {
  @ApiProperty({
    description: 'The updated rating for the review, must be between 1 and 5',
    type: Number,
    minimum: 1,
    maximum: 5,
    example: 4, // Example rating
  })
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;
}
