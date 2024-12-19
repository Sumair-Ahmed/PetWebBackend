const Dog = require("../models/dogs.model");
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
exports.createDog = [
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  async (req, res) => {
    console.log(req.body); // Check the request body
    console.log(req.files); // Check the uploaded files

    const uploadedImages = req.files.images || []; // Ensure uploadedImages is an array
    const uploadedThumbnail = req.files.thumbnail
      ? req.files.thumbnail[0]
      : null; // Handle thumbnail

    // Generate paths for uploaded images
    const imagePaths = uploadedImages.map((file) => `uploads/${file.filename}`); // Assuming filename is used for path
    const thumbnailPath = uploadedThumbnail
      ? `uploads/${uploadedThumbnail.filename}`
      : null;

    const newDog = new Dog({
      ...req.body,
      images: imagePaths, // Array of images
      thumbnail: thumbnailPath, // Single thumbnail image path
    });

    try {
      const savedDog = await newDog.save();
      res.status(201).json(savedDog);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message }); // More specific error messages can be handled here
    }
  },
];

// Other CRUD operations remain the same
exports.getAllDogs = async (req, res) => {
  try {
    const dogs = await Dog.find();
    res.json(dogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve dogs" });
  }
};

exports.getDogById = async (req, res) => {
  const { id } = req.params;

  try {
    const dog = await Dog.findById(id);
    if (!dog) {
      return res.status(404).json({ error: "Dog not found" });
    }
    res.json(dog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve dog" });
  }
};

exports.updateDog = async (req, res) => {
  const { id } = req.params;

  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "thumbnail", maxCount: 1 },
  ])(req, res, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error uploading images" });
    }

    const imagePaths = req.files.images
      ? req.files.images.map((file) => file.path)
      : [];
    const thumbnailPath = req.files.thumbnail
      ? req.files.thumbnail[0].path
      : null;

    try {
      const updatedDog = await Dog.findByIdAndUpdate(
        id,
        {
          ...req.body,
          images: imagePaths,
          thumbnail: thumbnailPath,
        },
        { new: true }
      );

      if (!updatedDog) {
        return res.status(404).json({ error: "Dog not found" });
      }

      res.json(updatedDog);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to update dog" });
    }
  });
};

exports.deleteDog = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedDog = await Dog.findByIdAndDelete(id);

    if (!deletedDog) {
      return res.status(404).json({ error: "Dog not found" });
    }

    res.json({ message: "Dog deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete dog" });
  }
};
