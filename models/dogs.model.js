const mongoose = require("mongoose");

const dogSchema = new mongoose.Schema({
  skuNo: {
    type: String,
    required: true,
    unique: true,
  },
  dogName: {
    type: String,
    required: true,
  },
  dogCode: {
    type: String,
    required: true,
  },
  dogVND: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  vaccinated: {
    type: Boolean,
    default: false,
  },
  dewormed: {
    type: Boolean,
    default: false,
  },
  cert: {
    type: String,
    required: true,
  },
  microship: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  publishedDate: {
    type: Date,
    default: Date.now,
  },
  additionalInformation: {
    type: String,
  },
  images: [
    {
      type: String, // Replace with appropriate image storage approach
    },
  ],
  thumbnail: {
    type: String, // Replace with appropriate image storage approach
  },
});

const Dog = mongoose.model("Dog", dogSchema);

module.exports = Dog;
