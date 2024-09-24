import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateFaxDto {
  @IsString()
  @ApiProperty({
    description: 'The answer to the fax question.',
    example: 'Please provide the latest status of the shipment.',
  })
  answer: string;

  @IsString()
  @ApiProperty({
    description: 'The question being asked in the fax.',
    example: 'What is the expected delivery date?',
  })
  question: string;
}
