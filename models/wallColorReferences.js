const sequelize = require("sequelize");
const db = require("../config/db");
const wallColorReferences = db.define("wallColorReferences", {
  CatID: {
    type: sequelize.STRING,
  },
  SID: {
    type: sequelize.INTEGER,
  },
});

module.exports = wallColorReferences;
