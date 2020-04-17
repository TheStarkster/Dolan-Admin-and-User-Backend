const sequelize = require("sequelize");
const DB = require("../config/db");
const wallColorCategory = DB.define("wallColorCategories", {
  Name: {
    type: sequelize.STRING,
  },
  background: {
    type: sequelize.STRING,
  },
});

module.exports = wallColorCategory;
