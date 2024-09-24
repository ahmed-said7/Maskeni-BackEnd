import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class DashboardSearchDto {
  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ description: 'Page number for pagination' })
  page?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ description: 'Number of items per page' })
  limit?: number;
}

export class DashboardArchivedDto {
  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ description: 'Page number for pagination' })
  page?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ description: 'Number of items per page' })
  limit?: number;

  @IsString()
  @ApiPropertyOptional({ description: 'Indicates if the item is archived' })
  isArchived: boolean;
}

export class DashboardDeletedDto {
  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ description: 'Page number for pagination' })
  page?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ description: 'Number of items per page' })
  limit?: number;

  @IsBoolean()
  @ApiPropertyOptional({ description: 'Indicates if the item is deleted' })
  isDeleted: boolean;
}

export class DashboardAcceptedDto {
  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ description: 'Page number for pagination' })
  page?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ description: 'Number of items per page' })
  limit?: number;

  @IsBoolean()
  @ApiPropertyOptional({ description: 'Indicates if the item is accepted' })
  isAccepted: boolean;
}

export class DashboardUpdateArchivedDto {
  @IsBoolean()
  @ApiPropertyOptional({
    description: 'Indicates if the item should be archived',
  })
  isArchived: boolean;
}

export class DashboardUpdateDeletedDto {
  @IsBoolean()
  @ApiPropertyOptional({
    description: 'Indicates if the item should be deleted',
  })
  isDeleted: boolean;
}

export class DashboardUpdateAcceptedDto {
  @IsBoolean()
  @ApiPropertyOptional({
    description: 'Indicates if the item should be accepted',
  })
  isAccepted: boolean;
}
