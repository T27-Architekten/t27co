const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env.local") });

const mongoURI = process.env.REACT_APP_DB_LINK;

/* There is no callback function in the new version of nodemon which is "^2.0.22"
and it will throw an error, 
throw new MongooseError('Mongoose.prototype.connect() no longer accepts a callback');

The function below can be replaced with,

const connectToMongo = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(mongoURI);
    console.log("Database is connected.");
  } catch (error) {
    console.log(error);
    process.exit();
  }
}; */

const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("Connected to the database. ");
  });
};

module.exports = connectToMongo;
