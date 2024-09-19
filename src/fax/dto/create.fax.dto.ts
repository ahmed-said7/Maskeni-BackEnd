import { IsString } from 'class-validator';

export class CreateFaxDto {
  @IsString()
  answer: string;
  @IsString()
  question: string;
}
