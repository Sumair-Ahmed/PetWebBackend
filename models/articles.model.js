const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  body: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  articleImage: {
    type: String,
  },
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
