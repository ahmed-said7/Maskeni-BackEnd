import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateFaxDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The updated answer to the fax question.',
    example: 'Updated answer text.',
  })
  answer?: string; // Optional property with a question mark to indicate it is not required

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The updated question for the fax.',
    example: 'What is the new status of the shipment?',
  })
  question?: string; // Optional property with a question mark
}
