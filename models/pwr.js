const sequelize = require("sequelize");
const db = require("../config/db");
const pwr = db.define("popularwallreferences", {
  CatID: {
    type: sequelize.STRING,
  },
  NWRID: {
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

module.exports = pwr;
