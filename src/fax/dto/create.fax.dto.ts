import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateFaxDto {
  @IsString()
  @ApiProperty()
  answer: string;
  @IsString()
  @ApiProperty()
  question: string;
}
