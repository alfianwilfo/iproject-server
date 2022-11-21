const express = require("express");
const app = express();
let user = require("./user");

app.use("/users", user);

module.exports = app;
