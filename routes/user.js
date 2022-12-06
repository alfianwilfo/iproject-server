const express = require("express");
const app = express();
let userController = require("../controllers/userController");

app.post("/register", userController.register);
app.post("/login", userController.login);

module.exports = app;
