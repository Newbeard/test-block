const jwt = require('jsonwebtoken');
const { Token } = require('../db/models');

Error.stackTraceLimit = Infinity;

const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: '30m',
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '30d',
  });

  return {
    accessToken,
    refreshToken,
  };
};

// валидация токенов
const validateAccessToken = (token) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return userData;
  } catch (error) {
    return null;
  }
};

const validateRefreshToken = (token) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    return userData;
  } catch (error) {
    return null;
  }
};

async function saveToken(userId, refreshToken) {
  const tokenData = await Token.findOne({
    where: {
      user_id: userId,
    },
  });

  if (tokenData) {
    tokenData.refreshToken = refreshToken;
    return tokenData.save();
  }
  const token = await Token.create({
    user_id: userId,
    refresh_token: refreshToken,
  });

  return token;
}

async function removeToken(refreshToken) {
  // удаляем из БД
  const deletedToken = await Token.destroy({
    where: {
      refresh_token: refreshToken,
    },
  });
  return deletedToken;
}

// проверка токена в бд
async function findToken(refreshToken) {
  const foundToken = await Token.findOne({
    where: {
      refresh_token: refreshToken,
    },
  });
  return foundToken;
}

module.exports = {
  generateTokens,
  saveToken,
  removeToken,
  findToken,
  validateAccessToken,
  validateRefreshToken,
};
