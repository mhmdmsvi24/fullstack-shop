const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { readJSON } = require("./utils.js");
const app = express();

const produts = readJSON(`${__dirname}/data`, "products.json");

app.use(cors({
  origin: 'http://localhost:5173'
}))

app.use(morgan("combined"))

app.get("/api/v1/products", (req, res) => {
  res.status(200).json(produts);
});

app.get("/api/v1/categories", (req, res) => {
  let categories = {}

  produts.forEach(product => {
    if (categories[product.category]) categories[product.category] += 1
    else categories[product.category] = 1
  })

  res.status(200).json(categories)
})

app.listen(8080, () => {
  console.log("---Server OK---");
});
