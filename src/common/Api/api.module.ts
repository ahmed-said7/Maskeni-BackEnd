import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ArrayPagination } from './array.pagination';

@Module({
  exports: [ApiService, ArrayPagination],
  providers: [ApiService, ArrayPagination],
})
export class ApiModule {}
