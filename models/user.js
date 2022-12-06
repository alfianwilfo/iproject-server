"use strict";
let { hash } = require("../helpers/bcrypt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Username already registered" },
        validate: {
          notNull: { msg: "Username can't be null" },
          notEmpty: { msg: "Username can't be empty" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Email already registered" },
        validate: {
          isEmail: { msg: "Invalid email format" },
          notNull: { msg: "Email can't be null" },
          notEmpty: { msg: "Email can't be empty" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Password can't be null" },
          notEmpty: { msg: "Password can't be empty" },
        },
      },
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate(async (user) => {
    user.password = hash(user.password);
    user.status = "Basic";
  });
  return User;
};
