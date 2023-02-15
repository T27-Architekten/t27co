const express = require("express");
const mongoose = require("mongoose");
const connecToMongo = require("./db");
// const path = require("path");
// require("dotenv").config({ path: path.resolve(__dirname, ".env.local") });

mongoose.set("strictQuery", false);
// Database connection.
connecToMongo();
const app = express();
const port = process.env.REACT_APP_PORTS;

// You need a middleware to use the body.req. The middelware is written below
app.use(express.json());

// app.use is used for routes and link another file for the end points.
app.use("/api/auth", require("./routes/auth"));
app.use("/api/projects", require("./routes/projects"));

// app.get("/", (req, res) => {
//   res.send("Welcome to T27 Architekten");
// });

app.listen(port, () => {
  console.log(`Example app listening on the given port.`);
});
