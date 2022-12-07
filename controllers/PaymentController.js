let axios = require("axios");
const { where } = require("sequelize");
let { User } = require("../models/");
class PaymentController {
  static async getToken(req, res, next) {
    try {
      const randomId = Math.floor(Math.random() * 1000000000000);
      let midtransUrl = "https://app.sandbox.midtrans.com/snap/v1/transactions";
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Basic U0ItTWlkLXNlcnZlci05cGtlMVdZRFFqcjlmcklfTTU5bHl2Umg6`,
        },
      };
      const body = {
        transaction_details: {
          order_id: `PASS-${randomId}`, // id order // increment
          gross_amount: 10000, // total price
        },
        credit_card: {
          secure: true,
        },
      };
      const { data } = await axios.post(midtransUrl, body, config);

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }
  static async updateStatus(req, res, next) {
    try {
      console.log(req.currentUser);
      let updatedUser = await User.update(
        { status: "Premium" },
        { where: { email: req.currentUser.email } }
      );
      res.status(200).json({ message: "Your account already premium" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PaymentController;
