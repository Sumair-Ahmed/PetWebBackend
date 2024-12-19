const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
  productVND: {
    type: String,
    required: true,
  },
  size: {
    type: String,
  },
  highlight: {
    type: String,
  },
  productImage: {
    type: String,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
