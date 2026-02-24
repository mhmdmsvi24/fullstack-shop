import jwt from "jsonwebtoken";
import { promisify } from "util";

export function queryToMongoQuery(queryObj) {
  const filters = {};

  for (const key in queryObj) {
    if (typeof queryObj[key] === "object") {
      filters[key] = {};
      for (const op in queryObj[key]) {
        filters[key][`$${op}`] = queryObj[key][op];
      }
    } else {
      filters[key] = queryObj[key];
    }
  }

  return filters;
}

export async function signJWT(payload) {
  return promisify(jwt.sign)(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
}

export async function verifyJWT(token) {
  return promisify(jwt.verify)(token, process.env.JWT_SECRET);
}
