require('dotenv').config();
const jwt = require('jsonwebtoken');
// в конфиге можем настроить время жизни и название наших ключей
const jwtConfig = require('../middleware/configJWT');

const generateTokens = (payload) => ({
  accessToken: jwt.sign(payload, process.env.ACCESS, {
    // здесь access и это восковый билет
    expiresIn: jwtConfig.access.expiresIn,
  }),

  refreshToken: jwt.sign(payload, process.env.REFRESH, {
    // здесь рефреш и это наш чек
    expiresIn: jwtConfig.refresh.expiresIn,
  }),
});

module.exports = generateTokens;