const express = require("express");
const app = express();
let PaymentController = require("../controllers/PaymentController");
const author = require("../middlewares/authorization");

app.get("/", author, PaymentController.getToken);
app.patch("/", PaymentController.updateStatus);

module.exports = app;
