import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class DashboardSearchDto {
  @IsOptional()
  @IsNumber()
  page: number;

  @IsOptional()
  @IsNumber()
  limit: number;
}

export class DashboardArchivedDto {
  @IsOptional()
  @IsNumber()
  page: number;

  @IsOptional()
  @IsNumber()
  limit: number;
  isArchived: boolean;
}

export class DashboardDeletedDto {
  @IsOptional()
  @IsNumber()
  page: number;

  @IsOptional()
  @IsNumber()
  limit: number;
  isDeleted: boolean;
}
export class DashboardAcceptedDto {
  @IsOptional()
  @IsNumber()
  page: number;

  @IsOptional()
  @IsNumber()
  limit: number;
  @IsBoolean()
  isAccepted: boolean;
}

export class DashboardUpdateArchivedDto {
  @IsBoolean()
  isArchived: boolean;
}
export class DashboardUpdateDeletedDto {
  @IsBoolean()
  isDeleted: boolean;
}
export class DashboardUpdateAcceptedDto {
  @IsBoolean()
  isAccepted: boolean;
}
