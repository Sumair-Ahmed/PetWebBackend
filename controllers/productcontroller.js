const Product = require("../models/product.model");
const multer = require("multer");

// Set up storage for images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // Specify your desired upload directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Create an upload middleware for handling both multiple images and a single thumbnail
const upload = multer({ storage: storage });

// Middleware for handling the uploads
exports.createProduct = [
  upload.fields([{ name: "productImage", maxCount: 1 }]),
  async (req, res) => {
    const uploadedimage = req.files.productImage
      ? req.files.productImage[0]
      : null; // Handle thumbnail

    const imagePath = uploadedimage
      ? `uploads/${uploadedimage.filename}`
      : null;

    const newProduct = new Product({
      ...req.body,
      productImage: imagePath, // Single thumbnail image path
    });

    try {
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
];

// Other CRUD operations remain the same
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve products" });
  }
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "product not found" });
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve product" });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;

  upload.fields([{ name: "productImage", maxCount: 1 }])(
    req,
    res,
    async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error uploading image" });
      }

      const imagePath = req.files.productImage
        ? req.files.productImage[0].path
        : null;

      try {
        const updatedProduct = await Product.findByIdAndUpdate(
          id,
          {
            ...req.body,
            productImage: imagePath,
          },
          { new: true }
        );

        if (!updatedProduct) {
          return res.status(404).json({ error: "Product not found" });
        }

        res.json(updatedProduct);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update Product" });
      }
    }
  );
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete Product" });
  }
};
