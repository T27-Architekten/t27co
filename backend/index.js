const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // It allows to have two servers at the same time on a different port and to be able to communicate between them, the backend server with nodemon and the frontend server with npm start
const connecToMongo = require("./db");
var bodyParser = require("body-parser");

mongoose.set("strictQuery", false);
// Database connection.
connecToMongo();
const app = express();
const port = process.env.REACT_APP_PORTS;

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

// You need a middleware to use the req.body. The middelware is written below.
app.use(cors());
// app.use(express.json());
app.use("/static", express.static(__dirname + "/assets"));

// app.use is used for routes and link another file for the end points.
app.use("/api/auth", require("./routes/auth"));
app.use("/api/projects", require("./routes/projects"));

app.listen(port, () => {
  console.log(`T27 Architekten app listening on the port ${port}.`);
});
