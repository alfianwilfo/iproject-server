const { verifyToken } = require("../helpers/jwt");
let { User } = require("../models/");

let authen = async (req, res, next) => {
  try {
    let { access_token } = req.headers;
    if (!access_token) {
      throw { name: "Unauthorized" };
    }
    let verif = verifyToken(access_token);

    let findedUser = await User.findOne({ where: { id: verif.id } });

    if (!findedUser) {
      throw { name: "Unauthorized" };
    }
    req.currentUser = findedUser;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authen;
