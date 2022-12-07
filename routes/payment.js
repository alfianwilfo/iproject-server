const express = require("express");
const app = express();
let PaymentController = require("../controllers/PaymentController");
app.get("/", PaymentController.getToken);

module.exports = app;
