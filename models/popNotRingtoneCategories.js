const sequelize = require("sequelize");
const DB = require("../config/db");
const PopularNRTCatagories = DB.define("pNRTcategories", {
  Name: {
    type: sequelize.STRING,
  },
  background: {
    type: sequelize.STRING,
  },
});

module.exports = PopularNRTCatagories;
