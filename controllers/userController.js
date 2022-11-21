let { User } = require("../models/index");
let { comparePassword } = require("../helpers/bcrypt");
let { createToken } = require("../helpers/jwt");
const { use } = require("../routes");
const { query } = require("express");
class UserController {
  static async login(req, res, next) {
    try {
      let { email, username, password } = req.body;
      let query;
      if (email) {
        query = { where: { email: email } };
      } else if (username) {
        query = { where: { username: username } };
      } else if (!email || !username) {
        throw { name: "BAD_REQUEST" };
      }

      let findUser = await User.findOne(query);
      console.log(findUser, "?????");
      if (!findUser) {
        throw { name: "USER_NOT_FOUND" };
      }
      let pw = await comparePassword(password, findUser.password);
      console.log(pw, "====");
      if (!pw) {
        throw { name: "PASSWORD_WRONG" };
      }
      let payload = { id: findUser.id };
      let token = createToken(payload);
      console.log(token);
    } catch (error) {
      console.log(error, "<<<");
      next(error);
    }
  }
  static async register(req, res, next) {
    try {
      let { email, password, username } = req.body;
      let createUser = await User.create({ email, password, username });
      res.status(201).json(createUser);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
