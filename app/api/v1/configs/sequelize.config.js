const sequelize = require("sequelize");
const dbConfig = require("./db.config");

const mssql = dbConfig.mssql;

module.exports = {
  instance: new sequelize(mssql.database, mssql.user, mssql.password, {
    host: mssql.host,
    dialect: mssql.dialect,
    logging: false,
  }),
};
