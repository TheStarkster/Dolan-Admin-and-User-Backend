const sequelize = require("sequelize");
const DB = require("../config/db");
const wallpaper = DB.define("wallsources", {
  Name: {
    type: sequelize.STRING,
  },
  Path: {
    type: sequelize.STRING,
  },
  thumbnail: {
    type: sequelize.STRING,
  },
  Author: {
    type: sequelize.STRING,
  },
  Downloads: {
    type: sequelize.INTEGER,
  },
  createdBy: {
    type: sequelize.INTEGER,
  },
  updatedBy: {
    type: sequelize.INTEGER,
  },
  Status: {
    type: sequelize.BOOLEAN,
  },
});

module.exports = wallpaper;
