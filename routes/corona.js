const express = require("express");
const app = express();
let coronaController = require("../controllers/coronaController");

app.get("/countries", coronaController.getCountry);

module.exports = app;
