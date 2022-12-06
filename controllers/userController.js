let { User } = require("../models/");
let { createToken } = require("../helpers/jwt");

class UserController {
  static async register(req, res, next) {
    try {
      let { username, email, password, status } = req.body;
      let createdUser = await User.create({
        username,
        email,
        password,
        status,
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
      let { unameOrEmail, password } = req.body;
      let email = true;
      if (email) {
        let findUserWithEmail = await User.findOne({
          where: { email: unameOrEmail },
        });
        if (!findUserWithEmail) {
          email = false;
        } else {
          let payload = { id: findUserWithEmail.id };
          var token = createToken(payload);
          res.status(200).json({ access_token: token });
        }
      }
      if (!email) {
        let findUserWithUsername = await User.findOne({
          where: { username: unameOrEmail },
        });
        if (!findUserWithUsername) {
          throw { name: "BAD_REQUEST" };
        } else {
          let payload = { id: findUserWithUsername.id };
          var token = createToken(payload);
          res.status(200).json({ access_token: token });
        }
      }
      var token = createToken(payload);
      res.status(200).json({ access_token: token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
