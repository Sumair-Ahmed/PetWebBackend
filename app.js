const express = require("express");
const mongoose = require("mongoose");
const dogRoutes = require("./Routes/dogRoute");
const productRoutes = require("./Routes/productRoute");
const articleRoutes = require("./Routes/articleRoute");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
const DBHOST = process.env.DBHOST;

// Connect to MongoDB
mongoose
  .connect(DBHOST)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Project Running Properly");
});
app.use("/api/dogs", dogRoutes);
app.use("/api/products", productRoutes);
app.use("/api/articles", articleRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
