import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
export interface Payload {
  userId?: string;
  role?: string;
  iat?: number;
}
export class FindQuery {
  @ApiPropertyOptional({
    description: 'The page number for pagination',
    example: '1',
  })
  @IsOptional()
  page?: string;

  @ApiPropertyOptional({
    description: 'The sort order for the results',
    example: '-age,price',
  })
  @IsOptional()
  sort?: string;

  @ApiPropertyOptional({
    description: 'Comma-separated list of fields to select',
    example: 'name,icon',
  })
  @IsOptional()
  select?: string;

  @ApiPropertyOptional({
    description: 'The number of items to return per page',
    example: '10',
  })
  @IsOptional()
  limit?: string;

  @ApiPropertyOptional({
    description: 'Keyword for searching results',
    example: 'example',
  })
  @IsOptional()
  keyword?: string;
}
export enum Event_Type {
  community = 'مجتمعي',
  cultural = 'ثقافي',
  art = 'فن',
  youth = 'لمة شباب',
  food = 'طعام',
  education = 'تعليم',
}
export enum Gender_Type {
  male = 'ذكر',
  female = 'أنثى',
  all = 'الكل',
}
export enum Jop_Type {
  deliveryService = 'خدمة توصيل',
  grocery = 'البقاله',
  homeServices = 'خدمات منزليه',
  education = 'تعليم',
  pharmacyService = 'خدمة صيدليه',
}