const { INTEGER } = require("sequelize");
const {
  GetEnvJwtTokenLifeTime,
  GetEnvJwtSecretKey,
  GetEnvJwtArgorithm,
} = require("../../../../project/project.utils");

const tokenLifeTime = parseInt(GetEnvJwtTokenLifeTime());
const tokenSecretKey = GetEnvJwtSecretKey();
const tokenAlgorithm = GetEnvJwtArgorithm();

module.exports = {
  secret: tokenSecretKey,
  options: {
    algorithm: tokenAlgorithm,
    allowInsecureKeySizes: true,
    expiresIn: tokenLifeTime,
  },
};
