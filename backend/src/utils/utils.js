export function queryToMongoQuery(queryObj) {
  const filters = {};

  for (const key in queryObj) {
    if (typeof queryObj[key] === "object") {
      filters[key] = {};
      for (const op in queryObj[key]) {
        filters[key][`$${op}`] = queryObj[key][op];
      }
    } else {
      filters[key] = queryObj[key]
    }
  }

  return filters;
}
