const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProjectSchema = new Schema({
  pname: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  description: {
    type: String,
  },
  year: {
    type: Number,
    required: true,
  },
  category: {
    type: Date,
    default: Date.now,
  },
  inprogress: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Projects", ProjectSchema);
