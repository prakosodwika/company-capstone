const sequelize = require("sequelize");
const db = require("../config/config");

const History = db.define(
  "history",
  {
    location: {
      type: sequelize.STRING,
      allowNull: false,
    },
    date: {
      type: sequelize.DATE,
      allowNull: false,
    },
    aqi: {
      type: sequelize.DOUBLE,
      allowNull: false,
    },
    o3: {
      type: sequelize.DOUBLE,
      allowNull: false,
    },
    so2: {
      type: sequelize.DOUBLE,
      allowNull: false,
    },
    no2: {
      type: sequelize.DOUBLE,
      allowNull: false,
    },
    co: {
      type: sequelize.DOUBLE,
      allowNull: false,
    },
    pm10: {
      type: sequelize.DOUBLE,
      allowNull: false,
    },
    pm25: {
      type: sequelize.DOUBLE,
      allowNull: false,
    },
    temperature: {
      type: sequelize.DOUBLE,
      allowNull: false,
    },
    humidity: {
      type: sequelize.DOUBLE,
      allowNull: false,
    },
    wind_speed: {
      type: sequelize.DOUBLE,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = History;
