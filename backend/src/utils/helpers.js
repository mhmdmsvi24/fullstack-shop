import { queryToMongoQuery } from "./utils.js";

export class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // exluding these queries to prevent breaking the monoose query
    const queryObj = { ...this.queryString };
    const excludeQuery = ["page", "limit", "sort", "fields"];
    excludeQuery.forEach((q) => delete queryObj[q]);

    this.query.find(queryToMongoQuery(queryObj));

    return this;
  }

  sort() {
    this.queryString.sort
      ? this.query.sort(this.queryString.sort.split(",").join(" "))
      : this.query.sort("-createdAt");

    return this;
  }

  fields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query.select(fields);
    } else {
      this.query.select("-__v");
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 20;
    const skip = (page - 1) * limit;

    this.query.skip(skip).limit(limit);

    return this;
  }
}
