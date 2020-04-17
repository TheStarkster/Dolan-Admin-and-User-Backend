const sequelize = require("sequelize");
const DB = require("../config/db");
const wallpaperCategory = DB.define("nNRTcategories", {
  Name: {
    type: sequelize.STRING,
  },
  background: {
    type: sequelize.STRING,
  },
});

module.exports = wallpaperCategory;
