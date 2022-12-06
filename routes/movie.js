const express = require("express");
const app = express();
let MovieController = require("../controllers/movieController");

app.get("/", MovieController.get);
app.get("/:id", MovieController.detail);

module.exports = app;
