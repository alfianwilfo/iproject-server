let { User } = require("../models/");
let author = async (req, res, next) => {
  try {
    if (req.currentUser.status === "Premium") {
      throw { name: "BAD_REQ" };
    }
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = author;
