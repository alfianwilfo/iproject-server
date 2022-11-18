// Requiring module
const bcrypt = require("bcryptjs");

const salt = 10;

let hash = (password) => bcrypt.hashSync(password, salt);
let comparePassword = (password, compareMe) =>
  bcrypt.compare(password, compareMe);

module.exports = { hash, comparePassword };
