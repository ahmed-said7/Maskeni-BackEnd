'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.ApiService = void 0;
const common_1 = require('@nestjs/common');
let ApiService = class ApiService {
  constructor() {
    this.paginationObj = {
      previousPage: null,
      nextPage: null,
    };
  }
  filter(obj = {}) {
    let filter = { ...this.queryObj };
    const fields = ['keyword', 'page', 'limit', 'select', 'sort'];
    fields.forEach((field) => {
      delete filter[field];
    });
    let queryStr = JSON.stringify(filter);
    queryStr = queryStr.replace(/lt|gt|lte|gte/gi, (val) => `$${val}`);
    filter = JSON.parse(queryStr);
    this.query.find({ ...filter, ...obj });
    return this;
  }
  sort() {
    if (this.queryObj.sort) {
      const sort = this.queryObj.sort.split(',').join(' ');
      this.query.sort(sort);
    } else {
      this.query.sort('-updatedAt');
    }
    return this;
  }
  search(fields) {
    if (this.queryObj.keyword && fields?.length > 0) {
      const obj = { $or: [] };
      fields.forEach((field) => {
        obj.$or.push({
          [field]: { $regex: this.queryObj.keyword, $options: 'i' },
        });
      });
      this.query = this.query.find(obj);
    }
    return this;
  }
  select() {
    if (this.queryObj.select) {
      const select = this.queryObj.select.split(',').join(' ');
      this.query.select(select);
    }
    return this;
  }
  async pagination() {
    this.paginationObj.count = (
      await this.query.model.find({ ...this.query.getQuery() })
    ).length;
    this.paginationObj.currentPage = this.queryObj.page
      ? parseInt(this.queryObj.page)
      : 1;
    this.paginationObj.limit = this.queryObj.limit
      ? parseInt(this.queryObj.limit)
      : 10;
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
    this.query = this.query
      .skip(this.paginationObj.skip)
      .limit(this.paginationObj.limit);
    return this;
  }
  getAllDocs(query, queryObj, obj = {}, fields) {
    this.query = query;
    this.queryObj = queryObj;
    return this.filter(obj).sort().select().search(fields).pagination();
  }
};
exports.ApiService = ApiService;
exports.ApiService = ApiService = __decorate(
  [(0, common_1.Injectable)()],
  ApiService,
);
//# sourceMappingURL=api.service.js.map
