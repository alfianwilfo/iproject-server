const express = require("express");
const app = express();
let user = require("./user");
let corona = require("./corona");

app.use("/users", user);
app.use("/corona", corona);

module.exports = app;
