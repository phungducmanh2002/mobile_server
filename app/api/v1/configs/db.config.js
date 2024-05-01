const {
  GetEnvDBName,
  GetEnvDBUserName,
  GetEnvDBPassword,
} = require("../../../../project/project.utils");

const databaseName = GetEnvDBName();
const databaseUsername = GetEnvDBUserName();
const databasePassword = GetEnvDBPassword();

module.exports = {
  mssql: {
    host: "localhost",
    user: databaseUsername,
    password: databasePassword,
    database: databaseName,
    dialect: "mssql",
  },
};
