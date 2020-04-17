const sequelize = require("sequelize");
const db = require("../config/db");
const prtr = db.define("pNRTreference", {
  CatID: {
    type: sequelize.INTEGER,
  },
  NNRTRID: {
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

module.exports = prtr;
