import { IsOptional, IsString } from 'class-validator';

export class UpdateFaxDto {
  @IsOptional()
  @IsString()
  answer: string;
  @IsOptional()
  @IsString()
  question: string;
}
