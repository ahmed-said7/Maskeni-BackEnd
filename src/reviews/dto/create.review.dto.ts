import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNumber, Max, Min } from 'class-validator';

export class CreateReviewDto {
  user: string;

  @IsMongoId()
  @ApiProperty({
    description: 'The ID of the review being created',
    type: String,
  })
  review: string;

  @ApiProperty({
    description: 'The rating given by the user, must be between 1 and 5',
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
