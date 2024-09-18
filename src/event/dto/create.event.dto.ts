import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  name: string;

  @IsString()
  details: string;

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @IsNumber({}, { each: true })
  location: [number, number];

  @IsDateString()
  startedAt: Date;

  @IsDateString()
  @IsOptional()
  date: Date;

  @IsDateString()
  endedAt: Date;

  @IsArray()
  @IsString({ each: true })
  images: string;

  @IsNumber()
  startAge: number;

  @IsNumber()
  endAge: number;

  user: string;

  @IsOptional()
  @IsNumber()
  price: number;
}
