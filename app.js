const express = require("express");
const app = express();
const port = 3000;
let route = require("./routes/index");
let cors = require("cors");

app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use("/", route);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
