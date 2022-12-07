let { User } = require("../models/");
let { createToken } = require("../helpers/jwt");

let { comparePassword } = require("../helpers/bcrypt");

class UserController {
  static async register(req, res, next) {
    try {
      console.log("masuk");
      let { username, email, password } = req.body;
      let createdUser = await User.create({
        username,
        email,
        password,
      });
      res.status(201).json({
        id: createdUser.id,
        email: createdUser.email,
        username: createdUser.username,
      });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      let { email, password } = req.body;
      let findUserWithEmail = await User.findOne({
        where: { email: email },
      });
      if (!findUserWithEmail) {
        throw { name: "WRONG_EMAIL" };
      }
      let comparePw = await comparePassword(
        password,
        findUserWithEmail.password
      );
      if (!comparePw) {
        throw { name: "WRONG_PASSWORD" };
      }
      let payload = { id: findUserWithEmail.id };
      var token = createToken(payload);
      res.status(200).json({ access_token: token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
