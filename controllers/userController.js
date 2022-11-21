let { User } = require("../models/index");
let { comparePassword } = require("../helpers/bcrypt");
let { createToken } = require("../helpers/jwt");
class UserController {
  static async login(req, res, next) {
    try {
      let { email, password } = req.body;
      let findUser = await User.findOne({ where: { email: email } });
      if (!findUser) {
        throw { name: "USER_NOT_FOUND" };
      }
      let pw = await comparePassword(password, findUser.password);
      if (!pw) {
        throw { name: "PASSWORD_WRONG" };
      }
      let payload = { id: findUser.id };
      let token = createToken(payload);
      console.log(token);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async register(req, res, next) {
    try {
      let { email, password } = req.body;
      let createUser = await User.create({ email, password });
      console.log(createUser);
      res.status(201).json(createUser);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserController;
