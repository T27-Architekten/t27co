const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProjectSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  pname: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
  },
  year: {
    type: Number,
  },
  category: {
    type: String,
  },
  inprogress: {
    type: String,
  },
  alteredby: {
    type: String,
  },
  show: {
    type: Boolean,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  // Image
  images: {
    type: Array,
  },
});

module.exports = mongoose.model("projects", ProjectSchema);
