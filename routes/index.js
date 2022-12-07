const express = require("express");
const app = express();
let user = require("./user");
let corona = require("./corona");
let payment = require("./payment");

app.use("/users", user);
app.use("/corona", corona);
app.use("/payments", payment);

module.exports = app;
