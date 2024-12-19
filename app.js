const express = require("express");
const mongoose = require("mongoose");
const dogRoutes = require("./Routes/dogRoute");
const productRoutes = require("./Routes/productRoute");
const articleRoutes = require("./Routes/articleRoute");
const cors = require("cors");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://ahmednahiyo21:8auxqjaAIg1m3z4w@backenddb.qclzc.mongodb.net/Learning-API?retryWrites=true&w=majority&appName=BackendDB"
  )
  // Replace with your MongoDB connection string
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(cors()); // Optional, for CORS configuration
app.use(express.json());
app.use("/api/dogs", dogRoutes);
app.use("/api/products", productRoutes);
app.use("/api/articles", articleRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
