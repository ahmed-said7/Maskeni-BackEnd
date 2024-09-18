import { Pagination } from './api.service';

export class ArrayPagination {
  public paginationObj: Pagination = {
    previousPage: null,
    nextPage: null,
  };
  apiPagination(query: { page?: string; limit?: string }, data: Array<any>) {
    this.paginationObj.count = data.length;
    this.paginationObj.currentPage = parseInt(query.page) || 1;
    this.paginationObj.limit = parseInt(query.limit) || 10;
    this.paginationObj.numOfPages = Math.ceil(
      this.paginationObj.count / this.paginationObj.limit,
    );
    this.paginationObj.skip =
      (this.paginationObj.currentPage - 1) * this.paginationObj.limit;
    if (this.paginationObj.currentPage > 1) {
      this.paginationObj.previousPage = this.paginationObj.currentPage - 1;
    }
    if (
      this.paginationObj.count >
      this.paginationObj.currentPage * this.paginationObj.limit
    ) {
      this.paginationObj.nextPage = this.paginationObj.currentPage + 1;
    }
    const idx = this.paginationObj.skip;
    const result = data.slice(idx, idx + this.paginationObj.limit);
    return { result, pagination: this.paginationObj };
  }
}
