let { User } = require("../models/");
let { createToken } = require("../helpers/jwt");
let path = require("path");
let { comparePassword } = require("../helpers/bcrypt");
const nodemailer = require("nodemailer");

class UserController {
  static async register(req, res, next) {
    try {
      let em = "litavue@gmail.com";
      let pa = "test@123321";
      let pwApp = "ltgeyizotxvapxkw";

      let { username, email, password } = req.body;
      let createdUser = await User.create({
        username,
        email,
        password,
      });
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // use SSL
        auth: {
          user: em,
          pass: pwApp,
        },
      });

      var mailOptions = {
        from: em,
        to: email,
        subject: "Welcome mate !",
        html: `<h1>Welcome ${email}</h1>
        <p>Akunmu sudah terdaftar dan bisa digunakan!</p>
        <img src="cid:Nyan">`,
        attachments: [
          {
            filename: "nyan cat dilelang.jpg",
            path: path.join(__dirname, "../assets/nyan cat dilelang.jpg"),
            cid: "Nyan", //my mistake was putting "cid:logo@cid" here!
          },
        ],
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      res.status(201).json({
        id: createdUser.id,
        email: createdUser.email,
        username: createdUser.username,
      });
    } catch (error) {
      console.log(error);
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
      res.status(200).json({ access_token: token, email: email });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
