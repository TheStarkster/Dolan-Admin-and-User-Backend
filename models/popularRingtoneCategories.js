const sequelize = require("sequelize");
const DB = require("../config/db");
const PopularRTCatagories = DB.define("poprtcategories", {
  Name: {
    type: sequelize.STRING,
  },
  background: {
    type: sequelize.STRING,
  },
});

module.exports = PopularRTCatagories;
