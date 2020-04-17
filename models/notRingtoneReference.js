const sequelize = require("sequelize");
const DB = require("../config/db");
const nNRTreference = DB.define("nNRTrefrences", {
  createdBy: {
    type: sequelize.INTEGER,
  },
  updatedBy: {
    type: sequelize.INTEGER,
  },
  Status: {
    type: sequelize.BOOLEAN,
  },
  CatID: {
    type: sequelize.INTEGER,
  },
  SID: {
    type: sequelize.INTEGER,
  },
});

module.exports = nNRTreference;
