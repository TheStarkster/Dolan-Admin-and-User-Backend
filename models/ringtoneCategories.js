const sequelize = require("sequelize");
const DB = require("../config/db");
const ringtoneCategory = DB.define("normrtcategories", {
  Name: {
    type: sequelize.STRING,
  },
  background: {
    type: sequelize.STRING,
  },
});
module.exports = ringtoneCategory;
