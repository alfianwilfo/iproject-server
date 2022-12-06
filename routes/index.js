const express = require("express");
const app = express();
let user = require("./user");
let movie = require("./movie");

app.use("/users", user);
app.use("/movies", movie);

module.exports = app;
