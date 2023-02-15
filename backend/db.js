const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env.local") });

const mongoURI = process.env.REACT_APP_DB_link;

const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("Connected to the database. ");
  });
};

module.exports = connectToMongo;
