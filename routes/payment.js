const express = require("express");
const app = express();
let PaymentController = require("../controllers/PaymentController");

app.get("/", PaymentController.getToken);
app.patch("/", PaymentController.updateStatus);

module.exports = app;
