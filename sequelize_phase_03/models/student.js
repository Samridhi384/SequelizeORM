"use strict";
const tr = require("faker/lib/locales/tr");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Student.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Name field should not be empty",
          },
          len: {
            args: [5, 20],
            msg: "Name should be between 5 to 20 characters",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            args: true,
            msg: "Email should have proper value",
          },
        },
      },
      roll_no: {
        type: DataTypes.INTEGER,
        validate: {
          min: {
            args: 1,
            msg: "Roll no should be greater than zero",
          },
        },
      },
      password: DataTypes.STRING,
    },
    {
      sequelize,
      timestamps: false,
      modelName: "Student",
    }
  );
  return Student;
};
