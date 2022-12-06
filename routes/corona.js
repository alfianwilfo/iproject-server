const express = require("express");
const app = express();
let coronaController = require("../controllers/coronaController");

app.get("/countries", coronaController.getCountry);
app.get("/statistics", coronaController.getStatistic);
app.get("/history", coronaController.getHistory);

module.exports = app;
