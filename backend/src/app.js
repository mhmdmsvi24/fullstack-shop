const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { readJSON } = require("./utils.js");
const app = express();

const products = readJSON(`${__dirname}/data`, "products.json");

app.use(cors({
  origin: 'http://localhost:5173'
}))

app.use(morgan("dev"))

app.get("/api/v1/products", (req, res) => {
  res.status(200).json(products);
});

// Up to date Categories list
app.get("/api/v1/categories", (req, res) => {
  let categories = {}

  products.forEach(product => {
    if (categories[product.category]) categories[product.category] += 1
    else categories[product.category] = 1
  })

  res.status(200).json(categories)
})

// Filters
app.get("/api/v1/filter", (req, res) => {
  let result = [...products];

  const { rating, category, price, discount, brand, sort } = req.query;

  const limit = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 1;
  const paginateStartIndex = (page - 1) * limit;
  const paginateEndIndex = page * limit;

  if (rating) {
    const minRating = parseFloat(rating);
    result = result.filter(pr => pr.rating >= minRating);
  }

  if (category) {
    result = result.filter(pr => pr.category === category);
  }

  if (price) {
    const maxPrice = parseFloat(price);
    result = result.filter(pr => pr.price <= maxPrice);
  }

  if (discount === "true") {
    result = result.filter(pr => pr.discount > 0);
  }

  if (brand) {
    result = result.filter(pr => pr.brand === brand);
  }

  if (sort) {
    const [sortValue, sortOrder] = sort.split(":")
    result = result.sort((a, b) => {
      if (sortOrder === "asc")
        return a[sortValue] - b[sortValue]
      else
        return b[sortValue] - a[sortValue]
    })
  }

  // Pagination
  result = result.slice(paginateStartIndex, paginateEndIndex)

  res.status(200).json({
    "status": {
      "code": 200,
      "message": "Success"
    },
    "data": result,
    "length": result.length
  });
});


app.listen(8080, () => {
  console.log("---Server OK---");
});
