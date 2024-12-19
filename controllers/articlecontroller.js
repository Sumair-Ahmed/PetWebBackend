const Article = require("../models/articles.model");
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
exports.createArticle = [
  upload.fields([{ name: "articleImage", maxCount: 1 }]),
  async (req, res) => {
    const uploadedimage = req.files.articleImage
      ? req.files.articleImage[0]
      : null; // Handle thumbnail

    const imagePath = uploadedimage
      ? `uploads/${uploadedimage.filename}`
      : null;

    const newArticle = new Article({
      ...req.body,
      articleImage: imagePath, // Single thumbnail image path
    });

    try {
      const savedArticle = await newArticle.save();
      res.status(201).json(savedArticle);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
];

// Other CRUD operations remain the same
exports.getAllArticle = async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve articles" });
  }
};

exports.getArticleById = async (req, res) => {
  const { id } = req.params;

  try {
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ error: "article not found" });
    }
    res.json(article);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve article" });
  }
};

exports.updateArticle = async (req, res) => {
  const { id } = req.params;

  upload.fields([{ name: "articleImage", maxCount: 1 }])(
    req,
    res,
    async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error uploading image" });
      }

      const imagePath = req.files.articleImage
        ? req.files.articleImage[0].path
        : null;

      try {
        const updatedArticle = await Article.findByIdAndUpdate(
          id,
          {
            ...req.body,
            ArticleImage: imagePath,
          },
          { new: true }
        );

        if (!updatedArticle) {
          return res.status(404).json({ error: "Article not found" });
        }

        res.json(updatedArticle);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update Article" });
      }
    }
  );
};

exports.deleteArticle = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedArticle = await Article.findByIdAndDelete(id);

    if (!deletedArticle) {
      return res.status(404).json({ error: "Article not found" });
    }

    res.json({ message: "Article deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete Article" });
  }
};
