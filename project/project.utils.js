require("dotenv").config();
module.exports = {
  GetEnvValueByKey: (key) => {
    return process.env[key];
  },
  GetEnvDBName: () => {
    return process.env.DB_NAME;
  },
  GetEnvDBUserName: () => {
    return process.env.DB_USERNAME;
  },
  GetEnvDBPassword: () => {
    return process.env.DB_PASSWORD;
  },
  GetEnvJwtSecretKey: () => {
    return process.env.JWT_SECRET;
  },
  GetEnvJwtArgorithm: () => {
    return process.env.JWT_ALGORITH;
  },
  GetEnvJwtTokenLifeTime: () => {
    return process.env.JWT_LIFE_TIME;
  },
  GetEnvJwtTokenArgorithm: () => {
    return process.env.JWT_ALGORITH;
  },
};
