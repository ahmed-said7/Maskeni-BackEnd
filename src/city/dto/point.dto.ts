import { IsArray, IsNumber } from 'class-validator';

export class PointDto {
  @IsArray()
  @IsNumber({}, { each: true })
  coordinates: [number, number]; // Format: [longitude, latitude]
}
