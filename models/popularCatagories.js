const sequelize = require("sequelize");
const DB = require("../config/db");
const PopularCatagories = DB.define("popularwallcategories", {
  name: {
    type: sequelize.STRING,
  },
});

module.exports = PopularCatagories;
