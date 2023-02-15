const express = require("express");
const connecToMongo = require("./db");

// Database connection.
connecToMongo();
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Welcome to T27 Architekten");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
