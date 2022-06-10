const sequelize = require("sequelize");
const db = require("../config/config");

const Users = db.define(
  "users",
  {
    name: {
      type: sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: sequelize.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Users;
